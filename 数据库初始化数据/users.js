/*
 Navicat MongoDB Data Transfer

 Source Server         : localhost
 Source Server Type    : MongoDB
 Source Server Version : 50005
 Source Host           : localhost:27017
 Source Schema         : manager

 Target Server Type    : MongoDB
 Target Server Version : 50005
 File Encoding         : 65001

 Date: 18/06/2022 17:04:52
*/

// ----------------------------
// Collection structure for users
// ----------------------------
db.getCollection("users").drop();
db.createCollection("users");

// ----------------------------
// Documents of users
// ----------------------------
db.getCollection("users").insert({
  _id: "62a3d8abce1e0000900050c2",
  address: null,
  authInfo: null,
  avatar: null,
  browserInfos: null,
  date: null,
  desc: null,
  gender: null,
  password: "123456",
  phone: null,
  register_time: null,
  role: 0,
  update_time: null,
  username: "admin",
  userID: "admin",
  deptId: null,
  roleList: [""],
  state: null,
  userEmail: null,
});
