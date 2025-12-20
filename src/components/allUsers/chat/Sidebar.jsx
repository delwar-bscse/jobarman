/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import CustomImage from "shared/CustomImage";
import { useDebounce } from "use-debounce";
import { formatUrl } from "utils/formatUrl";

const SidebarSuspense = ({ chatUsers, selectedUser }) => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const id = searchParams.get("id");
  const search = searchParams.get("search");

  // const selectedUser = chatUsers?.length > 0 && chatUsers?.find((u) => u._id === id);

  const handleUserSelect = (id) => {
    if (!id) return;
    params.set("id", id);
    router.push(`?${params.toString()}`);
  };

  const [debouncedSearchValue] = useDebounce(searchValue, 2000);

  useEffect(() => {
    if (debouncedSearchValue) {
      params.set("search", debouncedSearchValue);
      router.push(`?${params.toString()}`);
    } else {
      params.delete("search");
      router.push(`?${params.toString()}`);
    }
  }, [debouncedSearchValue]);

  useEffect(() => {
    setSearchValue(search || "");
  }, [search]);

  return (
    <div className={`flex flex-col w-64 h-[calc(100vh-98px)] bg-white shadow-lg border-r transform transition-transform duration-300 ease-in-out z-10 md:static md:translate-x-0 md:w-1/4 md:min-w-[200px] md:max-w-[300px]`} >
      {/* Search Bar */}
      <div className="flex items-center py-2.5 px-4">
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          placeholder="Search..."
          className="w-full p-2 border  focus:outline-blue-400"
        />
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chatUsers?.length > 0 && chatUsers?.map((user) => (
          <div
            key={user._id}
            className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 transition ${selectedUser?._id === user._id ? "bg-blue-50" : ""
              }`}
            onClick={() => handleUserSelect(user._id)}
          >
            <CustomImage
              src={formatUrl(user?.participants?.image)}
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
                {user?.lastMessage?.text || "No messages yet"}
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


export default function Sidebar({ chatUsers }) {
  return (
    <Suspense fallback={<div>Loading...</div>} >
      <SidebarSuspense chatUsers={chatUsers} />
    </Suspense>
  )
}
