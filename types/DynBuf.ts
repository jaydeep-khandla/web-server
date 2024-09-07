/**
 * Represents a dynamic buffer.
 *
 * @typedef {object} DynBuf
 * @property {Buffer} data - The buffer data.
 * @property {number} length - The length of the data.
 */
type DynBuf = {
  // the buffer data
  data: Buffer;
  // length of the data
  length: number;
  // the index where the data starts
  start: number;
};

export default DynBuf;
