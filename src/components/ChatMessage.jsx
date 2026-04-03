export default function ChatMessage({ prompt, response }) {
  return (
    <div className="justify-content-center align-items-center g-2" style={{maxWidth:"80%", marginLeft:"10%"}}>
      <div>
        <p className="bg-secondary p2 text-white rounded mb-3" style={{}}><strong>You:</strong> {prompt}</p>
      </div>
      
      <div>
        <p className="bg-info p2 text-white rounded mb-3" style={{maxWidth:"100%", overflowY:"auto"}}><strong>AI:</strong> {response}</p>
      </div>
      
    </div>
  );
}