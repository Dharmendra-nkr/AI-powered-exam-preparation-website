const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env.local' });

async function testGemini() {
  const apiKey = process.env.GEMINI_API_KEY;
  console.log("Testing Gemini API Key:", apiKey ? "Present" : "Missing");
  
  if (!apiKey) {
    console.error("Error: GEMINI_API_KEY is missing in .env.local");
    return;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  
  const modelsToTest = [
    "gemini-2.0-flash-exp",
    "gemini-1.0-pro",
    "gemini-1.0-pro-latest",
    "gemini-1.5-flash-8b"
  ];

  for (const modelName of modelsToTest) {
    console.log(`\nTesting model: ${modelName}...`);
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("Hello, just a quick test.");
      const response = await result.response;
      console.log(`SUCCESS: ${modelName} responded:`, response.text().substring(0, 50));
      return; // Stop after first success
    } catch (error) {
      if (error.message && error.message.includes("404")) {
        console.log(`FAILED: ${modelName} - 404 Not Found`);
      } else if (error.message && error.message.includes("429")) {
        console.log(`FAILED: ${modelName} - 429 Rate Limit Exceeded`);
      } else {
        console.log(`FAILED: ${modelName} - ${error.message}`);
      }
    }
  }
  
  console.log("\nAll models failed.");
}

testGemini();
