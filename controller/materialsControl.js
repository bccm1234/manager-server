const Material = require("../models/materialSchema");
const Bulks = require("../models/materials/bulkSchema");
const Slabs = require("../models/materials/slabSchema");
const util = require("../utils/util");
const crud = require("../utils/crud");

//添加bulk、slab
const addMaterials = async (ctx) => {
  //获取请求数据
  let obj = ctx.request.body;
  //这里可以对请求数据进行处理
  try {
    if (obj.abs.model === "Bulk") {
      await crud.add(Bulks, obj, ctx, "添加bulk数据");
    } else if (obj.abs.model === "Slab/Surface") {
      await crud.add(Slabs, obj, ctx, "添加bulk数据");
    } else {
      ctx.body = util.fail("传入参数格式不正确", 400);
    }
  } catch {
    ctx.body = util.fail("添加数据时发生异常", 500, error);
  }
};

//分页查询abstract
const findMaterialsAbstracts = async (ctx) => {
  let { model, pageSize = 10, pageNum = 1 } = ctx.request.query;
  try {
    const { bulkObj, slabObj, sortObj, inputStr } = dealParams(ctx);
    if (model === "Bulk") {
      //查询bulk
      await crud.findPage(
        Bulks,
        bulkObj,
        ctx,
        "abs",
        sortObj,
        "bulk分页排序查询"
      );
    } else if (model === "Slab/Surface") {
      //查询slab
      await crud.findPage(
        Slabs,
        slabObj,
        ctx,
        "abs",
        sortObj,
        "slab分页排序查询"
      );
    } else {
      //查询bulk和slab
      await crud.find(Bulks, bulkObj, ctx, "abs", sortObj);
      const bulkList = ctx.body.data;
      await crud.find(Slabs, slabObj, ctx, "abs", sortObj);
      const slabList = ctx.body.data;
      let bothList = [];
      if (sortObj["abs.model"] == "1") {
        bothList = [...bulkList, ...slabList];
      } else if (sortObj["abs.model"] == "-1") {
        bothList = [...slabList, ...bulkList];
      }
      const skipIndex = (pageNum - 1) * pageSize;
      const List = bothList.slice(skipIndex, skipIndex + pageSize);
      if (List.length > 0) {
        ctx.body = util.success(
          {
            List,
            page: {
              pageNum,
              pageSize,
              total: bothList.length,
            },
          },
          "bulk/slab分页排序查询成功"
        );
      } else {
        ctx.body = util.fail("没有查询到数据");
      }
    }
  } catch {
    ctx.body = util.fail("分页查询数据时发生异常", 500, error);
  }
};
//处理参数
const dealParams = function (ctx) {
  let { Input, crystalSystem, spaceGroup, millerIndice, termination, sort } =
    ctx.request.query;
  if (sort) sort = JSON.parse(sort);
  if (!sort) sort = [1, 1, 1, 1, 1, 1, 1];
  let inputObj = {};
  let inputArr = [];
  let inputArrLength = 0;
  //处理Input
  if (Input.includes("mB" || "mS")) {
    // mB-1/mS-1
    inputObj["abs.id"] = Input;
  } else if (Input.includes("-")) {
    //Cu-O,Cu-O-*
    inputArrLength = Input.split("-").length;
    inputArr = Input.replaceAll("*", "").split("-");
    inputArr = inputArr.filter((x) => {
      if (x) return x;
    });
    inputObj["abs.atom"] = {
      $all: inputArr,
      $size: inputArrLength,
    };
  } else if (Input.includes(",")) {
    //Cu,O
    inputArr = Input.split(",");
    inputObj["abs.atom"] = {
      $all: inputArr,
    };
  } else {
    /**
     * formula查询
     */
    inputObj["abs.substance"] = Input;
  }
  //处理filters
  //bulk
  let bulk = {
    "abs.crystalSystem": crystalSystem,
    "abs.spaceGroup": spaceGroup,
  };
  let inputStr = JSON.stringify(inputObj);
  let bulkObj = JSON.parse(JSON.stringify(inputObj));
  for (i in bulk) {
    if (bulk[i]) {
      bulkObj[i] = bulk[i];
    }
  }
  //slab
  let slab = {
    "abs.millerIndice": millerIndice,
    "abs.termination": termination,
  };
  let slabObj = JSON.parse(JSON.stringify(inputObj));
  for (i in slab) {
    if (slab[i]) {
      slabObj[i] = slab[i];
    }
  }
  //处理sort
  let sortObj = {
    "abs.id": sort[0],
    "abs.model": sort[1],
    "abs.substance": sort[2],
    "abs.crystalSystem": sort[3],
    "abs.spaceGroup": sort[4],
    "abs.millerIndice": sort[5],
    "abs.termination": sort[6],
  };
  return { bulkObj, slabObj, sortObj, inputStr };
};

//根据id查询所有信息
const findMaterialDetails = async (ctx) => {
  let { id } = ctx.request.query;
  try {
    if (id.includes("mB")) {
      await crud.findOne(Bulks, { "abs.id": id }, ctx, "bulk-id查询");
    } else if (id.includes("mS")) {
      await crud.findOne(Slabs, { "abs.id": id }, ctx, "slab-id查询");
    } else {
      ctx.body = util.fail("传入参数格式不正确", 400);
    }
  } catch {
    ctx.body = util.fail("id查询数据发生异常", 500, error);
  }
};

module.exports = {
  addMaterials,
  findMaterialsAbstracts,
  findMaterialDetails,
};
