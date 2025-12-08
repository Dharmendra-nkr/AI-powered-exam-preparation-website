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
    
    let content = "";

    switch (style) {
      case "history":
        content = `
          <div class="space-y-8 text-gray-800 font-sans">
            <div class="border-b pb-6">
              <h1 class="text-4xl font-bold text-gray-900 mb-4">${topicTitle}</h1>
              <p class="text-xl text-gray-600 leading-relaxed">
                Tracing the origins and evolution of <strong>${topicTitle}</strong> reveals how modern practices have been shaped by past innovations and challenges.
              </p>
            </div>

            <div class="${colors.bg} p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 class="${colors.text} font-bold text-lg mb-3 flex items-center">
                <span class="mr-2 text-2xl">📜</span> Historical Context
              </h3>
              <p class="${colors.subtext} leading-7">
                The concept of ${topicTitle} did not emerge in a vacuum. It was a response to specific limitations in earlier systems. Understanding this context is crucial for appreciating the design decisions made in modern implementations.
              </p>
            </div>

            <div class="py-4">
              <h3 class="text-2xl font-bold text-gray-900 mb-6">Timeline of Evolution</h3>
              <div class="relative border-l-4 border-gray-200 ml-4 space-y-8 pl-8">
                <div class="relative">
                  <div class="absolute -left-[42px] bg-white border-4 border-gray-300 w-6 h-6 rounded-full"></div>
                  <h4 class="font-bold text-lg text-gray-900">Early Beginnings</h4>
                  <p class="text-gray-600 mt-1">Initial theoretical proposals and experimental implementations laid the groundwork for what would become ${topicTitle}.</p>
                </div>
                <div class="relative">
                  <div class="absolute -left-[42px] bg-white border-4 ${colors.border} w-6 h-6 rounded-full"></div>
                  <h4 class="font-bold text-lg text-gray-900">Standardization Phase</h4>
                  <p class="text-gray-600 mt-1">Industry consensus led to the first formal definitions and standards, stabilizing the technology.</p>
                </div>
                <div class="relative">
                  <div class="absolute -left-[42px] bg-gray-900 w-6 h-6 rounded-full"></div>
                  <h4 class="font-bold text-lg text-gray-900">Modern Era</h4>
                  <p class="text-gray-600 mt-1">Current iterations of ${topicTitle} focus on scalability, efficiency, and integration with broader ecosystems.</p>
                </div>
              </div>
            </div>

            <div class="bg-gray-50 p-8 rounded-xl">
               <h3 class="text-2xl font-bold text-gray-900 mb-4">Key Figures & Contributions</h3>
               <p class="leading-7 mb-4">Several pioneers contributed to the development of ${topicTitle}. Their work established the fundamental principles we rely on today.</p>
               <ul class="grid gap-4 md:grid-cols-2">
                 <li class="bg-white p-4 rounded shadow-sm border border-gray-100">
                    <strong class="block text-gray-900">Foundational Research</strong>
                    <span class="text-sm text-gray-500">Established the core algorithms and theoretical limits.</span>
                 </li>
                 <li class="bg-white p-4 rounded shadow-sm border border-gray-100">
                    <strong class="block text-gray-900">Industrial Application</strong>
                    <span class="text-sm text-gray-500">Adapted theoretical models for practical, real-world use cases.</span>
                 </li>
               </ul>
            </div>
          </div>
        `;
        break;

      case "features":
        content = `
          <div class="space-y-8 text-gray-800 font-sans">
            <div class="border-b pb-6">
              <h1 class="text-4xl font-bold text-gray-900 mb-4">${topicTitle}</h1>
              <p class="text-xl text-gray-600 leading-relaxed">
                A detailed breakdown of the capabilities, characteristics, and distinct advantages of <strong>${topicTitle}</strong>.
              </p>
            </div>

            <div class="grid md:grid-cols-3 gap-6 my-8">
               <div class="${colors.bg} p-6 rounded-xl border ${colors.border} text-center">
                  <div class="text-4xl mb-3">⚡</div>
                  <h3 class="font-bold text-gray-900 mb-2">Efficiency</h3>
                  <p class="text-sm text-gray-600">Optimized for high performance and low resource consumption.</p>
               </div>
               <div class="${colors.bg} p-6 rounded-xl border ${colors.border} text-center">
                  <div class="text-4xl mb-3">🛡️</div>
                  <h3 class="font-bold text-gray-900 mb-2">Reliability</h3>
                  <p class="text-sm text-gray-600">Designed to maintain stability under varying operational loads.</p>
               </div>
               <div class="${colors.bg} p-6 rounded-xl border ${colors.border} text-center">
                  <div class="text-4xl mb-3">🔄</div>
                  <h3 class="font-bold text-gray-900 mb-2">Scalability</h3>
                  <p class="text-sm text-gray-600">Easily expands to accommodate growing requirements.</p>
               </div>
            </div>

            <h3 class="text-2xl font-bold text-gray-900 mb-4">Key Features Analysis</h3>
            <p class="leading-7 mb-6">
              ${topicTitle} distinguishes itself through a set of robust features designed to address specific user needs. Below is a comprehensive analysis of these capabilities.
            </p>

            <div class="space-y-4">
              <div class="flex items-start p-4 bg-gray-50 rounded-lg">
                <div class="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold mr-4">1</div>
                <div>
                  <h4 class="font-bold text-gray-900">Core Functionality</h4>
                  <p class="text-gray-600 mt-1">The primary mechanism by which ${topicTitle} operates, ensuring consistent output quality.</p>
                </div>
              </div>
              <div class="flex items-start p-4 bg-gray-50 rounded-lg">
                <div class="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold mr-4">2</div>
                <div>
                  <h4 class="font-bold text-gray-900">Advanced Integration</h4>
                  <p class="text-gray-600 mt-1">Seamlessly connects with existing workflows, reducing friction during adoption.</p>
                </div>
              </div>
              <div class="flex items-start p-4 bg-gray-50 rounded-lg">
                <div class="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold mr-4">3</div>
                <div>
                  <h4 class="font-bold text-gray-900">User-Centric Design</h4>
                  <p class="text-gray-600 mt-1">Built with the end-user in mind, prioritizing accessibility and ease of use.</p>
                </div>
              </div>
            </div>

            <div class="mt-8 p-6 bg-gray-900 text-white rounded-xl">
              <h3 class="text-xl font-bold mb-4">Comparison Table</h3>
              <div class="overflow-x-auto">
                <table class="w-full text-sm text-left">
                  <thead class="text-gray-400 border-b border-gray-700">
                    <tr>
                      <th class="py-2">Feature</th>
                      <th class="py-2">Standard Approach</th>
                      <th class="py-2 text-blue-400">With ${topicTitle}</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-800">
                    <tr>
                      <td class="py-3">Speed</td>
                      <td class="py-3">Moderate</td>
                      <td class="py-3 font-bold text-blue-400">High</td>
                    </tr>
                    <tr>
                      <td class="py-3">Complexity</td>
                      <td class="py-3">High</td>
                      <td class="py-3 font-bold text-blue-400">Simplified</td>
                    </tr>
                    <tr>
                      <td class="py-3">Cost</td>
                      <td class="py-3">Variable</td>
                      <td class="py-3 font-bold text-blue-400">Optimized</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        `;
        break;

      case "architecture":
        content = `
          <div class="space-y-8 text-gray-800 font-sans">
            <div class="border-b pb-6">
              <h1 class="text-4xl font-bold text-gray-900 mb-4">${topicTitle}</h1>
              <p class="text-xl text-gray-600 leading-relaxed">
                Unpacking the structural design and component interactions that define the architecture of <strong>${topicTitle}</strong>.
              </p>
            </div>

            <div class="bg-gray-100 p-8 rounded-xl border border-gray-200 flex flex-col items-center justify-center min-h-[300px]">
               <div class="w-full max-w-md space-y-4">
                  <div class="flex justify-center space-x-4">
                     <div class="w-24 h-16 bg-white border-2 border-gray-300 rounded flex items-center justify-center shadow-sm">Client</div>
                     <div class="w-24 h-16 bg-white border-2 border-gray-300 rounded flex items-center justify-center shadow-sm">Interface</div>
                  </div>
                  <div class="h-8 border-l-2 border-dashed border-gray-400 mx-auto w-0"></div>
                  <div class="w-full h-24 ${colors.bg} border-2 ${colors.border} rounded flex items-center justify-center shadow-md font-bold text-lg">
                     ${topicTitle} Core
                  </div>
                  <div class="h-8 border-l-2 border-dashed border-gray-400 mx-auto w-0"></div>
                  <div class="flex justify-center space-x-4">
                     <div class="w-24 h-16 bg-gray-800 text-white rounded flex items-center justify-center shadow-sm">Database</div>
                     <div class="w-24 h-16 bg-gray-800 text-white rounded flex items-center justify-center shadow-sm">Services</div>
                  </div>
               </div>
               <p class="text-gray-500 italic mt-6">Figure 1: High-level architectural view of ${topicTitle}</p>
            </div>

            <div class="grid md:grid-cols-2 gap-8">
              <div>
                <h3 class="text-2xl font-bold text-gray-900 mb-4">Component Breakdown</h3>
                <p class="leading-7 mb-4">The architecture is composed of several distinct layers, each responsible for a specific aspect of the system's operation.</p>
                <ul class="space-y-3">
                  <li class="flex items-center">
                    <span class="w-3 h-3 ${colors.bg.replace('bg-', 'bg-').replace('50', '500')} rounded-full mr-3"></span>
                    <span><strong>Presentation Layer:</strong> Handles user interaction.</span>
                  </li>
                  <li class="flex items-center">
                    <span class="w-3 h-3 ${colors.bg.replace('bg-', 'bg-').replace('50', '500')} rounded-full mr-3"></span>
                    <span><strong>Logic Layer:</strong> Processes business rules.</span>
                  </li>
                  <li class="flex items-center">
                    <span class="w-3 h-3 ${colors.bg.replace('bg-', 'bg-').replace('50', '500')} rounded-full mr-3"></span>
                    <span><strong>Data Layer:</strong> Manages persistence and retrieval.</span>
                  </li>
                </ul>
              </div>
              <div class="${colors.bg} p-6 rounded-xl">
                <h3 class="text-xl font-bold ${colors.text} mb-3">Design Principles</h3>
                <p class="${colors.subtext} text-sm leading-6">
                  The architecture of ${topicTitle} adheres to the principles of modularity and loose coupling. This ensures that changes in one component do not adversely affect others, facilitating easier maintenance and upgrades.
                </p>
              </div>
            </div>

            <h3 class="text-2xl font-bold text-gray-900 mt-6 mb-4">Data Flow</h3>
            <p class="leading-7">
              Data moves through the system in a predictable manner. Input is validated at the entry point, processed by the core logic engine, and then stored or transmitted as required. This unidirectional flow simplifies debugging and enhances security.
            </p>
          </div>
        `;
        break;

      case "process":
        content = `
          <div class="space-y-8 text-gray-800 font-sans">
            <div class="border-b pb-6">
              <h1 class="text-4xl font-bold text-gray-900 mb-4">${topicTitle}</h1>
              <p class="text-xl text-gray-600 leading-relaxed">
                A step-by-step guide to mastering the process of <strong>${topicTitle}</strong>, from initial setup to final verification.
              </p>
            </div>

            <div class="${colors.bg} border-l-4 ${colors.border} p-6 rounded-r-lg">
              <h3 class="font-bold ${colors.text} mb-2">⚠️ Prerequisites</h3>
              <p class="${colors.subtext}">
                Before beginning the ${topicTitle} process, ensure you have administrative access and have backed up any critical data. Familiarity with basic command-line tools is recommended.
              </p>
            </div>

            <div class="space-y-8 mt-8">
              <div class="flex">
                <div class="flex-shrink-0 flex flex-col items-center mr-6">
                  <div class="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-lg">1</div>
                  <div class="h-full w-0.5 bg-gray-200 my-2"></div>
                </div>
                <div class="pb-8">
                  <h3 class="text-xl font-bold text-gray-900 mb-2">Preparation & Planning</h3>
                  <p class="text-gray-600 leading-7">
                    Define the scope of your implementation. Identify the necessary resources and verify that your environment meets the minimum system requirements for ${topicTitle}.
                  </p>
                </div>
              </div>

              <div class="flex">
                <div class="flex-shrink-0 flex flex-col items-center mr-6">
                  <div class="w-10 h-10 rounded-full ${colors.bg.replace('bg-', 'bg-').replace('50', '600')} text-white flex items-center justify-center font-bold text-lg">2</div>
                  <div class="h-full w-0.5 bg-gray-200 my-2"></div>
                </div>
                <div class="pb-8">
                  <h3 class="text-xl font-bold text-gray-900 mb-2">Execution</h3>
                  <p class="text-gray-600 leading-7 mb-4">
                    Run the primary installation or configuration commands. Monitor the output for any warning messages.
                  </p>
                  <div class="bg-gray-900 rounded-lg p-4 font-mono text-sm text-green-400 overflow-x-auto">
                    > initiate ${topicTitle.toLowerCase().replace(/\s+/g, '-')}<br/>
                    > verifying dependencies... OK<br/>
                    > starting process... 100%
                  </div>
                </div>
              </div>

              <div class="flex">
                <div class="flex-shrink-0 flex flex-col items-center mr-6">
                  <div class="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-lg">3</div>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">Verification</h3>
                  <p class="text-gray-600 leading-7">
                    Validate that ${topicTitle} has been completed successfully. Run the standard test suite to ensure all components are functioning as expected.
                  </p>
                </div>
              </div>
            </div>

            <div class="mt-8 border-t pt-8">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Troubleshooting Common Issues</h3>
              <div class="grid gap-4">
                <details class="group bg-gray-50 p-4 rounded-lg cursor-pointer">
                  <summary class="font-medium text-gray-900 flex justify-between items-center">
                    Process fails at 50%
                    <span class="transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p class="text-gray-600 mt-2 pl-4 border-l-2 border-gray-300">Check your network connection and ensure no firewall rules are blocking the required ports.</p>
                </details>
                <details class="group bg-gray-50 p-4 rounded-lg cursor-pointer">
                  <summary class="font-medium text-gray-900 flex justify-between items-center">
                    "Permission Denied" error
                    <span class="transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p class="text-gray-600 mt-2 pl-4 border-l-2 border-gray-300">Ensure you are running the command with elevated privileges (sudo or Run as Administrator).</p>
                </details>
              </div>
            </div>
          </div>
        `;
        break;

      default: // Concept
        content = `
          <div class="space-y-6 text-gray-800 font-sans">
            <div class="border-b pb-6">
              <h1 class="text-4xl font-bold text-gray-900 mb-4">${topicTitle}</h1>
              <p class="text-xl text-gray-600 leading-relaxed">
                This module provides an in-depth exploration of <strong>${topicTitle}</strong>. We will examine the core principles, historical context, and practical implications that define this subject area.
              </p>
            </div>
            
            <div class="my-8 p-6 ${colors.bg} border-l-4 ${colors.border} rounded-r-lg">
              <h4 class="${colors.text} font-semibold mb-2 flex items-center">
                <span class="mr-2">💡</span> Key Insight
              </h4>
              <p class="${colors.subtext}">
                Understanding ${topicTitle} is fundamental to mastering the broader curriculum. The concepts discussed here serve as building blocks for advanced topics.
              </p>
            </div>

            <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Introduction to ${topicTitle}</h3>
            <p class="leading-8 mb-4">
              ${topicTitle} represents a critical area of study. Historically, this concept has evolved to address specific challenges in the field. By analyzing its components, we gain a clearer perspective on how it functions within a larger system.
            </p>
            <p class="leading-8 mb-4">
              In professional practice, ${topicTitle} is often applied to optimize processes and solve complex problems. We will look at several case studies later in this module to illustrate these applications.
            </p>

            <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Core Concepts & Terminology</h3>
            <p class="leading-8 mb-4">To establish a common language, we must define the key terms associated with ${topicTitle}:</p>
            
            <div class="grid gap-4 md:grid-cols-2 my-6">
              <div class="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <strong class="block text-lg text-gray-900 mb-1">Primary Component</strong>
                <span class="text-gray-600">The central element that drives the functionality of ${topicTitle}.</span>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <strong class="block text-lg text-gray-900 mb-1">Secondary Variable</strong>
                <span class="text-gray-600">An external factor that influences how ${topicTitle} behaves under different conditions.</span>
              </div>
            </div>
            
            <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Theoretical Framework</h3>
            <p class="leading-8 mb-4">
              The theoretical underpinnings of ${topicTitle} rely on established models. These models help us predict outcomes and understand the limitations of current approaches.
            </p>
            
            <div class="bg-gray-100 p-8 rounded-xl my-6 text-center flex flex-col items-center justify-center">
               <div class="w-16 h-16 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
                 <span class="text-2xl">📊</span>
               </div>
               <p class="text-gray-500 italic">Figure 1: Structural Diagram of ${topicTitle}</p>
            </div>
            
            <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Practical Applications</h3>
            <p class="leading-8 mb-4">
                Moving beyond theory, we observe ${topicTitle} in action across various industries. Whether in technology, finance, or engineering, the principles remain consistent while the application varies.
            </p>
            <ul class="list-disc pl-6 space-y-2 mb-6 text-gray-700">
                <li><strong>Optimization:</strong> Improving efficiency by leveraging ${topicTitle}.</li>
                <li><strong>Analysis:</strong> Using ${topicTitle} to interpret data and trends.</li>
                <li><strong>Integration:</strong> Combining ${topicTitle} with other systems for holistic solutions.</li>
            </ul>

            <p class="leading-8">
              In conclusion, ${topicTitle} is a multifaceted topic that requires both theoretical knowledge and practical experience to master. Continue to the next section to test your understanding.
            </p>
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
