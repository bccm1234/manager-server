const Material = require("../models/materialSchema");
const util = require("../utils/util");
const crud = require("../utils/crud");

//添加数据
const addMaterial = async (ctx) => {
  //获取请求数据
  let obj = ctx.request.body;
  //这里可以对请求数据进行处理
  await crud.add(Material, obj, ctx);
};

//五种查询abstract的方法
const findMaterialsAbstract = async (ctx) => {
  let { formInput } = ctx.request.query;
  let searchArrLength = 0;
  let searchArr = [];
  if (formInput.includes("mp")) {
    // 使用Material ID搜索
    formInput = formInput.replace("mp", "");
    //id搜索
    await crud.findPage(Material, { id: formInput }, ctx);
  } else if (formInput.includes("-")) {
    /**
     * -查询，only
     * Cu-O Cu-O-*
     */
    searchArrLength = formInput.split("-").length;
    searchArr = formInput.replaceAll("*", "").split("-");
    searchArr = searchArr.filter((x) => {
      if (x) return x;
    });
    await crud.findPage(
      Material,
      {
        "abstract.element": {
          $all: searchArr,
          $size: searchArrLength,
        },
      },
      ctx
    );
  } else if (formInput.includes(",")) {
    /**
     * ,查询，at least
     * Cu,O
     */
    searchArr = formInput.split(",");
    await crud.findPage(
      Material,
      {
        "abstract.element": {
          $all: searchArr,
        },
      },
      ctx
    );
  } else {
    /**
     * formula查询
     */
    await crud.findPage(
      Material,
      {
        "abstract.formula": formInput,
      },
      ctx
    );
  }
};

//根据id查询所有信息
const findMaterialDetails = async (ctx) => {
  let { id } = ctx.request.query;
  await crud.find(Material, { id: id }, ctx);
};

module.exports = {
  addMaterial,
  findMaterialsAbstract,
  findMaterialDetails,
};
