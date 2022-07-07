const Material = require("../models/materialSchema");
const util = require("../utils/util");
const crud = require("../utils/crud");

//添加数据
const addMaterial = async (ctx) => {
    //获取请求数据
    let obj = ctx.request.body;
    //这里可以对请求数据进行处理
    await crud.add(Material, obj, ctx, "添加材料信息");
};

//五种查询abstract的方法
const findMaterialsAbstract = async (ctx) => {
    let { formInput, page, pageSize } = ctx.request.query;
    let searchArrLenrth = 0;
    let searchArr = [];
    if (formInput.includes("mp")) {
        // 使用Material ID搜索
        formInput = formInput.replace("mp", "");
        //id搜索
        await crud.findPage(
            Material,
            page,
            pageSize,
            { id: formInput },
            ctx,
            "id查询材料",
            "abstract id"
        );
    } else if (formInput.includes("-") && formInput.includes("*")) {
        /**
         * 半模糊查询
         * O-*-*
         */
        searchArrLenrth = formInput.split("-").length;
        searchArr = formInput.replaceAll("-*", "").split("-");
        await crud.findPage(
            Material,
            page,
            pageSize,
            {
                "abstract.element": {
                    $all: searchArr,
                    $size: searchArrLenrth,
                },
            },
            ctx,
            "半模糊查询材料",
            "abstract id"
        );
    } else if (formInput.includes("-")) {
        // 使用-查询
        searchArr = formInput.split("-");
        await crud.findPage(
            Material,
            page,
            pageSize,
            { "abstract.element": { $all: searchArr } },
            ctx,
            "-查询材料",
            "abstract id"
        );
    } else if (formInput.includes("*")) {
        // 使用模糊查询
        //待优化  例如*Al 和Al*
        let formArr = formInput.split("");
        let formString = formArr[0];
        //匹配大写字母在前边插入"," 跳过第一个大写字母
        for (let i = 1; i < formArr.length; i++) {
            if (formArr[i].match(/[A-Z*]/)) {
                formString = formString + "," + formArr[i];
            } else {
                formString = formString + formArr[i];
            }
        }
        //去掉首尾逗号（主要是去掉首逗号）
        formInput = formString.replace(/^(\s|,)+|(\s|,)+$/g, "");
        newArr = formInput.split(",");
        searchArrLenrth = newArr.length;
        //获取原子数数组
        let numArr = [];
        for (let i = 0; i < newArr.length; i++) {
            if (newArr[i].match(/[0-9]/)) {
                const num = Number(newArr[i].replace(/[^0-9]/g, ""));
                numArr.push(num);
            } else {
                numArr.push(1);
            }
        }
        searchArr = formInput
            .replaceAll(",*", "")
            .replace(/[0-9]/g, "")
            .split(",");
        await crud.findPage(
            Material,
            page,
            pageSize,
            {
                "abstract.element": {
                    $all: searchArr,
                },
                "abstract.elementnum": numArr,
            },
            ctx,
            "模糊查询材料",
            "abstract id"
        );
    } else if (formInput.includes(",")) {
        /**
         * ,查询，at least
         * Cu,O
         */
        searchArr = formInput.split(",");
        await crud.findPage(
            Material,
            page,
            pageSize,
            {
                "abstract.element": {
                    $all: searchArr,
                },
            },
            ctx,
            "at least查询材料",
            "abstract id"
        );
    } else {
        /**
         * formula查询
         */
        await crud.findPage(
            Material,
            page,
            pageSize,
            {
                "abstract.formula": formInput,
            },
            ctx,
            "分子式查询材料",
            "abstract id"
        );
    }
};

//根据id查询所有信息
const findMaterialDetails = async (ctx) => {
    let { id } = ctx.request.query;
    console.log(id);
    await crud.find(Material, { id: id }, ctx, "查询材料详细信息");
};

module.exports = {
    addMaterial,
    findMaterialsAbstract,
    findMaterialDetails,
};
