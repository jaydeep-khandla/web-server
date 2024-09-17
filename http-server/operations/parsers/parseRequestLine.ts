function parseRequestLine(line: Buffer): [string, Buffer, string] {
  // Convert buffer to string
  const lineString = line.toString().trim(); // Trim to remove any extraneous whitespace
  // Split the line into parts based on spaces
  const parts = lineString.split(/\s+/); // Use a regex to handle multiple spaces if any

  // Check if we have exactly three parts
  if (parts.length !== 3) {
    throw new Error(
      "Invalid HTTP request line: Must contain exactly three parts (method, URI, version)"
    );
  }

  // Destructure parts into method, URI, and version
  const [method, uriString, version] = parts;

  const uri = Buffer.from(uriString, "utf-8");

  // Return the parsed components
  return [method, uri, version];
}

export default parseRequestLine;
