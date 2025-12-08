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
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

  try {
    console.log("Sending test prompt...");
    const result = await model.generateContent("Hello, are you working?");
    const response = await result.response;
    console.log("Response:", response.text());
  } catch (error) {
    console.error("Gemini Test Failed:", error);
  }
}

testGemini();
