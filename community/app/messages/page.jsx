"use client";
import Navbar from "../components/Navbar";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow.jsx";
import SmallProfile from "../components/SmallProfile";
import { useState } from "react";

export default function Messages() {
  // Example chat list
  const exampleChats = [
    { id: 1, name: "Alex Johnson", lastMessage: "See you at 8!", time: "5:32 PM", avatar: "https://randomuser.me/api/portraits/men/50.jpg" },
    { id: 2, name: "Emily Stone", lastMessage: "Sent the document.", time: "4:14 PM", avatar: "https://randomuser.me/api/portraits/women/55.jpg" },
    { id: 3, name: "Team Project", lastMessage: "Let's meet tomorrow.", time: "Yesterday", avatar: null },
    { id: 4, name: "David Park", lastMessage: "Great job!", time: "Yesterday", avatar: "https://randomuser.me/api/portraits/men/52.jpg" }
  ];

  // Example messages per chat
  const messagesByChatId = {
    1: [
      { sender: "Alex Johnson", content: "Hey! Are we on for tonight?", timestamp: "5:30 PM", self: false },
      { sender: "Jane Doe", content: "Yes, see you at 8!", timestamp: "5:32 PM", self: true },
    ],
    2: [
      { sender: "Emily Stone", content: "Did you get the document?", timestamp: "4:10 PM", self: false },
      { sender: "Jane Doe", content: "Yes, received!", timestamp: "4:14 PM", self: true },
    ],
    3: [
      { sender: "Team Lead", content: "Let's meet tomorrow at noon.", timestamp: "Yesterday", self: false },
      { sender: "Jane Doe", content: "Works for me.", timestamp: "Yesterday", self: true },
    ],
    4: [
      { sender: "David Park", content: "Great job on the report!", timestamp: "Yesterday", self: false },
      { sender: "Jane Doe", content: "Thanks, David!", timestamp: "Yesterday", self: true },
    ]
  };

  // Track selected chat
  const [selectedChat, setSelectedChat] = useState(exampleChats[0]);

  return (
    <div>
      <Navbar />
      <main className="flex px-8 justify-between gap-5 mt-6">
        {/* Sidebar */}
        <div className="flex-col max-w-80 min-w-60">
          <h2 className="px-1 text-lg font-bold">Chats</h2>
          <ChatList
            chats={exampleChats}
            onSelect={chat => setSelectedChat(chat)}
          />
          <div className="mt-8">
            <SmallProfile
              profilePic="https://randomuser.me/api/portraits/women/44.jpg"
              username="Jane Doe"
              bio="Full-stack developer, music lover, and tech enthusiast."
              about="Passionate about creating innovative solutions and building meaningful connections in the tech community."
            />
          </div>
        </div>

        {/* Chat window */}
        <div className="flex-col max-w-2xl flex-1">
          <h2 className="px-1 text-lg font-bold mb-4">{selectedChat ? selectedChat.name : "Conversation"}</h2>
          <ChatWindow messages={messagesByChatId[selectedChat?.id] || []} />
        </div>
      </main>
    </div>
  );
}
