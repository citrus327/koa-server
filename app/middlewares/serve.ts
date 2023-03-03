import Router from "@koa/router";
import path from "node:path";
import koaStatic from "koa-static";
import mount from "koa-mount";
import type Koa from "koa";
import views from "koa-views";

const VIEWS_PATH = path.resolve(__dirname, "../../views");

const page = new Router({
  prefix: "/page",
});

page
  .get("/", async (ctx, next) => {
    await ctx.render(path.join("./index.html"));
    return next();
  })
  .get("/:path", async (ctx, next) => {
    await ctx.render(path.join("./", ctx.params.path, "./index.html"));
    return next();
  });

// assets handling with koa-mount; koa-router does not work https://github.com/ZijianHe/koa-router/issues/446
const assets = mount(
  "/assets",
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

const serve = (app: Koa) => {
  return app
    .use(render)
    .use(page.routes())
    .use(page.allowedMethods())
    .use(assets);
};

export { serve };
