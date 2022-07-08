const {
    addMaterial,
    findMaterialsAbstract,
    findMaterialDetails,
} = require("../controller/materialsControl");

const router = require("koa-router")();
router.prefix("/materials");

//添加材料数据
router.post("/add", addMaterial);

//查询材料数据,list
router.get("/findAbstracts", findMaterialsAbstract);

//获取材料详细信息
router.get("/findDetails",findMaterialDetails)

module.exports = router;
