type HTTPReq = {
  method: string;
  uri: Buffer;
  version: string;
  headers: Buffer[];
};

export default HTTPReq;
