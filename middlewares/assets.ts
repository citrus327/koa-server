// assets handling with koa-mount; koa-router does not work https://github.com/ZijianHe/koa-router/issues/446
import koaStatic from "koa-static";
import mount from "koa-mount";
import { ASSETS_PUBLIC_PATH, VIEWS_PATH } from "@config/server";

const assets = mount(
  ASSETS_PUBLIC_PATH,
  koaStatic(VIEWS_PATH, {
    extensions: ["js"],
  })
);

export { assets };
