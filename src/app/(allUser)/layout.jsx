
import Navbar from "@/components/shared/Navbar";
import { myFetch } from "../../../utils/myFetch";

export default async function JobSeekerLayout({ children }) {
  
  const data = await myFetch("/user/profile", {
    method: "GET",
    tags: ["profile"],
  });
  
  return (
    <div className="h-screen flex flex-col">
      <Navbar data={data} />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
