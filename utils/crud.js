/**
 * 用于添加的公共方法
 * @param {*} model
 * @param {*} params
 * @param {*} ctx
 * @param {*} msg  ---可省略
 * @returns
 */
const add = (model, params, ctx, msg) =>
    model
        .create(params)
        .then((rel) => {
            //判断rel是添加成功了还是失败了
            if (rel) {
                ctx.body = {
                    code: 200,
                    msg: msg + "成功",
                    data: rel,
                };
            } else {
                ctx.body = {
                    code: 300,
                    msg: msg + "失败",
                };
            }
        })
        //捕获异常
        .catch((err) => {
            ctx.body = {
                code: 500,
                msg: msg + "时出现异常",
            };
            console.error(err);
        });

/**
 * 用于修改的公共方法
 * @param {*} model
 * @param {*} where
 * @param {*} params
 * @param {*} ctx
 * @returns
 */
const update = (model, where, params, ctx, msg) =>
    model
        .updateOne(where, params)
        .then((rel) => {
            if (rel.modifiedCount > 0) {
                ctx.body = {
                    code: 200,
                    msg:msg + "成功",
                };
            } else {
                ctx.body = {
                    code: 300,
                    msg: msg + "失败",
                };
            }
        })
        .catch((err) => {
            ctx.body = {
                code: 500,
                msg: msg + "时出现异常",
                err,
            };
        });

/**
 * 用于删除的公共方法
 * @param {*} model
 * @param {*} where
 * @param {*} ctx
 * @returns
 */
const del = (model, where, ctx, msg) =>
    model
        .findOneAndDelete(where)
        .then((rel) => {
            //判断rel是添加成功了还是失败了
            if (rel) {
                ctx.body = {
                    code: 200,
                    msg: msg + "成功",
                    data: rel,
                    //通常删除内容会放在回收站，以备用
                };
            } else {
                ctx.body = {
                    code: 300,
                    msg: msg + "失败",
                };
            }
        })
        //捕获异常
        .catch((err) => {
            ctx.body = {
                code: 500,
                msg: msg + "时出现异常",
            };
            console.error(err);
        });

/**
 * 用于查询的公共方法     ----需要进行return成promise对象
 * ES6新增函数处理  --如果函数只有一个返回值，可以如下return
 * @param {*} model 模型对象
 * @param {*} where 查询条件
 * @param {*} ctx 上下文
 * @param {*} content 显示指定字段 可省略
 * @returns
 */
const find = (model, where, ctx, msg,content) =>
    model
        .find(where,content)
        .then((rel) => {
            if (rel.length) {
                ctx.body = {
                    code: 200,
                    msg: msg + "成功",
                    data: rel,
                };
            } else {
                ctx.body = {
                    code: 300,
                    msg: msg + "失败",
                };
            }
        })
        //捕获异常
        .catch((err) => {
            ctx.body = {
                code: 500,
                msg: msg + "时出现异常",
            };
            console.error(err);
        });

/**
 * 分页查询
 */
 const findPage = async (model,page,pageSize,where,ctx,msg,content) => {

    //判断页码
    if(!page || isNaN(Number(page))){
        page = 1
    }else {
        page = Number(page)
    }

    //计算总页数
    let count = 0
    await model.find(where).countDocuments().then(rel=>{
        count = rel
    })
    let totalPage = 0
    if(count > 0){
        totalPage = Math.ceil(count / pageSize)
    }

    //判断当前页码的范围
    if(totalPage > 0 && page > totalPage){
        page = totalPage
    }else if(page < 1){
        page = 1
    }

    //计算起始位置
    let start = (page - 1)*pageSize

    pageSize = Number(pageSize)
    

    await model.find(where,content).skip(start).limit(pageSize).then(rel=>{
        if(rel && rel.length > 0){
            ctx.body = {
                code: 200,
                msg: msg+'成功',
                result: rel,
                page,
                pageSize,
                count
            }
        }else{
            ctx.body = {
                code: 300,
                msg: msg+"失败",
            }
        }
    }).catch(err=>{
        ctx.body = {
            code: 500,
            msg: msg+'出现异常',
            err
        }
    })
}

/**
 * 查询单个数据
 * @param {*} model
 * @param {*} where
 * @param {*} ctx
 * @returns
 */
const findOne = (model, where, ctx, msg) =>
    model
        .findOne(where)
        .then((rel) => {
            if (rel) {
                ctx.body = {
                    code: 200,
                    msg: msg + "成功",
                    data: rel,
                };
            } else {
                ctx.body = {
                    code: 300,
                    msg: msg + "失败",
                };
            }
        })
        //捕获异常
        .catch((err) => {
            ctx.body = {
                code: 500,
                msg: msg + "时出现异常",
            };
            console.error(err);
        });

module.exports = {
    add,
    update,
    del,
    find,
    findOne,
    findPage
};
