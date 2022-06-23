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
db.getCollection("roles").insert({
  "_id": {
    "$oid": "62ad94f5ffbeca40244759d1"
  },
  "permissionList": {
    "checkedKeys": [
      "1-1-1",
      "1-1-2",
      "2-1-1"
    ],
    "halfCheckedKeys": [
      "1",
      "1-1",
      "2",
      "2-1"
    ]
  },
  "updateTime": {
    "$date": {
      "$numberLong": "1655542444938"
    }
  },
  "createTime": {
    "$date": {
      "$numberLong": "1655542444938"
    }
  },
  "roleName": "系统管理员",
  "remark": "系统管理员"
});
