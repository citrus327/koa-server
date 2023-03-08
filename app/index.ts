import Koa from "koa";
import Router from "@koa/router";
import dotenv from "dotenv";
import { crossOrigin } from "@middlewares/cross-origin";
import { serve } from "@middlewares/serve";
import { createServer } from "@utils/server";
import { HTTP_PORT } from "@config/server";
dotenv.config();

const app = new Koa();

const api = new Router({
  prefix: "/api",
});

api
  .get("/", (ctx) => {
    ctx.set("Content-Type", "text/html");
    ctx.body = "<div>this is a html segment from server</div>";
    ctx.status = 200;
    return;
  })
  .get("/html", (ctx) => {
    ctx.set("Content-Type", "text/html");
    ctx.body = "<div>this is a html segment from server</div>";
    ctx.status = 200;
    return;
  });

serve(app)
  .use(crossOrigin)
  .use(api.routes())
  .use(api.allowedMethods())
  .use((ctx) => {
    ctx.status = 200;
  })
  .on("error", (err) => {
    console.error("app error", err);
  });

createServer(app).listen(HTTP_PORT);
