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
import { getLessonContent } from "@/app/actions"

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

  const getTopicStyle = (title: string) => {
    const lower = title.toLowerCase();
    if (lower.includes("history") || lower.includes("evolution") || lower.includes("background") || lower.includes("origin")) return "history";
    if (lower.includes("feature") || lower.includes("characteristic") || lower.includes("benefit") || lower.includes("advantage")) return "features";
    if (lower.includes("architecture") || lower.includes("component") || lower.includes("structure") || lower.includes("design")) return "architecture";
    if (lower.includes("install") || lower.includes("setup") || lower.includes("configure") || lower.includes("how to") || lower.includes("process")) return "process";
    return "concept";
  }

  const getColorScheme = (title: string) => {
    const colors = [
      { bg: "bg-blue-50", border: "border-blue-500", text: "text-blue-900", subtext: "text-blue-800", icon: "text-blue-600" },
      { bg: "bg-green-50", border: "border-green-500", text: "text-green-900", subtext: "text-green-800", icon: "text-green-600" },
      { bg: "bg-purple-50", border: "border-purple-500", text: "text-purple-900", subtext: "text-purple-800", icon: "text-purple-600" },
      { bg: "bg-orange-50", border: "border-orange-500", text: "text-orange-900", subtext: "text-orange-800", icon: "text-orange-600" },
      { bg: "bg-indigo-50", border: "border-indigo-500", text: "text-indigo-900", subtext: "text-indigo-800", icon: "text-indigo-600" },
    ];
    let hash = 0;
    for (let i = 0; i < title.length; i++) {
      hash = title.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  }

  const generateMockContent = (topicTitle: string) => {
    const style = getTopicStyle(topicTitle);
    const colors = getColorScheme(topicTitle);
    
    // Helper for a direct, clean intro
    const getIntro = () => {
        return `<p class="text-lg text-gray-800 leading-relaxed mb-6">
          <strong>${topicTitle}</strong> is a core component of the curriculum, focusing on the specific mechanisms and principles required for mastery of the subject.
        </p>`;
    };

    let content = "";

    switch (style) {
      case "history":
        content = `
          <div class="space-y-6 text-gray-800 font-sans">
            ${getIntro()}
            
            <div class="${colors.bg} p-5 rounded-lg border-l-4 ${colors.border} shadow-sm">
              <h3 class="${colors.text} font-bold text-base mb-2 flex items-center">
                <span class="mr-2">📜</span> Historical Context
              </h3>
              <p class="${colors.subtext} text-sm">
                Originating from early theoretical frameworks, ${topicTitle} has evolved through several iterations to address scalability and efficiency challenges in modern systems.
              </p>
            </div>

            <div class="py-4">
              <h3 class="text-xl font-bold text-gray-900 mb-4">Evolutionary Timeline</h3>
              <ul class="space-y-4 border-l-2 border-gray-200 ml-2 pl-4">
                <li class="relative">
                  <div class="absolute -left-[21px] bg-white border-2 border-gray-400 w-3 h-3 rounded-full mt-1.5"></div>
                  <strong class="text-gray-900">Inception</strong>
                  <p class="text-gray-600 text-sm">Initial development and theoretical proposal.</p>
                </li>
                <li class="relative">
                  <div class="absolute -left-[21px] bg-white border-2 ${colors.border} w-3 h-3 rounded-full mt-1.5"></div>
                  <strong class="text-gray-900">Standardization</strong>
                  <p class="text-gray-600 text-sm">Adoption of formal standards and protocols.</p>
                </li>
                <li class="relative">
                  <div class="absolute -left-[21px] bg-gray-900 w-3 h-3 rounded-full mt-1.5"></div>
                  <strong class="text-gray-900">Modern State</strong>
                  <p class="text-gray-600 text-sm">Current integration with distributed systems.</p>
                </li>
              </ul>
            </div>
          </div>
        `;
        break;

      case "features":
        content = `
          <div class="space-y-6 text-gray-800 font-sans">
            ${getIntro()}

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
               <div class="${colors.bg} p-4 rounded-lg border ${colors.border} text-center">
                  <h3 class="font-bold text-gray-900 mb-1">Efficiency</h3>
                  <p class="text-xs text-gray-600">High performance optimization</p>
               </div>
               <div class="${colors.bg} p-4 rounded-lg border ${colors.border} text-center">
                  <h3 class="font-bold text-gray-900 mb-1">Reliability</h3>
                  <p class="text-xs text-gray-600">Consistent operational stability</p>
               </div>
               <div class="${colors.bg} p-4 rounded-lg border ${colors.border} text-center">
                  <h3 class="font-bold text-gray-900 mb-1">Scalability</h3>
                  <p class="text-xs text-gray-600">Elastic resource management</p>
               </div>
            </div>

            <h3 class="text-xl font-bold text-gray-900 mb-3">Key Characteristics</h3>
            <ul class="space-y-3">
              <li class="flex items-start p-3 bg-gray-50 rounded-md">
                <span class="font-bold text-gray-900 mr-2">•</span>
                <span class="text-gray-700"><strong>Core Functionality:</strong> The primary mechanism ensuring consistent output quality and system integrity.</span>
              </li>
              <li class="flex items-start p-3 bg-gray-50 rounded-md">
                <span class="font-bold text-gray-900 mr-2">•</span>
                <span class="text-gray-700"><strong>Integration:</strong> Seamless connectivity with existing workflows and external APIs.</span>
              </li>
              <li class="flex items-start p-3 bg-gray-50 rounded-md">
                <span class="font-bold text-gray-900 mr-2">•</span>
                <span class="text-gray-700"><strong>Extensibility:</strong> Modular design allowing for custom plugins and feature additions.</span>
              </li>
            </ul>
            
            <div class="mt-6">
               <h3 class="text-lg font-bold text-gray-900 mb-2">Feature Comparison</h3>
               <table class="w-full text-sm text-left border-collapse">
                  <thead class="bg-gray-100 text-gray-600">
                    <tr>
                      <th class="py-2 px-3 border">Metric</th>
                      <th class="py-2 px-3 border">Standard</th>
                      <th class="py-2 px-3 border font-bold text-blue-600">${topicTitle}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="py-2 px-3 border">Throughput</td>
                      <td class="py-2 px-3 border">Standard</td>
                      <td class="py-2 px-3 border font-medium">Enhanced</td>
                    </tr>
                    <tr>
                      <td class="py-2 px-3 border">Latency</td>
                      <td class="py-2 px-3 border">Variable</td>
                      <td class="py-2 px-3 border font-medium">Minimized</td>
                    </tr>
                  </tbody>
               </table>
            </div>
          </div>
        `;
        break;

      case "architecture":
        content = `
          <div class="space-y-6 text-gray-800 font-sans">
            ${getIntro()}

            <div class="bg-gray-50 p-6 rounded-xl border border-gray-200 flex flex-col items-center justify-center">
               <div class="flex flex-col items-center space-y-2 w-full max-w-sm">
                  <div class="w-full p-3 bg-white border border-gray-300 rounded text-center shadow-sm text-sm">Client Layer</div>
                  <div class="h-4 border-l border-gray-400"></div>
                  <div class="w-full p-4 ${colors.bg} border ${colors.border} rounded text-center shadow-md font-bold text-gray-900">
                     ${topicTitle} Core Engine
                  </div>
                  <div class="h-4 border-l border-gray-400"></div>
                  <div class="grid grid-cols-2 gap-2 w-full">
                     <div class="p-3 bg-gray-800 text-white rounded text-center text-xs">Data Store</div>
                     <div class="p-3 bg-gray-800 text-white rounded text-center text-xs">External Services</div>
                  </div>
               </div>
               <p class="text-gray-400 text-xs mt-4">Figure 1: Architectural Overview</p>
            </div>

            <div class="grid md:grid-cols-2 gap-6 mt-4">
              <div>
                <h3 class="text-lg font-bold text-gray-900 mb-2">Components</h3>
                <ul class="space-y-2 text-sm">
                  <li class="flex items-center">
                    <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    <span><strong>Interface:</strong> Handles user inputs/outputs.</span>
                  </li>
                  <li class="flex items-center">
                    <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    <span><strong>Logic Controller:</strong> Processes business rules.</span>
                  </li>
                  <li class="flex items-center">
                    <span class="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    <span><strong>Persistence:</strong> Manages data storage.</span>
                  </li>
                </ul>
              </div>
              <div class="${colors.bg} p-4 rounded-lg">
                <h3 class="text-sm font-bold ${colors.text} mb-2">Design Pattern</h3>
                <p class="${colors.subtext} text-xs leading-5">
                  Utilizes a modular architecture to ensure separation of concerns, allowing independent scaling of the ${topicTitle} components.
                </p>
              </div>
            </div>
          </div>
        `;
        break;

      case "process":
        content = `
          <div class="space-y-6 text-gray-800 font-sans">
            ${getIntro()}

            <div class="${colors.bg} border-l-4 ${colors.border} p-4 rounded-r-lg mb-6">
              <h3 class="font-bold ${colors.text} text-sm mb-1">⚠️ Prerequisites</h3>
              <p class="${colors.subtext} text-xs">
                Ensure administrative access and system compatibility before initiating the ${topicTitle} process.
              </p>
            </div>

            <div class="space-y-6">
              <div class="flex">
                <div class="flex-shrink-0 flex flex-col items-center mr-4">
                  <div class="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm">1</div>
                  <div class="h-full w-0.5 bg-gray-200 my-1"></div>
                </div>
                <div class="pb-4">
                  <h3 class="text-base font-bold text-gray-900 mb-1">Configuration</h3>
                  <p class="text-gray-600 text-sm">
                    Set up the initial environment variables and dependencies required for ${topicTitle}.
                  </p>
                </div>
              </div>

              <div class="flex">
                <div class="flex-shrink-0 flex flex-col items-center mr-4">
                  <div class="w-8 h-8 rounded-full ${colors.bg.replace('bg-', 'bg-').replace('50', '600')} text-white flex items-center justify-center font-bold text-sm">2</div>
                  <div class="h-full w-0.5 bg-gray-200 my-1"></div>
                </div>
                <div class="pb-4">
                  <h3 class="text-base font-bold text-gray-900 mb-1">Execution</h3>
                  <div class="bg-gray-900 rounded p-3 font-mono text-xs text-green-400 mt-2">
                    $ run ${topicTitle.toLowerCase().replace(/\s+/g, '-')}<br/>
                    > Initializing... OK<br/>
                    > Processing... Done
                  </div>
                </div>
              </div>

              <div class="flex">
                <div class="flex-shrink-0 flex flex-col items-center mr-4">
                  <div class="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm">3</div>
                </div>
                <div>
                  <h3 class="text-base font-bold text-gray-900 mb-1">Validation</h3>
                  <p class="text-gray-600 text-sm">
                    Verify the output logs to ensure ${topicTitle} completed without errors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        `;
        break;

      default: // Concept
        content = `
          <div class="space-y-6 text-gray-800 font-sans">
            ${getIntro()}
            
            <div class="my-6 p-4 ${colors.bg} border-l-4 ${colors.border} rounded-r-lg">
              <h4 class="${colors.text} font-bold text-sm mb-1 flex items-center">
                <span class="mr-2">💡</span> Core Concept
              </h4>
              <p class="${colors.subtext} text-sm">
                ${topicTitle} serves as a foundational element, enabling more complex interactions within the system.
              </p>
            </div>

            <h3 class="text-lg font-bold text-gray-900 mt-6 mb-3">Key Terminology</h3>
            <div class="grid gap-3 md:grid-cols-2">
              <div class="bg-gray-50 p-3 rounded border border-gray-100">
                <strong class="block text-sm text-gray-900 mb-1">Primary Definition</strong>
                <span class="text-xs text-gray-600">The standard accepted meaning within the field.</span>
              </div>
              <div class="bg-gray-50 p-3 rounded border border-gray-100">
                <strong class="block text-sm text-gray-900 mb-1">Operational Scope</strong>
                <span class="text-xs text-gray-600">The boundaries within which ${topicTitle} is applicable.</span>
              </div>
            </div>
            
            <h3 class="text-lg font-bold text-gray-900 mt-6 mb-3">Theoretical Framework</h3>
            <p class="text-sm text-gray-700 leading-6 mb-4">
              The theory behind ${topicTitle} is based on established models that predict system behavior under specific constraints.
            </p>
            
            <ul class="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li><strong>Principle 1:</strong> Consistency in application.</li>
                <li><strong>Principle 2:</strong> Modularity in design.</li>
                <li><strong>Principle 3:</strong> Efficiency in execution.</li>
            </ul>
          </div>
        `;
        break;
    }
    return content;
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
                    <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Day Modules</h3>
                    <nav className="space-y-1">
                      {topics.map((topic, index) => (
                        <button
                          key={topic.id}
                          onClick={() => {
                            if (topic.materials.length > 0) {
                              setSelectedMaterial(topic.materials[0]);
                            }
                          }}
                          className={cn(
                            "block w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors",
                            selectedMaterial?.id === topic.materials[0]?.id
                              ? "text-blue-700 bg-blue-50"
                              : "text-gray-600 hover:bg-gray-100"
                          )}
                        >
                          {index + 1}. {topic.title}
                        </button>
                      ))}
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
