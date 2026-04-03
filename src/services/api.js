
// testing echo response from app.jsx
// export const fetchAIResponse = async (prompt) => {
//   await new Promise((res) => setTimeout(res, 1000));
//   return `Echo: ${prompt}`;
// };

export const fetchAIResponse = async (prompt) => {
  const res = await fetch("https://spotnanaassessmentbackend.onrender.com/api/response", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch AI response");
  }

  const data = await res.json();
  return data.text;
};
