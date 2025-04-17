import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Analytics({ sessions }) {
  const lineData = sessions.map((len, idx) => ({
    name: `S${idx + 1}`,
    mins: +(len / 60).toFixed(1)
  }));
  const totalMins = sessions.reduce((a, b) => a + b, 0) / 60;
  const consistency = sessions.length
    ? ((sessions.filter(Boolean).length / sessions.length) * 100).toFixed(0)
    : 0;

  // Hardcoded data for AI features
  const smartBreak = "Based on your recent sessions, a 15-min break is recommended at 2 PM.";
  const bestFocusHours = "Your optimal focus period is between 10 AM and 12 PM.";
  const personalizedSchedule = "Suggested schedule: Study 9-11 AM, break 11-11:15 AM, resume 11:15 AM - 1 PM.";

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Analytics</h2>

      <div className="bg-white shadow rounded-2xl p-6">
        <h3 className="font-medium mb-4">Session Lengths</h3>
        {sessions.length ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis unit="m" />
              <Tooltip />
              <Line type="monotone" dataKey="mins" stroke="#2563eb" strokeWidth={2} dot />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500">No data yet.</p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-2xl p-6">
          <h3 className="font-medium mb-4">Total Study Time</h3>
          <p className="text-3xl font-semibold">{totalMins.toFixed(1)} min</p>
        </div>
        <div className="bg-white shadow rounded-2xl p-6">
          <h3 className="font-medium mb-4">Consistency</h3>
          <p className="text-3xl font-semibold">{consistency}%</p>
        </div>
      </div>

      {/* Additional AI Features Section */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center text-center">
          <h4 className="text-xl font-semibold mb-2">Smart Break Recommendations</h4>
          <p className="text-gray-700 mb-4">{smartBreak}</p>
          <button
            onClick={() =>
              alert("Smart Break Recommendations feature will be available soon.")
            }
            className="bg-blue-600 text-white rounded px-4 py-2 transition transform hover:scale-105"
          >
            Learn More
          </button>
        </div>
        <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center text-center">
          <h4 className="text-xl font-semibold mb-2">Best Focus Hours</h4>
          <p className="text-gray-700 mb-4">{bestFocusHours}</p>
          <button
            onClick={() =>
              alert("Best Focus Hours feature will be available soon.")
            }
            className="bg-blue-600 text-white rounded px-4 py-2 transition transform hover:scale-105"
          >
            Learn More
          </button>
        </div>
        <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center text-center">
          <h4 className="text-xl font-semibold mb-2">Personalized Schedules</h4>
          <p className="text-gray-700 mb-4">{personalizedSchedule}</p>
          <button
            onClick={() =>
              alert("Personalized Schedules feature will be available soon.")
            }
            className="bg-blue-600 text-white rounded px-4 py-2 transition transform hover:scale-105"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}