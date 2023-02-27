import { Middleware } from "koa";

const favicon = (path: string): Middleware => {
  return (ctx, next) => {
    if (!path) {
      return next();
    } else {
      console.log("set favicon to ", path);
      return next();
    }
  };
};
export { favicon };
