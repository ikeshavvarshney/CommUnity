"use client";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";

export default function Messages() {
  // Only one-on-one chats, no team/group chats
  const exampleChats = [
    { id: 1, name: "Alex Johnson", lastMessage: "See you at 8!", time: "5:32 PM", avatar: "https://randomuser.me/api/portraits/men/50.jpg" },
    { id: 2, name: "Emily Stone", lastMessage: "Sent the document.", time: "4:14 PM", avatar: "https://randomuser.me/api/portraits/women/55.jpg" },
    { id: 4, name: "David Park", lastMessage: "Great job!", time: "Yesterday", avatar: "https://randomuser.me/api/portraits/men/52.jpg" }
  ];

  // Messages correspond to the filtered chats only
  const messagesByChatId = {
    1: [
      { sender: "Alex Johnson", content: "Hey! Are we on for tonight?", timestamp: "5:30 PM", self: false },
      { sender: "You", content: "Yes, see you at 8!", timestamp: "5:32 PM", self: true },
    ],
    2: [
      { sender: "Emily Stone", content: "Did you get the document?", timestamp: "4:10 PM", self: false },
      { sender: "You", content: "Yes, received!", timestamp: "4:14 PM", self: true },
    ],
    4: [
      { sender: "David Park", content: "Great job on the report!", timestamp: "Yesterday", self: false },
      { sender: "You", content: "Thanks, David!", timestamp: "Yesterday", self: true },
    ],
  };

  const [selectedChat, setSelectedChat] = useState(exampleChats[0]);
  const [messages, setMessages] = useState(messagesByChatId[selectedChat.id] || []);

  useEffect(() => {
    setMessages(messagesByChatId[selectedChat.id] || []);
  }, [selectedChat]);

  const handleSendMessage = (text) => {
    const newMessage = {
      sender: "You",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      self: true,
    };
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <div>
      <Navbar />
      <main className="flex px-8 justify-between gap-5 mt-6">
        <div className="flex-col max-w-80 min-w-60">
          <h2 className="px-1 text-lg font-bold">Chats</h2>
          <ChatList chats={exampleChats} onSelect={setSelectedChat} />
          {/* Profile section removed as requested */}
        </div>
        <div className="flex-col max-w-2xl flex-1">
          <h2 className="px-1 text-lg font-bold mb-4">{selectedChat.name}</h2>
          <ChatWindow messages={messages} onSendMessage={handleSendMessage} />
        </div>
      </main>
    </div>
  );
}
