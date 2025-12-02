import { Paperclip } from "lucide-react";

const MessageInput = ({
  newMessage,
  setNewMessage,
  handleSendMessage,
  handleFileChange,
  fileInputRef,
  loading = false,
  selectedUser,
}) => {
  if (!selectedUser) return null;

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
