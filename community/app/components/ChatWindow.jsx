import { useState, useRef, useEffect } from "react";

export default function ChatWindow({ messages, onSendMessage }) {
  const [inputValue, setInputValue] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    if (onSendMessage) {
      onSendMessage(trimmed);
    }
    setInputValue("");
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border rounded flex flex-col h-96 p-4 bg-white overflow-y-auto">
      <div className="flex-1">
        {messages.map((msg, idx) => (
          <div key={idx}
               className={`mb-2 flex ${msg.self ? 'justify-end' : 'justify-start'}`}>
            <span className={`px-3 py-2 rounded-lg ${msg.self ? 'bg-blue-100' : 'bg-gray-200'}`}>
              {msg.content}
            </span>
            <span className="text-xs ml-2 self-end text-gray-400">{msg.timestamp}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="mt-2 flex gap-2">
        <textarea
          className="flex-grow border rounded px-2 py-1 resize-none"
          placeholder="Type your message..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
          type="button"
        >
          Send
        </button>
      </div>
    </div>
  );
}
