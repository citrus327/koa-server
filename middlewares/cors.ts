import { Middleware } from "koa";

export const cors: Middleware = async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  ctx.set("Access-Control-Allow-Headers", "Content-Type, X-Custom-Header");

  if (ctx.method === "OPTIONS") {
    ctx.status = 204;
    return;
  }

  await next();
};
