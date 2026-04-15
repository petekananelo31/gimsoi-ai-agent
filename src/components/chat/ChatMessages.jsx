import BotIcon from "./BotIcon";

export default function ChatMessages({ messages, isTyping, chatEndRef }) {
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
              <span key={i} className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
        </div>
      )}
      <div ref={chatEndRef} />
    </div>
  );
}