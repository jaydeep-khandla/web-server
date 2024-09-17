import { TCPConn } from "../../types";

/**
 * Writes data to a TCP connection.
 *
 * @param conn - The TCP connection to write data to.
 * @param data - The data to be written.
 * @returns A promise that resolves when the data has been written successfully, or rejects with an error if writing fails.
 */
function soWrite(conn: TCPConn, data: Buffer): Promise<void> {
  console.assert(data.length > 0);
  return new Promise((resolve, reject) => {
    if (conn.err) {
      reject(conn.err);
      return;
    }

    conn.socket.write(data, (err?: Error) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export default soWrite;
