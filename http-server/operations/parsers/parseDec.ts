/**
 * Parses a decimal number from a string and returns it as an integer.
 * @param str - The string to parse.
 * @returns The parsed integer value.
 * @throws An error if the string is not a valid decimal number.
 */
function parseDec(str: string): number {
  // Trim any whitespace from the input string
  const trimmedStr = str.trim();

  // Parse the string to an integer
  const result = parseInt(trimmedStr, 10);

  // Check if the result is a valid number and if parsing was successful
  if (isNaN(result) || result < 0) {
    throw new Error("Invalid decimal number.");
  }

  return result;
}

export default parseDec;
