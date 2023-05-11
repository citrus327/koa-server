import Router from "@koa/router";

const rest = new Router({
  prefix: "/rest",
});

rest.get("/users", async (ctx) => {
  ctx.body = "hello";
  ctx.status = 200;
  return;
});

rest.get("/users/:id", async (ctx) => {
  ctx.body = "hello";
  ctx.status = 200;
  return;
});

rest.post("/users/:id", async (ctx) => {
  ctx.body = "hello";
  ctx.status = 200;
  return;
});

rest.delete("/users/:id", async (ctx) => {
  ctx.body = "hello";
  ctx.status = 200;
  return;
});

export { rest };
