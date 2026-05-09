import React, { useState, useEffect } from 'react';
import { User, Sparkles, Upload } from 'lucide-react';

const Profile = () => {
  const [user, setUser] = useState({});
  const [published, setPublished] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('mftdia_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    const isPublished = localStorage.getItem('mftdia_agent_published');
    if (isPublished) {
      setPublished(true);
    }
  }, []);

  const handlePublish = (e) => {
    e.preventDefault();
    setPublished(true);
    localStorage.setItem('mftdia_agent_published', 'true');
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
        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>PUBLISH YOUR AGENT</h3>
        <p style={{ fontWeight: 700, opacity: 0.8, marginBottom: '1rem' }}>
          Pass your lived experience to the next arrival. Your knowledge becomes an AI agent they can chat with.
        </p>

        {published ? (
          <div className="card" style={{ backgroundColor: 'var(--primary)', color: 'var(--bg)', borderColor: 'var(--bg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Sparkles size={24} />
              <h3 style={{ fontSize: '1.2rem' }}>AGENT PUBLISHED!</h3>
            </div>
            <p style={{ fontWeight: 900 }}>Your agent is now live in the network. Newcomers can adopt your agent to learn from your journey.</p>
          </div>
        ) : (
          <form onSubmit={handlePublish} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 900, marginBottom: '0.5rem', fontSize: '0.8rem' }}>YOUR EXPERTISE (e.g., Finding an apartment in Brooklyn)</label>
              <input type="text" placeholder="What did you figure out the hard way?" required />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 900, marginBottom: '0.5rem', fontSize: '0.8rem' }}>AGENT BIO</label>
              <textarea rows={4} placeholder="Describe what your agent knows..." required style={{ resize: 'vertical' }}></textarea>
            </div>
            <button type="submit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem' }}>
              <Upload size={20} />
              PUBLISH TO NETWORK
            </button>
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
