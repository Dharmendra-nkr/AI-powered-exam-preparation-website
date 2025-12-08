const Groq = require("groq-sdk");
require('dotenv').config({ path: '.env.local' });

async function testGroq() {
  const apiKey = process.env.GROQ_API_KEY;
  console.log("Testing Groq API Key:", apiKey ? "Present" : "Missing");
  
  if (!apiKey) {
    console.error("Error: GROQ_API_KEY is missing in .env.local");
    return;
  }

  const groq = new Groq({ apiKey: apiKey });

  try {
    console.log("Sending test prompt to Groq (llama-3.3-70b-versatile)...");
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: "Hello, are you working?"
        }
      ],
      model: "llama-3.3-70b-versatile",
    });

    const response = completion.choices[0]?.message?.content;
    console.log("SUCCESS: Groq responded:");
    console.log(response);

  } catch (error) {
    console.error("Groq Test Failed:", error);
  }
}

testGroq();
