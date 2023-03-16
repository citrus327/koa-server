import Koa from "koa";
import dotenv from "dotenv";
import { HTTP_PORT } from "@config/server";
import { createServer } from "@utils/server";

dotenv.config();

const normalCascading = (app: Koa) => {
  app.use(async function (ctx, next) {
    console.log(">> one");
    await next();
    console.log("<< one");
  });

  app.use(async function (ctx, next) {
    console.log(">> two");
    ctx.body = "two";
    await next();
    console.log("<< two");
  });

  app.use(async function (ctx, next) {
    console.log(">> three");
    await next();
    console.log("<< three");
  });
  app.on("error", (err) => {
    console.error("app error", err);
  });
};

const someReturnTests = (app: Koa) => {
  app.use(async function (ctx, next) {
    console.log(">> one");
    ctx.body = "one";
    await next();
    console.log("<< one");
  });

  app.use(async function (ctx, next) {
    console.log(">> two");
    await next();
    // return await next();
    // return;
    // next();
    console.log("<< two");
  });

  app.use(async function (ctx, next) {
    console.log(">> three");
    await next();
    console.log("<< three");
  });
  app.on("error", (err) => {
    console.error("app error", err);
  });
};

const bootstrap = async () => {
  const app = new Koa();
  // normalCascading(app);
  someReturnTests(app);
  createServer(app).listen(HTTP_PORT);
};

bootstrap();
