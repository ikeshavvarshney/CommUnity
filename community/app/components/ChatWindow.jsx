import { useRef, useEffect } from "react";

export default function ChatWindow({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
      <div className="mt-2">
        <input
          className="w-full border rounded px-2 py-1"
          placeholder="Type your message..."
        />
      </div>
    </div>
  );
}
