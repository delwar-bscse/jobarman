import Sidebar from "./Sidebar";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";

const Chat = ({ chatUsers, selectedUser }) => {

  return (
    <div className="flex h-full bg-gray-100 max-w-7xl mx-auto">
      {/* Sidebar */}
      <Sidebar chatUsers={chatUsers} selectedUser={selectedUser} />

      {/* Chat Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${selectedUser ? "block" : "hidden"} md:block`}>
        <div className="">
          <ChatHeader selectedUser={selectedUser} />
        </div>
        <ChatMessages />
      </div>
    </div>
  );
};

export default Chat
