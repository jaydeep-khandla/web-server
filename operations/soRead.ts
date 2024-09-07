import { TCPConn } from "../types";

/**
 * Reads data from a TCP connection.
 *
 * @param conn - The TCP connection to read from.
 * @returns A promise that resolves with the read data as a Buffer.
 */
function soRead(conn: TCPConn): Promise<Buffer> {
  console.assert(!conn.reader);
  return new Promise((resolve, reject) => {
    // if the connection is not readable, complete the promise now.
    if (conn.err) {
      reject(conn.err);
      return;
    }
    if (conn.ended) {
      resolve(Buffer.from("")); // EOF
      return;
    }

    conn.reader = { resolve, reject };
    conn.socket.resume();
  });
}

export default soRead;
