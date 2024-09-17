// cutMessage.ts
import { DynBuf, HTTPReq } from "../types";
import bufPop from "./buffer_operations/bufPop";
import parseHTTPReq from "./parsers/parseHTTPReq";
import HTTPError from "../error/HTTPError";

/**
 * Cuts a message from the dynamic buffer. Messages are separated by '\n'.
 *
 * @param buf - The dynamic buffer containing data.
 * @returns The message as a Buffer or null if the message is not complete.
 */
// the maximum length of an HTTP header
const kMaxHeaderLen = 1024 * 8;

// parse & remove a header from the beginning of the buffer if possible
function cutMessage(buf: DynBuf): null | HTTPReq {
  // the end of the header is marked by '\r\n\r\n'
  const idx = buf.data.subarray(0, buf.length).indexOf("\r\n\r\n");
  if (idx < 0) {
    if (buf.length >= kMaxHeaderLen) {
      throw new HTTPError(413, "header is too large");
    }
    return null; // need more data
  }
  // parse & remove the header
  const msg = parseHTTPReq(buf.data.subarray(0, idx + 4));
  bufPop(buf, idx + 4);
  return msg;
}

export default cutMessage;
