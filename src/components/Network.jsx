import React, { useState, useEffect } from 'react';
import { ShieldCheck, Download, Users } from 'lucide-react';

const Borrow = () => {
  const [adoptedAgents, setAdoptedAgents] = useState([]);
  
  const veterans = [
    {
      id: 'priya_jc',
      name: "Priya",
      location: "Jersey City",
      arrival: "2 years ago",
      specialty: "Housing & Tax Shortcuts",
      description: "My agent has my actual landlord's contact (no credit check) and my accountant who specializes in H-1B filings.",
      vouches: 124
    },
    {
      id: 'ahmed_astoria',
      name: "Ahmed",
      location: "Astoria, Queens",
      arrival: "3 years ago",
      specialty: "Cheap Eats & Local Transit",
      description: "I've mapped out every 'buy 1 get 1' grocery spot in Astoria and the hidden N-train shortcuts.",
      vouches: 89
    },
    {
      id: 'soo_flushing',
      name: "Soo-Yeon",
      location: "Flushing",
      arrival: "18 months ago",
      specialty: "Education & Schools",
      description: "How to navigate the NYC public school system for new arrivals. My agent knows the best bilingual programs.",
      vouches: 212
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('orbit_adopted_agents');
    if (saved) setAdoptedAgents(JSON.parse(saved));
  }, []);

  const toggleAdopt = (agent) => {
    let newAdopted;
    if (adoptedAgents.find(a => a.id === agent.id)) {
      newAdopted = adoptedAgents.filter(a => a.id !== agent.id);
    } else {
      newAdopted = [...adoptedAgents, agent];
    }
    setAdoptedAgents(newAdopted);
    localStorage.setItem('orbit_adopted_agents', JSON.stringify(newAdopted));
  };

  return (
    <div className="animate-fade-in">
      <div style={{ backgroundColor: 'var(--accent)', padding: '1rem', marginBottom: '1.5rem', borderBottom: 'var(--border-width) solid var(--primary)' }}>
        <h2 style={{ color: 'var(--primary)', fontSize: '1.5rem' }}>BORROW CONTEXT</h2>
        <p style={{ fontWeight: 900, color: 'var(--text)', fontSize: '0.8rem' }}>ADOPT AGENTS FROM VETERANS WHO'VE BEEN THERE.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {veterans.map(vet => {
          const isAdopted = adoptedAgents.find(a => a.id === vet.id);
          return (
            <div key={vet.id} className="card" style={{ borderLeft: isAdopted ? '12px solid var(--primary)' : '12px solid var(--accent)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <h3 style={{ textTransform: 'none', fontSize: '1.5rem' }}>{vet.name}'s Agent</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: 'var(--primary)' }}>
                  <ShieldCheck size={16} />
                  <span style={{ fontWeight: 900, fontSize: '0.7rem' }}>{vet.vouches} VOUCHES</span>
                </div>
              </div>
              
              <p style={{ fontSize: '0.7rem', fontWeight: 900, opacity: 0.7, marginBottom: '1rem' }}>
                {vet.location.toUpperCase()} • ARRIVED {vet.arrival.toUpperCase()}
              </p>
              
              <div style={{ backgroundColor: '#1A1A1A', padding: '0.8rem', marginBottom: '1rem', border: '1px solid var(--text)' }}>
                <p style={{ fontWeight: 900, fontSize: '0.8rem', color: 'var(--primary)', marginBottom: '0.3rem' }}>SPECIALTY: {vet.specialty.toUpperCase()}</p>
                <p style={{ fontSize: '0.9rem', fontWeight: 700, lineHeight: 1.2 }}>"{vet.description}"</p>
              </div>

              <button 
                onClick={() => toggleAdopt(vet)}
                style={{ 
                  width: '100%', 
                  backgroundColor: isAdopted ? 'transparent' : 'var(--accent)',
                  color: 'var(--text)',
                  border: 'var(--border-width) solid var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem'
                }}
              >
                {isAdopted ? 'ADOPTED ✓' : <><Download size={20} /> ADOPT AGENT</>}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Borrow;
