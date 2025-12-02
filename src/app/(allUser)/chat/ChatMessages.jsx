import Image from "next/image";

const ChatMessages = ({
  userMessages,
  selectedUser,
  openMenuIndex,
  setOpenMenuIndex,
}) => {
  return (
    <div className="flex-1 p-4 overflow-y-auto bg-gray-50 h-screen">
      {selectedUser ? (
        userMessages.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">
            No messages yet. Start a conversation!
          </div>
        ) : (
          <>
            {userMessages.map((msg, i) => (
              <div
                key={i}
                className={`mb-4 flex items-end ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                } max-w-full`}
              >
                {msg.sender === "bot" && (
                  <Image
                    src="/chat-user.jpg"
                    alt="body"
                    width={32}
                    height={32}
                    className="w-8 h-8 object-cover rounded-full mr-3"
                    sizes="100vh"
                  />
                )}
                <div className="relative group max-w-[80%] sm:max-w-[60%]">
                  <div
                    className={`p-3 rounded-lg shadow-sm ${
                      msg.sender === "user"
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-gray-200 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {msg.text && <p className="break-words">{msg.text}</p>}
                    {/* {msg.file && <FilePreview file={msg.file} />} */}
                    <span className="block text-[10px] text-gray-300 mt-1">
                      {msg.time}
                    </span>
                  </div>

                  {openMenuIndex === i && (
                    <div
                      className={`absolute top-5 z-10 bg-white border rounded-lg shadow-md text-sm text-gray-600 w-28 ${
                        msg.sender === "user"
                          ? "right-0 sm:-left-32"
                          : "left-0 sm:-right-32"
                      }`}
                    >
                      <ul className="p-2 space-y-1">
                        <li className="hover:bg-gray-100 px-3 py-1 rounded cursor-pointer">
                          Edit
                        </li>
                        <li className="hover:bg-gray-100 px-3 py-1 rounded cursor-pointer">
                          Delete
                        </li>
                        <li className="hover:bg-gray-100 px-3 py-1 rounded cursor-pointer">
                          Copy
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                {msg.sender === "user" && (
                  <Image
                    src="/chat-user.jpg"
                    alt="user"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full mr-2 hidden sm:block"
                    sizes="100vh"
                  />
                )}
              </div>
            ))}
          </>
        )
      ) : (
        <div className="text-center text-gray-400 mt-10">
          Select a user to start chatting
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
