const util = require("./util");

/**
 * 用于添加的公共方法
 * @param {*} model
 * @param {*} params
 * @param {*} ctx
 * @returns
 */
const add = async (model, params, ctx,msg="添加") => {
  try {
    const res = await model.create(params);
    if(res){
      ctx.body = util.success(res, `${msg}成功`);
    } else {
      ctx.body = util.fail(`${msg}失败`);
    }
  } catch (error) {
    ctx.body = util.fail(`${msg}异常`,500,error);
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
const update = async (model, query, params, ctx,msg="修改") => {
  try {
    const res = await model.updateOne(query, params);
    if (res.modifiedCount > 0) {
      ctx.body = util.success(res, `${msg}成功`);
    } else {
      ctx.body = util.fail(`${msg}失败`,res);
    }
  } catch (error) {
    ctx.body = util.fail(`${msg}异常`,500,error);
  }
};
/**
 * 用于删除的公共方法
 * @param {*} model
 * @param {*} query
 * @param {*} ctx
 * @returns
 */
const del = async (model, query, ctx,msg="删除") => {
  try {
    const res = await model.findOneAndDelete(query);
    if(res){
      ctx.body = util.success(res, `${msg}成功`);
    }else{
      ctx.body = util.fail(`${msg}失败`);
    }
  } catch (error) {
    ctx.body = util.fail(`${msg}异常`,500,error);
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
const find = async (model, query, ctx, projection, sort,msg="查询") => {
  try {
    const res = await model.find(query, projection).sort(sort);
    if(res){
      ctx.body = util.success(res, `${msg}成功`);
    }else{
      ctx.body = util.fail(`${msg}失败`);
    }
  } catch (error) {
    ctx.body = util.fail(`${msg}异常`,500,error);
  }
};
/**
 * 分页查询
 */
const findPage = async (model, query, ctx, projection,sort, msg="分页查询") => {
  const {pageNum,pageSize} = ctx.request.query
  const { page, skipIndex } = util.pager({pageNum,pageSize});
  try {
    const list = await model.find(query,projection).skip(skipIndex).limit(page.pageSize).sort(sort);
    const total = await model.countDocuments(query);
    if(list.length){
      ctx.body = util.success({
        list,
        page: {
          ...page,
          total,
        },
      },`${msg}成功`);
    }else{
      ctx.body = util.fail(`${msg}失败`,40001,{page:{...page,total}});
    }
  } catch (error) {
    ctx.body = util.fail(`${msg}异常`,500,error);
  }
};

/**
 * 查询单个数据
 * @param {*} model
 * @param {*} query
 * @param {*} ctx
 * @returns
 */
const findOne = async (model, query, ctx, msg="单个数据查询") => {
  try {
    const res = await model.findOne(query);
    if(res){
      ctx.body = util.success(res, `${msg}成功`);
    }else {
      ctx.body = util.fail(`${msg}失败`);
    }
  } catch (error) {
    ctx.body = util.fail(`${msg}异常`,500,error);
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
