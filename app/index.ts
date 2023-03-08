import Koa from "koa";
import dotenv from "dotenv";
import { cors } from "@middlewares/cors";
import { renderEngine } from "@middlewares/render-engine";
import { assets } from "@middlewares/assets";
import { pages } from "@app/controller/pages";
import { api } from "@app/controller/api";
import { HTTP_PORT } from "@config/server";
import { createServer } from "@utils/server";

dotenv.config();

const app = new Koa();
app
  .use(renderEngine)
  .use(cors)
  .use(assets)
  .use(pages.routes())
  .use(pages.allowedMethods())
  .use(api.routes())
  .use(api.allowedMethods())
  .use((ctx) => {
    ctx.status = 200;
    if (!ctx.body) {
      ctx.body = "you are lost";
    }
  })
  .on("error", (err) => {
    console.error("app error", err);
  });

createServer(app).listen(HTTP_PORT);
