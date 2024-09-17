class HTTPError extends Error {
  public readonly code: number;

  /**
   * Creates an instance of HTTPError.
   * @param code - The HTTP status code associated with the error.
   * @param message - A descriptive error message.
   */
  constructor(code: number, message: string) {
    super(message); // Call the parent class constructor with the error message
    this.code = code; // Set the HTTP status code
    this.name = "HTTPError"; // Set the name of the error to HTTPError

    // Ensure the stack trace is correctly captured (for debugging)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HTTPError);
    }
  }
}

export default HTTPError;
