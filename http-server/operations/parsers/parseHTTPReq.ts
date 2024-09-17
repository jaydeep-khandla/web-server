import { HTTPReq } from "../../types";
import splitLines from "../helpers/splitLines";
import parseRequestLine from "./parseRequestLine";
import HTTPError from "../../error/HTTPError";
import validateHeaderName from "../helpers/validateHeaderName";

function parseHTTPReq(data: Buffer): HTTPReq {
  const lines: Buffer[] = splitLines(data);
  const [method, uri, version] = parseRequestLine(lines[0]);
  const headers: Buffer[] = [];

  for (let i = 1; i < lines.length; i++) {
    const h = Buffer.from(lines[i]);

    if (h.length === 0) {
      continue;
    }

    if (!validateHeaderName(h)) {
      throw new HTTPError(400, "Bad Field");
    }
    headers.push(h);
  }
  // the header ends by an empty line
  console.assert(lines[lines.length - 1].length === 0);
  return {
    method: method,
    uri: uri,
    version: version,
    headers: headers,
  };
}

export default parseHTTPReq;
