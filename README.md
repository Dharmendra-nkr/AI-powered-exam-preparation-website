# 🎓 AI-Powered Exam Preparation Website

An intelligent, AI-driven study planning platform that helps students prepare for exams efficiently by generating personalized study plans based on their uploaded materials and exam dates.

## ✨ Features

### 📚 Smart Study Planning
- **AI-Generated Study Plans**: Automatically creates day-by-day study schedules based on your exam date and study materials
- **PDF Material Upload**: Upload study materials in PDF format for content analysis
- **Adaptive Scheduling**: Plans adjust based on the time available until your exam

### 📊 Interactive Dashboard
- **Progress Tracking**: Visual representation of your study progress with progress bars
- **Day-by-Day View**: Organized study schedule with daily topics and estimated time
- **Status Indicators**: Track completed, current, and upcoming study days
- **Study Streaks**: Monitor your consistency with streak tracking

### 📖 Daily Study Sessions
- **AI-Generated Lessons**: Dynamic lesson content generated for each topic
- **Topic Breakdown**: Detailed explanations and learning materials
- **Interactive Learning**: Engaging content with proper formatting and structure

### 🎯 Quiz System
- **Topic-Based Quizzes**: Test your knowledge on daily study topics
- **Multiple Choice Questions**: Interactive quizzes with instant feedback
- **Timed Assessments**: 5-minute time limit to simulate exam conditions
- **Score Tracking**: Monitor your performance and identify weak areas
- **Detailed Explanations**: Learn from mistakes with comprehensive answer explanations

### 👤 User Profile & Stats
- **Performance Analytics**: Track completion rates and study statistics
- **Achievement Badges**: Earn rewards for consistent study habits
- **Personal Settings**: Customize your learning experience
- **Study History**: View your learning journey and progress over time

## 🛠️ Technology Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Headless UI component library
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library

### Backend & AI
- **[Google Generative AI (Gemini)](https://ai.google.dev/)** - Advanced AI model for content generation
- **[Groq SDK](https://groq.com/)** - Fast AI inference with Llama 3.3
- **PDF.js** - PDF parsing and text extraction

### UI Components
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component collection
- **[Recharts](https://recharts.org/)** - Charting library for data visualization
- **[date-fns](https://date-fns.org/)** - Modern date utility library
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm**, **yarn**, or **pnpm** package manager
- **Git** for version control

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Gopikrish-30/AI-powered-exam-preparation-website.git
   cd AI-powered-exam-preparation-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory and add your API keys:
   ```env
   # Google Gemini API Key (Primary AI model)
   GEMINI_API_KEY=your_gemini_api_key_here

   # Groq API Key (Alternative AI model)
   GROQ_API_KEY=your_groq_api_key_here

   # Optional: Separate Groq key for content generation (to manage rate limits)
   GROQ_CONTENT_API_KEY=your_groq_content_api_key_here
   ```

   **How to get API keys:**
   - **Gemini API Key**: Visit [Google AI Studio](https://makersuite.google.com/app/apikey) and create a free API key
   - **Groq API Key**: Sign up at [Groq Console](https://console.groq.com/) and get your API key

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📖 Usage Guide

### Getting Started

1. **Upload Study Materials**
   - On the landing page, upload your study materials (PDF format)
   - You can upload multiple PDF files containing your course content

2. **Set Your Exam Date**
   - Enter your exam date to help the AI calculate the optimal study schedule
   - The system will automatically distribute topics across available days

3. **Generate Study Plan**
   - Click "Generate My Study Plan" to create your personalized schedule
   - The AI will analyze your materials and create a day-by-day plan

4. **Follow Your Dashboard**
   - Access your dashboard to see the complete study schedule
   - Each day shows topics to cover and estimated study time
   - Track your progress as you complete each day

5. **Study Daily Topics**
   - Click on any study day to view detailed lesson content
   - The AI generates comprehensive learning materials for each topic
   - Take your time to understand each concept thoroughly

6. **Test Your Knowledge**
   - Take daily quizzes to assess your understanding
   - Answer multiple-choice questions within the time limit
   - Review explanations to strengthen weak areas

7. **Monitor Your Progress**
   - Visit your profile to see detailed statistics
   - Track completion rates, study streaks, and achievements
   - Adjust your study habits based on performance data

## 📁 Project Structure

```
AI-powered-exam-preparation-website/
├── app/                          # Next.js App Router
│   ├── actions.ts               # Server actions
│   ├── api/                     # API routes
│   │   └── generate-plan/       # Study plan generation endpoint
│   ├── dashboard/               # Dashboard pages
│   │   ├── day/                # Daily study view
│   │   ├── profile/            # User profile
│   │   └── quiz/               # Quiz pages
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Landing page
├── components/                  # React components
│   ├── ui/                     # Reusable UI components
│   ├── dashboard.tsx           # Main dashboard
│   ├── day-view.tsx            # Daily study view
│   ├── landing-page.tsx        # Homepage component
│   ├── profile-page.tsx        # Profile component
│   ├── quiz-page.tsx           # Quiz component
│   └── theme-provider.tsx      # Theme management
├── lib/                         # Utility functions
│   ├── ai.ts                   # AI integration (Gemini, Groq)
│   ├── pdf-loader.ts           # PDF parsing utilities
│   └── utils.ts                # Helper functions
├── public/                      # Static assets
├── styles/                      # Additional styles
├── .env.local                  # Environment variables (create this)
├── .gitignore                  # Git ignore file
├── components.json             # shadcn/ui configuration
├── next.config.mjs             # Next.js configuration
├── package.json                # Dependencies
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## 🤖 AI Models Used

### Primary: Google Gemini 2.0 Flash
- **Purpose**: Study plan generation and fallback for content generation
- **Model**: `gemini-2.0-flash-exp`
- **Capabilities**: 
  - Large context window (500k characters)
  - JSON response mode for structured output
  - Fast inference times
  - High-quality content generation

### Secondary: Groq with Llama 3.3 70B
- **Purpose**: Primary study plan and lesson content generation
- **Model**: `llama-3.3-70b-versatile`
- **Capabilities**:
  - Ultra-fast inference
  - High-quality text generation
  - Cost-effective for high-volume requests
  - Automatic fallback to Gemini if rate limits are hit

## 🔧 API Endpoints

### `/api/generate-plan`
- **Method**: POST
- **Purpose**: Generate personalized study plan
- **Request Body**:
  ```json
  {
    "content": "extracted PDF text content",
    "examDate": "YYYY-MM-DD",
    "daysUntilExam": 30
  }
  ```
- **Response**:
  ```json
  [
    {
      "day": 1,
      "title": "Chapter 1: Introduction",
      "topics": ["Topic 1", "Topic 2", "Topic 3"],
      "estimatedTime": "2 hours"
    }
  ]
  ```

## 🧪 Testing

### Testing AI Integration

Test Gemini API:
```bash
node test-gemini.js
```

Test Groq API:
```bash
node test-groq.js
```

## 🏗️ Building for Production

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

3. **Deployment Options**
   - Deploy to [Vercel](https://vercel.com) (recommended for Next.js)
   - Deploy to [Netlify](https://netlify.com)
   - Deploy to any Node.js hosting platform

## ⚙️ Configuration

### Tailwind CSS
Tailwind is configured in `tailwind.config.ts` with custom theme extensions and the shadcn/ui color scheme.

### Next.js
Next.js configuration in `next.config.mjs` includes settings for optimal performance and build output.

### TypeScript
TypeScript is configured in `tsconfig.json` with strict mode enabled for better type safety.

## 🌟 Key Features Explained

### Intelligent Study Plan Generation
The AI analyzes your uploaded PDF content and exam timeline to:
- Identify key topics and concepts
- Distribute learning material evenly across available days
- Balance heavy theoretical topics with lighter review sessions
- Create intensive schedules for urgent exams
- Provide paced learning for exams further away

### Adaptive Content Generation
Each study day includes AI-generated content that:
- Explains concepts clearly and comprehensively
- Uses proper formatting with Tailwind CSS styling
- Includes practical examples and applications
- Provides key insights and takeaways
- Structures information logically for easy learning

### Progress Tracking System
Monitor your learning journey with:
- Real-time progress updates
- Visual progress indicators
- Completion percentages
- Study streak tracking
- Achievement badges and milestones

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style and conventions
- Write meaningful commit messages
- Test your changes thoroughly before submitting
- Update documentation if you add new features
- Keep components small and focused
- Use TypeScript types properly

## 🐛 Troubleshooting

### Common Issues

**1. API Key Errors**
- Ensure your API keys are correctly set in `.env.local`
- Check that the keys are valid and have proper permissions
- Verify there are no spaces or quotes around the keys

**2. PDF Upload Issues**
- Make sure PDFs are text-based (not scanned images)
- Check file size limits (larger files may take longer to process)
- Ensure PDFs are not password-protected

**3. Study Plan Not Generating**
- Check console logs for API errors
- Verify you have internet connectivity
- Ensure API rate limits haven't been exceeded
- Try with a smaller PDF or fewer days

**4. Build Errors**
- Clear `.next` directory and rebuild: `rm -rf .next && npm run build`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version compatibility (v18+)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Gopikrish-30**
- GitHub: [@Gopikrish-30](https://github.com/Gopikrish-30)
- Repository: [AI-powered-exam-preparation-website](https://github.com/Gopikrish-30/AI-powered-exam-preparation-website)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) team for the amazing framework
- [Vercel](https://vercel.com/) for v0.dev and deployment platform
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Google](https://ai.google.dev/) for Gemini API
- [Groq](https://groq.com/) for fast AI inference
- All contributors and users of this project

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on [GitHub](https://github.com/Gopikrish-30/AI-powered-exam-preparation-website/issues)
- Check existing issues for solutions
- Refer to the documentation above

---

**Happy Studying! 🎯📚**

*Made with ❤️ for students everywhere*
