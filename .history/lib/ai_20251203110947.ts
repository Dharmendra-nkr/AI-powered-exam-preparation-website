import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from "groq-sdk";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

export interface StudyPlanDay {
  day: number;
  title: string;
  topics: string[];
  estimatedTime: string;
}

export async function generateStudyPlan(
  content: string,
  examDate: string,
  daysUntilExam: number
): Promise<StudyPlanDay[]> {
  // We'll use Gemini Pro for its large context window to analyze the study material
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    You are an expert study planner. I have an exam on ${examDate}, which is ${daysUntilExam} days away.
    I have provided the content of my study materials below.
    
    Please generate a detailed day-by-day study plan for me.
    The plan should cover all the important topics found in the content.
    Divide the content logically over the available days (up to a maximum of 30 days if the exam is far away, otherwise fit it in the remaining days).
    
    For each day, provide:
    1. A title for the day's focus.
    2. A list of specific topics to cover.
    3. An estimated time to study (e.g., "2 hours", "4 hours").
    
    Return the response ONLY as a valid JSON array of objects with the following structure:
    [
      {
        "day": 1,
        "title": "Introduction to ...",
        "topics": ["Topic 1", "Topic 2"],
        "estimatedTime": "2 hours"
      }
    ]

    Do not include any markdown formatting (like \`\`\`json). Just the raw JSON string.
    
    Study Material Content:
    ${content.substring(0, 100000)} // Limit context if necessary, though Gemini 1.5 has a large window
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean up potential markdown formatting
    const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    
    const plan: StudyPlanDay[] = JSON.parse(cleanText);
    return plan;
  } catch (error) {
    console.error("Error generating study plan with Gemini:", error);
    // Fallback or error handling
    throw new Error("Failed to generate study plan");
  }
}
