import http, { Server as HttpServer } from "node:http";
import https, { Server as HttpsServer } from "node:https";
import net from "node:net";
import fs from "node:fs";
import type Koa from "koa";
import { HTTPS_PORT, HTTP_PORT } from "config/server";
import colors from "colors";
import { checkPort } from "./port";

let sslOptions = {
  key: fs.readFileSync("./example.key"),
  cert: fs.readFileSync("./example.crt"),
};

const errorHandler = (
  err: NodeJS.ErrnoException,
  server: HttpServer | HttpsServer
) => {
  if (err.code === "EADDRINUSE") {
    console.log("**************");
    server.listen(0);
  }
};

export const createServer = (app: Koa) => {
  const httpServer = http.createServer(app.callback());
  const httpsServer = https.createServer(sslOptions, app.callback());

  httpServer.on("error", (err) => errorHandler(err, httpServer));
  httpsServer.on("error", (err) => errorHandler(err, httpsServer));

  return {
    listen: async () => {
      const httpPort = await checkPort(HTTP_PORT);
      const httpsPort = await checkPort(httpPort + 1);
      httpServer.listen(httpPort, () => {
        console.log(`http: ${colors.green(`http://localhost:${httpPort}`)}`);
      });
      httpsServer.listen(httpsPort, () => {
        console.log(`https: ${colors.green(`https://localhost:${httpsPort}`)}`);
      });
    },
  };
};
