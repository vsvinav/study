import React, { useState, useEffect } from 'react';
import { Crown, Trophy, AlertCircle, Users } from 'lucide-react';
import { useTimerContext } from '../contexts/TimerContext';

const dummyGroups = [
  {
    name: 'CS‑Study‑Buddies',
    leaderboard: [
      { name: 'Alice', mins: 320 },
      { name: 'Bob', mins: 250 },
      { name: 'Carol', mins: 180 },
    ],
  },
  {
    name: 'MathWizards',
    leaderboard: [
      { name: 'Dave', mins: 400 },
      { name: 'Eve', mins: 350 },
      { name: 'Frank', mins: 280 },
      { name: 'Grace', mins: 220 },
    ],
  },
  {
    name: 'SciEnthusiasts',
    leaderboard: [
      { name: 'Heidi', mins: 450 },
      { name: 'Ivan', mins: 300 },
      { name: 'Judy', mins: 270 },
      { name: 'Mallory', mins: 240 },
    ],
  },
];

export default function Groups() {
  // Retrieve username from localStorage (assumes 'user' is stored as JSON)
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const currentUser = storedUser.username || "Unknown";

  // Load groups from localStorage if available, otherwise use dummyGroups
  const initialGroups = JSON.parse(localStorage.getItem('groups') || 'null') || dummyGroups;
  const [groups, setGroups] = useState(initialGroups);
  const [selectedGroup, setSelectedGroup] = useState(groups[0]);
  const [joined, setJoined] = useState(
    selectedGroup.leaderboard.some((user) => user.name === currentUser)
  );

  // Get current timer seconds from TimerContext (if not started then seconds will be 0)
  const { seconds } = useTimerContext();

  // Persist groups to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('groups', JSON.stringify(groups));
  }, [groups]);

  // Update selected group when user changes the dropdown.
  const handleGroupChange = (e) => {
    const groupName = e.target.value;
    const grp = groups.find((g) => g.name === groupName);
    setSelectedGroup(grp);
    setJoined(grp.leaderboard.some((user) => user.name === currentUser));
  };

  // When joining: add the current username to the leaderboard with current timer minutes (or 0) if not already present.
  const joinGroup = () => {
    if (!joined) {
      const currentMins = Math.floor(seconds / 60);
      const updatedGroup = {
        ...selectedGroup,
        leaderboard: selectedGroup.leaderboard.some((user) => user.name === currentUser)
          ? selectedGroup.leaderboard
          : [...selectedGroup.leaderboard, { name: currentUser, mins: currentMins }],
      };
      setSelectedGroup(updatedGroup);
      setGroups((prev) =>
        prev.map((g) => (g.name === updatedGroup.name ? updatedGroup : g))
      );
      setJoined(true);
    }
  };

  const challengeGroup = () => {
    alert(`Challenge sent to ${selectedGroup.name}!`);
  };

  // Calculate group average study time.
  const averageTime = Math.floor(
    selectedGroup.leaderboard.reduce((sum, user) => sum + user.mins, 0) /
      selectedGroup.leaderboard.length
  );

  return (
    <div className="space-y-8 p-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center">Study Groups</h2>
      
      {/* Group Selection */}
      <div className="flex flex-col items-center">
        <label className="mb-2 text-lg font-medium">
          Select Your Group:
        </label>
        <select
          value={selectedGroup.name}
          onChange={handleGroupChange}
          className="p-2 border border-gray-300 rounded"
        >
          {groups.map((group) => (
            <option key={group.name} value={group.name}>
              {group.name}
            </option>
          ))}
        </select>
      </div>

      {/* Group Actions */}
      <div className="flex justify-center gap-4">
        {!joined ? (
          <button
            onClick={joinGroup}
            className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            <Users size={18} className="mr-2" /> Join Group
          </button>
        ) : (
          <div className="flex items-center gap-2 text-green-700 font-semibold">
            <Users size={18} /> Joined
          </div>
        )}
        <button
          onClick={challengeGroup}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          <AlertCircle size={18} className="mr-2" /> Challenge Group
        </button>
      </div>

      {/* Group Leaderboard */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Crown size={24} className="text-yellow-500" />
          <h3 className="text-2xl font-semibold">{selectedGroup.name} Leaderboard</h3>
        </div>
        <ol className="divide-y divide-gray-200">
          {selectedGroup.leaderboard.map((user, idx) => (
            <li key={user.name} className="flex justify-between py-2 px-4">
              <span className="font-medium">{idx + 1}. {user.name}</span>
              <span className="text-gray-600">{user.mins} min</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Gamification Stats */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center">
          <Trophy size={32} className="text-purple-500 mb-2" />
          <h4 className="text-xl font-semibold mb-1">Group Average Study Time</h4>
          <p className="text-gray-700">{averageTime} min</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center">
          <Trophy size={32} className="text-red-500 mb-2" />
          <h4 className="text-xl font-semibold mb-1">Top Performer</h4>
          <p className="text-gray-700">{selectedGroup.leaderboard[0]?.name || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}