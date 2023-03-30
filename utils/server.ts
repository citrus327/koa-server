// import http, { Server } from "node:http";
import https from "node:https";
import fs from "node:fs";
import type Koa from "koa";
import colors from "colors";
import { checkPort } from "@utils/port";

let sslOptions = {
  key: fs.readFileSync("./example.key"),
  cert: fs.readFileSync("./example.crt"),
};

export const createServer = (app: Koa) => {
  // const httpServer = http.createServer(app.callback());
  const httpsServer = https.createServer(sslOptions, app.callback());
  app.context.server = httpsServer;
  return {
    listen: async (port: number) => {
      // const httpPort = await checkPort(port);
      const httpsPort = await checkPort(port);
      // httpServer.listen(httpPort, () => {
      //   console.log(`http: ${colors.green(`http://localhost:${httpPort}`)}`);
      // });
      httpsServer.listen(httpsPort, () => {
        console.log(`https: ${colors.green(`https://localhost:${httpsPort}`)}`);
      });
    },
  };
};
