import { NextRequest, NextResponse } from "next/server";
import { extractTextFromPdf } from "@/lib/pdf-loader";
import { generateStudyPlan } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const examDate = formData.get("examDate") as string;

    if (!file || !examDate) {
      return NextResponse.json(
        { error: "File and exam date are required" },
        { status: 400 }
      );
    }

    // Calculate days until exam
    const today = new Date();
    const exam = new Date(examDate);
    const diffTime = exam.getTime() - today.getTime();
    const daysUntilExam = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (daysUntilExam <= 0) {
      return NextResponse.json(
        { error: "Exam date must be in the future" },
        { status: 400 }
      );
    }

    // Read file buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract text (currently only supporting PDF, but could extend)
    let content = "";
    if (file.type === "application/pdf") {
      content = await extractTextFromPdf(buffer);
    } else {
      // For now, just treat other text-based files as plain text if possible, or throw
      // You might want to add support for DOCX/PPTX later
      return NextResponse.json(
        { error: "Only PDF files are currently supported for AI analysis" },
        { status: 400 }
      );
    }

    // Generate plan
    const plan = await generateStudyPlan(content, examDate, daysUntilExam);

    return NextResponse.json({ plan });
  } catch (error) {
    console.error("Error in generate-plan API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
