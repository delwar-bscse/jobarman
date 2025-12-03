"use client";
import Image from "next/image";

const Sidebar = ({ users, selectedUserId, handleUserSelect }) => {
  //    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
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
        {users?.map((user) => (
          <div
            key={user.id}
            className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 transition ${
              selectedUserId === user.id ? "bg-blue-50" : ""
            }`}
            onClick={() => handleUserSelect(user.id)}
          >
            <Image
              src="/chat-user.jpg"
              alt={user.name}
              width={32}
              height={32}
              className="w-8 h-8 object-cover rounded-full mr-3"
              sizes="100vh"
            />
            <div className="flex-1 min-w-0">
              <div className="font-semibold truncate">{user.name}</div>
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

export default Sidebar;
