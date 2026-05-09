import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import MyDays from './components/MyDays';
import Borrow from './components/Network';
import Ask from './components/Assistant';
import Onboarding from './components/Onboarding';
import CommunityFeed from './components/CommunityFeed';
import Profile from './components/Profile';
import { generateTasks } from './lib/openai';

function App() {
  const [user, setUser] = useState(null);
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('mftdia_user');
    const savedDays = localStorage.getItem('mftdia_days');
    
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      if (savedDays) {
        setDays(JSON.parse(savedDays));
      } else {
        // If we have a user but no days, try generating them again
        handleGenerate(parsedUser);
      }
    }
    setLoading(false);
  }, []);

  const handleGenerate = async (userData) => {
    setIsGenerating(true);
    const generatedTasks = await generateTasks(userData);
    if (generatedTasks && Array.isArray(generatedTasks) && generatedTasks.length > 0) {
      setDays(generatedTasks);
      localStorage.setItem('mftdia_days', JSON.stringify(generatedTasks));
    }
    setIsGenerating(false);
  };

  const handleOnboardingComplete = async (userData) => {
    setUser(userData);
    localStorage.setItem('mftdia_user', JSON.stringify(userData));
    await handleGenerate(userData);
  };

  if (loading) return null;

  if (!user) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MyDays days={days} isGenerating={isGenerating} />} />
          <Route path="feed" element={<CommunityFeed />} />
          <Route path="network" element={<Borrow />} />
          <Route path="assistant" element={<Ask />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

