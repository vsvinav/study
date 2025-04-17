import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ChevronRight, Star, Users, BarChart2 } from 'lucide-react';

// Logo Component (custom SVG)
function Logo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="40" height="40" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="45" stroke="#374151" strokeWidth="10" />
        <path d="M30 50 L45 35 L70 65" stroke="#374151" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-2xl font-bold text-primary">StudyBuddy.ai</span>
    </div>
  );
}

// Navigation Component
function NavBar({ menuOpen, setMenuOpen }) {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Logo />
        
        <button className="md:hidden text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <nav className="flex flex-col p-4">
            <NavLink to="/dashboard" onClick={() => setMenuOpen(false)} className="py-2 border-b text-gray-700 hover:text-primary">Dashboard</NavLink>
            <NavLink to="/groups" onClick={() => setMenuOpen(false)} className="py-2 border-b text-gray-700 hover:text-primary">Groups</NavLink>
            <NavLink to="/analytics" onClick={() => setMenuOpen(false)} className="py-2 border-b text-gray-700 hover:text-primary">Analytics</NavLink>
            <NavLink to="/settings" onClick={() => setMenuOpen(false)} className="py-2 text-gray-700 hover:text-primary">Settings</NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [animatedText, setAnimatedText] = useState("Master Your Study Time with AI");

  useEffect(() => {
    const messages = [
      "Master Your Study Time with AI",
      "Boost Your Productivity",
      "Transform Your Learning Experience",
      "Achieve More, Stress Less"
    ];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % messages.length;
      setAnimatedText(messages[index]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/hero-minimal.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/60 via-transparent to-gray-900/60"></div>
<div className="relative z-10 text-center px-4">
  <h1 className="text-5xl md:text-7xl font-extrabold text-blue animate-fadeInUp">
    {animatedText}
  </h1>
  <p className="mt-4 text-xl md:text-2xl text-black-200 animate-fadeInUp delay-150">
    Experience smart study techniques powered by AI insights.
  </p>
  <Link
    to="/auth"
    className="mt-8 inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-primary rounded-lg shadow-lg transition transform hover:scale-105 animate-pulse"
  >
    Get Started <ChevronRight size={20} />
  </Link>
</div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose StudyTime?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-6 bg-white rounded-lg shadow transform transition hover:scale-105">
              <Star size={48} className="mx-auto mb-4 text-primary" />
              <h4 className="text-xl font-semibold mb-2 text-center">AI Insights</h4>
              <p className="text-center text-gray-600">Personalized recommendations to enhance your focus.</p>
            </div>
            <div className="card p-6 bg-white rounded-lg shadow transform transition hover:scale-105">
              <Users size={48} className="mx-auto mb-4 text-primary" />
              <h4 className="text-xl font-semibold mb-2 text-center">Collaborative Groups</h4>
              <p className="text-center text-gray-600">Connect with peers and elevate your learning together.</p>
            </div>
            <div className="card p-6 bg-white rounded-lg shadow transform transition hover:scale-105">
              <BarChart2 size={48} className="mx-auto mb-4 text-primary" />
              <h4 className="text-xl font-semibold mb-2 text-center">Analytics</h4>
              <p className="text-center text-gray-600">Visualize your progress and master your study routine.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Users Say</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg shadow-lg transform transition hover:scale-105">
              <p className="italic text-gray-700 mb-4">"This app transformed my study habits – the AI insights are truly revolutionary!"</p>
              <h4 className="text-lg font-semibold text-primary text-center">- Alice</h4>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg shadow-lg transform transition hover:scale-105">
              <p className="italic text-gray-700 mb-4">"Intuitive design, brilliant analytics, and interactive features that keep me motivated."</p>
              <h4 className="text-lg font-semibold text-primary text-center">- Bob</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Extra Interactive Content Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-8">Ready to Supercharge Your Study?</h3>
          <p className="mb-8 text-gray-700 text-lg md:text-xl">
            Dive into a world where smart insights and sleek design come together to amplify your productivity.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-primary rounded-lg shadow-lg transition transform hover:scale-105"
          >
            Explore Dashboard <ChevronRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p className="mb-2">&copy; 2025 StudyBuddy. All rights reserved.</p>
          <p className="text-sm text-gray-400">Designed with passion & crafted for excellence.</p>
        </div>
      </footer>
    </div>
  );
}