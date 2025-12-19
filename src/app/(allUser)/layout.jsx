
import Navbar from "@/components/shared/Navbar";
// import Footer from "@/components/shared/Footer";

export default function JobSeekerLayout({ children }) {
  return (
      <div className="h-screen flex flex-col">
        <Navbar />
        <div className="flex-1">
          {children}
        </div>
        {/* <Footer /> */}
      </div>
  );
}
