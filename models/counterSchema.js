/**
 * 维护用户ID自增长表
 */
const mongoose = require("mongoose");
const counterSchema = mongoose.Schema({
  _id: String,
  sequence_value: Number,
});

module.exports = mongoose.model("counter", counterSchema, "counter");
