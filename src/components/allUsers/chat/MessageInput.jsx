"use client";

import { Paperclip } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { myFetch } from "utils/myFetch";

const MessageInput = ({ scrollToBottom }) => {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [newMessage, setNewMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState(null);

  const handleFiles = async (e) => {
    const files = await e.target.files;
    if (!files || files.length === 0) return;

    console.log("Input Files: ", files);
    setSelectedFiles(files);
  };

  // Send Message
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!newMessage.trim() && !selectedFiles) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("chatId", id);
    formData.append("type", "text");

    if (newMessage.trim()) {
      formData.append("text", newMessage);
    }

    if (selectedFiles) {
      Array.from(selectedFiles).forEach((file) => {
        formData.append("image", file);
      });
    }

    try {
      const res = await myFetch("/message", {
        method: "POST",
        body: formData,
      });

      if (res.success) {
        setNewMessage("");
        setSelectedFiles(null);
        scrollToBottom();
      } else {
        toast.error(res.message || "Message not created");
      }
    } catch (err) {
      toast.error(err.message || "Message not created");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="p-4 bg-white border-t flex gap-2"
    >
      <button
        type="button"
        aria-label="Attach file"
        onClick={() => document.getElementById("sendFileId").click()}
        className="text-gray-600 hover:text-gray-800"
      >
        <Paperclip size={20} />
      </button>

      <input
        type="file"
        accept="image/*"
        multiple
        id="sendFileId"
        className="hidden"
        onChange={handleFiles}
      />

      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
        disabled={loading}
        className="flex-1 p-2 border rounded focus:outline-blue-400"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:bg-blue-300"
      >
        {loading ? "..." : "Send"}
      </button>
    </form>
  );
};

export default MessageInput;
