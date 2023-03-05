import Router from "@koa/router";
import path from "node:path";
import koaStatic from "koa-static";
import mount from "koa-mount";
import views from "koa-views";
import type Koa from "koa";
import { ASSETS_PUBLIC_PATH, VIEWS_PATH } from "config/server";

// assets handling with koa-mount; koa-router does not work https://github.com/ZijianHe/koa-router/issues/446
const assets = mount(
  ASSETS_PUBLIC_PATH,
  koaStatic(VIEWS_PATH, {
    extensions: ["js"],
  })
);

const render = views(VIEWS_PATH, {
  extension: "html",
  map: {
    html: "mustache",
  },
});

const page = new Router({
  prefix: "/page",
});

page
  .get("/", async (ctx, next) => {
    await ctx.render(path.join("./index.html"), {
      ASSETS_PUBLIC_PATH: ASSETS_PUBLIC_PATH,
    });
    return next();
  })
  .get("/:path", async (ctx, next) => {
    await ctx.render(path.join("./", ctx.params.path, "./index.html"), {
      ASSETS_PUBLIC_PATH: path.join(ASSETS_PUBLIC_PATH, ctx.params.path),
    });
    return next();
  });

const serve = (app: Koa) => {
  return app
    .use(render)
    .use(page.routes())
    .use(page.allowedMethods())
    .use(assets);
};

export { serve };
