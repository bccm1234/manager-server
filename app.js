const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const body = require("koa-body");
const logger = require("koa-logger");
const log4js = require("./utils/log4j");
const router = require("koa-router")();
const jwt = require("jsonwebtoken");
const koajwt = require("koa-jwt");
const util = require("./utils/util");
const users = require("./routes/users");
const roles = require("./routes/roles");
const data = require("./routes/data");
const path = require("path");
const fs = require("fs");
require("./config/db");

// middlewares
app.use(
  body({
    multipart: true, // 支持文件上传
    formidable: {
      uploadDir: path.join(__dirname, "public/upload/"), // 设置文件上传目录
      keepExtensions: true, // 保持文件的后缀
      onFileBegin: (name, file) => {
        // 无论是多文件还是单文件上传都会重复调用此函数
        // 最终要保存到的文件夹目录
        const dirName = util.formateDate(new Date(), "yyyyMMdd");
        const dir = path.join(__dirname, `public/upload/${dirName}`);
        // 检查文件夹是否存在如果不存在则新建文件夹
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }
        // 文件名称去掉特殊字符但保留原始文件名称
        const fileName = file.originalFilename
          .replaceAll(" ", "_")
          .replace(/[`~!@#$%^&*()|\-=?;:'",<>\{\}\\\/]/gi, "_");
        file.name = fileName;
        // 覆盖文件存放的完整路径(保留原始名称)
        file.filepath = `${dir}/${fileName}`;
      },
    },
  })
);
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

app.use(
  views(__dirname + "/views", {
    extension: "pug",
  })
);

// logger
app.use(async (ctx, next) => {
  log4js.info(`get params:${JSON.stringify(ctx.request.query)}`);
  log4js.info(`post params:${JSON.stringify(ctx.request.body)}`);
  await next().catch((err) => {
    if (err.status == "401") {
      ctx.status = 200;
      ctx.body = util.fail("认证失败", util.CODE.AUTH_ERROR);
    } else {
      throw err;
    }
  });
});

app.use(
  koajwt({ secret: "imooc" }).unless({
    path: [/^\/api\/users\/login/],
  })
);

router.prefix("/api");

router.use(users.routes(), users.allowedMethods());
router.use(roles.routes(), roles.allowedMethods());
router.use(data.routes(), data.allowedMethods());
app.use(router.routes(), router.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  log4js.error(`${err.stack}`);
});

module.exports = app;
