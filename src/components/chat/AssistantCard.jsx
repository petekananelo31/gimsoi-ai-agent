import { useState } from "react";
import { useChat } from "../../hooks/useChat";
import { useIsMobile } from "../../hooks/useIsMobile";
import TopNav from "./TopNav";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import DeleteModal from "./DeleteModal";
import DesktopSidebar from "./sidebar/DesktopSidebar";
import MobileDrawer from "./sidebar/MobileDrawer";

export default function AssistantCard({ onClose }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useIsMobile();
  const {
    chats, activeChatId, activeMessages, isTyping,
    deleteTarget, chatEndRef,
    handleSend, startNewChat, switchChat,
    requestDelete, confirmDelete, cancelDelete,
  } = useChat();

  const handleNewChat = () => startNewChat(() => setDrawerOpen(false));
  const handleSwitch  = (id) => switchChat(id, () => setDrawerOpen(false));

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div
        className={`bg-white overflow-hidden flex flex-col shadow-xl ${
          isMobile ? "w-full max-w-sm rounded-2xl" : "w-full max-w-4xl rounded-2xl"
        }`}
        style={{ height: isMobile ? "90vh" : 580 }}
      >
        <div className="relative flex flex-col flex-1 overflow-hidden">

          {/* Modals */}
          {isMobile && drawerOpen && (
            <MobileDrawer
              chats={chats}
              activeChatId={activeChatId}
              onClose={() => setDrawerOpen(false)}
              onNewChat={handleNewChat}
              onSwitch={handleSwitch}
              onDelete={requestDelete}
            />
          )}
          {deleteTarget && (
            <DeleteModal
              chatTitle={deleteTarget.title}
              onConfirm={confirmDelete}
              onCancel={cancelDelete}
            />
          )}

          {/* Nav */}
          <TopNav
            isMobile={isMobile}
            onOpenDrawer={() => setDrawerOpen(true)}
            onNewChat={handleNewChat}
            onClose={onClose}
          />

          {/* Body */}
          <div className="flex flex-1 overflow-hidden">
            {!isMobile && (
              <DesktopSidebar
                chats={chats}
                activeChatId={activeChatId}
                onNewChat={handleNewChat}
                onSwitch={handleSwitch}
                onDelete={requestDelete}
              />
            )}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
              <ChatMessages messages={activeMessages} isTyping={isTyping} chatEndRef={chatEndRef} />
              <ChatInput onSend={handleSend} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}