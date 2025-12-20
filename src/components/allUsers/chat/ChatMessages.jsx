/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useSocket } from "@/lib/SocketContext";
import { debounce } from "lodash";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { myFetch } from "utils/myFetch";
import MessageInput from "./MessageInput";
import { formatUrl } from "utils/formatUrl";
import { format } from "path";
import dayjs from "dayjs";
import { ImageModal } from "@/components/modal/ImageModal";

const SCROLL_THRESHOLD = 60; // px

const ChatMessages = () => {
  const { socket } = useSocket();

  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [myId, setMyId] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const messageContainerRef = useRef(null);
  const isNearBottom = useRef(true);

  const searchParams = useSearchParams();
  const chatId = searchParams.get("id");

  /* ---------------- Helpers ---------------- */

  const getIsNearBottom = () => {
    const el = messageContainerRef.current;
    if (!el) return true;

    const distance = el.scrollHeight - el.scrollTop - el.clientHeight;
    return distance < SCROLL_THRESHOLD;
  };

  const scrollToBottom = () => {
    const el = messageContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  };

  const preserveScrollOnPrepend = (prevHeight) => {
    const el = messageContainerRef.current;
    if (!el) return;

    const newHeight = el.scrollHeight;
    el.scrollTop = newHeight - prevHeight;
  };

  useEffect(() => {
    if (isNearBottom.current) {
      scrollToBottom();
    }
  }, [messages]);

  /* ---------------- Load Profile ---------------- */

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await myFetch("/user/profile");
        console.log("My Profile : ", res);
        setMyId(res?.data?._id || null);
      } catch (err) {
        console.error("Profile load failed:", err);
      }
    };

    loadProfile();
  }, []);

  /* ---------------- Fetch Messages ---------------- */

  const fetchMessages = useCallback(
    async (pageNumber) => {
      if (!chatId) return;

      setLoading(true);

      const el = messageContainerRef.current;
      const prevHeight = el?.scrollHeight || 0;

      try {
        const res = await myFetch(`/message/${chatId}?page=${pageNumber}&limit=20`);
        console.log("All Message Res : ", res);

        const list = res?.data?.messages || [];
        const normalized = list
          .slice()
          .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

        setMessages((prev) => {
          if (pageNumber === 1) return normalized;
          return [...normalized, ...prev]; // prepend older
        });

        requestAnimationFrame(() => {
          if (pageNumber === 1) {
            scrollToBottom();
          } else {
            preserveScrollOnPrepend(prevHeight);
          }
        });

        setIsInitialLoad(false);
      } catch (err) {
        console.error("Fetch messages failed:", err);
      } finally {
        setLoading(false);
      }
    },
    [chatId]
  );

  /* ---------------- Initial Load ---------------- */

  useEffect(() => {
    if (!chatId) return;

    setPage(1);
    setIsInitialLoad(true);
    setMessages([]);

    fetchMessages(1);
  }, [chatId]);

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
          fetchMessages(newPage);
        }
      }, 500),
    [loading, messages.length, page, chatId]
  );

  /* ---------------- Socket Listener ---------------- */

  useEffect(() => {
    if (!chatId || !socket) return;

    const eventName = `getMessage::${chatId}`;

    const onNewMessage = (newMsg) => {
      console.log("New Message : ", newMsg);
      isNearBottom.current = getIsNearBottom();

      setMessages((prev) => [...prev, newMsg]);

      requestAnimationFrame(() => {
        if (isNearBottom.current) {
          scrollToBottom();
        }
      });
    };

    socket.on(eventName, onNewMessage);
    return () => socket.off(eventName, onNewMessage);
  }, [chatId, socket]);

  /* ---------------- Render ---------------- */

  return (
    <div>
      <div
        ref={messageContainerRef}
        onScroll={handleScroll}
        className="relative flex-1 p-4 overflow-y-auto bg-gray-50 h-[calc(100vh-239px)]"
      >
        {isInitialLoad && loading ? (
          <div className="text-center text-gray-500 py-4">
            Loading messages...
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {messages.map((msg, i) => (
              <div
                key={`${msg._id || msg.sender}_${msg.time}_${i}`}
                className={`flex items-end ${msg.sender === myId
                  ? "justify-end"
                  : "justify-start"
                  }`}
              >
                {msg.sender !== myId && (
                  <Image
                    src="/chat-user.jpg"
                    alt="user"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full mr-3"
                  />
                )}

                <div className="max-w-[80%] sm:max-w-[60%]">
                  <div
                    className={`p-3 text-gray-900  bg-gray-100 rounded-lg shadow-sm ${msg.sender === myId
                      ? "rounded-br-none"
                      : "rounded-bl-none"
                      }`}
                  >
                    {msg?.type === "text" && (
                      <p className="break-words">{msg.text}</p>
                    )}
                    {msg?.type === "zoom-link" && (
                      <a href={msg.text} target="_blank" rel="noopener noreferrer" className="break-words">{msg.text}</a>
                    )}
                    {msg?.type === "image" && <div className="flex flex-wrap gap-2">
                      {msg?.image?.map((img, i) => (
                        <div key={i}>
                          <ImageModal image={img} trigger={<Image
                            src={formatUrl(img)}
                            alt="img"
                            width={100}
                            height={100}
                            className="w-30 h-auto rounded-lg object-cover"
                          />} />
                        </div>
                      ))}
                    </div>}
                    <span className="block text-[9px] text-gray-500 mt-1">
                      {dayjs(msg.createdAt).format("DD MMM, hh:mm A")}
                    </span>
                  </div>
                </div>

                {msg.sender === myId && (
                  <Image
                    src="/chat-user.jpg"
                    alt="me"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full ml-3"
                  />
                )}
              </div>
            ))}
          </div>
        )}

      </div>
      <>
        <MessageInput scrollToBottom={scrollToBottom} />
      </>
    </div>
  );
};

export default ChatMessages;
