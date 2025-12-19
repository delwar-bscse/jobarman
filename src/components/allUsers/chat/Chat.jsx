import Sidebar from "./Sidebar";
// import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import { myFetch } from "utils/myFetch";

const Chat = async () => {
  const res = await myFetch("/chat");
  console.log("All Chat User List : ", res)

  return (
    <div className="flex h-full bg-gray-100 max-w-7xl mx-auto">
      {/* Sidebar */}
      <Sidebar chatUsers={res?.data}/>

      {/* Chat Area */}
      {/* <div className={`flex-1 flex flex-col transition-all duration-300 ${selectedUser ? "block" : "hidden"} md:block`}> */}
      <div className={`flex-1 flex flex-col transition-all duration-300 md:block`}>
        {/* <ChatHeader /> */}
        <ChatMessages />
      </div>
    </div>
  );
};

export default Chat
