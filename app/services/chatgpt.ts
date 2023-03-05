import type { Middleware } from "koa";
// import { ChatGPTAPI } from "chatgpt";

export const chatgpt: Middleware = async (ctx, next) => {
  console.log(ctx.query.prompt);
  const { prompt } = ctx.query;
  const { ChatGPTAPI } = await import("chatgpt");
  const api = new ChatGPTAPI({
    apiKey: process.env.CHATGPT_API_KEY,
  });

  const res = await api.sendMessage(prompt as string);
  ctx.body = res;
  ctx.type = "application/json";
  ctx.status = 200;
  await next();
};
