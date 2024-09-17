import { HTTPRes } from "../../types";

function encodeHTTPResp(resp: HTTPRes): Buffer {
  // Format the status line
  const statusLine = `HTTP/1.1 ${resp.code} ${getStatusText(resp.code)}\r\n`;

  // Convert headers array (Buffer[]) to a single string with CRLF
  const headersString = resp.headers
    .map((header) => header.toString())
    .join("\r\n");

  // Combine status line, headers, and the empty line separating headers from the body
  const headersSection = `${statusLine}${headersString}\r\n\r\n`;

  // Create a buffer for the headers section
  const headersBuffer = Buffer.from(headersSection);

  // Return the combined buffer
  return headersBuffer;
}

// Helper function to get the reason phrase based on status code
function getStatusText(code: number): string {
  const statusTexts: { [key: number]: string } = {
    200: "OK",
    404: "Not Found",
    500: "Internal Server Error",
    // Add other status codes and their texts as needed
  };

  return statusTexts[code] || "Unknown Status";
}

export default encodeHTTPResp;
