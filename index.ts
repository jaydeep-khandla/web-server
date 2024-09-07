import * as net from "net";
import { serveClient } from "./operations";

async function handleConnection(socket: net.Socket) {
  console.log("new connection", socket.remoteAddress, socket.remotePort);
  try {
    await serveClient(socket);
  } catch (exc) {
    console.error("exception:", exc);
  } finally {
    socket.destroy();
  }
}

const server = net.createServer({ pauseOnConnect: true });

server.on("connection", handleConnection);

server.on("error", (err: Error) => {
  throw err;
});

server.listen({ host: "127.0.0.1", port: 3000 }, () =>
  console.log("Server started on port 3000")
);
