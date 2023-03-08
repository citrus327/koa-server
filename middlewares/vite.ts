import { createServer as createViteServer, ViteDevServer } from "vite";
import connect from "koa-connect";
import inspect from "vite-plugin-inspect";
import { Middleware } from "koa";

export const vite: Middleware = async (ctx, next) => {
  const _vite = await createViteServer({
    server: { middlewareMode: true, strictPort: true },
    appType: "custom",
    plugins: [inspect()],
  });

  ctx.vite = _vite;
  await connect(_vite.middlewares)(ctx, next);
};
