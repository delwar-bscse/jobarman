import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { myFetch } from "utils/myFetch";

export default async function JobSeekerLayout({ children }) {

  const data = await myFetch("/user/profile", {
    method: "GET",
    tags: ["profile"],
  });

  return (
    <div className="bg-[#FBFBFB]">
      <Navbar data={data} />
      <main className="container mx-auto px-2 sm:px-6 lg:px-8 max-w-7xl">
        {children}
      </main>
      <Footer />
    </div>
  );
}
