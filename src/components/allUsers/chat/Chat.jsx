"use client";
import { useState, useRef, Suspense } from "react";
import Sidebar from "./Sidebar";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import MessageInput from "./MessageInput";
import { useSearchParams } from "next/navigation";
import { myFetch } from "utils/myFetch";
import { toast } from "sonner";

const ChatSuspense = ({ chatUsers }) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [newMessage, setNewMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const selectedUser = chatUsers.find((u) => u._id === id);

  // -------------------------
  // File Upload
  // -------------------------
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  // -------------------------
  // Send Message
  // -------------------------
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() && !selectedFile) return;

    const message = {
      chatId: id,
      text: newMessage,
      type: "text",
    };

    try {
      const res = await myFetch("/message", {
        method: "POST",
        body: message,
      });
    } catch (err) {
      toast.error(err.message || "Message Not Create");
    }

    setNewMessage("");
    setSelectedFile(null);
  };

  const handleVideoCall = () => {
    if (selectedUser) alert(`Starting video call with ${selectedUser.name}...`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 max-w-7xl mx-auto">
      {/* Sidebar */}
      <Sidebar chatUsers={chatUsers} selectedUserId={selectedUser} />

      {/* Chat Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          selectedUser ? "block" : "hidden"
        } md:block`}
      >
        <ChatHeader
          selectedUser={selectedUser}
          handleVideoCall={handleVideoCall}
        />

        <div className="relative flex-1">
          <ChatMessages />
          <div ref={messagesEndRef} />
        </div>

        <MessageInput
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
          handleFileChange={handleFileChange}
          fileInputRef={fileInputRef}
          selectedUser={selectedUser}
        />
      </div>
    </div>
  );
};

export default function Chat({ chatUsers }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatSuspense chatUsers={chatUsers} />
    </Suspense>
  );
}
