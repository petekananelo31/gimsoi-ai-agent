import ChatHistoryList from "./ChatHistoryList";
import UserFooter from "./UserFooter";

export default function DesktopSidebar({ chats, activeChatId, onNewChat, onSwitch, onDelete }) {
  return (
    <div className="w-56 border-r border-gray-200 flex flex-col bg-gray-50 flex-shrink-0">
      <div className="p-3">
        <button onClick={onNewChat}
          className="w-full py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">
          + New chat
        </button>
      </div>
      <ChatHistoryList
        chats={chats}
        activeChatId={activeChatId}
        onSwitch={onSwitch}
        onDelete={onDelete}
        darkMode={false}
      />
      <UserFooter darkMode={false} />
    </div>
  );
}