"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  BookOpen,
  Play,
  FileText,
  ExternalLink,
  CheckCircle,
  Clock,
  Target,
  Youtube,
  PenTool,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface DayViewProps {
  dayId: number
}

interface StudyMaterial {
  id: number
  title: string
  type: "pdf" | "ppt" | "doc"
  pages?: string
  excerpt: string
  content?: string
}

interface VideoResource {
  id: number
  title: string
  url: string
  duration: string
  thumbnail: string
}

interface Topic {
  id: number
  title: string
  completed: boolean
  materials: StudyMaterial[]
}

export default function DayView({ dayId }: DayViewProps) {
  const [topics, setTopics] = useState<Topic[]>([])
  const [videos, setVideos] = useState<VideoResource[]>([])
  const [notes, setNotes] = useState("")
  const [dayCompleted, setDayCompleted] = useState(false)
  const [selectedMaterial, setSelectedMaterial] = useState<StudyMaterial | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Generate mock data for the day
    generateDayContent(dayId)
  }, [dayId])

  const generateDayContent = (dayId: number) => {
    const mockTopics: Topic[] = [
      {
        id: 1,
        title: "Introduction to Core Concepts",
        completed: false,
        materials: [
          {
            id: 1,
            title: "Chapter 1: Fundamentals",
            type: "pdf",
            pages: "1-15",
            excerpt: "This chapter covers the basic principles and foundational concepts...",
            content: `
              <h3 class="text-lg font-bold mb-2">Chapter 1: Fundamentals</h3>
              <p class="mb-4">This section introduces the core concepts necessary for understanding the subject. We begin by defining the basic terminology and establishing the theoretical framework.</p>
              
              <h4 class="font-semibold mb-2">1.1 Basic Principles</h4>
              <p class="mb-4">The fundamental laws that govern the system are invariant. Understanding these principles is crucial for solving complex problems later in the course.</p>
              
              <h4 class="font-semibold mb-2">1.2 Key Terminology</h4>
              <ul class="list-disc pl-5 mb-4">
                <li><strong>System:</strong> A set of interacting or interdependent component parts forming a complex/intricate whole.</li>
                <li><strong>Variable:</strong> A quantity that may change within the context of a mathematical problem or experiment.</li>
                <li><strong>Parameter:</strong> A numerical or other measurable factor forming one of a set that defines a system or sets the conditions of its operation.</li>
              </ul>
              
              <p class="italic text-gray-600">(This is a placeholder for the actual content extracted from the PDF for pages 1-15.)</p>
            `
          },
          {
            id: 2,
            title: "Lecture Slides: Overview",
            type: "ppt",
            pages: "1-20",
            excerpt: "Comprehensive overview of the subject with key definitions...",
            content: "Content for Lecture Slides..."
          },
        ],
      },
      {
        id: 2,
        title: "Mathematical Foundations",
        completed: false,
        materials: [
          {
            id: 3,
            title: "Mathematical Methods",
            type: "pdf",
            pages: "45-67",
            excerpt: "Essential mathematical tools and techniques required for...",
            content: "Content for Mathematical Methods..."
          },
        ],
      },
      {
        id: 3,
        title: "Practical Applications",
        completed: false,
        materials: [
          {
            id: 4,
            title: "Case Studies Document",
            type: "doc",
            excerpt: "Real-world examples and applications of the concepts...",
            content: "Content for Case Studies..."
          },
        ],
      },
    ]

    const mockVideos: VideoResource[] = [
      {
        id: 1,
        title: "Introduction to Core Concepts - Explained",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "15:30",
        thumbnail: "/placeholder.svg?height=120&width=200",
      },
      {
        id: 2,
        title: "Mathematical Foundations Tutorial",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "22:45",
        thumbnail: "/placeholder.svg?height=120&width=200",
      },
    ]

    setTopics(mockTopics)
    setVideos(mockVideos)
  }

  const toggleTopicCompletion = (topicId: number) => {
    setTopics((prev) => prev.map((topic) => (topic.id === topicId ? { ...topic, completed: !topic.completed } : topic)))
  }

  const completedTopics = topics.filter((topic) => topic.completed).length
  const totalTopics = topics.length
  const progress = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0

  const markDayComplete = () => {
    if (completedTopics === totalTopics) {
      setDayCompleted(true)
      // Navigate to quiz
      router.push(`/dashboard/quiz/${dayId}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Day {dayId} - Study Plan</h1>
                <p className="text-sm text-gray-600">
                  {completedTopics}/{totalTopics} topics completed
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">
                <Clock className="w-3 h-3 mr-1" />
                2-3 hours
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <span>Today's Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Completion</span>
                  <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Topics to Study */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-green-600" />
                  <span>Topics to Study</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {topics.map((topic, index) => (
                  <div key={topic.id}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleTopicCompletion(topic.id)}
                            className={`p-1 ${topic.completed ? "text-green-600" : "text-gray-400"}`}
                          >
                            <CheckCircle className="w-5 h-5" />
                          </Button>
                          <h3
                            className={`text-lg font-semibold ${topic.completed ? "line-through text-gray-500" : "text-gray-900"}`}
                          >
                            {topic.title}
                          </h3>
                        </div>

                        {/* Study Materials */}
                        <div className="ml-8 space-y-3">
                          {topic.materials.map((material) => (
                            <Card key={material.id} className="bg-gray-50">
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                      <FileText className="w-4 h-4 text-gray-600" />
                                      <span className="font-medium text-sm">{material.title}</span>
                                      {material.pages && (
                                        <Badge variant="outline" className="text-xs">
                                          Pages {material.pages}
                                        </Badge>
                                      )}
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">{material.excerpt}</p>
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => setSelectedMaterial(material)}
                                    >
                                      <Play className="w-3 h-3 mr-1" />
                                      Start Study
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </div>
                    {index < topics.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Study Material Dialog */}
            <Dialog open={!!selectedMaterial} onOpenChange={(open) => !open && setSelectedMaterial(null)}>
              <DialogContent className="max-w-[95vw] w-full h-[95vh] flex flex-col p-0 gap-0">
                <DialogHeader className="p-6 border-b">
                  <DialogTitle className="text-2xl">{selectedMaterial?.title}</DialogTitle>
                  <DialogDescription className="text-base">
                    {selectedMaterial?.pages && `Pages: ${selectedMaterial.pages}`}
                  </DialogDescription>
                </DialogHeader>
                <div className="flex-1 overflow-y-auto p-8 space-y-6 text-lg leading-relaxed max-w-5xl mx-auto w-full">
                  {selectedMaterial?.content ? (
                    <div dangerouslySetInnerHTML={{ __html: selectedMaterial.content }} />
                  ) : (
                    <p className="text-gray-500 italic">Content not available.</p>
                  )}
                </div>
              </DialogContent>
            </Dialog>

            {/* Video Resources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Youtube className="w-5 h-5 text-red-600" />
                  <span>Video Resources</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {videos.map((video) => (
                  <div key={video.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="relative">
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        className="w-32 h-20 object-cover rounded"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="w-8 h-8 text-white bg-black bg-opacity-50 rounded-full p-1" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">{video.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">Duration: {video.duration}</p>
                      <Button variant="outline" size="sm">
                        <Play className="w-3 h-3 mr-1" />
                        Watch Video
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notes Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PenTool className="w-5 h-5 text-purple-600" />
                  <span>My Notes</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Write your notes here..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[200px] resize-none"
                />
                <Button variant="outline" size="sm" className="mt-3 w-full">
                  Save Notes
                </Button>
              </CardContent>
            </Card>

            {/* Complete Day */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Ready to finish?</h3>
                    <p className="text-sm text-gray-600 mb-4">Complete all topics to unlock today's quiz</p>
                  </div>
                  <Button onClick={markDayComplete} disabled={completedTopics !== totalTopics} className="w-full">
                    {completedTopics === totalTopics
                      ? "Take Quiz"
                      : `Complete ${totalTopics - completedTopics} more topics`}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Topics</span>
                  <span className="font-medium">
                    {completedTopics}/{totalTopics}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Videos</span>
                  <span className="font-medium">{videos.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Estimated Time</span>
                  <span className="font-medium">2-3 hours</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
