import { TCPConn, DynBuf, BodyReader } from "../../types";
import soRead from "../socket_operations/soRead";
import bufPush from "../buffer_operations/bufPush";
import bufPop from "../buffer_operations/bufPop";

// BodyReader from a socket with a known length
function readerFromConnLength(
  conn: TCPConn,
  buf: DynBuf,
  remain: number
): BodyReader {
  return {
    length: remain,
    read: async (): Promise<Buffer> => {
      if (remain === 0) {
        return Buffer.from(""); // done
      }
      if (buf.length === 0) {
        // try to get some data if there is none
        const data = await soRead(conn);
        bufPush(buf, data);
        if (data.length === 0) {
          // expect more data!
          throw new Error("Unexpected EOF from HTTP body");
        }
      }
      // consume data from the buffer
      const consume = Math.min(buf.length, remain);
      remain -= consume;
      const data = Buffer.from(buf.data.subarray(0, consume));
      bufPop(buf, consume);
      return data;
    },
  };
}

export default readerFromConnLength;
