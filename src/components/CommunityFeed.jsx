import React, { useState, useEffect } from 'react';
import { Plus, MessageCircle, ArrowBigUp, ArrowBigDown, X, Send } from 'lucide-react';

const CommunityFeed = () => {
  const [city, setCity] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newPostText, setNewPostText] = useState('');
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Immigrant_99",
      city: "New York City",
      question: "What's the best way to get a lease without an SSN in Queens?",
      body: "I just moved here and everywhere I look requires a 700+ credit score and an SSN. I only have an ITIN and some foreign credit. Any landlords or agencies that are more lenient?",
      votes: 156,
      comments: 24,
      time: "2h ago"
    },
    {
      id: 2,
      user: "MovingSoon_01",
      city: "New York City",
      question: "Anyone have recommendations for health insurance for new arrivals on O-1?",
      body: "Trying to figure out the marketplace vs private insurance. It's so confusing.",
      votes: 42,
      comments: 12,
      time: "5h ago"
    },
    {
      id: 3,
      user: "VisaExpert_NYC",
      city: "New York City",
      question: "Pro tip: You can use your passport and foreign credit history to open an account at some HSBC branches.",
      body: "Just wanted to share this because it saved me weeks of headache.",
      votes: 312,
      comments: 56,
      time: "8h ago"
    }
  ]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('mftdia_user') || '{}');
    if (user.to) setCity(user.to);
  }, []);

  const handleAddPost = (e) => {
    e.preventDefault();
    if (!newPostText.trim()) return;
    
    const newPost = {
      id: Date.now(),
      user: "You",
      city: city || "Unknown",
      question: newPostText,
      body: "",
      votes: 1,
      comments: 0,
      time: "Just now"
    };
    
    setPosts([newPost, ...posts]);
    setNewPostText('');
    setIsAdding(false);
  };

  if (selectedPost) {
    return (
      <div className="animate-fade-in" style={{ padding: '1rem', minHeight: '100%' }}>
        <button 
          onClick={() => setSelectedPost(null)}
          style={{ backgroundColor: 'transparent', border: '1px solid var(--text)', padding: '0.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <X size={16} /> BACK TO FEED
        </button>
        
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 900, marginBottom: '1rem', opacity: 0.7 }}>
            <span>u/{selectedPost.user}</span>
            <span>{selectedPost.time}</span>
          </div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', textTransform: 'none' }}>{selectedPost.question}</h2>
          {selectedPost.body && <p style={{ fontWeight: 700, marginBottom: '1.5rem', lineHeight: 1.5 }}>{selectedPost.body}</p>}
          
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', borderTop: '1px solid var(--text)', paddingTop: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ArrowBigUp size={24} color="var(--primary)" />
              <span style={{ fontWeight: 900, fontSize: '1.2rem' }}>{selectedPost.votes}</span>
              <ArrowBigDown size={24} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageCircle size={24} />
              <span style={{ fontWeight: 900 }}>{selectedPost.comments} Comments</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isAdding) {
    return (
      <div className="animate-fade-in" style={{ padding: '1rem', minHeight: '100%' }}>
        <button 
          onClick={() => setIsAdding(false)}
          style={{ backgroundColor: 'transparent', border: '1px solid var(--text)', padding: '0.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <X size={16} /> CANCEL
        </button>
        
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--primary)' }}>ASK THE COMMUNITY</h2>
        <form onSubmit={handleAddPost} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <textarea 
            rows={6}
            placeholder="What do you need help with?"
            value={newPostText}
            onChange={(e) => setNewPostText(e.target.value)}
            style={{ resize: 'vertical' }}
            required
          />
          <button type="submit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <Send size={20} />
            POST TO {city ? city.toUpperCase() : 'COMMUNITY'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ position: 'relative', minHeight: '100%' }}>
      <div style={{ backgroundColor: 'var(--accent)', padding: '1rem', marginBottom: '1.5rem', borderBottom: 'var(--border-width) solid var(--primary)' }}>
        <h2 style={{ color: 'var(--primary)', fontSize: '1.5rem' }}>COMMUNITY FEED</h2>
        <p style={{ fontWeight: 900, color: 'var(--text)', fontSize: '0.8rem' }}>TRENDING IN {city.toUpperCase()}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {posts.map(post => (
          <div 
            key={post.id} 
            className="card" 
            style={{ padding: '0', cursor: 'pointer', transition: 'border-color 0.2s' }}
            onClick={() => setSelectedPost(post)}
          >
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

      <button 
        onClick={() => setIsAdding(true)}
        style={{
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
        }}
      >
        <Plus size={32} strokeWidth={3} />
      </button>
    </div>
  );
};

export default CommunityFeed;
