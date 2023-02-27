import http, { Server as HttpServer } from "node:http";
import https from "node:https";
import fs from "node:fs";
import type Koa from "koa";
import colors from "colors";
import { checkPort } from "./port";

let sslOptions = {
  key: fs.readFileSync("./example.key"),
  cert: fs.readFileSync("./example.crt"),
};

export const createServer = (app: Koa) => {
  const httpServer = http.createServer(app.callback());
  const httpsServer = https.createServer(sslOptions, app.callback());

  return {
    listen: async (port: number) => {
      const httpPort = await checkPort(port);
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
