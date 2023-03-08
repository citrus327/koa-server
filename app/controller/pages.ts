import { ASSETS_PUBLIC_PATH } from "@config/server";
import Router from "@koa/router";
import path from "node:path";

const pages = new Router({
  prefix: "/page",
});

const handler: Router.Middleware = async (ctx, next) => {
  const target = path.join("./", ctx.params?.path || "./", "./index.html");
  await ctx.render(target, {
    ASSETS_PUBLIC_PATH: ASSETS_PUBLIC_PATH,
    data_from_server: ctx.data_from_server,
  });
  await next();
};

pages
  .use(async (ctx, next) => {
    ctx.data_from_server = {
      username: "thisisausername",
      password: "thisisapassword",
    };
    await next();
  })
  .get("/:path", handler);

export { pages };
