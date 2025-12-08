import DayView from "@/components/day-view"

export default async function DayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <DayView dayId={Number.parseInt(id)} />
}
