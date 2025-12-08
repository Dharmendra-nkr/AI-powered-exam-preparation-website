const pdf = require("pdf-parse");

export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  try {
    const data = await pdf(buffer);
    // Clean up the text: remove excessive newlines and whitespace
    const cleanText = data.text
      .replace(/\n\s*\n/g, "\n") // Replace multiple newlines with single newline
      .replace(/\s+/g, " ")      // Replace multiple spaces with single space
      .trim();

    if (!cleanText || cleanText.length < 50) {
      throw new Error("PDF content is empty or too short. If this is a scanned document, please use a text-based PDF.");
    }

    return cleanText;
  } catch (error: any) {
    console.error("Error extracting text from PDF:", error);
    throw new Error(`Failed to extract text from PDF: ${error.message || error}`);
  }
}
