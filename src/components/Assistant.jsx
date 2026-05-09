import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, Sparkles } from 'lucide-react';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || 'sk-placeholder',
  dangerouslyAllowBrowser: true
});

const Ask = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [adoptedAgents, setAdoptedAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('orbit_adopted_agents');
    if (saved) {
      const parsed = JSON.parse(saved);
      setAdoptedAgents(parsed);
      if (parsed.length > 0) setSelectedAgent(parsed[0]);
    }
    
    setMessages([{ 
      role: 'assistant', 
      content: "I'm ready. Which veteran's knowledge should I use today?" 
    }]);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !selectedAgent) return;
    
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem('mftdia_user') || '{}');
      
      const systemPrompt = `You are ${selectedAgent.name}'s personal AI agent. 
      You are helping a newcomer who is moving from ${user.from} to ${user.to} on a ${user.visa} visa.
      
      YOUR KNOWLEDGE BASE (Lived Experience):
      - Specialty: ${selectedAgent.specialty}
      - Core Advice: ${selectedAgent.description}
      - Location: ${selectedAgent.location}
      
      RULES:
      1. Always speak as ${selectedAgent.name}'s proxy. Use "I" to refer to ${selectedAgent.name}'s experiences.
      2. Be extremely specific. Mention actual places, services, or shortcuts ${selectedAgent.name} knows.
      3. If asked about something outside your specialty, give a brief answer but pivot back to your core expertise.
      4. Keep the tone helpful, direct, and slightly brutalist-warm.`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
          userMsg
        ],
      });

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response.choices[0].message.content 
      }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, my brain stalled. Check your API key or try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ height: 'calc(100vh - 180px)', display: 'flex', flexDirection: 'column' }}>
      {/* Agent Selector */}
      <div style={{ marginBottom: '1rem', borderBottom: 'var(--border-width) solid var(--text)', paddingBottom: '1rem' }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 900, marginBottom: '0.5rem', opacity: 0.7 }}>CHATTING WITH:</p>
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
          {adoptedAgents.length === 0 ? (
            <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)' }}>NO AGENTS ADOPTED YET. GO TO 'BORROW' TAB.</p>
          ) : (
            adoptedAgents.map(agent => (
              <button 
                key={agent.id}
                onClick={() => setSelectedAgent(agent)}
                style={{ 
                  whiteSpace: 'nowrap', 
                  fontSize: '0.7rem', 
                  padding: '0.4rem 0.8rem',
                  backgroundColor: selectedAgent?.id === agent.id ? 'var(--primary)' : 'transparent',
                  color: selectedAgent?.id === agent.id ? 'var(--bg)' : 'var(--text)',
                  border: '1px solid var(--text)'
                }}
              >
                {agent.name.toUpperCase()}'S AGENT
              </button>
            ))
          )}
        </div>
      </div>

      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', padding: '0.5rem' }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ 
            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '85%',
            backgroundColor: msg.role === 'user' ? 'var(--accent)' : '#1A1A1A',
            border: msg.role === 'user' ? 'var(--border-width) solid var(--text)' : '1px solid var(--text)',
            padding: '1rem',
            position: 'relative'
          }}>
            <div style={{ position: 'absolute', top: '-10px', left: msg.role === 'user' ? 'auto' : '10px', right: msg.role === 'user' ? '10px' : 'auto', backgroundColor: 'var(--bg)', border: '1px solid var(--text)', padding: '2px 6px', fontSize: '0.6rem', fontWeight: 900 }}>
              {msg.role === 'user' ? 'YOU' : (selectedAgent?.name?.toUpperCase() || 'AGENT')}
            </div>
            <p style={{ fontWeight: 700, whiteSpace: 'pre-wrap', lineHeight: 1.3 }}>{msg.content}</p>
          </div>
        ))}
        {loading && <div className="card" style={{ width: 'fit-content' }}>THINKING...</div>}
      </div>

      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', backgroundColor: 'var(--bg)', padding: '0.5rem' }}>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder={selectedAgent ? `ASK ${selectedAgent.name.toUpperCase()}...` : "SELECT AN AGENT FIRST"}
          style={{ 
            flex: 1, 
            backgroundColor: 'transparent', 
            border: 'var(--border-width) solid var(--text)',
            padding: '1rem',
            fontWeight: 900,
            outline: 'none'
          }}
          disabled={!selectedAgent}
        />
        <button 
          onClick={handleSend}
          disabled={loading || !selectedAgent}
          style={{ width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
        >
          <Send size={24} />
        </button>
      </div>
    </div>
  );
};

export default Ask;
