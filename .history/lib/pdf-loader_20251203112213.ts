export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  try {
    let pdfParser = require("pdf-parse");
    // Handle ES Module default export if necessary
    if (typeof pdfParser !== "function" && pdfParser.default) {
      pdfParser = pdfParser.default;
    }

    if (typeof pdfParser !== "function") {
      console.error("pdf-parse import:", pdfParser);
      throw new Error("Could not load pdf-parse library correctly");
    }

    const data = await pdfParser(buffer);
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
