import { myFetch } from "utils/myFetch";
import Sidebar from "@/components/allUsers/chat/Sidebar";
import ChatHeader from "@/components/allUsers/chat/ChatHeader";
import ChatMessages from "@/components/allUsers/chat/ChatMessages";

export default async function page({ searchParams }) {
  const { id, search } = await searchParams;

  let url = `/chat`;
  if (search) {
    url = `/chat?searchTerm=${search}`;
  }

  console.log("chart url : ", url);

  const res = await myFetch(url);

  const resSingleChat = await myFetch(`/chat/${id}`);
  const selectedUser = resSingleChat?.data;

  const chatUsers = res?.data;

  console.log("Selected User : ", selectedUser)

  return (
    <>
      {/* <Chat chatUsers={chatUsers} selectedUser={resSingleChat} /> */}
      <div className="flex h-full bg-gray-100 max-w-7xl mx-auto">
      {/* Sidebar */}
      <div
        className={`w-64 hidden md:flex flex-col h-[calc(100vh-90px)] bg-white shadow-lg border-r transform transition-transform duration-300 ease-in-out z-10 md:static md:translate-x-0 md:w-1/4 md:min-w-[200px] md:max-w-[300px]`}
      >
        <Sidebar chatUsers={chatUsers} selectedUser={selectedUser} />
      </div>

      {/* Chat Area */}
      {selectedUser ? <div className={`flex-1 transition-all duration-300 md:block`}>
        <ChatHeader selectedUser={selectedUser} chatUsers={chatUsers}/>
        <ChatMessages selectedUser={selectedUser} />
      </div> : <div className="flex-1 flex flex-col items-center justify-center text-gray-500 bg-gray-50 text-lg font-semibold">No Message Found</div>}
    </div>
    </>
  );
}
