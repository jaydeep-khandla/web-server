import * as net from "net";
import { DynBuf, TCPConn } from "../types";
import soInit from "./soInit";
import soRead from "./soRead";
import soWrite from "./soWrite";
import cutMessage from "./cutMessage";
import bufPush from "./bufPush";

/**
 * Serves a client by reading data from the socket and writing it back.
 * @param socket - The socket representing the client connection.
 * @returns A promise that resolves when the client connection is closed.
 */
async function serveClient(socket: net.Socket): Promise<void> {
  const conn: TCPConn = soInit(socket);
  let buf: DynBuf = { data: Buffer.alloc(0), length: 0, start: 0 };

  while (true) {
    const msg: null | Buffer = cutMessage(buf);

    if (!msg) {
      const data: Buffer = await soRead(conn);
      bufPush(buf, data);

      // EOF?
      if (data.length === 0) {
        // omitted ...
        return;
      }
      continue;
    }

    if (msg.equals(Buffer.from("quit\n"))) {
      await soWrite(conn, Buffer.from("Bye.\n"));
      socket.destroy();
      return;
    } else {
      const reply = Buffer.concat([Buffer.from("Echo: "), msg]);
      await soWrite(conn, reply);
    }
  }
}

export default serveClient;
