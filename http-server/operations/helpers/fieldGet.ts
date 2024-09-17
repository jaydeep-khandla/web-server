import { HTTPReq } from "../../types";

/**
 * Retrieves the value of a specific HTTP header field.
 * @param headers - Array of headers, where each header is a Buffer.
 * @param fieldName - The name of the field to retrieve, case-insensitive.
 * @returns The value of the field as a Buffer, or undefined if not found.
 */
function fieldGet(headers: Buffer[], fieldName: string): Buffer | undefined {
  // Normalize the field name to lowercase
  const normalizedFieldName = fieldName.toLowerCase();

  // Iterate over headers
  for (const header of headers) {
    // Convert header Buffer to string and split into key and value
    const headerString = header.toString("latin1");
    const [key, value] = headerString.split(":", 2);

    if (key && value) {
      // Normalize key to lowercase for case-insensitive comparison
      if (key.trim().toLowerCase() === normalizedFieldName) {
        // Return the value part as a Buffer
        return Buffer.from(value.trim(), "latin1");
      }
    }
  }

  // Return undefined if the field is not found
  return undefined;
}

export default fieldGet;
