
import Navbar from "@/components/shared/Navbar";

export default function JobSeekerLayout({ children }) {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
