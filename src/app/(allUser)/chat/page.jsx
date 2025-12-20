import { myFetch } from "utils/myFetch";
import Chat from "./../../../components/allUsers/chat/Chat";

export default async function page({ searchParams }) {
  const { id, search } = await searchParams;

  let url = `/chat`;
  if (id) { url = `/chat?searchTerm${search}` }

  const res = await myFetch(url);
  console.log("All Chat User List : ", res)
  const chatUsers = res?.data;
  const selectedUser = chatUsers?.length > 0 && chatUsers?.find((u) => u._id === id);
  // console.log("Selected User : ", selectedUser)


  return (
    <div>
      <Chat chatUsers={chatUsers} selectedUser={selectedUser} />
    </div>
  );
}
