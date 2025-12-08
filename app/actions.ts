"use server"

import { generateLessonContent } from "@/lib/ai"

export async function getLessonContent(topic: string) {
  return await generateLessonContent(topic)
}
