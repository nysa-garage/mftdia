import React, { useState } from 'react';
import { Send, MapPin, Link as LinkIcon, User } from 'lucide-react';

const PeerChat = ({ connection, onBack }) => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      type: 'text', 
      sender: 'them', 
      content: "Hey! I saw you're moving to Astoria. I actually have a great contact for a landlord who doesn't require a US credit score." 
    },
    {
      id: 2,
      type: 'contact',
      sender: 'them',
      name: "Jim (Astoria Rentals)",
      info: "+1 (555) 123-4567",
      note: "Tell him Ahmed sent you."
    },
    {
      id: 3,
      type: 'location',
      sender: 'them',
      label: "Best Cheap Supermarket",
      address: "30th Ave & 31st St, Queens"
    }
  ]);

  return (
    <div className="animate-fade-in" style={{ height: 'calc(100vh - 180px)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1rem', borderBottom: 'var(--border-width) solid var(--text)', marginBottom: '1rem' }}>
        <button onClick={onBack} style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem' }}>BACK</button>
        <h3 style={{ textTransform: 'none' }}>Chat with {connection.name}</h3>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ 
            alignSelf: msg.sender === 'me' ? 'flex-end' : 'flex-start',
            maxWidth: '85%',
            backgroundColor: msg.sender === 'me' ? 'var(--accent)' : '#1A1A1A',
            border: '2px solid var(--text)',
            padding: '0.8rem'
          }}>
            {msg.type === 'text' && <p style={{ fontWeight: 700 }}>{msg.content}</p>}
            
            {msg.type === 'contact' && (
              <div style={{ backgroundColor: 'var(--bg)', border: '2px solid var(--primary)', padding: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <User size={16} />
                  <span style={{ fontWeight: 900 }}>{msg.name}</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>{msg.info}</p>
                <p style={{ fontSize: '0.7rem', opacity: 0.7 }}>{msg.note}</p>
              </div>
            )}

            {msg.type === 'location' && (
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <MapPin size={24} color="var(--primary)" />
                <div>
                  <p style={{ fontWeight: 900 }}>{msg.label}</p>
                  <p style={{ fontSize: '0.7rem', opacity: 0.7 }}>{msg.address}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '1rem', borderTop: 'var(--border-width) solid var(--text)', paddingTop: '1rem', display: 'flex', gap: '0.5rem' }}>
        <input type="text" placeholder="SHARE SOMETHING..." style={{ flex: 1, border: 'none' }} />
        <button style={{ width: '50px', height: '50px', padding: 0 }}><Send size={24} /></button>
      </div>
    </div>
  );
};

export default PeerChat;
