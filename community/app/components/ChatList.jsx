// components/ChatList.js
export default function ChatList({ chats, onSelect }) {
    return (
      <ul className="space-y-4">
        {chats.map(chat => (
          <li key={chat.id} className="flex items-center cursor-pointer p-2 rounded hover:bg-gray-100"
              onClick={() => onSelect && onSelect(chat)}>
            {chat.avatar && (
              <img src={chat.avatar} alt={chat.name} className="h-10 w-10 rounded-full mr-3" />
            )}
            <div>
              <div className="font-semibold">{chat.name}</div>
              <div className="text-xs text-gray-500">{chat.lastMessage}</div>
            </div>
            <span className="ml-auto text-xs text-gray-400">{chat.time}</span>
          </li>
        ))}
      </ul>
    );
  }
  