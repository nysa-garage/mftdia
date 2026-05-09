import React, { useState, useEffect } from 'react';
import { Plus, MessageCircle, ArrowBigUp, ArrowBigDown } from 'lucide-react';

const CommunityFeed = () => {
  const [city, setCity] = useState('');
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Immigrant_99",
      city: "New York City",
      question: "What's the best way to get a lease without an SSN in Queens?",
      votes: 156,
      comments: 24,
      time: "2h ago"
    },
    {
      id: 2,
      user: "MovingSoon_01",
      city: "New York City",
      question: "Anyone have recommendations for health insurance for new arrivals on O-1?",
      votes: 42,
      comments: 12,
      time: "5h ago"
    },
    {
      id: 3,
      user: "VisaExpert_NYC",
      city: "New York City",
      question: "Pro tip: You can use your passport and foreign credit history to open an account at some HSBC branches.",
      votes: 312,
      comments: 56,
      time: "8h ago"
    }
  ]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('mftdia_user') || '{}');
    if (user.to) setCity(user.to);
  }, []);

  return (
    <div className="animate-fade-in" style={{ position: 'relative', minHeight: '100%' }}>
      <div style={{ backgroundColor: 'var(--accent)', padding: '1rem', marginBottom: '1.5rem', borderBottom: 'var(--border-width) solid var(--primary)' }}>
        <h2 style={{ color: 'var(--primary)', fontSize: '1.5rem' }}>COMMUNITY FEED</h2>
        <p style={{ fontWeight: 900, color: 'var(--text)', fontSize: '0.8rem' }}>TRENDING IN {city.toUpperCase()}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {posts.map(post => (
          <div key={post.id} className="card" style={{ padding: '0' }}>
            <div style={{ padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontWeight: 900, marginBottom: '0.5rem', opacity: 0.7 }}>
                <span>u/{post.user}</span>
                <span>{post.time}</span>
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', textTransform: 'none' }}>{post.question}</h3>
              
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#1A1A1A', padding: '0.2rem 0.5rem', border: '1px solid var(--text)' }}>
                  <ArrowBigUp size={20} />
                  <span style={{ fontWeight: 900 }}>{post.votes}</span>
                  <ArrowBigDown size={20} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MessageCircle size={20} />
                  <span style={{ fontWeight: 900 }}>{post.comments}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button style={{
        position: 'fixed',
        bottom: '90px',
        right: '20px',
        width: '60px',
        height: '60px',
        borderRadius: '0',
        backgroundColor: 'var(--primary)',
        color: 'var(--bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '4px 4px 0px var(--text)',
        zIndex: 10
      }}>
        <Plus size={32} strokeWidth={3} />
      </button>
    </div>
  );
};

export default CommunityFeed;
