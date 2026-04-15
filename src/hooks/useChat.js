import { useState, useRef, useEffect } from "react";
import { botReplies, initialChats } from "../constants/chatData";
import { buildNewChat, deleteChat } from "../utils/chatHelpers";

export function useChat() {
  const [activeChatId, setActiveChatId] = useState(1);
  const [chats, setChats] = useState(initialChats);
  const [isTyping, setIsTyping] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const replyIdx = useRef(0);
  const chatEndRef = useRef(null);

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

  const startNewChat = (closeDrawer) => {
    const { id, chat } = buildNewChat(chats);
    setChats((prev) => ({ ...prev, [id]: chat }));
    setActiveChatId(id);
    setIsTyping(false);
    closeDrawer?.();
  };

  const switchChat = (id, closeDrawer) => {
    setActiveChatId(id);
    setIsTyping(false);
    closeDrawer?.();
  };

  const requestDelete = (e, id, title) => {
    e.stopPropagation();
    setDeleteTarget({ id, title });
  };

  const confirmDelete = () => {
    const { newChats, newActiveChatId } = deleteChat(chats, deleteTarget.id, activeChatId);
    setChats(newChats);
    setActiveChatId(newActiveChatId);
    setDeleteTarget(null);
  };

  return {
    chats,
    activeChatId,
    activeMessages,
    isTyping,
    deleteTarget,
    chatEndRef,
    handleSend,
    startNewChat,
    switchChat,
    requestDelete,
    confirmDelete,
    cancelDelete: () => setDeleteTarget(null),
  };
}