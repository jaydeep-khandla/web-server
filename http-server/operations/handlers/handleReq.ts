import { HTTPReq, HTTPRes, BodyReader } from "../../types";
import readerFromMemory from "../readers/readerFromMemory";

async function handleReq(req: HTTPReq, body: BodyReader): Promise<HTTPRes> {
  // act on the request URI
  let resp: BodyReader;
  switch (req.uri.toString("latin1")) {
    case "/echo":
      // http echo server
      resp = body;
      break;
    default:
      resp = readerFromMemory(Buffer.from("hello world.\n"));
      break;
  }
  return {
    code: 200,
    headers: [Buffer.from("Server: my_first_http_server")],
    body: resp,
  };
}

export default handleReq;
