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
        "600d4075e218daaf4ec77e52",
        "601ca9a8a794e23c2e42efab",
        "60325425a821c6bb59084545",
        "60325461a821c6bb59084546",
        "600d4075e218daaf4ec77e53",
        "601ca9a8a794e23c2e42ef3c",
        "60325425a821c6bb59084572"
      ],
      "halfCheckedKeys": []
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
    "remark": "系统管理员",
    "__v": 0
  });
