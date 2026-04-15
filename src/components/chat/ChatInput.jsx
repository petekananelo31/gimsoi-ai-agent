import { useState } from "react";

export default function ChatInput({ onSend }) {
  const [input, setInput] = useState("");
  const send = () => {
    if (!input.trim()) return;
    onSend(input.trim());
    setInput("");
  };
  return (
    <div className="flex gap-2 items-center p-3 border-t border-gray-200">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && send()}
        placeholder="Message Gimsoi..."
        className="flex-1 px-4 py-2 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-400 bg-white"
      />
      <button onClick={send}
        className="w-9 h-9 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition flex-shrink-0">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
          <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}