"use client";
import { MessageModal } from "@/components/modal/MessageModal";
import { MessagesSquare, Video } from "lucide-react";
import { useSearchParams } from "next/navigation";
import CustomImage from "shared/CustomImage";
import { toast } from "sonner";
import { myFetch } from "utils/myFetch";
import Sidebar from "./Sidebar";

const ChatHeader = ({ chatUsers, selectedUser }) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // send message
  const handleVideoCall = async () => {
    const formData = new FormData();
    formData.append("chatId", id);
    formData.append("type", "zoom-link");

    try {
      const res = await myFetch("/message", {
        method: "POST",
        body: formData,
      });

      if (res.success && res.data && res.data.type === "zoom-link") {
        window.open(res.data.text, "_blank", "noopener,noreferrer");
      } else {
        toast.error(res.message || "Video not created");
      }
    } catch (err) {
      toast.error(err.message || "Video not created");
    }
  };

  return (
    <>
      <div className="bg-white p-4 border-b flex items-center justify-between shadow-sm">
        {selectedUser ? (
          <div className="flex items-center flex-1">
            <CustomImage
              src={selectedUser?.participants?.image}
              title={selectedUser?.participants?.name}
              width={32}
              height={32}
              className="w-8 h-8 object-cover rounded-full mr-3"
            />
            <div className="flex-1">
              <div className="font-semibold text-gray-800 truncate">
                {selectedUser?.participants?.name}
              </div>
              <div className="text-sm text-green-500">
                {selectedUser?.status || "Offline"}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <MessageModal
                trigger={
                  <MessagesSquare className="size-5 z-10 md:hidden" />
                }
              >
                <div className="flex flex-col h-[calc(50vh)] w-[320px] pt-4">
                  <Sidebar chatUsers={chatUsers} selectedUser={selectedUser} />
                </div>
              </MessageModal>
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={() => handleVideoCall()}
                title="Start Video Call"
              >
                <Video size={24} />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 text-center text-gray-600">
            Select a user to start chatting
          </div>
        )}
      </div>

      {/* {isVideoCallOpen && selectedUser && (
        <VideoCall
          selectedUser={selectedUser}
          onClose={() => setIsVideoCallOpen(false)}
        />
      )} */}
    </>
  );
};

export default ChatHeader;
