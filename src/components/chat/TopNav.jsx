export default function TopNav({ isMobile, onOpenDrawer, onNewChat, onClose }) {
  return (
    <div className="bg-blue-600 px-4 py-3 flex items-center justify-between flex-shrink-0">
      <div className="flex items-center gap-3">
        {isMobile && (
          <button onClick={onOpenDrawer} className="flex flex-col gap-[5px] p-1 mr-1">
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
      <div className="flex items-center gap-2">
        {isMobile && (
          <button onClick={onNewChat} className="p-1">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        <button onClick={onClose} className="p-1 text-white/70 hover:text-white transition">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}