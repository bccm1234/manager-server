const util = require("../utils/util");
const Data = require("../models/dataSchema");
const submitData = async (ctx) => {
  try {
    const params = ctx.request.body;
    const res = await Data.create(params);
    ctx.body = util.success(res, `提交成功`);
  } catch (error) {
    ctx.body = util.fail(error, "提交失败");
  }
};
module.exports = { submitData };
