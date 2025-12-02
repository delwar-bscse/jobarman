import React from "react";
import { Paperclip } from "lucide-react";

const MessageInput = ({
  newMessage,
  setNewMessage,
  handleSendMessage,
  handleFileChange,
  fileInputRef,
  loading,
  selectedUser,
}) => {
  return (
    selectedUser && (
      <form
        onSubmit={handleSendMessage}
        className="p-4 bg-white border-t flex items-center gap-2"
      >
        <button
          type="button"
          className="text-gray-600 hover:text-gray-800"
          onClick={() => fileInputRef.current.click()}
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
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded focus:outline-blue-400"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    )
  );
};

export default MessageInput;
