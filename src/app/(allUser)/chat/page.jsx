"use client";

import { useState, useRef } from "react";
import Sidebar from "./Sidebar";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import MessageInput from "./MessageInput";
import { initialChats, initialUsers } from "../../../../utils/demoData";

const ChatInterface = () => {
  const [users, setUsers] = useState(initialUsers);
  const [chats, setChats] = useState(initialChats);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const selectedUser = users.find((u) => u.id === selectedUserId);
  const userMessages = chats[selectedUserId] || [];

  // -------------------------
  // User selection handler
  // -------------------------
  const handleUserSelect = (id) => {
    setSelectedUserId(id);
    setOpenMenuIndex(null);
  };

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
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() && !selectedFile) return;

    const message = {
      sender: "user",
      text: newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      file: selectedFile || null,
    };

    setChats((prev) => ({
      ...prev,
      [selectedUserId]: [...(prev[selectedUserId] || []), message],
    }));

    setNewMessage("");
    setSelectedFile(null);
  };

  const handleVideoCall = () => {
    if (selectedUser) alert(`Starting video call with ${selectedUser.name}...`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 max-w-7xl mx-auto">
      {/* Sidebar */}
      <Sidebar
        users={users}
        selectedUserId={selectedUserId}
        handleUserSelect={handleUserSelect}
      />

      {/* Chat Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          selectedUserId ? "block" : "hidden"
        } md:block`}
      >
        <ChatHeader
          selectedUser={selectedUser}
          handleVideoCall={handleVideoCall}
        />

        <div className="relative flex-1">
          <ChatMessages
            userMessages={userMessages}
            selectedUser={selectedUser}
            openMenuIndex={openMenuIndex}
            setOpenMenuIndex={setOpenMenuIndex}
          />
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

export default ChatInterface;
