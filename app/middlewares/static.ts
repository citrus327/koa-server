import koaStatic from "koa-static";
import koaMount from "koa-mount";
import path from "node:path";

export const staticServe = (subPath: string) => {
  return koaMount(
    subPath,
    koaStatic(path.resolve(__dirname, "../../public"), {
      defer: true,
    })
  );
};
