import { ASSETS_PUBLIC_PATH, VIEWS_PATH } from "@config/server";
import Router from "@koa/router";
import path from "node:path";
import fs from "node:fs";

const pages = new Router({
  prefix: "/page",
});

const handler: Router.Middleware = async (ctx, next) => {
  const target = path.join("./", ctx.params?.path || "./", "./index.html");
  if (ctx.params?.path === "stream") {
    ctx.type = "text/html";
    ctx.body = fs.createReadStream(path.resolve(path.join(VIEWS_PATH, target)));
    console.log("Sending streaming response...");
  } else {
    await ctx.render(target, {
      ASSETS_PUBLIC_PATH: path.join(
        ASSETS_PUBLIC_PATH,
        ctx.params.path || "./"
      ),
      data_from_server: ctx.data_from_server,
    });
  }

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
