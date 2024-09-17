import { TCPConn, DynBuf, HTTPReq, BodyReader } from "../../types";
import readerFromConnLength from "./readerFromConnLength";
import fieldGet from "../helpers/fieldGet";
import parseDec from "../parsers/parseDec";
import HTTPError from "../../error/HTTPError";

function readerFromReq(conn: TCPConn, buf: DynBuf, req: HTTPReq): BodyReader {
  let bodyLen = -1;
  const contentLen = fieldGet(req.headers, "Content-Length");
  if (contentLen) {
    bodyLen = parseDec(contentLen.toString("latin1"));
    if (isNaN(bodyLen)) {
      throw new HTTPError(400, "bad Content-Length.");
    }
  }
  const bodyAllowed = !(req.method === "GET" || req.method === "HEAD");
  const chunked =
    fieldGet(req.headers, "Transfer-Encoding")?.equals(
      Buffer.from("chunked")
    ) || false;
  if (!bodyAllowed && (bodyLen > 0 || chunked)) {
    throw new HTTPError(400, "HTTP body not allowed.");
  }
  if (!bodyAllowed) {
    bodyLen = 0;
  }
  if (bodyLen >= 0) {
    // "Content-Length" is present
    return readerFromConnLength(conn, buf, bodyLen);
  } else if (chunked) {
    // chunked encoding
    throw new HTTPError(501, "TODO");
  } else {
    // read the rest of the connection
    throw new HTTPError(501, "TODO");
  }
}

export default readerFromReq;
