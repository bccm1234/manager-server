/**
 * 数据管理模块
 */

const { submitData } = require("../controller/datacontrol");

const router = require("koa-router")();

router.prefix("/data");

router.post("/submit", submitData);

module.exports = router;
