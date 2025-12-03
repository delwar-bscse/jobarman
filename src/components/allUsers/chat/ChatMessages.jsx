"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { myFetch } from "utils/myFetch";

const ChatMessages = () => {
  const [messages, setMessages] = useState(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [myId, setMyId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await myFetch("/user/profile");
      console.log("profile data", res);
      setMyId(res?.data?._id);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const message = await myFetch(`/message/${id}`);
      setMessages(message?.data?.messages);
    };
    fetchData();
  }, [id]);

  return (
    <div className="flex-1 p-4 overflow-y-auto bg-gray-50 h-[calc(100vh-230px)]">
      {messages ? (
        messages.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">
            No messages yet. Start a conversation!
          </div>
        ) : (
          <>
            {messages?.map((msg, i) => (
              <div
                key={i}
                className={`mb-4 flex items-end ${
                  msg.sender === myId ? "justify-end" : "justify-start"
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
                </div>
                {msg.sender === "user" && (
                  <Image
                    src="/chat-user.jpg"
                    alt="body"
                    width={32}
                    height={32}
                    className="w-8 h-8 object-cover rounded-full mr-3"
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
