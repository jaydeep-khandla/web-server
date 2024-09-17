import BodyReader from "./BodyReader";

type HTTPRes = {
  code: number;
  headers: Buffer[];
  body: BodyReader;
};

export default HTTPRes;
