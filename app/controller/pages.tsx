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

const handleEntryPath = (subPath: string) =>
  path.join("./", subPath || "./", "./index.html");

const handleAssetsPath = (subPath: string) =>
  path.join(ASSETS_PUBLIC_PATH, subPath || "./");

const defaultRender =
  (subPath: string): Router.Middleware =>
  async (ctx: Koa.Context, next) => {
    await ctx.render(handleEntryPath(subPath), {
      ASSETS_PUBLIC_PATH: handleAssetsPath(subPath),
      data_from_server: ctx.data_from_server,
    });
    await next();
  };

const setup: Router.Middleware = async (ctx, next) => {
  ctx.data_from_server = {
    username: "thisisausername",
    password: "thisisapassword",
  };
  await next();
};

pages
  .use(setup)
  .get("/", defaultRender("./portal"))
  .get("/classic-ssr", defaultRender("./classic-ssr"))
  .get("/site", defaultRender("./site"))
  .get("/stream", async (ctx, next) => {
    const target = handleEntryPath("./stream");
    ctx.type = "text/html";
    ctx.body = fs.createReadStream(path.resolve(path.join(VIEWS_PATH, target)));
    await next();
  })
  .get("/react-stream", async (ctx, next) => {
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
    await render(ctx);
    await next();
  })
  .get("/server-push", defaultRender("./server-push"));

export { pages };
