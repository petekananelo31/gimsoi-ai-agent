export default function AskAIButton({ onClick }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center gap-10 p-8">
      
      <button
        onClick={onClick}
        className="group relative flex items-center bg-blue-500 hover:bg-blue-600 active:scale-95 transition-all duration-200 rounded-full shadow-lg pl-2 pr-6 py-2"
      >
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
        <span className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping opacity-30 pointer-events-none" />
      </button>
      <p className="text-xs text-gray-400">Powered by Gimsoi · Always online</p>
    </div>
  );
}