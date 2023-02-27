import Koa, { Middleware } from "koa";
import mount from "koa-mount";
import { crossOrigin } from "app/middlewares/cross-origin";
import { createServer } from "app/utils/server";
import { staticServe } from "app/middlewares/static";
import { HTTP_PORT } from "config/server";

const app = new Koa();

const defaultMiddleWare: Middleware = async (ctx, next) => {
  console.log("request coming", ctx.path);
  const data = {
    message: "Hello from the server!",
    randomNumber: Math.random(),
  };

  // Set response headers
  ctx.set("Content-Type", "application/json");

  // Set response body
  ctx.body = JSON.stringify(data);

  await next();
};

app.use(crossOrigin);
app.use(staticServe("/site"));
app.use(mount("/api", defaultMiddleWare));

app.on("error", (err) => {
  console.error("app error", err);
});

createServer(app).listen(HTTP_PORT);
