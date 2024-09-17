type BodyReader = {
  // the 'Content-Length', or -1 if not present
  length: number;
  // read data. returns an empty buffer after EOF.
  read: () => Promise<Buffer>;
};

export default BodyReader;
