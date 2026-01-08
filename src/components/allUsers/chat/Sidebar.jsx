/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import CustomImage from "shared/CustomImage";
import { useDebounce } from "use-debounce";
import { formatUrl } from "utils/formatUrl";

const SidebarSuspense = ({ chatUsers, selectedUser }) => {
  const [selectedUserId, setSelectedUserId] = useState(selectedUser?._id);
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const search = searchParams.get("search");

  const handleUserSelect = (id) => {
    if (!id) return;
    setSelectedUserId(id);
    params.set("id", id);
    router.push(`?${params.toString()}`);
  };

  // useEffect(() => {
  //   if (!selectedUser && chatUsers?.length > 0) {
  //     console.log("All chat list in sidebar : ", chatUsers)
  //     handleUserSelect(chatUsers[0]?._id);
  //   }
  // }, [selectedUser]);

  const [debouncedSearchValue] = useDebounce(searchValue, 1000);

  useEffect(() => {
    if (debouncedSearchValue) {
      params.set("search", debouncedSearchValue);
    } else {
      params.delete("search");
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [debouncedSearchValue]);

  useEffect(() => {
    setSearchValue(search || "");
  }, [search]);

  return (
    <>
      {/* Search Bar */}
      <div className="flex items-center py-2.5 px-4">
        <input
          value={searchValue}
          onChange={(e) => {
            e.preventDefault();
            setSearchValue(e.target.value)
          }}
          type="text"
          placeholder="Search..."
          className="w-full p-2 border  focus:outline-blue-400"
        />
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chatUsers?.length > 0 &&
          chatUsers?.map((user) => (
            <div
              key={user._id}
              className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 transition ${selectedUserId === user?._id ? "bg-blue-50" : ""
                }`}
              onClick={() => handleUserSelect(user?._id)}
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
    </>
  );
};

export default function Sidebar({ chatUsers }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SidebarSuspense chatUsers={chatUsers} />
    </Suspense>
  );
}
