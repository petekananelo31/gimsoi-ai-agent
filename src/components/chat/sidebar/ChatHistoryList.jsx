import { useState } from "react";

export default function ChatHistoryList({ chats, activeChatId, onSwitch, onDelete, darkMode = false }) {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="flex-1 overflow-y-auto py-3 px-2 flex flex-col gap-1">
      {darkMode
        ? <p className="text-xs uppercase tracking-wider px-2 mb-2 text-white/30">Today</p>
        : <p className="text-xs text-gray-400 px-2 mb-1">Recent</p>
      }
      {Object.entries(chats).reverse().map(([id, c]) => {
        const numId = Number(id);
        const isActive = numId === activeChatId;
        const isHovered = numId === hoveredId;
        return (
          <div key={id}
            onClick={() => onSwitch(numId)}
            onMouseEnter={() => setHoveredId(numId)}
            onMouseLeave={() => setHoveredId(null)}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm cursor-pointer transition ${
              isActive
                ? darkMode ? "bg-white/15 text-white font-medium" : "bg-blue-100 text-blue-700 font-medium"
                : darkMode ? "text-slate-300 hover:bg-white/10 hover:text-white" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" className="flex-shrink-0 opacity-60">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="truncate flex-1">{c.title}</span>
            {(isHovered || isActive) && (
              <button
                onClick={(e) => onDelete(e, numId, c.title)}
                className={`flex-shrink-0 p-1 rounded-md transition ${
                  darkMode ? "hover:bg-white/20 text-white/50 hover:text-red-400" : "hover:bg-red-50 text-gray-400 hover:text-red-500"
                }`}
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
                  <polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}