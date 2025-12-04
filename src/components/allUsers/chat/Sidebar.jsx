"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import CustomImage from "shared/CustomImage";

const SidebarSuspense = ({ chatUsers, selectedUserId }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleUserSelect = (id) => {
    if (!id) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("id", id);
    router.push(`?${params.toString()}`);
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg border-r transform transition-transform duration-300 ease-in-out z-10
     
        md:static md:translate-x-0 md:w-1/4 md:min-w-[200px] md:max-w-[300px]`}
    >
      <div className="p- border-b flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 border rounded focus:outline-blue-400"
        />
        {/* <button
          className="md:hidden text-gray-600"
          onClick={() => setIsSidebarOpen(false)}
        >
          <Menu size={24} />
        </button> */}
      </div>

      <div className="overflow-y-auto h-[calc(100vh-60px)]">
        {chatUsers?.map((user) => (
          <div
            key={user._id}
            className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 transition ${
              selectedUserId === user._id ? "bg-blue-50" : ""
            }`}
            onClick={() => handleUserSelect(user._id)}
          >
            <CustomImage
              src={user?.participants?.image}
              title={user.participants.name}
              width={32}
              height={32}
              className="w-8 h-8 object-cover rounded-full mr-3"
              sizes="100vh"
            />
            <div className="flex-1 min-w-0">
              <div className="font-semibold truncate">
                {user?.participants?.name}
              </div>
              <div className="text-sm text-gray-500 truncate">
                {/* {chats[user.id]?.slice(-1)[0]?.text || "No messages yet"} */}
                No messages yet
              </div>
            </div>
            {user.status === "online" && (
              <span className="w-2 h-2 bg-green-500 rounded-full ml-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};


export default function Sidebar({ chatUsers, selectedUserId }) {
  return (
    <Suspense fallback={<div>Loading...</div>} >
      <SidebarSuspense chatUsers={chatUsers} selectedUserId={selectedUserId} />
    </Suspense>
  )
}
