import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import MyDays from './components/MyDays';
import Borrow from './components/Network';
import Ask from './components/Assistant';
import Onboarding from './components/Onboarding';
import CommunityFeed from './components/CommunityFeed';
import { generateTasks } from './lib/openai';

function App() {
  const [user, setUser] = useState(null);
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('mftdia_user');
    const savedDays = localStorage.getItem('mftdia_days');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedDays) {
      setDays(JSON.parse(savedDays));
    }
    setLoading(false);
  }, []);

  const handleOnboardingComplete = async (userData) => {
    setUser(userData);
    localStorage.setItem('mftdia_user', JSON.stringify(userData));
    
    // Generate tasks
    const generatedTasks = await generateTasks(userData);
    if (generatedTasks && Array.isArray(generatedTasks)) {
      setDays(generatedTasks);
      localStorage.setItem('mftdia_days', JSON.stringify(generatedTasks));
    }
  };

  if (loading) return null;

  if (!user) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MyDays days={days} />} />
          <Route path="feed" element={<CommunityFeed />} />
          <Route path="network" element={<Borrow />} />
          <Route path="assistant" element={<Ask />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
