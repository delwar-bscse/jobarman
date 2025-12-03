import { myFetch } from "utils/myFetch";
import Chat from "./../../../components/allUsers/chat/Chat";

export default async function page() {
  const users = await myFetch("/chat");

  return (
    <div>
      <Chat chatUsers={users?.data} />
    </div>
  );
}
