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

 Date: 18/06/2022 17:04:45
*/


// ----------------------------
// Collection structure for roles
// ----------------------------
db.getCollection("roles").drop();
db.createCollection("roles");

// ----------------------------
// Documents of roles
// ----------------------------
db.getCollection("roles").insert([ {
    _id: ObjectId("62ad94f5ffbeca40244759d1"),
    permissionList: {
        checkedKeys: [ ],
        halfCheckedKeys: [ ]
    },
    updateTime: ISODate("2022-06-18T08:54:04.938Z"),
    createTime: ISODate("2022-06-18T08:54:04.938Z"),
    roleName: "系统管理员",
    remark: "系统管理员",
    __v: NumberInt("0")
} ]);
