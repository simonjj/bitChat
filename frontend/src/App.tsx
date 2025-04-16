import React, { useState, useRef, useEffect } from "react";
import "./App.css";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const API_URL = "/chat";

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMessages = [
      ...messages,
      { role: "user" as "user", content: input }
    ];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([
        ...newMessages,
        { role: "assistant" as "assistant", content: data.response }
      ]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { role: "assistant" as "assistant", content: "Error: Could not get response." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">bitChat</div>
      <div className="chat-history">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.role}`}>
            <div className="chat-bubble">{msg.content}</div>
          </div>
        ))}
        {loading && (
          <div className="chat-message assistant">
            <div className="chat-bubble">...</div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <form className="chat-input-row" onSubmit={sendMessage}>
        <input
          className="chat-input"
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={loading}
        />
        <button className="send-btn" type="submit" disabled={loading || !input.trim()}>
          Send
        </button>
      </form>
    </div>
  );
}

export default App;
