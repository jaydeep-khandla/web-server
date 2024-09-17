function splitLines(data: Buffer): Buffer[] {
  const lines: Buffer[] = [];
  let start = 0;

  for (let i = 0; i < data.length - 1; i++) {
    if (data[i] === 0x0d && data[i + 1] === 0x0a) {
      // '\r\n'
      lines.push(data.slice(start, i));
      start = i + 2;
      i++; // Skip the '\n' character
    }
  }
  if (start < data.length) {
    lines.push(data.slice(start));
  }
  return lines;
}

export default splitLines;
