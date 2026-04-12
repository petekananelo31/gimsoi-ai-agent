import { useState, useRef, useEffect } from "react";

// ── Bot replies ──────────────────────────────────────────
const botReplies = [
  "TSK-10 Speed Optimization is blocking production — highest priority!",
  "TSK-6 Redesign Checkout Flow has 2 open blockers on the release branch.",
  "TSK-20 Enhance Search Functionality needs a new owner — can you take it?",
  "I can reassign any of these tasks. Which one?",
  "All three tasks are in the current sprint. Want a full breakdown?",
  "I can create a summary report for the team if you'd like.",
];

const initialMessages = [
  { role: "bot", text: "Hi! I found 3 critical tasks needing attention. How can I help?" },
];

// ── BotIcon ──────────────────────────────────────────────
function BotIcon({ size = 8 }) {
  const px = size * 4;
  return (
    <div
      style={{ width: px, height: px }}
      className="bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0"
    >
      <svg viewBox="0 0 40 40" width={px * 0.45} height={px * 0.45}>
        <rect x="8" y="12" width="24" height="18" rx="4" fill="white" />
        <rect x="14" y="17" width="5" height="5" rx="1.5" fill="#2563eb" />
        <rect x="21" y="17" width="5" height="5" rx="1.5" fill="#2563eb" />
        <rect x="15" y="26" width="10" height="2" rx="1" fill="#2563eb" />
        <rect x="18" y="8" width="4" height="5" rx="1" fill="white" />
      </svg>
    </div>
  );
}

// ── ChatMessages ─────────────────────────────────────────
function ChatMessages({ messages, isTyping, chatEndRef }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
      {messages.map((msg, i) =>
        msg.role === "bot" ? (
          <div key={i} className="flex items-end gap-2">
            <BotIcon size={8} />
            <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-2 max-w-[75%] text-sm text-gray-800">
              {msg.text}
            </div>
          </div>
        ) : (
          <div key={i} className="flex flex-col items-end gap-1">
            <div className="bg-blue-600 text-white rounded-2xl rounded-br-sm px-4 py-2 max-w-[75%] text-sm">
              {msg.text}
            </div>
            <span className="text-xs text-gray-400">You</span>
          </div>
        )
      )}
      {isTyping && (
        <div className="flex items-end gap-2">
          <BotIcon size={8} />
          <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      )}
      <div ref={chatEndRef} />
    </div>
  );
}

// ── ChatInput ────────────────────────────────────────────
function ChatInput({ onSend }) {
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
      <button
        onClick={send}
        className="w-9 h-9 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition flex-shrink-0"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
          <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

// ── TrashIcon ────────────────────────────────────────────
function TrashIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" className={className}>
      <polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── DeleteModal ──────────────────────────────────────────
function DeleteModal({ chatTitle, onConfirm, onCancel }) {
  return (
    <div className="absolute inset-0 bg-black/50 z-30 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl p-5 w-full max-w-xs shadow-xl">
        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mb-3">
          <TrashIcon className="text-red-500" />
        </div>
        <h3 className="font-semibold text-gray-800 text-sm mb-1">Delete chat?</h3>
        <p className="text-xs text-gray-500 mb-4">
          "<span className="font-medium text-gray-700">{chatTitle}</span>" will be permanently deleted.
        </p>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 rounded-xl bg-red-500 text-white text-sm hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ── AskAIButton (Landing) ────────────────────────────────
function AskAIButton({ onClick }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center gap-10 p-8">

      {/* Ask AI Button */}
      <button
        onClick={onClick}
        className="group relative flex items-center gap-0 bg-blue-500 hover:bg-blue-600 active:scale-95 transition-all duration-200 rounded-full shadow-lg hover:shadow-xl pl-2 pr-6 py-2"
      >
        {/* Robot avatar */}
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 mr-3 shadow-sm">
          <svg viewBox="0 0 40 40" width="22" height="22">
            <rect x="8" y="12" width="24" height="18" rx="4" fill="#2563eb" />
            <rect x="14" y="17" width="5" height="5" rx="1.5" fill="white" />
            <rect x="21" y="17" width="5" height="5" rx="1.5" fill="white" />
            <rect x="15" y="26" width="10" height="2" rx="1" fill="white" />
            <rect x="18" y="8" width="4" height="5" rx="1" fill="#2563eb" />
          </svg>
        </div>
        <span className="text-white font-semibold text-base tracking-wide">Ask AI</span>

        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping opacity-30 pointer-events-none" />
      </button>

      <p className="text-xs text-gray-400">Powered by Gimsoi · Always online</p>
    </div>
  );
}

// ── Main App ─────────────────────────────────────────────
function AssistantCard() {
  const [chatOpen, setChatOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeChatId, setActiveChatId] = useState(1);
  const [chats, setChats] = useState({
    1: { title: "Critical tasks review", msgs: [...initialMessages] },
  });
  const [isTyping, setIsTyping] = useState(false);
  const [hoveredChatId, setHoveredChatId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const replyIdx = useRef(0);
  const chatEndRef = useRef(null);

  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) setDrawerOpen(false);
  }, [isMobile]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, isTyping, activeChatId]);

  const activeMessages = chats[activeChatId]?.msgs ?? [];

  const handleSend = (text) => {
    setChats((prev) => ({
      ...prev,
      [activeChatId]: {
        ...prev[activeChatId],
        msgs: [...prev[activeChatId].msgs, { role: "user", text }],
      },
    }));
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setChats((prev) => ({
        ...prev,
        [activeChatId]: {
          ...prev[activeChatId],
          msgs: [
            ...prev[activeChatId].msgs,
            { role: "bot", text: botReplies[replyIdx.current % botReplies.length] },
          ],
        },
      }));
      replyIdx.current++;
    }, 1000);
  };

  const startNewChat = () => {
    const id = Date.now();
    setChats((prev) => ({
      ...prev,
      [id]: {
        title: `New chat ${Object.keys(prev).length + 1}`,
        msgs: [{ role: "bot", text: "New conversation! How can I help?" }],
      },
    }));
    setActiveChatId(id);
    setDrawerOpen(false);
    setIsTyping(false);
  };

  const switchChat = (id) => {
    setActiveChatId(id);
    setDrawerOpen(false);
    setIsTyping(false);
  };

  const requestDelete = (e, id, title) => {
    e.stopPropagation();
    setDeleteTarget({ id, title });
  };

  const confirmDelete = () => {
    const { id } = deleteTarget;
    const remaining = Object.entries(chats).filter(([k]) => Number(k) !== id);
    if (remaining.length === 0) {
      const newId = Date.now();
      setChats({ [newId]: { title: "New chat", msgs: [...initialMessages] } });
      setActiveChatId(newId);
    } else {
      setChats(Object.fromEntries(remaining));
      if (Number(id) === activeChatId) {
        setActiveChatId(Number(remaining[remaining.length - 1][0]));
      }
    }
    setDeleteTarget(null);
  };

  // ── Chat history list ────────────────────────────────────
  const ChatHistoryList = ({ darkMode = false }) => (
    <div className="flex-1 overflow-y-auto py-3 px-2 flex flex-col gap-1">
      {darkMode
        ? <p className="text-xs uppercase tracking-wider px-2 mb-2 text-white/30">Today</p>
        : <p className="text-xs text-gray-400 px-2 mb-1">Recent</p>
      }
      {Object.entries(chats).reverse().map(([id, c]) => {
        const numId = Number(id);
        const isActive = numId === activeChatId;
        const isHovered = numId === hoveredChatId;
        return (
          <div
            key={id}
            onClick={() => switchChat(numId)}
            onMouseEnter={() => setHoveredChatId(numId)}
            onMouseLeave={() => setHoveredChatId(null)}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm cursor-pointer transition ${
              isActive
                ? darkMode ? "bg-white/15 text-white font-medium" : "bg-blue-100 text-blue-700 font-medium"
                : darkMode ? "text-slate-300 hover:bg-white/10 hover:text-white" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" className="flex-shrink-0 opacity-60">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="truncate flex-1">{c.title}</span>
            {(isHovered || isActive) && (
              <button
                onClick={(e) => requestDelete(e, numId, c.title)}
                className={`flex-shrink-0 p-1 rounded-md transition ${
                  darkMode ? "hover:bg-white/20 text-white/50 hover:text-red-400" : "hover:bg-red-50 text-gray-400 hover:text-red-500"
                }`}
              >
                <TrashIcon />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );

  // ── User footer ──────────────────────────────────────────
  const UserFooter = ({ darkMode = false }) => (
    <div className={`p-3 flex items-center gap-2 border-t ${darkMode ? "border-white/10" : "border-gray-200"}`}>
      <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0">U</div>
      <div>
        <p className={`text-sm font-medium ${darkMode ? "text-white" : "text-gray-700"}`}>User</p>
        {darkMode && <p className="text-xs text-white/40">Free plan</p>}
      </div>
    </div>
  );

  // ── Mobile drawer ────────────────────────────────────────
  const MobileDrawer = () => (
    <>
      <div className="absolute inset-0 bg-black/45 z-10" onClick={() => setDrawerOpen(false)} />
      <div className="absolute top-0 left-0 bottom-0 w-64 bg-slate-800 z-20 flex flex-col">
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <BotIcon size={4} />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Gimsoi</p>
                <p className="text-xs text-white/50">AI Assistant</p>
              </div>
            </div>
            <button onClick={() => setDrawerOpen(false)} className="text-white/60 hover:text-white p-1 transition">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <button
            onClick={startNewChat}
            className="w-full py-2 px-3 bg-white/10 border border-white/20 rounded-lg text-white text-sm flex items-center gap-2 hover:bg-white/15 transition"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
              <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
            New chat
          </button>
        </div>
        <ChatHistoryList darkMode={true} />
        <UserFooter darkMode={true} />
      </div>
    </>
  );

  // ── Top nav ──────────────────────────────────────────────
  const TopNav = () => (
    <div className="bg-blue-600 px-4 py-3 flex items-center justify-between flex-shrink-0">
      <div className="flex items-center gap-3">
        {isMobile && (
          <button onClick={() => setDrawerOpen(true)} className="flex flex-col gap-[5px] p-1 mr-1">
            {[0, 1, 2].map((i) => (
              <span key={i} className="block w-5 h-0.5 bg-white rounded" />
            ))}
          </button>
        )}
        <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
            <circle cx="12" cy="8" r="4" fill="#94a3b8" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        </div>
        <div>
          <p className="font-semibold text-white text-sm">Gimsoi Assistant</p>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-white/80">Technical lead · Online</span>
          </div>
        </div>
      </div>
      {/* Back button + new chat on mobile */}
      <div className="flex items-center gap-2">
        {isMobile && (
          <button onClick={startNewChat} className="p-1">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        {/* Close / back to landing */}
        <button
          onClick={() => setChatOpen(false)}
          className="p-1 text-white/70 hover:text-white transition"
          title="Close chat"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );

  // ── Landing page ─────────────────────────────────────────
  if (!chatOpen) {
    return <AskAIButton onClick={() => setChatOpen(true)} />;
  }

  // ── Chat interface ────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div
        className={`bg-white overflow-hidden flex flex-col shadow-xl ${
          isMobile ? "w-full max-w-sm rounded-2xl" : "w-full max-w-4xl rounded-2xl"
        }`}
        style={{ height: isMobile ? "90vh" : 580 }}
      >
        {isMobile ? (
          <div className="relative flex flex-col flex-1 overflow-hidden">
            {drawerOpen && <MobileDrawer />}
            {deleteTarget && (
              <DeleteModal
                chatTitle={deleteTarget.title}
                onConfirm={confirmDelete}
                onCancel={() => setDeleteTarget(null)}
              />
            )}
            <TopNav />
            <div className="flex-1 flex flex-col overflow-hidden">
              <ChatMessages messages={activeMessages} isTyping={isTyping} chatEndRef={chatEndRef} />
              <ChatInput onSend={handleSend} />
            </div>
          </div>
        ) : (
          <div className="relative flex flex-col flex-1 overflow-hidden">
            {deleteTarget && (
              <DeleteModal
                chatTitle={deleteTarget.title}
                onConfirm={confirmDelete}
                onCancel={() => setDeleteTarget(null)}
              />
            )}
            <TopNav />
            <div className="flex flex-1 overflow-hidden">
              <div className="w-56 border-r border-gray-200 flex flex-col bg-gray-50 flex-shrink-0">
                <div className="p-3">
                  <button onClick={startNewChat} className="w-full py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">
                    + New chat
                  </button>
                </div>
                <ChatHistoryList darkMode={false} />
                <UserFooter darkMode={false} />
              </div>
              <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <ChatMessages messages={activeMessages} isTyping={isTyping} chatEndRef={chatEndRef} />
                <ChatInput onSend={handleSend} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AssistantCard;