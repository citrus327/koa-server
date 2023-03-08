import { ASSETS_PUBLIC_PATH, VIEWS_PATH } from "@config/server";
import Router from "@koa/router";
import path from "node:path";
import fs from "node:fs";
import { vite } from "@middlewares/vite";
import Mustache from "mustache";

const pages = new Router({
  prefix: "/page",
});

const handler: Router.Middleware = async (ctx, next) => {
  const target = path.join("./", ctx.params?.path || "./", "./index.html");
  await ctx.render(target, {
    ASSETS_PUBLIC_PATH: path.join(ASSETS_PUBLIC_PATH, ctx.params.path || "./"),
    data_from_server: ctx.data_from_server,
  });
  await next();
};

pages
  // .use(vite)
  .use(async (ctx, next) => {
    ctx.data_from_server = {
      username: "thisisausername",
      password: "thisisapassword",
    };
    await next();
  })
  // .get("/ssr", async (ctx) => {
  //   console.log("ssr coming in");
  //   const url = ctx.url;

  //   let template = Mustache.render(
  //     fs.readFileSync(path.join(VIEWS_PATH, "./ssr/index.html"), "utf-8"),
  //     {
  //       ASSETS_PUBLIC_PATH: ASSETS_PUBLIC_PATH,
  //       data_from_server: ctx.data_from_server,
  //     }
  //   );
  //   template = await ctx.vite.transformIndexHtml(url, template);
  //   ctx.body = template;
  //   ctx.status = 200;
  //   ctx.type = "text/html";
  //   return;
  // })
  .get("/:path", handler);

export { pages };
