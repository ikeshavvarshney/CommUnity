"use client";

import { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useParams, useSearchParams } from "next/navigation";

const SOCKET_URL = "http://localhost:8080/ws-chat";
const API_URL = "http://localhost:8080/chat"; // Backend fetch endpoint

export default function ChatPage() {
  const searchParams = useSearchParams();
  const senderName = searchParams.get("from"); // logged-in user
  const { username: receiverName } = useParams(); // user being chatted with

  const [messages, setMessages] = useState([]);
  const [client, setClient] = useState(null);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  // Fetch all previous chats from backend (no auth)
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await fetch(`${API_URL}/get/${receiverName}?sender=${senderName}`); // no token
        if (!res.ok) throw new Error("Failed to fetch chats");
        const data = await res.json();
        setMessages(data);
        console.log(data)
      } catch (err) {
        console.error(err);
      }
    };

    if (senderName && receiverName) fetchChats();
  }, [senderName, receiverName]);

  // WebSocket connection for real-time messages
  useEffect(() => {
    if (!senderName) return;
  
    const stompClient = new Client({
      brokerURL: undefined,
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      webSocketFactory: () => new SockJS(SOCKET_URL),
      onConnect: () => {
        console.log("Connected to WebSocket!");
        
        // Subscribe to public topic
        stompClient.subscribe("/topic/public", (msg) => {
          const message = JSON.parse(msg.body);
  
          // Only show messages for this chat
          if (
            (message.sender === senderName && message.receiver === receiverName) ||
            (message.sender === receiverName && message.receiver === senderName)
          ) {
            setMessages((prev) => [...prev, message]);
          }
        });
      },
    });
  
    stompClient.activate();
    setClient(stompClient);
  
    return () => stompClient.deactivate();
  }, [senderName, receiverName]);

  const sendMessage = () => {
    if (client && client.connected && input.trim() !== "") {
      const messageObj = {
        sender: senderName,
        content: input,
        type: "CHAT",
        receiver: receiverName,
        timestamp: new Date().toISOString(), // temporary timestamp for UI
      };
  
      // Optimistically update UI
      setMessages((prev) => [...prev, messageObj]);
  
      // Send to backend
      client.publish({
        destination: "/app/chat.sendMessage",
        body: JSON.stringify(messageObj),
      });
  
      setInput(""); // clear input
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto border border-gray-300 rounded-lg shadow-lg p-4 bg-gray-50">
      <h1 className="text-xl font-bold mb-4 text-center">Chat with {receiverName}</h1>

      <div className="flex-1 overflow-y-auto mb-4 border p-2 rounded bg-white">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`mb-2 px-2 py-1 rounded ${
              m.sender === senderName ? "bg-blue-500 text-white self-end" : "bg-gray-200 text-gray-800 self-start"
            }`}
          >
            <strong>{m.sender}:</strong> {m.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded px-2 py-1 focus:outline-none"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}