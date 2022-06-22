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
db.getCollection("users").insert([ {
    _id: "62a3d8abce1e0000900050c2",
    __v: null,
    address: null,
    authInfo: null,
    avatar: null,
    browserInfos: null,
    date: null,
    desc: null,
    email: null,
    gender: null,
    password: "123456",
    passwords: null,
    phone: null,
    "register_time": null,
    role: null,
    status: null,
    "update_time": null,
    username: "admin",
    userno: "admin"
} ]);
