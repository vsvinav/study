import React, { useState, useEffect } from 'react';

export default function Settings() {
  // Retrieve existing settings from localStorage
  const [autoTrack, setAutoTrack] = useState(localStorage.getItem("autoTrack") === "true");
  const [breakInterval, setBreakInterval] = useState(Number(localStorage.getItem("breakInterval")) || 50);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
  const [achievements, setAchievements] = useState([
    { id: 1, title: "First Session", unlocked: false },
    { id: 2, title: "Half-Hour Studier", unlocked: false },
    { id: 3, title: "Consistent Learner", unlocked: false }
  ]);

  // Persist settings to localStorage and update dark mode class
  useEffect(() => {
    localStorage.setItem("autoTrack", autoTrack);
  }, [autoTrack]);

  useEffect(() => {
    localStorage.setItem("breakInterval", breakInterval);
  }, [breakInterval]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.documentElement.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  // When an achievement is clicked, unlock it if it is not already unlocked.
  const toggleAchievement = (id) => {
    setAchievements((prev) =>
      prev.map((ach) => {
        if (ach.id === id && !ach.unlocked) {
          alert(`Achievement Unlocked: ${ach.title}`);
          return { ...ach, unlocked: true };
        }
        return ach;
      })
    );
  };

  // Reset all achievements to locked.
  const resetAchievements = () => {
    setAchievements((prev) =>
      prev.map((ach) => ({ ...ach, unlocked: false }))
    );
  };

  return (
    <div className="space-y-8 max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold">Settings</h2>
      
      {/* Auto Tracking Toggle */}
      <div className="bg-white shadow rounded-2xl p-6">
        <label className="flex items-center gap-4">
          <input 
            type="checkbox" 
            checked={autoTrack} 
            onChange={(e) => setAutoTrack(e.target.checked)} 
            className="h-5 w-5"
          />
          <span className="text-lg">Enable auto‑tracking (experimental)</span>
        </label>
      </div>

      {/* Break Reminder Interval */}
      <div className="bg-white shadow rounded-2xl p-6">
        <label className="block font-medium mb-2">Break Reminder Interval (minutes)</label>
        <input 
          type="range" 
          min="5" 
          max="90" 
          step="5" 
          value={breakInterval} 
          onChange={(e) => setBreakInterval(Number(e.target.value))} 
          className="w-full"
        />
        <p className="mt-2 text-gray-700">
          Current interval: <span className="font-semibold">{breakInterval}</span> minutes
        </p>
      </div>

      {/* Dark Mode Toggle */}
      <div className="bg-white shadow rounded-2xl p-6">
        <label className="flex items-center gap-4">
          <input 
            type="checkbox" 
            checked={darkMode} 
            onChange={(e) => setDarkMode(e.target.checked)} 
            className="h-5 w-5"
          />
          <span className="text-lg">Enable Dark Mode</span>
        </label>
      </div>

      {/* Interactive Achievements Section */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h3 className="text-xl font-semibold mb-3">Achievements</h3>
        <ul className="space-y-2">
          {achievements.map((ach) => (
            <li
              key={ach.id}
              onClick={() => toggleAchievement(ach.id)}
              className={`p-2 rounded cursor-pointer transition-colors duration-200 border ${
                ach.unlocked ? "bg-green-100 border-green-500" : "bg-gray-100 border-gray-400 hover:bg-gray-200"
              }`}
            >
              {ach.title} {ach.unlocked && <span className="text-green-700 font-semibold ml-2">Unlocked!</span>}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex gap-4">
          <button 
            onClick={resetAchievements}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Reset Achievements
          </button>
        </div>
      </div>
    </div>
  );
}