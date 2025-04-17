import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, StopCircle, Bell, UploadCloud } from 'lucide-react';
import { useTimerContext } from '../contexts/TimerContext';
import { useDistractionContext } from '../contexts/DistractionContext';
import { formatTime } from '../utils/time';

export default function Dashboard({ sessions, addSession }) {
  const { seconds, running, start, pause, reset } = useTimerContext();
  const { count: distractionCount } = useDistractionContext();
  const [quote, setQuote] = useState("Every minute counts!");
  const [aiInsight, setAiInsight] = useState("Your study session is on track. Consider a short break soon!");
  const motivationalQuotes = [
    "Every minute counts!",
    "Keep pushing forward!",
    "You're doing great!",
    "Stay focused and conquer!",
    "Believe in yourself!"
  ];
  const aiMessages = [
    "Did you know? Consistency builds mastery.",
    "AI Insight: A brief pause can boost your focus.",
    "Your current study rhythm is impressive!",
    "AI says: A short break can help retention.",
    "Keep it up! Each minute teaches you something new."
  ];

  // Update motivational quote every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const randIndex = Math.floor(Math.random() * motivationalQuotes.length);
      setQuote(motivationalQuotes[randIndex]);
    }, 30000);
    return () => clearInterval(interval);
  }, [motivationalQuotes]);

  // Retrieve break interval from localStorage – default to 10 minutes if not set
  const breakSetting = Number(localStorage.getItem("breakInterval")) || 10;
  const breakPeriod = breakSetting * 60; // in seconds

  // Update random AI message every 30 seconds
  const [randomAI, setRandomAI] = useState(aiMessages[0]);
  useEffect(() => {
    const interval = setInterval(() => {
      const randIndex = Math.floor(Math.random() * aiMessages.length);
      setRandomAI(aiMessages[randIndex]);
    }, 30000);
    return () => clearInterval(interval);
  }, [aiMessages]);

  // Update AI insights and save session data (including placeholders) for future model training
  useEffect(() => {
    const timeSinceBreak = seconds % breakPeriod;
    const timeToBreak = breakPeriod - timeSinceBreak;
    let countdownMessage = "";
    if (seconds < 60) {
      countdownMessage = "Start studying to unlock your personalized AI insights!";
    } else if (timeToBreak <= 60) {
      countdownMessage = "Great work! It's almost time to take a break.";
    } else {
      const minutesLeft = Math.floor(timeToBreak / 60);
      const secondsLeft = timeToBreak % 60;
      countdownMessage = `Keep focused! Just ${minutesLeft} min ${secondsLeft} sec until your next break.`;
    }
    // Combine countdown with additional feature placeholders
    const newInsight = `${countdownMessage} ${randomAI}`;
    setAiInsight(newInsight);

    // Save session data (with placeholder insights) to localStorage for later model training
    const sessionData = JSON.parse(localStorage.getItem("sessionData") || "[]");
    const currentSession = {
      duration: seconds,
      distractions: distractionCount,
      timestamp: new Date().toISOString(),
      breakInterval: breakSetting,
      placeholderInsights: {
        smartBreakRecommendation: "Pending",
        bestFocusHours: "Pending",
        personalizedSchedule: "Pending"
      }
    };
    if (seconds !== 0 && (sessionData.length === 0 || sessionData[sessionData.length - 1].duration !== seconds)) {
      sessionData.push(currentSession);
      localStorage.setItem("sessionData", JSON.stringify(sessionData));
    }
  }, [seconds, breakPeriod, randomAI, distractionCount, breakSetting]);

  const endSession = () => {
    if (seconds > 0) {
      addSession(seconds);
      alert(`Session recorded: ${formatTime(seconds)}`);
    }
    reset();
  };

  // Export session data (including new feature placeholders) as a CSV file
  const exportData = () => {
    const sessionData = JSON.parse(localStorage.getItem("sessionData") || "[]");
    if (!sessionData.length) {
      alert("No session data to export.");
      return;
    }
    const header = "Session,Duration (sec),Distractions,Timestamp,Break Interval (min),Smart Break Recommendation,Best Focus Hours,Personalized Schedule\n";
    const rows = sessionData.map((sess, idx) =>
      `${idx + 1},${sess.duration},${sess.distractions},${sess.timestamp},${sess.breakInterval},${sess.placeholderInsights.smartBreakRecommendation},${sess.placeholderInsights.bestFocusHours},${sess.placeholderInsights.personalizedSchedule}`
    ).join("\n");
    const csvContent = header + rows;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const aLink = document.createElement("a");
    aLink.href = url;
    aLink.setAttribute("download", "session_data.csv");
    document.body.appendChild(aLink);
    aLink.click();
    document.body.removeChild(aLink);
  };

  // Display a break reminder alert on new cycle
  const lastBreakAlert = useRef(0);
  useEffect(() => {
    if (seconds > 0) {
      const cycles = Math.floor(seconds / breakPeriod);
      if (cycles > lastBreakAlert.current) {
        lastBreakAlert.current = cycles;
        alert(`Break Alert! You have studied for ${breakSetting} minutes. Time to take a break!`);
      }
    }
  }, [seconds, breakPeriod, breakSetting]);

  return (
    <div className="space-y-8">
      {/* Timer and Controls Section */}
      <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center text-center">
        <h2 className="text-5xl font-bold mb-4">{formatTime(seconds)}</h2>
        <div className="flex gap-4 mb-4">
          {!running ? (
            <button 
              onClick={start}
              className="bg-green-500 text-white rounded-xl px-6 py-2 flex items-center gap-1 transform transition hover:scale-105"
            >
              <Play size={16} /> Start
            </button>
          ) : (
            <button 
              onClick={pause}
              className="border border-gray-400 text-gray-700 rounded-xl px-6 py-2 flex items-center gap-1 transform transition hover:scale-105"
            >
              <Pause size={16} /> Pause
            </button>
          )}
          <button 
            onClick={endSession}
            disabled={seconds === 0 && !running}
            className="bg-red-600 text-white rounded-xl px-6 py-2 flex items-center gap-1 transform transition hover:scale-105 disabled:opacity-40"
          >
            <StopCircle size={16} /> End
          </button>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Bell size={14} /> Distractions this session: {distractionCount}
        </div>
        <button
          onClick={exportData}
          className="mt-4 flex items-center gap-2 bg-blue-600 text-white rounded px-4 py-2 transform transition hover:scale-105"
        >
          <UploadCloud size={16} /> Export Data
        </button>
      </div>
      
      {/* AI Insights Section */}
      <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center">
        <h3 className="text-2xl font-semibold mb-2">AI Insight</h3>
        <p className="text-lg text-gray-700">{aiInsight}</p>
      </div>
      
      {/* Motivational Quote Section */}
      <div className="bg-blue-100 shadow-inner rounded-xl p-6 text-center">
        <p className="text-xl font-medium text-blue-700">{quote}</p>
      </div>
      
      {/* Enhanced Additional AI Features Section */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center text-center">
          <h4 className="text-xl font-semibold mb-2">Smart Break Recommendations</h4>
          <p className="text-gray-700 mb-4">Your fatigue levels will be analyzed to suggest optimal break times.</p>
          <button
            onClick={() => alert("Smart Break Recommendations will be unlocked after we collect 60 data points—enough to train a personalized model tailored to your habits.")}
            className="bg-blue-600 text-white rounded px-4 py-2 transform transition hover:scale-105"
          >
            Learn More
          </button>
        </div>
        <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center text-center">
          <h4 className="text-xl font-semibold mb-2">Best Focus Hours</h4>
          <p className="text-gray-700 mb-4">We will suggest your ideal focus hours based on your past performance.</p>
          <button
            onClick={() => alert("Best Focus Hours feature will be available soon.")}
            className="bg-blue-600 text-white rounded px-4 py-2 transform transition hover:scale-105"
          >
            Learn More
          </button>
        </div>
        <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center text-center">
          <h4 className="text-xl font-semibold mb-2">Personalized Schedules</h4>
          <p className="text-gray-700 mb-4">Receive tailored schedules and insights to optimize your learning.</p>
          <button
            onClick={() => alert("Personalized Schedules feature will be available soon.")}
            className="bg-blue-600 text-white rounded px-4 py-2 transform transition hover:scale-105"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}