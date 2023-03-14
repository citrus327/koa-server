import React from "react";
import { ASSETS_PUBLIC_PATH, VIEWS_PATH } from "@config/server";
import Router from "@koa/router";
import path from "node:path";
import fs from "node:fs";
import { renderToPipeableStream } from "react-dom/server";
import type Koa from "koa";
import { App } from "@views/react-stream/App";

const pages = new Router({
  prefix: "/page",
});

const render = (ctx: Koa.Context) => {
  let didError = false;

  /**
   * NOTE: use promise to force koa waiting for streaming.
   */
  return new Promise<void>((resolve, reject) => {
    const stream = renderToPipeableStream(<App />, {
      bootstrapModules: ["/assets/react-stream/dist.js"],
      onShellReady() {
        ctx.respond = false;
        ctx.res.statusCode = didError ? 500 : 200;
        ctx.response.set("content-type", "text/html");
        stream.pipe(ctx.res);
        ctx.res.end();
        resolve();
      },
      onError() {
        didError = true;
        reject();
      },
    });
  });
};

const handler: Router.Middleware = async (ctx, next) => {
  const target = path.join("./", ctx.params?.path || "./", "./index.html");
  if (ctx.params?.path === "stream") {
    // a regular node.js stream
    ctx.type = "text/html";
    ctx.body = fs.createReadStream(path.resolve(path.join(VIEWS_PATH, target)));
  } else if (ctx.params?.path === "react-stream") {
    // a pipeable stream created by ReactDom
    await render(ctx);
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
