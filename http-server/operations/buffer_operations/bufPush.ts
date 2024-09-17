import { DynBuf } from "../../types";

/**
 * Pushes a buffer to the end of a dynamic buffer.
 *
 * @param buf - The dynamic buffer to push to.
 * @param data - The buffer to push.
 */
function bufPush(buf: DynBuf, data: Buffer): void {
  const newLen = buf.length + data.length;

  if (buf.data.length < newLen + buf.start) {
    let cap = Math.max(buf.data.length, 32);

    while (cap < newLen + buf.start) {
      cap *= 2;
    }

    const grown = Buffer.alloc(cap);
    buf.data.copy(grown, 0, buf.start, buf.start + buf.length);
    buf.data = grown;
    buf.start = 0;
  }

  data.copy(buf.data, buf.start + buf.length);
  buf.length = newLen;
}

export default bufPush;
