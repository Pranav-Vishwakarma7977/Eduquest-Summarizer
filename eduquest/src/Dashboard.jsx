import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ⬅️ useNavigate imported here
// Ensure these imports match your actual file paths
import Button from "./components/ui/Button";

function Dashboard() {
  // 1. Initialize the navigate function
  const navigate = useNavigate(); 
  
  // Example of a function that could use navigate programmatically:
  // const handleFeatureClick = () => {
  //   // You could add logic here (e.g., check user permissions)
  //   navigate('/features'); 
  // };

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">

      {/* 1. Header & Navigation */}
      <header className="sticky top-0 z-10 w-full border-b border-gray-200 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Logo/Site Name */}
          <Link to="/" className="text-xl font-bold text-indigo-600 tracking-tight">
            EduQuest
          </Link>
          
          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-indigo-600">
              Log in
            </Link>
            {/* SUMMARIZER BUTTON - Using Link for simple, declarative navigation */}
            <Link to="/summarizer">
              <Button variant="primary" size="sm">
                Go to Summarizer Tool
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* 2. Hero Section */}
        <section className="py-20 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              Unlock Your Learning Potential
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              The smart way to manage your coursework, find resources, and accelerate your studies with AI-powered tools.
            </p>
            <div className="mt-10 flex justify-center space-x-4">
              <Link to="/register">
                <Button variant="primary" size="lg">
                  Get Started Free
                </Button>
              </Link>
              
              {/* Secondary Button / Feature Highlight */}
              <Link to="/features">
                <Button variant="ghost" size="lg">
                  Explore Features
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 3. Features Section */}
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center">
              Designed for Academic Success
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              
              {/* Feature Card 1: Summarization */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg hover:shadow-xl transition duration-300">
                <div className="text-indigo-600 h-10 w-10 mb-4 flex items-center justify-center rounded-full bg-indigo-100">
                  ✍️
                </div>
                <h3 className="text-xl font-semibold text-gray-900">AI Summarization</h3>
                <p className="mt-2 text-base text-gray-600">
                  Quickly distill complex articles and textbooks into key insights using your new custom tool.
                </p>
                <Link to="/summarizer" className="mt-4 block text-sm font-medium text-indigo-600 hover:text-indigo-700">
                  Try it now →
                </Link>
              </div>

              {/* Feature Card 2: Course Management */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg hover:shadow-xl transition duration-300">
                <div className="text-green-600 h-10 w-10 mb-4 flex items-center justify-center rounded-full bg-green-100">
                  📚
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Course Tracking</h3>
                <p className="mt-2 text-base text-gray-600">
                  Stay organized with deadlines, notes, and progress tracking for all your academic subjects.
                </p>
              </div>

              {/* Feature Card 3: Resources/Community */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg hover:shadow-xl transition duration-300">
                <div className="text-amber-600 h-10 w-10 mb-4 flex items-center justify-center rounded-full bg-amber-100">
                  👥
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Collaborative Study</h3>
                <p className="mt-2 text-base text-gray-600">
                  Share notes and form study groups with peers right from your personalized dashboard.
                </p>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* 4. Footer */}
      <footer className="bg-gray-100 border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} EduQuest. All rights reserved.
        </div>
      </footer>

    </div>
  );
}

export default Dashboard;