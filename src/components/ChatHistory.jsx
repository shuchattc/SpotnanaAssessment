import ChatMessage from "./ChatMessage";

export default function ChatHistory({ messages, loading }) {
  return (
    <div className="mt-3" style={{ maxHeight: "400px", overflowY:"auto"}}>
      {messages.map((msg, idx) => (
        <ChatMessage key={idx} {...msg} />
      ))}
      {loading && <div className="text-muted">Ai is thinking of response...</div>}
    </div>
  );
}