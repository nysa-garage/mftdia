import React, { useState, useEffect, useRef } from "react";
import { Send, User, Bot, Sparkles } from "lucide-react";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey:
    "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",
  baseURL: "https://api.openai.com/v1",
  dangerouslyAllowBrowser: true,
});

const Ask = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [adoptedAgents, setAdoptedAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState({
    id: "general",
    name: "Global Agent Consciousness",
    specialty: "General Navigation",
  });
  const scrollRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("orbit_adopted_agents");
    if (saved) {
      const parsed = JSON.parse(saved);
      setAdoptedAgents(parsed);
    }

    setMessages([
      {
        role: "assistant",
        content:
          "I am the MFTDIA Global Agent Consciousness. I can assist you with general knowledge, or you can switch to one of the specific veteran agents you've adopted for hyper-local, lived experience advice.",
      },
    ]);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem("mftdia_user") || "{}");

      let systemPrompt = "";

      if (selectedAgent.id === "general") {
        systemPrompt = `You are the MFTDIA Global Agent Consciousness, a helpful AI guide for new immigrants to the US.
        The user is moving from ${user.from} to ${user.to} on a ${user.visa} visa.
        Your goal is to provide high-quality, practical advice about US migration, culture, and logistics. Be specific about your answers like connecting someone (Name and location, required contextual information), sharing a location, a link, business or something that's there in the target locaiton. 
        `;
      } else {
        systemPrompt = `You are ${selectedAgent.name}'s personal AI agent. 
        You are helping a newcomer who is moving from ${user.from} to ${user.to} on a ${user.visa} visa.
        
        YOUR KNOWLEDGE BASE (Lived Experience):
        - Specialty: ${selectedAgent.specialty}
        - Core Advice: ${selectedAgent.description}
        - Location: ${selectedAgent.location}
        
        RULES:
        1. Always speak as ${selectedAgent.name}'s proxy. Use "I" to refer to ${selectedAgent.name}'s experiences.
        2. Be extremely specific. Mention actual places, services, or shortcuts ${selectedAgent.name} knows.
        3. Keep the tone helpful, direct, and slightly brutalist-warm.`;
      }
      console.log(
        "Using API Key starting with:",
        openai.apiKey?.substring(0, 7),
      );
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
          userMsg,
        ],
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.choices[0].message.content,
        },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMsg =
        error?.response?.data?.error?.message ||
        error?.message ||
        "Connection error";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `ERROR: ${errorMsg}. Please verify your API key in src/lib/openai.js.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="animate-fade-in"
      style={{
        height: "calc(100vh - 180px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Agent Selector */}
      <div
        style={{
          marginBottom: "1rem",
          borderBottom: "var(--border-width) solid var(--text)",
          paddingBottom: "1rem",
        }}
      >
        <p
          style={{
            fontSize: "0.7rem",
            fontWeight: 900,
            marginBottom: "0.5rem",
            opacity: 0.7,
          }}
        >
          CHATTING WITH:
        </p>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            overflowX: "auto",
            paddingBottom: "0.5rem",
          }}
        >
          <button
            onClick={() =>
              setSelectedAgent({
                id: "general",
                name: "Global Agent Consciousness",
              })
            }
            style={{
              whiteSpace: "nowrap",
              fontSize: "0.7rem",
              padding: "0.4rem 0.8rem",
              backgroundColor:
                selectedAgent?.id === "general"
                  ? "var(--primary)"
                  : "transparent",
              color:
                selectedAgent?.id === "general" ? "var(--bg)" : "var(--text)",
              border: "1px solid var(--text)",
            }}
          >
            GLOBAL AGENT
          </button>
          {adoptedAgents.map((agent) => (
            <button
              key={agent.id}
              onClick={() => setSelectedAgent(agent)}
              style={{
                whiteSpace: "nowrap",
                fontSize: "0.7rem",
                padding: "0.4rem 0.8rem",
                backgroundColor:
                  selectedAgent?.id === agent.id
                    ? "var(--primary)"
                    : "transparent",
                color:
                  selectedAgent?.id === agent.id ? "var(--bg)" : "var(--text)",
                border: "1px solid var(--text)",
              }}
            >
              {agent.name.toUpperCase()}'S AGENT
            </button>
          ))}
        </div>
      </div>

      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "0.5rem",
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              maxWidth: "85%",
              backgroundColor:
                msg.role === "user" ? "var(--accent)" : "#1A1A1A",
              border:
                msg.role === "user"
                  ? "var(--border-width) solid var(--text)"
                  : "1px solid var(--text)",
              padding: "1rem",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-10px",
                left: msg.role === "user" ? "auto" : "10px",
                right: msg.role === "user" ? "10px" : "auto",
                backgroundColor: "var(--bg)",
                border: "1px solid var(--text)",
                padding: "2px 6px",
                fontSize: "0.6rem",
                fontWeight: 900,
              }}
            >
              {msg.role === "user"
                ? "YOU"
                : selectedAgent?.name?.toUpperCase() || "AGENT"}
            </div>
            <p
              style={{
                fontWeight: 700,
                whiteSpace: "pre-wrap",
                lineHeight: 1.3,
              }}
            >
              {msg.content}
            </p>
          </div>
        ))}
        {loading && (
          <div className="card" style={{ width: "fit-content" }}>
            THINKING...
          </div>
        )}
      </div>

      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          gap: "0.5rem",
          backgroundColor: "var(--bg)",
          padding: "0.5rem",
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder={
            selectedAgent
              ? `ASK ${selectedAgent.name.toUpperCase()}...`
              : "SELECT AN AGENT FIRST"
          }
          style={{
            flex: 1,
            backgroundColor: "transparent",
            border: "var(--border-width) solid var(--text)",
            padding: "1rem",
            fontWeight: 900,
            outline: "none",
          }}
          disabled={!selectedAgent}
        />
        <button
          onClick={handleSend}
          disabled={loading || !selectedAgent}
          style={{
            width: "60px",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
          }}
        >
          <Send size={24} />
        </button>
      </div>
    </div>
  );
};

export default Ask;
