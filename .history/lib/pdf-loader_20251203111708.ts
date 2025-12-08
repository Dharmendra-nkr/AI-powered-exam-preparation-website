const pdf = require("pdf-parse");

export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  try {
    const data = await pdf(buffer);
    // Clean up the text: remove excessive newlines and whitespace
    const cleanText = data.text
      .replace(/\n\s*\n/g, "\n") // Replace multiple newlines with single newline
      .replace(/\s+/g, " ")      // Replace multiple spaces with single space
      .trim();
    return cleanText;
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    throw new Error("Failed to extract text from PDF");
  }
}
