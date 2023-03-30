import { Server } from "socket.io";
import type { Server as HttpsServer } from "node:https";

import type { Middleware } from "koa";

let io: Server = null;

const makeSocketServer = (server: HttpsServer) => {
  if (!io) {
    io = new Server(server, {
      path: "/my-sockets",
    });
    io.on("connection", (socket) => {
      console.log("Somebody connected");

      socket.on("disconnect", () => {
        console.log("Somebody disconnected");
      });

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
  }

  return io;
};

export const sockets =
  (option?: unknown): Middleware =>
  async (ctx, next) => {
    makeSocketServer(ctx.server);
    await next();
  };
