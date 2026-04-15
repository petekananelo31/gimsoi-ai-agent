import { useState } from "react";
import AskAIButton from "./components/landing/AskAIButton";
import AssistantCard from "./components/chat/AssistantCard";

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);

  return chatOpen
    ? <AssistantCard onClose={() => setChatOpen(false)} />
    : <AskAIButton onClick={() => setChatOpen(true)} />;
}