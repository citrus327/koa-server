import { Server, Socket } from "socket.io";
import type { Server as HttpsServer } from "node:https";

import type { Middleware } from "koa";

let io: Server = null;

const createSocketServer = (
  server: HttpsServer,
  onConnection: (socket: Socket) => void
) => {
  if (!io) {
    io = new Server(server, {
      path: "/my-sockets",
    });

    io.on("connection", onConnection);
  }

  return io;
};

export const sockets =
  (option?: unknown): Middleware =>
  async (ctx, next) => {
    createSocketServer(ctx.server, (socket) => {
      console.log("Somebody connected");

      /**
       * 用户发现
       * 用户登出
       * 多种feed的分发、合并、rxjs流处理
       */

      socket.on("disconnect", () => {
        console.log("Somebody disconnected");
      });

      socket.on("active", () => {});

      socket.on("chat message", (msg) => {
        console.log("message: " + msg);

        if (msg === "reload") {
          io.emit("reload");
        } else {
          io.emit("chat message", {
            user: 1,
            message: msg,
          });
        }
      });
    });
    await next();
  };
