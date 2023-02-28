import koaStatic from "koa-static";
import koaMount from "koa-mount";
import path from "node:path";
import fg from "fast-glob";
import type { Middleware } from "koa";
import Mustache from "mustache";
/**
 * serve static file under subpath
 * @param subPath
 * @returns
 */
export const staticServe = (): Middleware[] => {
  const basePath = path.resolve(__dirname, "../../views");
  const list = fg.sync(path.join(basePath, "./**/*.html"));
  const middwares = list.map((o) => {
    return koaMount(
      path.dirname(o).replace(basePath, ""),
      koaStatic(path.dirname(o))
    );
  });

  return middwares;
};
