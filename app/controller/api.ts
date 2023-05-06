import { selectByPrimaryKey } from "@app/dao/posts";
import Router from "@koa/router";

const api = new Router({
  prefix: "/api",
});

api
  .get("/", (ctx) => {
    ctx.set("Content-Type", "text/html");
    ctx.body = "<div>this is a html segment from server</div>";
    ctx.status = 200;
    return;
  })
  .get("/db", async (ctx) => {
    const result = await selectByPrimaryKey(21);
    ctx.body = result;
    ctx.status = 200;
    return;
  });

export { api };
