import Koa from "koa";
import { crossOrigin } from "app/middlewares/cross-origin";
import { serve } from "app/middlewares/serve";
import { createServer } from "app/utils/server";
import { HTTP_PORT } from "config/server";
import Router from "@koa/router";

const app = new Koa();

const api = new Router({
  prefix: "/api",
});

api.get("/(.*)", (ctx, next) => {
  const data = {
    message: "Hello from the server!",
    randomNumber: Math.random(),
  };
  ctx.set("Content-Type", "application/json");
  ctx.body = JSON.stringify(data);
  next();
});

serve(app)
  .use(crossOrigin)
  .use(api.routes())
  .use(api.allowedMethods())
  .on("error", (err) => {
    console.error("app error", err);
  });

createServer(app).listen(HTTP_PORT);
