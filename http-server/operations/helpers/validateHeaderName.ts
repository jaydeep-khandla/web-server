import { log } from "console";

/**
 * Validates if a given Buffer represents a valid HTTP header name according to RFC 7230.
 * @param headerBuffer - The Buffer containing the header line.
 * @returns True if the header name is invalid; otherwise, false.
 */
function validateHeaderName(headerBuffer: Buffer): boolean {
  // Convert Buffer to string
  const headerString = headerBuffer.toString("latin1").trim();

  // Split the header line into name and value based on the first colon
  const [name, _] = headerString.split(":", 2);

  // Validate the header name
  // Header names must be non-empty and must only contain printable ASCII characters
  // excluding control characters and the DEL character.
  const isValidName =
    /^[\x21\x23-\x27\x2A-\x2B\x2D-\x2E\x30-\x39\x41-\x5A\x5E-\x7A\x7C-\x7E]+$/.test(
      name
    );

  // Check if the name is valid and non-empty
  return isValidName || name.length !== 0;
}

export default validateHeaderName;
