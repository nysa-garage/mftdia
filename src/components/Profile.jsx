import React, { useState, useEffect } from 'react';
import { User, Sparkles, Save, Trash2 } from 'lucide-react';

const Profile = () => {
  const [user, setUser] = useState({});
  const [agentData, setAgentData] = useState({
    expertise: '',
    bio: '',
    isActive: true
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('mftdia_user');
    let parsedUser = {};
    if (savedUser) {
      parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
    }
    
    const savedAgent = localStorage.getItem('mftdia_my_agent');
    if (savedAgent) {
      setAgentData(JSON.parse(savedAgent));
    } else if (parsedUser.to) {
      // Auto-spawn defaults based on onboarding
      setAgentData({
        expertise: `Navigating the first 30 days in ${parsedUser.to}`,
        bio: `I recently moved from ${parsedUser.from} to ${parsedUser.to} on a ${parsedUser.visa} visa. I can help you with the immediate transition steps and what to expect on arrival.`,
        isActive: true
      });
    }
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    const newData = { ...agentData, isActive: true };
    setAgentData(newData);
    localStorage.setItem('mftdia_my_agent', JSON.stringify(newData));
  };

  const handleRemove = () => {
    if (window.confirm("Are you sure you want to remove your agent from the network?")) {
      const newData = { ...agentData, isActive: false };
      setAgentData(newData);
      localStorage.setItem('mftdia_my_agent', JSON.stringify(newData));
    }
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', borderBottom: 'var(--border-width) solid var(--text)', paddingBottom: '0.5rem' }}>
        <User size={32} color="var(--primary)" />
        <h2 style={{ fontSize: '2rem' }}>YOUR PROFILE</h2>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>{user.name || 'USER'}</h3>
        <p style={{ fontWeight: 700, opacity: 0.8 }}>From: {user.from || 'Unknown'}</p>
        <p style={{ fontWeight: 700, opacity: 0.8 }}>Visa: {user.visa || 'N/A'}</p>
      </div>

      <div className="accent-border-left" style={{ paddingLeft: '1rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Sparkles size={24} color="var(--primary)" />
          <h3 style={{ fontSize: '1.5rem' }}>YOUR AUTO-SPAWNED AGENT</h3>
        </div>
        <p style={{ fontWeight: 700, opacity: 0.8, marginBottom: '1rem' }}>
          Based on your onboarding, we automatically created an agent representing your lived experience. You can correct its details or remove it.
        </p>

        {!agentData.isActive ? (
          <div className="card" style={{ backgroundColor: 'transparent', borderStyle: 'dashed', textAlign: 'center' }}>
            <p style={{ fontWeight: 900, marginBottom: '1rem' }}>Your agent is currently removed from the network.</p>
            <button 
              onClick={() => {
                const newData = { ...agentData, isActive: true };
                setAgentData(newData);
                localStorage.setItem('mftdia_my_agent', JSON.stringify(newData));
              }}
              style={{ padding: '0.5rem 1rem' }}
            >
              RESTORE AGENT
            </button>
          </div>
        ) : (
          <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-10px', right: '10px', backgroundColor: 'var(--primary)', color: 'var(--bg)', padding: '2px 6px', fontSize: '0.6rem', fontWeight: 900 }}>LIVE</div>
              <div className="card" style={{ padding: '1rem', marginBottom: 0 }}>
                <label style={{ display: 'block', fontWeight: 900, marginBottom: '0.5rem', fontSize: '0.8rem', color: 'var(--primary)' }}>YOUR EXPERTISE</label>
                <input 
                  type="text" 
                  value={agentData.expertise} 
                  onChange={(e) => setAgentData({...agentData, expertise: e.target.value})} 
                  required 
                  style={{ border: 'none', borderBottom: '2px solid var(--text)', padding: '0.5rem 0', marginBottom: '1rem' }} 
                />
                
                <label style={{ display: 'block', fontWeight: 900, marginBottom: '0.5rem', fontSize: '0.8rem', color: 'var(--primary)' }}>AGENT BIO</label>
                <textarea 
                  rows={4} 
                  value={agentData.bio} 
                  onChange={(e) => setAgentData({...agentData, bio: e.target.value})} 
                  required 
                  style={{ border: '1px solid var(--text)', padding: '0.5rem' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="submit" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <Save size={20} />
                UPDATE AGENT
              </button>
              <button 
                type="button" 
                onClick={handleRemove} 
                style={{ backgroundColor: 'transparent', color: 'var(--text)', border: '1px solid var(--text)', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                title="Remove Agent"
              >
                <Trash2 size={20} color="red" />
              </button>
            </div>
          </form>
        )}
      </div>
      
      <button 
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
        style={{ width: '100%', backgroundColor: 'transparent', color: 'var(--text)', border: '1px solid var(--text)' }}
      >
        LOG OUT / RESET APP
      </button>
    </div>
  );
};

export default Profile;
