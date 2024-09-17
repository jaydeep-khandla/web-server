import { BodyReader } from "../../types";

function readerFromMemory(data: Buffer): BodyReader {
  let done = false;
  return {
    length: data.length,
    read: async (): Promise<Buffer> => {
      if (done) {
        return Buffer.from(""); // no more data
      } else {
        done = true;
        return data;
      }
    },
  };
}

export default readerFromMemory;
