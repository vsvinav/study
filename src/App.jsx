import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home, BarChart2, Users, Settings, Menu, X } from 'lucide-react';
import NavItem from './components/NavItem';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Groups from './pages/Groups';
import SettingsPage from './pages/Settings';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import { TimerProvider } from './contexts/TimerContext';
import { DistractionProvider } from './contexts/DistractionContext';


export default function App() {
  const [sessions, setSessions] = useState(() =>
    JSON.parse(localStorage.getItem('sessions') || '[]')
  );
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('sessions', JSON.stringify(sessions));
  }, [sessions]);

  const addSession = (len) => setSessions((prev) => [...prev, len]);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <div className="min-h-screen flex flex-col">
      {isLoggedIn && (
        <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-200 to-indigo-200 text-gray-900 shadow-lg">
          <div className="container mx-auto flex justify-between items-center py-4 px-6">
            <h1 className="text-2xl font-bold">StudyBuddy.ai</h1>
            <div className="hidden md:flex gap-6">
              <NavItem to="/dashboard" icon={<Home size={18} />}>Dashboard</NavItem>
              <NavItem to="/analytics" icon={<BarChart2 size={18} />}>Analytics</NavItem>
              <NavItem to="/groups" icon={<Users size={18} />}>Groups</NavItem>
              <NavItem to="/settings" icon={<Settings size={18} />}>Settings</NavItem>
              <NavItem to="/logout">Logout</NavItem>
            </div>
            <button
              className="block md:hidden text-gray-900 focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          {menuOpen && (
            <div className="md:hidden bg-white text-gray-900">
              <nav className="flex flex-col p-4">
                <NavItem to="/dashboard" icon={<Home size={18} />} onClick={() => setMenuOpen(false)}>Dashboard</NavItem>
                <NavItem to="/analytics" icon={<BarChart2 size={18} />} onClick={() => setMenuOpen(false)}>Analytics</NavItem>
                <NavItem to="/groups" icon={<Users size={18} />} onClick={() => setMenuOpen(false)}>Groups</NavItem>
                <NavItem to="/settings" icon={<Settings size={18} />} onClick={() => setMenuOpen(false)}>Settings</NavItem>
                <NavItem to="/logout" onClick={() => setMenuOpen(false)}>Logout</NavItem>
              </nav>
            </div>
          )}
        </header>
      )}
      <main className="flex-1 p-6">
        <TimerProvider>
          <DistractionProvider>
            <Routes>
              {!isLoggedIn && (
                <>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </>
              )}
              {isLoggedIn && (
                <>
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                  <Route path="/dashboard" element={<Dashboard sessions={sessions} addSession={addSession} />} />
                  <Route path="/analytics" element={<Analytics sessions={sessions} />} />
                  <Route path="/groups" element={<Groups />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/logout" element={<Logout />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </>
              )}
            </Routes>
          </DistractionProvider>
        </TimerProvider>
      </main>
    </div>
  );
}

function Logout() {
  useEffect(() => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/';
  }, []);
  return null;
}