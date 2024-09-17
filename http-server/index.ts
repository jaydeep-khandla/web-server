import * as net from "net";
import { TCPConn, HTTPRes } from "./types";
import { soInit, serveClient } from "./operations";
import readerFromMemory from "./operations/readers/readerFromMemory";
import writeHTTPResp from "./operations/handlers/writeHTTPResp";
import HTTPError from "./error/HTTPError";

async function newConn(socket: net.Socket): Promise<void> {
  const conn: TCPConn = soInit(socket);
  try {
    await serveClient(conn);
  } catch (exc) {
    console.error("exception:", exc);
    if (exc instanceof HTTPError) {
      // intended to send an error response
      const resp: HTTPRes = {
        code: exc.code,
        headers: [],
        body: readerFromMemory(Buffer.from(exc.message + "\n")),
      };
      try {
        await writeHTTPResp(conn, resp);
      } catch (exc) {
        console.error("error while sending error response:", exc);
      }
    }
  } finally {
    socket.destroy();
  }
}

const server = net.createServer({
  pauseOnConnect: true,
  noDelay: true,
});

server.on("connection", newConn);

server.on("error", (err: Error) => {
  throw err;
});

server.listen({ host: "127.0.0.1", port: 3000 }, () =>
  console.log("Server started on port 3000")
);
