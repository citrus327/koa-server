import net from "node:net";

export const checkPort = (port: number): Promise<number> => {
  return new Promise((resolve) => {
    const server = net
      .createServer()
      .once("error", (err: NodeJS.ErrnoException) => {
        if (err.code === "EADDRINUSE") {
          console.log(
            `Port ${port} is already in use, choosing next available port`
          );
          resolve(checkPort(port + 1));
        }
      })
      .once("listening", () => {
        server.close();
        resolve(port);
      })
      .listen(port);
  });
};

// export function checkPort(port: number) {
//   return new Promise((resolve, reject) => {
//     const server = net.createServer();

//     server.once("error", (err: NodeJS.ErrnoException) => {
//       if (err.code === "EADDRINUSE") {
//         resolve(checkPort(port + 1));
//       } else {
//         reject(err);
//       }
//     });

//     server.once("listening", () => {
//       server.close();
//       resolve(port);
//     });

//     server.listen(port);
//   });
// }
