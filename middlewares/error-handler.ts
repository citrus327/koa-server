import type Koa from "koa";
const errorHandler: Koa.Middleware = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = {
      message: err.message,
    };
    // Log the error
    console.error(err);
  }
};

export { errorHandler };
