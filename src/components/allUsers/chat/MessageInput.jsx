"use client";

import { Paperclip } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { myFetch } from "utils/myFetch";

const MessageInput = ({ scrollToBottom }) => {
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const sendMessage = async (formData) => {
    try {
      const res = await myFetch("/message", {
        method: "POST",
        body: formData,
      });

      if (res.success) {
        setNewMessage("");
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

  const handleText = async (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("chatId", id);
    formData.append("type", "text");
    formData.append("text", newMessage);

    await sendMessage(formData);
  };

  const handleFiles = async (e) => {
    const files = e.target.files;
    if (!files?.length) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("chatId", id);
    formData.append("type", "image");

    Array.from(files).forEach((file) => {
      formData.append("image", file);
    });

    await sendMessage(formData);
  };

  return (
    <form
      onSubmit={handleText}
      className="p-4 bg-white border-t flex items-center gap-2"
    >
      <div className="flex items-center gap-3  flex-1">
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
      </div>

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
