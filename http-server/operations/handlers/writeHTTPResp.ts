import { TCPConn, HTTPRes } from "../../types";
import soWrite from "../socket_operations/soWrite";
import encodeHTTPResp from "../helpers/encodeHTTPResp";
import fieldGet from "../helpers/fieldGet";

async function writeHTTPResp(conn: TCPConn, resp: HTTPRes): Promise<void> {
  if (resp.body.length < 0) {
    throw new Error("TODO: chunked encoding");
  }
  // set the "Content-Length" field
  console.assert(!fieldGet(resp.headers, "Content-Length"));
  resp.headers.push(Buffer.from(`Content-Length: ${resp.body.length}`));

  // write the header
  await soWrite(conn, encodeHTTPResp(resp));
  // write the body
  while (true) {
    const data = await resp.body.read();
    if (data.length === 0) {
      break;
    }
    await soWrite(conn, data);
  }
}

export default writeHTTPResp;
