const mongoose = require("mongoose");
const dataSchema = mongoose.Schema({
  formula: String, // 化学式
  a: Number,
  b: Number,
  c: Number,
  α: Number,
  β: Number,
  γ: Number,
  volume: Number, // 体积
  "band gap": Number, // 带隙
  "crystal system": String, // 晶系
  "space group": String, // 空间群
  "formation energy": Number, // 形成能
});

module.exports = mongoose.model("data", dataSchema, "data");
