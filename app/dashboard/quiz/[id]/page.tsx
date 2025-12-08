import QuizPage from "@/components/quiz-page"

export default async function Quiz({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <QuizPage dayId={Number.parseInt(id)} />
}
