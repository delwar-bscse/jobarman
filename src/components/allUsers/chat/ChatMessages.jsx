// "use client";
// import Image from "next/image";
// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { myFetch } from "utils/myFetch";

// const ChatMessages = () => {
//   const [messages, setMessages] = useState(null);
//   const searchParams = useSearchParams();
//   const id = searchParams.get("id");
//   const [myId, setMyId] = useState(null);
//   const [itemsToShow, setItemsToShow] = useState();

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await myFetch("/user/profile");
//       console.log("profile data", res);
//       setMyId(res?.data?._id);
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       const message = await myFetch(`/message/${id}`);
//       setMessages(message?.data?.messages);
//     };
//     fetchData();
//   }, [id]);

//   const handleScroll = (event) => {
//     const { scrollTop, clientHeight, scrollHeight } = event.target;

//     if (
//       scrollTop + clientHeight >= scrollHeight - 50 &&
//       itemsToShow < allData.length
//     ) {
//       // -50 for a small buffer
//       setItemsToShow((prevItemsToShow) =>
//         Math.min(prevItemsToShow + 10, messages.length)
//       );
//     }
//   };

//   return (
//     <div
//       className="flex-1 p-4 overflow-y-auto bg-gray-50 h-[calc(100vh-230px)]"
//       onScroll={handleScroll}
//     >
//       {messages ? (
//         messages.length === 0 ? (
//           <div className="text-center text-gray-400 mt-10">
//             No messages yet. Start a conversation!
//           </div>
//         ) : (
//           <>
//             {messages?.map((msg, i) => (
//               <div
//                 key={i}
//                 className={`mb-4 flex items-end ${
//                   msg.sender === myId ? "justify-end" : "justify-start"
//                 } max-w-full`}
//               >
//                 {msg.sender === "bot" && (
//                   <Image
//                     src="/chat-user.jpg"
//                     alt="body"
//                     width={32}
//                     height={32}
//                     className="w-8 h-8 object-cover rounded-full mr-3"
//                     sizes="100vh"
//                   />
//                 )}
//                 <div className="relative group max-w-[80%] sm:max-w-[60%]">
//                   <div
//                     className={`p-3 rounded-lg shadow-sm ${
//                       msg.sender === "user"
//                         ? "bg-blue-500 text-white rounded-br-none"
//                         : "bg-gray-200 text-gray-800 rounded-bl-none"
//                     }`}
//                   >
//                     {msg.text && <p className="break-words">{msg.text}</p>}
//                     {/* {msg.file && <FilePreview file={msg.file} />} */}
//                     <span className="block text-[10px] text-gray-300 mt-1">
//                       {msg.time}
//                     </span>
//                   </div>
//                 </div>
//                 {msg.sender === "user" && (
//                   <Image
//                     src="/chat-user.jpg"
//                     alt="body"
//                     width={32}
//                     height={32}
//                     className="w-8 h-8 object-cover rounded-full mr-3"
//                     sizes="100vh"
//                   />
//                 )}
//               </div>
//             ))}
//           </>
//         )
//       ) : (
//         <div className="text-center text-gray-400 mt-10">
//           Select a user to start chatting
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatMessages;

"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useRef } from "react";
import { myFetch } from "utils/myFetch";

const LIMIT = 10;

const ChatMessages = () => {
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [myId, setMyId] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // Use refs for values that shouldn't trigger re-renders
  const loadingRef = useRef(false);
  const hasMoreRef = useRef(true);

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
        const res = await myFetch(`/message/${id}?page=${pageNumber}`);
        const newMessages = res?.data?.messages || [];

        setMessages((prev) => {
          // For initial load, replace all messages
          if (pageNumber === 1) {
            return newMessages;
          }
          // For subsequent loads, append messages
          return [...prev, ...newMessages];
        });

        // No more messages?
        if (newMessages.length < LIMIT) {
          hasMoreRef.current = false;
          setHasMore(false);
        }

        setPage(pageNumber);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      } finally {
        loadingRef.current = false;
        setLoading(false);
        setIsInitialLoad(false);
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
    setHasMore(true);
    setIsInitialLoad(true);
    loadingRef.current = false;
    hasMoreRef.current = true;

    // Fetch first page
    fetchMessages(1);
  }, [id, fetchMessages]);

  // Scroll handler
  const handleScroll = useCallback(
    (e) => {
      const { scrollTop, clientHeight, scrollHeight } = e.target;

      // Load more when near bottom
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        if (!loadingRef.current && hasMoreRef.current) {
          const nextPage = page + 1;
          fetchMessages(nextPage);
        }
      }
    },
    [page, fetchMessages]
  );

  // Clean up on unmount
  useEffect(() => {
    return () => {
      loadingRef.current = false;
    };
  }, []);

  return (
    <div
      className="flex-1 p-4 overflow-y-auto bg-gray-50 h-[calc(100vh-230px)]"
      onScroll={handleScroll}
    >
      {isInitialLoad && loading ? (
        <div className="text-center text-gray-500 py-4">
          Loading messages...
        </div>
      ) : (
        <>
          {messages.map((msg, i) => (
            <div
              key={`${msg._id || msg.sender}_${msg.time}_${i}`}
              className={`mb-4 flex items-end ${
                msg.sender === myId ? "justify-end" : "justify-start"
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
                  className={`p-3 rounded-lg shadow-sm ${
                    msg.sender === myId
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

          {/* Loading indicator for additional pages */}
          {loading && !isInitialLoad && (
            <div className="text-center text-gray-500 py-2">
              Loading more...
            </div>
          )}

          {/* No messages at all */}
          {!hasMore && messages.length === 0 && !loading && (
            <div className="text-center text-gray-400 py-4">
              No messages yet
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ChatMessages;
