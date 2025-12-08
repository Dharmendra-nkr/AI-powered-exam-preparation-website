// @ts-ignore
import { getDocument } from "pdfjs-dist/legacy/build/pdf.js";

export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  try {
    // Convert Buffer to Uint8Array for pdfjs-dist
    const data = new Uint8Array(buffer);
    
    // Load the PDF document
    const loadingTask = getDocument({ 
      data, 
      useSystemFonts: true,
      disableFontFace: true 
    });
    
    const pdfDocument = await loadingTask.promise;
    console.log(`PDF loaded successfully. Pages: ${pdfDocument.numPages}`);
    let fullText = "";

    // Iterate through all pages
    for (let i = 1; i <= pdfDocument.numPages; i++) {
      const page = await pdfDocument.getPage(i);
      const textContent = await page.getTextContent();
      
      // Extract text items and join them
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(" ");
        
      fullText += pageText + "\n";
    }

    // Clean up the text: remove excessive newlines and whitespace
    const cleanText = fullText
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
