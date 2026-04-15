import { initialMessages } from "../constants/chatData";

export function buildNewChat(existingChats) {
  const id = Date.now();
  return {
    id,
    chat: {
      title: `New chat ${Object.keys(existingChats).length + 1}`,
      msgs: [{ role: "bot", text: "New conversation! How can I help?" }],
    },
  };
}

export function deleteChat(chats, targetId, activeChatId) {
  const remaining = Object.entries(chats).filter(([k]) => Number(k) !== targetId);

  if (remaining.length === 0) {
    const newId = Date.now();
    return {
      newChats: { [newId]: { title: "New chat", msgs: [...initialMessages] } },
      newActiveChatId: newId,
    };
  }

  const newChats = Object.fromEntries(remaining);
  const newActiveChatId =
    Number(targetId) === activeChatId
      ? Number(remaining[remaining.length - 1][0])
      : activeChatId;

  return { newChats, newActiveChatId };
}