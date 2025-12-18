/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useSocket } from "@/lib/SocketContext";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useRef, useMemo, useLayoutEffect } from "react";
import { myFetch } from "utils/myFetch";
import { debounce } from "lodash";

const SCROLL_THRESHOLD = 60; // px

const ChatMessages = () => {
  const { socket } = useSocket();
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [myId, setMyId] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);


  const isNearBottom = useRef(true);
  const messageContainerRef = useRef(null);
  const messagesEndRef = useRef(null);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // Use refs for values that shouldn't trigger re-renders
  const loadingRef = useRef(false);
  const hasMoreRef = useRef(true);

  // ------- helpers -------
  const getIsNearBottom = () => {
    const el = messageContainerRef.current;
    if (!el) return true;
    const distance = el.scrollHeight - el.scrollTop - el.clientHeight;
    return distance < SCROLL_THRESHOLD;
  };

  const scrollToBottom = () => {
    const el = messageContainerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  };

  const preserveScrollOnPrepend = (prevHeight) => {
    const el = messageContainerRef.current;
    if (!el) return;
    const newHeight = el.scrollHeight;
    el.scrollTop = newHeight - prevHeight;
  };

  // Load profile
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await myFetch("/user/profile");
        setMyId(res?.data?._id);
      } catch (error) {
        console.error("Failed to load profile:", error);
      }
    };
    loadProfile();
  }, []);

  // Fetch messages function
  const fetchMessages = useCallback(
    async (pageNumber) => {
      if (loadingRef.current || !hasMoreRef.current || !id) return;

      loadingRef.current = true;
      setLoading(true);

      try {
        const prevHeight = messageContainerRef.current?.scrollHeight || 0;

        const res = await myFetch(`/message/${id}?page=${pageNumber}`);
        console.log("All get message : ", res?.data)
        const newMessages = res?.data?.messages || [];

        setMessages((prev) => {
          // For initial load, replace all messages
          if (pageNumber === 1) {
            return newMessages;
          }
          // For subsequent loads, append messages
          return [...prev, ...newMessages];
        });

        requestAnimationFrame(() => {
          if (pageNumber > 1) {
            preserveScrollOnPrepend(prevHeight);
          } else {
            scrollToBottom();
          }
        });
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      } finally {
        setLoading(false);
      }
    },
    [id]
  ); // Only depend on id

  // Load first page when id changes
  useEffect(() => {
    if (!id) return;

    // Reset states
    setMessages([]);
    setPage(1);
    setIsInitialLoad(true);

    // Fetch first page
    fetchMessages(1);
  }, [id, fetchMessages]);



  // ------- scroll listener: load older when at top; track stickiness -------
  const handleScroll = useMemo(
    () =>
      debounce(() => {
        const el = messageContainerRef.current;
        if (!el) return;

        // update "near bottom" flag continuously
        isNearBottom.current = getIsNearBottom();

        if (!loading && messages.length > 0 && el.scrollTop === 0) {
          const newPage = page + 1;
          setPage(newPage);
          myMessage(newPage);
        }
      }, 120),
    [loading, messages.length, page, id]
  );

  useEffect(() => {
    return () => handleScroll.cancel();
  }, [handleScroll]);

  // ------- auto-stick to bottom on list re-render (only when near bottom before) -------
  useLayoutEffect(() => {
    if (isNearBottom.current) {
      scrollToBottom();
    }
  }, [messages]);

  // ------- socket: append new message (newest at end) -------
  useEffect(() => {
    if (!id || !socket) return;

    const eventName = "new-message::" + id;

    const onNewMsg = (newMsg) => {
      // capture stickiness just before mutating
      isNearBottom.current = getIsNearBottom();

      setMsg(prev => [...prev, newMsg]); // append at end (oldest -> newest)

      requestAnimationFrame(() => {
        if (isNearBottom.current) scrollToBottom();
      });
    };

    socket.on(eventName, onNewMsg);
    return () => {
      socket.off(eventName, onNewMsg);
    };
  }, [id, socket]);


  // ------- socket: append new message (newest at end) -------
  useEffect(() => {
    if (!id || !socket) return;

    const eventName = "getMessage::" + id;

    const onNewMsg = (newMsg) => {
      console.log("Message socket response : ", newMsg);
      // capture stickiness just before mutating
      // isNearBottom.current = getIsNearBottom();

      setMessages(prev => [...prev, newMsg]);


      // requestAnimationFrame(() => {
      //   if (isNearBottom.current) scrollToBottom();
      // });
    };

    socket.on(eventName, onNewMsg);
    return () => {
      socket.off(eventName, onNewMsg);
    };
  }, [id, socket]);

  return (
    <div
      className="flex-1 p-4 overflow-y-auto bg-gray-50 h-[calc(100vh-230px)]"
      ref={messageContainerRef}
      onScroll={handleScroll}
    >
      {isInitialLoad && loading ? (
        <div className="text-center text-gray-500 py-4">
          Loading messages...
        </div>
      ) : (
        <div>
          <div className="flex flex-col justify-end gap-4">
            {messages.map((msg, i) => (
              <div
                key={`${msg._id || msg.sender}_${msg.time}_${i}`}
                className={`mb-4 flex items-end ${msg.sender === myId ? "justify-end" : "justify-start"
                  } max-w-full`}
              >
                {msg.sender !== myId && (
                  <Image
                    src="/chat-user.jpg"
                    alt="user"
                    width={32}
                    height={32}
                    className="w-8 h-8 object-cover rounded-full mr-3"
                  />
                )}

                <div className="relative group max-w-[80%] sm:max-w-[60%]">
                  <div
                    className={`p-3 rounded-lg shadow-sm ${msg.sender === myId
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                      }`}
                  >
                    {msg.text && <p className="break-words">{msg.text}</p>}
                    <span className="block text-[10px] text-gray-300 mt-1">
                      {msg.time}
                    </span>
                  </div>
                </div>

                {msg.sender === myId && (
                  <Image
                    src="/chat-user.jpg"
                    alt="me"
                    width={32}
                    height={32}
                    className="w-8 h-8 object-cover rounded-full ml-3"
                  />
                )}
              </div>
            ))}
          </div>
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
