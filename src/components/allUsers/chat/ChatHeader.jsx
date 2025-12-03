import { Video } from "lucide-react";
// import VideoCall from "./VideoCall";
import CustomImage from "shared/CustomImage";

const ChatHeader = ({ selectedUser, handleVideoCall }) => {
  // const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);

  return (
    <>
      <div className="bg-white p-4 border-b flex items-center justify-between shadow-sm">
        {selectedUser ? (
          <div className="flex items-center flex-1">
            <CustomImage
              src={selectedUser?.participants?.image}
              title={selectedUser.participants.name}
              width={32}
              height={32}
              className="w-8 h-8 object-cover rounded-full mr-3"
            />
            <div className="flex-1">
              <div className="font-semibold text-gray-800 truncate">
                {selectedUser?.participants?.name}
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
