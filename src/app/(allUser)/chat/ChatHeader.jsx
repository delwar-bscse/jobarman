/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { Menu, Video } from "lucide-react";
import VideoCall from "./VideoCall";

const ChatHeader = ({ selectedUser, setIsSidebarOpen, handleVideoCall }) => {
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);

  return (
    <>
      <div className="bg-white p-4 border-b flex items-center justify-between shadow-sm">
        <button
          className="md:hidden text-gray-600"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu size={24} />
        </button>

        {selectedUser ? (
          <div className="flex items-center flex-1">
            <img
              src={selectedUser.avatar}
              alt={selectedUser.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div className="flex-1">
              <div className="font-semibold text-gray-800 truncate">
                {selectedUser.name}
              </div>
              <div className="text-sm text-green-500">
                {selectedUser.status || "Offline"}
              </div>
            </div>
            <button
              className="text-gray-600 hover:text-gray-800"
              onClick={() => setIsVideoCallOpen(true)}
              title="Start Video Call"
            >
              <Video size={24} />
            </button>
          </div>
        ) : (
          <div className="flex-1 text-center text-gray-600">
            Select a user to start chatting
          </div>
        )}
      </div>

      {isVideoCallOpen && selectedUser && (
        <VideoCall
          selectedUser={selectedUser}
          onClose={() => setIsVideoCallOpen(false)}
        />
      )}
    </>
  );
};

export default ChatHeader;
