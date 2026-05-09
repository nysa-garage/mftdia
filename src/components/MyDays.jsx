import React, { useState, useEffect } from 'react';

const MyDays = ({ days = [] }) => {
  const [completedTasks, setCompletedTasks] = useState({});

  useEffect(() => {
    const savedProgress = localStorage.getItem('mftdia_progress');
    if (savedProgress) {
      setCompletedTasks(JSON.parse(savedProgress));
    }
  }, []);

  const toggleTask = (day, taskIndex) => {
    const key = `${day}-${taskIndex}`;
    const newProgress = { ...completedTasks, [key]: !completedTasks[key] };
    setCompletedTasks(newProgress);
    localStorage.setItem('mftdia_progress', JSON.stringify(newProgress));
  };

  if (days.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h2 style={{ color: 'var(--primary)', marginBottom: '2rem' }}>GENERATING YOUR JOURNEY...</h2>
        <p style={{ marginBottom: '2rem' }}>This usually takes 10-15 seconds. If it's been longer, there might be an API issue.</p>
        <button 
          onClick={() => { localStorage.clear(); window.location.reload(); }}
          style={{ backgroundColor: 'transparent', border: '1px solid var(--text)' }}
        >
          RESET & TRY AGAIN
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: 'var(--border-width) solid var(--text)', paddingBottom: '0.5rem' }}>
        <h2 style={{ fontSize: '2rem' }}>YOUR TIMELINE</h2>
        <button 
          onClick={() => { localStorage.clear(); window.location.reload(); }}
          style={{ padding: '0.5rem 1rem', fontSize: '0.7rem', backgroundColor: 'transparent', color: 'var(--text)' }}
        >
          START OVER
        </button>
      </div>
      
      {days.map((dayData) => {
        if (!dayData || !dayData.tasks) return null;
        return (
          <div key={dayData.day} className="card" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: 'var(--primary)', fontSize: '1.5rem', marginBottom: '1rem' }}>DAY {dayData.day}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {dayData.tasks.map((task, idx) => {
                const isDone = completedTasks[`${dayData.day}-${idx}`];
                return (
                  <div 
                    key={idx} 
                    onClick={() => toggleTask(dayData.day, idx)}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: '1rem', 
                      cursor: 'pointer',
                      padding: '0.5rem',
                      border: '1px solid transparent'
                    }}
                  >
                    <div style={{ 
                      width: '24px', 
                      height: '24px', 
                      border: 'var(--border-width) solid var(--text)', 
                      backgroundColor: isDone ? 'var(--primary)' : 'transparent',
                      flexShrink: 0
                    }} />
                    <p className={isDone ? 'strikethrough' : ''} style={{ fontWeight: 700 }}>
                      {task}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyDays;
