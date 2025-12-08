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
  // List available models to debug
  // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-001" });

  try {
    // console.log("Sending test prompt...");
    // const result = await model.generateContent("Hello, are you working?");
    // const response = await result.response;
    // console.log("Response:", response.text());
    
    // List models
    /*
    // Note: The Node.js SDK doesn't expose listModels directly on the client instance in the same way as REST.
    // We'll try a known working model 'gemini-1.5-flash' again but maybe the issue is the API key permissions or region.
    */
    
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    console.log("Retrying with 'gemini-2.0-flash-exp'...");
    const result = await model.generateContent("Hello");
    console.log("Response:", result.response.text());

  } catch (error) {
    console.error("Gemini Test Failed:", error);
  }
}

testGemini();
