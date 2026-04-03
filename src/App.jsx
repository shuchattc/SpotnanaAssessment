import { useState, useEffect } from "react";
import ChatInput from "./components/ChatInput";
import ChatHistory from "./components/ChatHistory";
import { fetchAIResponse } from "./services/api";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
// Load from localStorage once to get history on reload
useEffect(() => {
const saved = JSON.parse(localStorage.getItem("chatHistory"));

if (saved && saved.length > 0) {
  setMessages(saved);
}

}, []);

// Save to localStorage when messages change to avoid overwriting array
useEffect(() => {
if (messages.length > 0) {
localStorage.setItem("chatHistory", JSON.stringify(messages));
}
}, [messages]);

const handleSubmit = async (prompt) => {
if (!prompt.trim()) return; // .trim method to remove whitespace-only strings, if !prompt was used then it would still allow for this

setError(null);

try {
  setLoading(true);

  const response = await fetchAIResponse(prompt);

  // newMessage obj contains users input (prompt) and response from openai api (response)
  const newMessage = {
    prompt,
    response,
  };
  
  //prev current state value of messages, spread operator copies everything inside prev then adds newMessage on the end
  //using prev instead of ...messages because the responses we expect back are asynchronous
  setMessages((prev) => [...prev, newMessage]);

} catch (err) {
  setError(err.message);
} finally {
  setLoading(false);
}

};

const handleClear = () => {
setMessages([]);
localStorage.removeItem("chatHistory"); // fully clears local storage
};

  return (
  <>
    <div className="container py-4">
      <h1 className="justify-content mb-4 text-secondary">AI Chat App</h1>
      <div className="card shadow-sm p-3">
        <ChatInput onSubmit={handleSubmit} loading={loading} className="justify-content" />
        <div className="d-flex justify-content-center my-2">
            <button className="btn btn-outline-danger btn-sm" onClick={handleClear}>Clear All Chat History</button>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
        <ChatHistory stlye={{maxWidth: 800, marginTop: "10"}} messages={messages} loading={loading} />
      </div>
    </div>
  </>

  );
}