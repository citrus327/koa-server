import Koa from "koa";
import { createServer } from "./server";
const app = new Koa();

createServer(app).listen();

app.use(async (ctx) => {
  ctx.body = "Hello World";
});

app.on("error", (err) => {
  console.error("app error", err);
});
