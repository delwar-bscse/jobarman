"use client";
import { Paperclip } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { myFetch } from "utils/myFetch";

const MessageInput = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [newMessage, setNewMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const fileInputRef = useRef(null);

  // const selectedUser = chatUsers.find((u) => u._id === id);

  // File Upload
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  // Send Message
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
      console.log("Send text msg res : ", res);

      if (res.success) {
        setNewMessage("");
        setSelectedFile(null);
      } else {
        toast.error(res.message || "Message Not Create");
      }
    } catch (err) {
      toast.error(err.message || "Message Not Create");
    }

    setNewMessage("");
    setSelectedFile(null);
  };

  // Send Video Call
  // const handleVideoCall = () => {
  //   if (selectedUser) alert(`Starting video call with ${selectedUser.name}...`);
  // };

  return (
    <form
      onSubmit={handleSendMessage}
      className="p-4 bg-white border-t flex gap-2"
    >
      <button
        type="button"
        aria-label="Attach file"
        onClick={() => fileInputRef.current?.click()}
        className="text-gray-600 hover:text-gray-800"
      >
        <Paperclip size={20} />
      </button>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
        // disabled={loading}
        className="flex-1 p-2 border rounded focus:outline-blue-400"
      />

      <button
        type="submit"
        // disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:bg-blue-300"
      >
        {/* {loading ? "..." : "Send"} */}Send
      </button>
    </form>
  );
};

export default MessageInput;
