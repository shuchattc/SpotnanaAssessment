import { useState } from "react";

export default function ChatInput({ onSubmit, loading }) {
  const [prompt, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(prompt);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex justify-content-center align-items-center g-2">
        <input
        className="form-control"
        value={prompt}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a prompt..."
        style={{ width: "70%", padding: 8 }}
        />
        <button className="btn btn-success m-3" type="submit" disabled={loading}>
          {loading ? "Loading..." : "Send"}
        </button>
    </form>
  );
}