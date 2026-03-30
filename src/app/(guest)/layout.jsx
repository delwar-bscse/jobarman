import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { myFetch } from "utils/myFetch";

export default async function GuestLayout({ children }) {

  const data = await myFetch("/user/profile", {
    method: "GET",
    tags: ["profile"],
  });
  return (
    <>
      <Navbar data={data}/>
      {/* <main className="container mx-auto px-6 max-w-7xl">{children}</main> */}
      {children}
      <Footer />
    </>
  );
}
