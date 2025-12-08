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
  X,
  Download,
  Bookmark,
  Share2,
  Type,
  ChevronRight,
  List
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

import { cn } from "@/lib/utils"

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
  readTime?: string
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
    // Try to load from localStorage first
    const storedPlan = localStorage.getItem("studyPlan")
    if (storedPlan) {
      try {
        const parsedPlan = JSON.parse(storedPlan)
        const dayPlan = parsedPlan.find((d: any) => d.day === dayId)
        
        if (dayPlan) {
          // Transform the stored plan into the view format
          const planTopics: Topic[] = dayPlan.topics.map((topicTitle: string, index: number) => ({
            id: index + 1,
            title: topicTitle,
            completed: false,
            materials: [
              {
                id: index + 1,
                title: `Study Material: ${topicTitle}`,
                type: "pdf",
                pages: "10-25", // Mock pages
                readTime: "15 min",
                excerpt: `Comprehensive study material for ${topicTitle}. Click to start studying.`,
                content: generateMockContent(topicTitle)
              }
            ]
          }))
          setTopics(planTopics)
          
          // Add some mock videos based on the topics
          setVideos([
            {
              id: 1,
              title: `${dayPlan.topics[0]} - Video Tutorial`,
              url: "#",
              duration: "15:30",
              thumbnail: "/placeholder.svg?height=120&width=200",
            }
          ])
          return
        }
      } catch (e) {
        console.error("Error parsing plan", e)
      }
    }

    // Fallback to mock data if no plan found
    generateDayContent(dayId)
  }, [dayId])

  const generateMockContent = (topicTitle: string) => {
    return `
      <div class="space-y-6 text-gray-800">
        <p class="text-xl leading-relaxed text-gray-600 font-light">
          This module focuses on <strong>${topicTitle}</strong>. We will explore the fundamental concepts, theoretical frameworks, and practical applications relevant to this subject.
        </p>
        
        <div class="my-8 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
          <h4 class="text-blue-900 font-semibold mb-2 flex items-center">
            <span class="mr-2">💡</span> Key Insight
          </h4>
          <p class="text-blue-800">
            Mastering ${topicTitle} is essential for the overall understanding of the course. Pay close attention to the core principles outlined below.
          </p>
        </div>

        <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Introduction to ${topicTitle}</h3>
        <p class="leading-8 mb-4">
          The study of ${topicTitle} begins with understanding its primary components. In this section, we break down the complex ideas into manageable parts.
        </p>
        <p class="leading-8 mb-4">
          Consider the implications of this topic in a broader context. How does it relate to the previous chapters? What are the real-world applications?
        </p>

        <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Core Concepts & Terminology</h3>
        <p class="leading-8 mb-4">To communicate effectively, we must agree on our definitions:</p>
        
        <div class="grid gap-4 md:grid-cols-2 my-6">
          <div class="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <strong class="block text-lg text-gray-900 mb-1">Concept A</strong>
            <span class="text-gray-600">A fundamental aspect of ${topicTitle} that defines its structure.</span>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <strong class="block text-lg text-gray-900 mb-1">Concept B</strong>
            <span class="text-gray-600">A variable or parameter that influences the outcome of the system.</span>
          </div>
        </div>
        
        <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Theoretical Framework</h3>
        <p class="leading-8 mb-4">
          The framework we build upon is derived from first principles. It allows us to predict the behavior of the system under various conditions.
        </p>
        
        <div class="bg-gray-100 p-8 rounded-xl my-6 text-center">
           <p class="text-gray-500 italic">[Diagram or Chart relevant to ${topicTitle}]</p>
        </div>
        
        <p class="leading-8">
          (This content is dynamically generated based on the study plan for "${topicTitle}". In a full production environment, this would be the actual extracted text from your uploaded PDF.)
        </p>
      </div>
    `
  }

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
            readTime: "15 min",
            excerpt: "This chapter covers the basic principles and foundational concepts...",
            content: `
              <div class="space-y-6 text-gray-800">
                <p class="text-xl leading-relaxed text-gray-600 font-light">
                  This section introduces the core concepts necessary for understanding the subject. We begin by defining the basic terminology and establishing the theoretical framework.
                </p>
                
                <div class="my-8 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                  <h4 class="text-blue-900 font-semibold mb-2 flex items-center">
                    <span class="mr-2">💡</span> Key Insight
                  </h4>
                  <p class="text-blue-800">
                    The fundamental laws that govern the system are invariant. Understanding these principles is crucial for solving complex problems later in the course.
                  </p>
                </div>

                <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">1.1 Basic Principles</h3>
                <p class="leading-8 mb-4">
                  At the heart of this discipline lies a set of immutable principles. These are not merely rules of thumb but the very fabric of the theoretical model we are studying. When we approach a problem, we must first ask: <em>which principles apply here?</em>
                </p>
                <p class="leading-8 mb-4">
                  Consider the case of a closed system. In such a scenario, conservation laws are paramount. Whether it is energy, momentum, or mass, the total quantity remains constant unless acted upon by an external agent.
                </p>

                <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">1.2 Key Terminology</h3>
                <p class="leading-8 mb-4">To communicate effectively, we must agree on our definitions:</p>
                
                <div class="grid gap-4 md:grid-cols-2 my-6">
                  <div class="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <strong class="block text-lg text-gray-900 mb-1">System</strong>
                    <span class="text-gray-600">A set of interacting or interdependent component parts forming a complex/intricate whole.</span>
                  </div>
                  <div class="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <strong class="block text-lg text-gray-900 mb-1">Variable</strong>
                    <span class="text-gray-600">A quantity that may change within the context of a mathematical problem or experiment.</span>
                  </div>
                  <div class="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <strong class="block text-lg text-gray-900 mb-1">Parameter</strong>
                    <span class="text-gray-600">A numerical or other measurable factor forming one of a set that defines a system.</span>
                  </div>
                </div>
                
                <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">1.3 Theoretical Framework</h3>
                <p class="leading-8 mb-4">
                  The framework we build upon is derived from first principles. It allows us to predict the behavior of the system under various conditions.
                </p>
                <img src="/placeholder.svg?height=300&width=600" alt="Diagram illustrating the system" class="w-full h-64 object-cover rounded-xl my-6 shadow-sm" />
                <p class="text-sm text-center text-gray-500 italic mb-8">Figure 1.1: A schematic representation of the system boundaries.</p>
                
                <p class="leading-8">
                  (This is a placeholder for the actual content extracted from the PDF for pages 1-15. In a real application, this would be the full text content parsed from the document.)
                </p>
              </div>
            `
          },
          {
            id: 2,
            title: "Lecture Slides: Overview",
            type: "ppt",
            pages: "1-20",
            readTime: "10 min",
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
            readTime: "25 min",
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
              <DialogContent className="max-w-[95vw] w-full h-[95vh] flex flex-col p-0 gap-0 bg-white overflow-hidden rounded-xl shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b bg-white sticky top-0 z-10">
                  <div className="flex items-center space-x-4">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setSelectedMaterial(null)}
                      className="rounded-full hover:bg-gray-100"
                    >
                      <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </Button>
                    <div>
                      <DialogTitle className="text-lg font-semibold text-gray-900 line-clamp-1">{selectedMaterial?.title}</DialogTitle>
                      <div className="flex items-center text-xs text-gray-500 space-x-2">
                        <span className="flex items-center"><BookOpen className="w-3 h-3 mr-1" /> {selectedMaterial?.pages ? `Pages ${selectedMaterial.pages}` : 'Reading'}</span>
                        <span>•</span>
                        <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {selectedMaterial?.readTime || '10 min'} read</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-900">
                      <Type className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-900">
                      <Bookmark className="w-5 h-5" />
                    </Button>
                    <Separator orientation="vertical" className="h-6 mx-2" />
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      Mark Complete
                    </Button>
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="flex flex-1 overflow-hidden">
                  {/* Sidebar (Table of Contents) - Hidden on mobile */}
                  <div className="hidden lg:block w-64 border-r bg-gray-50 p-6 overflow-y-auto">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">On this page</h3>
                    <nav className="space-y-1">
                      <a href="#" className="block px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-md">1. Introduction</a>
                      <a href="#" className="block px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md">1.1 Basic Principles</a>
                      <a href="#" className="block px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md">1.2 Key Terminology</a>
                      <a href="#" className="block px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md">1.3 Theoretical Framework</a>
                    </nav>
                    
                    <div className="mt-8">
                      <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Resources</h3>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Download className="w-4 h-4 mr-2" /> Download PDF
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Share2 className="w-4 h-4 mr-2" /> Share
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Reading Content */}
                  <ScrollArea className="flex-1 bg-white">
                    <div className="max-w-3xl mx-auto px-8 py-12">
                      {selectedMaterial?.content ? (
                        <div dangerouslySetInnerHTML={{ __html: selectedMaterial.content }} />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                          <FileText className="w-12 h-12 mb-4 opacity-20" />
                          <p>Content not available for this section.</p>
                        </div>
                      )}
                      
                      {/* Footer Navigation */}
                      <div className="mt-16 pt-8 border-t flex justify-between items-center">
                        <Button variant="ghost" disabled>
                          <ArrowLeft className="w-4 h-4 mr-2" /> Previous
                        </Button>
                        <Button variant="outline">
                          Next Lesson <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </ScrollArea>
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
