const util = require("./util");

/**
 * 用于添加的公共方法
 * @param {*} model
 * @param {*} params
 * @param {*} ctx
 * @returns
 */
const add = async (model, params, ctx) => {
  try {
    const res = await model.create(params);
    ctx.body = util.success(res, `添加成功`);
  } catch (error) {
    ctx.body = util.fail(error, `添加失败`);
  }
};
/**
 * 用于修改的公共方法
 * @param {*} model
 * @param {*} query
 * @param {*} params
 * @param {*} ctx
 * @returns
 */
const update = async (model, query, params, ctx) => {
  try {
    const res = await model.updateOne(query, params);
    if (res.modifiedCount > 0) {
      ctx.body = util.success(res, `修改成功`);
    } else {
      ctx.body = util.fail(res, `结果不符合预期`);
    }
  } catch (error) {
    ctx.body = util.fail(error, `修改失败`);
  }
};
/**
 * 用于删除的公共方法
 * @param {*} model
 * @param {*} query
 * @param {*} ctx
 * @returns
 */
const del = async (model, query, ctx) => {
  try {
    const res = await model.findOneAndDelete(query);
    ctx.body = util.success(res, `删除成功`);
  } catch (error) {
    ctx.body = util.fail(error, `删除失败`);
  }
};
/**
 * 用于查询的公共方法     ----需要进行return成promise对象
 * ES6新增函数处理  --如果函数只有一个返回值，可以如下return
 * @param {*} model 模型对象
 * @param {*} query 查询条件
 * @param {*} projection 显示指定字段 可省略
 * @param {*} ctx 上下文
 * @returns
 */
const find = async (model, query, projection = null, ctx) => {
  try {
    const res = await model.find(query, projection);
    ctx.body = util.success(res, `查询成功`);
  } catch (error) {
    ctx.body = util.fail(error, `查询失败`);
  }
};
/**
 * 分页查询
 */
const findPage = async (model, query, projection = null, ctx) => {
  const { page, skipIndex } = util.pager(ctx.request.query);
  try {
    const queryResult = model.find(query);
    const list = await queryResult.skip(skipIndex).limit(page.pageSize);
    const total = await model.countDocuments(query);
    ctx.body = util.success({
      list,
      page: {
        ...page,
        total,
      },
    });
  } catch (error) {
    ctx.body = util.fail(error, `分页查询失败`);
  }
};

/**
 * 查询单个数据
 * @param {*} model
 * @param {*} query
 * @param {*} ctx
 * @returns
 */
const findOne = async (model, query, ctx) => {
  try {
    const res = await model.findOne(query);
    ctx.body = util.success(res, `单个数据查询成功`);
  } catch (error) {
    ctx.body = util.fail(error, `单个数据查询失败`);
  }
};

module.exports = {
  add,
  update,
  del,
  find,
  findOne,
  findPage,
};
