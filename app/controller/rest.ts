import Router from "@koa/router";
import { User } from "@app/model/users";
import { sequelize } from "@vendors/sequelize";

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

rest.post("/users", async (ctx) => {
  const user = new User({
    birthday: (ctx.request.body as User).birthday,
    name: (ctx.request.body as User).name,
  });
  await user.save();
  ctx.body = user;
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
