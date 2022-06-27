const User = require("./../models/userSchema");
const Counter = require("./../models/counterSchema");
const Menu = require("./../models/menuSchema");
const Role = require("./../models/roleSchema");
const util = require("./../utils/util");
const jwt = require("jsonwebtoken");
const md5 = require("md5");

const login = async (ctx) => {
  try {
    const { username, password } = ctx.request.body;
    /**
     * 返回数据库指定字段，有三种方式
     * 1. 'userId username userEmail state role deptId roleList'
     * 2. {userId:1,_id:0}
     * 3. select('userId')
     */
    console.log("wnn", username, password);
    const res = await User.findOne(
      {
        username: username,
        $or: [{ password: md5(password) }, { password: password }],
        // password: '123456'
      },
      "userId username userEmail state role deptId roleList"
    );
    if (res) {
      const data = res._doc;

      const token = jwt.sign(
        {
          data,
        },
        "imooc",
        { expiresIn: "1h" }
      );
      data.token = token;
      ctx.body = util.success(data);
    } else {
      ctx.body = util.fail("账号或密码不正确");
    }
  } catch (error) {
    ctx.body = util.fail(error.msg);
  }
};

const getList = async (ctx) => {
  const { userId, username, state } = ctx.request.query;
  const { page, skipIndex } = util.pager(ctx.request.query);
  const params = {};
  if (userId) params.userId = userId;
  if (username) params.username = username;
  if (state && state != "0") params.state = state;
  try {
    // 根据条件查询所有用户列表
    const query = User.find(params, { password: 0 }); // 不能用await
    const list = await query.skip(skipIndex).limit(page.pageSize);
    const total = await User.countDocuments(params);

    ctx.body = util.success({
      page: {
        ...page,
        total,
      },
      list,
    });
  } catch (error) {
    ctx.body = util.fail(`查询异常:${error.stack}`);
  }
};

const deleteList = async (ctx) => {
  try {
    // 待删除的用户Id数组
    const { _id } = ctx.request.body;
    const res = await User.findByIdAndRemove({ _id: _id });
    ctx.body = util.success(res.username, `删除成功`);
  } catch (error) {
    ctx.body = util.fail(error, "删除失败");
  }
};

const operateList = async (ctx) => {
  const {
    userId,
    username,
    userEmail,
    password,
    mobile,
    job,
    state,
    roleList,
    deptId,
    action,
  } = ctx.request.body;
  if (action == "add") {
    if (!username || !userEmail || !deptId) {
      ctx.body = util.fail("参数错误", util.CODE.PARAM_ERROR);
      return;
    }
    const res = await User.findOne(
      { $or: [{ username }, { userEmail }] },
      "_id username userEmail"
    );
    if (res) {
      ctx.body = util.fail(
        `系统监测到有重复的用户，信息如下：${res.username} - ${res.userEmail}`
      );
    } else {
      // { new: true }  返回更新后的文档
      const doc = await Counter.findOneAndUpdate(
        { _id: "userId" },
        { $inc: { sequence_value: 1 } },
        { new: true }
      );
      try {
        const user = new User({
          userId: doc.sequence_value,
          username: username,
          password: md5(password),
          userEmail,
          role: 1, // 默认普通用户
          roleList,
          job,
          state,
          deptId,
          mobile,
        });
        user.save();
        ctx.body = util.success(user, "用户创建成功");
      } catch (error) {
        ctx.body = util.fail(error.stack, "用户创建失败");
      }
    }
  } else {
    if (!deptId) {
      ctx.body = util.fail("部门不能为空", util.CODE.PARAM_ERROR);
      return;
    }
    try {
      const res = await User.findOneAndUpdate(
        { userId },
        { mobile, job, state, roleList, deptId }
      );
      ctx.body = util.success(res, "更新成功");
    } catch (error) {
      ctx.body = util.fail(error.stack, "更新失败");
    }
  }
};

const getPermissionList = async (ctx) => {
  const authorization = ctx.request.headers.authorization;
  const { data } = util.decoded(authorization);
  const menuList = await getMenuList(data.role, data.roleList);
  const actionList = getAction(JSON.parse(JSON.stringify(menuList)));
  ctx.body = util.success({ menuList, actionList });
};

/**
 * 获取菜单列表
 * @param {number} userRole 权限等级
 * @param {number} roleKeys 角色
 * @return {Array} 菜单列表
 */
async function getMenuList(userRole, roleKeys) {
  let rootList = [];
  if (userRole == 0) {
    rootList = (await Menu.find({})) || [];
  } else {
    // 根据用户拥有的角色，获取权限列表
    // 现查找用户对应的角色有哪些
    const roleList = await Role.find({ roleName: { $in: roleKeys } });
    let permissionList = [];
    roleList.map((role) => {
      const { checkedKeys, halfCheckedKeys } = role.permissionList;
      permissionList = permissionList.concat([
        ...checkedKeys,
        ...halfCheckedKeys,
      ]);
    });
    permissionList = [...new Set(permissionList)];
    rootList = await Menu.find({ id: { $in: permissionList } });
  }
  return util.getTreeMenu(rootList, null, []);
}

/**
 * 获取菜单列表
 * @param {Array} list 菜单列表
 * @return {Array} 行为列表
 */
function getAction(list) {
  const actionList = [];
  const deep = (arr) => {
    while (arr.length) {
      const item = arr.pop();
      if (item.action) {
        item.action.map((action) => {
          actionList.push(action.menuCode);
        });
      }
      if (item.children && !item.action) {
        deep(item.children);
      }
    }
  };
  deep(list);
  return actionList;
}

module.exports = { login, getList, deleteList, operateList, getPermissionList };
