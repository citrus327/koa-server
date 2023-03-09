import { createServer as createViteServer, ViteDevServer } from "vite";
import connect from "koa-connect";
import inspect from "vite-plugin-inspect";

let instance: ViteDevServer = null;

export const getViteInstance = async () => {
  if (!instance) {
    instance = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
      plugins: [inspect()],
    });
  }
  return instance;
};

export const vite = async () => {
  const _vite = await getViteInstance();
  return connect(_vite.middlewares);
};
