import { DynBuf } from "../../types";

/**
 * Removes `len` bytes from the start of a dynamic buffer.
 *
 * @param buf - The dynamic buffer to remove bytes from.
 * @param len - The number of bytes to remove.
 */

function bufPop(buf: DynBuf, len: number): void {
  buf.length -= len;
  buf.start += len;

  const threshold: number = buf.data.length / 2;

  if (buf.start > threshold) {
    buf.data.copyWithin(0, buf.start, buf.start + buf.length);
    buf.start = 0;
  }
}

export default bufPop;
