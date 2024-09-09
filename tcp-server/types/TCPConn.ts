import * as net from "net";

/**
 * Initializes a TCP connection.
 *
 * @param socket - The net.Socket object representing the socket connection.
 * @returns The TCPConn object representing the initialized TCP connection.
 */
type TCPConn = {
  // the JS socket object
  socket: net.Socket;
  // from the 'error' event
  err?: null | Error;
  // EOF, from the 'end' event
  ended?: boolean;
  // whether the connection is closed
  closed?: boolean;
  // the callbacks of the promise of the current read
  reader?: null | {
    resolve: (value: Buffer) => void;
    reject: (reason: Error) => void;
  };
};

export default TCPConn;
