import { Poppins } from "next/font/google";
import "./globals.css";
// import { Toaster } from "sonner";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  weight: "400", // ONLY normal weight first
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins", // Use CSS variable
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
