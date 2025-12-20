import Sidebar from "./Sidebar";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import { MessagesSquare } from "lucide-react";
import { MessageModal } from "@/components/modal/MessageModal";

const Chat = ({ chatUsers, selectedUser }) => {

  return (
    <div className="flex h-full bg-gray-100 max-w-7xl mx-auto">
      {/* Sidebar */}
      <div className={`w-64 hidden md:flex flex-col h-[calc(100vh-98px)] bg-white shadow-lg border-r transform transition-transform duration-300 ease-in-out z-10 md:static md:translate-x-0 md:w-1/4 md:min-w-[200px] md:max-w-[300px]`} >
        <Sidebar chatUsers={chatUsers} selectedUser={selectedUser} />
      </div>
      <MessageModal trigger={<MessagesSquare className="size-5 fixed top-[88px] right-12 z-50 md:hidden" />}>
        <div className="flex flex-col h-[calc(50vh)] w-[320px] pt-4">
          <Sidebar chatUsers={chatUsers} selectedUser={selectedUser} />
        </div>
      </MessageModal>

      {/* Chat Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 md:block`}>
        <div className="">
          <ChatHeader selectedUser={selectedUser} />
        </div>
        <ChatMessages />
      </div>
    </div >
  );
};

export default Chat
