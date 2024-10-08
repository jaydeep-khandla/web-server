import { DynBuf, HTTPReq, HTTPRes, TCPConn, BodyReader } from "../types";
import handleReq from "./handleReq";
import soRead from "./soRead";
import cutMessage from "./cutMessage";
import bufPush from "./bufPush";
import writeHTTPResp from "./writeHTTPResp";
import readerFromReq from "./readerFromReq";
import HTTPError from "../error/HTTPError";

/**
 * Serves a client by reading data from the socket and writing it back.
 * @param socket - The socket representing the client connection.
 * @returns A promise that resolves when the client connection is closed.
 */
async function serveClient(conn: TCPConn): Promise<void> {
  const buf: DynBuf = { data: Buffer.alloc(0), length: 0, start: 0 };
  while (true) {
    // try to get 1 request header from the buffer
    const msg: null | HTTPReq = cutMessage(buf);
    if (!msg) {
      // need more data
      const data = await soRead(conn);
      bufPush(buf, data);
      // EOF?
      if (data.length === 0 && buf.length === 0) {
        console.log("EOF");

        return; // no more requests
      }
      if (data.length === 0) {
        throw new HTTPError(400, "Unexpected EOF.");
      }
      // got some data, try it again.
      continue;
    }

    // process the message and send the response
    const reqBody: BodyReader = readerFromReq(conn, buf, msg);
    const res: HTTPRes = await handleReq(msg, reqBody);
    await writeHTTPResp(conn, res);
    // close the connection for HTTP/1.0
    if (msg.version === "1.0") {
      return;
    }
    // make sure that the request body is consumed completely
    while ((await reqBody.read()).length > 0) {
      /* empty */
    }
  } // loop for IO
}

export default serveClient;
