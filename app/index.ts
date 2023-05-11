import Koa from "koa";
import dotenv from "dotenv";
import { cors } from "@middlewares/cors";
import { renderEngine } from "@middlewares/render-engine";
import { assets } from "@middlewares/assets";
import { errorHandler } from "@middlewares/error-handler";
import { pages } from "@app/controller/pages";
import { rest } from "@app/controller/rest";
import { HTTP_PORT } from "@config/server";
import { createServer } from "@utils/server";
import { sockets } from "@app/controller/sockets";

dotenv.config();

const bootstrap = async () => {
  const app = new Koa();
  app
    .use(renderEngine)
    .use(cors)
    .use(assets)
    .use(sockets())
    .use(pages.routes())
    .use(pages.allowedMethods())
    .use(rest.routes())
    .use(rest.allowedMethods())
    .use(async (ctx, next) => {
      if (ctx.path === "/") {
        ctx.redirect("/page");
      } else {
        await next();
      }
    })
    .use(errorHandler)
    .on("error", (err) => {
      console.error("app error", err);
    });

  createServer(app).listen(HTTP_PORT);
};

bootstrap();
