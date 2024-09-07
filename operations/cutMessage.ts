// cutMessage.ts
import { DynBuf } from "../types";
import bufPop from "./bufPop";

/**
 * Cuts a message from the dynamic buffer. Messages are separated by '\n'.
 *
 * @param buf - The dynamic buffer containing data.
 * @returns The message as a Buffer or null if the message is not complete.
 */
function cutMessage(buf: DynBuf): null | Buffer {
  // Find the newline character in the data
  const data = buf.data.subarray(buf.start, buf.start + buf.length);
  const idx = data.indexOf("\n"); // 0x0A is the ASCII value for '\n'

  if (idx < 0) {
    return null; // Message not complete
  }

  // Extract the message up to and including the newline character
  const msg = Buffer.from(data.subarray(0, idx + 1));

  // Remove the message from the buffer
  bufPop(buf, idx + 1);

  return msg;
}

export default cutMessage;
