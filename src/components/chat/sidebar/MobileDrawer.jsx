import BotIcon from "../BotIcon";
import ChatHistoryList from "./ChatHistoryList";
import UserFooter from "./UserFooter";

export default function MobileDrawer({ chats, activeChatId, onClose, onNewChat, onSwitch, onDelete }) {
  return (
    <>
      <div className="absolute inset-0 bg-black/45 z-10" onClick={onClose} />
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
            <button onClick={onClose} className="text-white/60 hover:text-white p-1 transition">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <button onClick={onNewChat}
            className="w-full py-2 px-3 bg-white/10 border border-white/20 rounded-lg text-white text-sm flex items-center gap-2 hover:bg-white/15 transition">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
              <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
            New chat
          </button>
        </div>
        <ChatHistoryList
          chats={chats}
          activeChatId={activeChatId}
          onSwitch={onSwitch}
          onDelete={onDelete}
          darkMode={true}
        />
        <UserFooter darkMode={true} />
      </div>
    </>
  );
}