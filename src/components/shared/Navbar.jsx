"use client";

import { useState, useRef, useEffect, use } from "react";
import Link from "next/link";
import { Menu, X, Bell, MessageCircle, User } from "lucide-react";
import Image from "next/image";
import { useClasses } from "./../../../utils/Navbar";
import { myFetch } from "utils/myFetch";
import CustomImage from "shared/CustomImage";
import { deleteCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";

const recuiter = [
  { href: "/", label: "Home" },
  { href: "/my-job", label: "My Job" },
  { href: "/my-request", label: "My Request" },
  { href: "/career-spotlight", label: "Career Spotlight" },
  { href: "/pricing", label: "Pricing" },
  { href: "/job-post", label: "Post Job" },
  // { href: "/analyze-resume", label: "Analyze Resume" },
];

const employee = [
  { href: "/", label: "Home" },
  { href: "/jobs", label: "Jobs" },
  { href: "/my-resume", label: "My Resume" },
  { href: "/history", label: "History" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { linkClass, btnClass, iconClass } = useClasses();
  const [profile, setProfile] = useState(null);
  const router = useRouter();
  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      try {
        const data = await myFetch("/user/profile");
        if (isMounted) setProfile(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  // handle logout
  const handleLogout = () => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    deleteCookie("role");
    router.push("/login");
  };

  return (
    <header className="border-b-2 border-[#C7DEF2] sticky top-0 bg-white z-50">
      <div className="w-full mx-auto px-3 sm:px-4 lg:px-8 py-3 lg:py-4 flex items-center justify-between">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Jobarman"
            width={10}
            height={10}
            sizes="100vh"
            className="w-20 h-10 sm:w-22 lg:w-24 lg:h-12"
          />
        </Link>

        {/* Desktop Navigation - Only visible on large screens (lg: 1024px+) */}
        <nav className="hidden lg:flex items-center gap-3 xl:gap-6 2xl:gap-8">
          {profile?.data?.role === "RECRUITER" &&
            recuiter.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={linkClass(item.href)}
              >
                {item.label}
              </Link>
            ))}

          {profile?.data?.role == "EMPLOYEE" &&
            employee.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={linkClass(item.href)}
              >
                {item.label}
              </Link>
            ))}

          {/* Icons */}
          <Link
            href="/notifications"
            aria-label="Notifications"
            className={iconClass("/notifications")}
          >
            <Bell className="w-5 h-5" />
          </Link>
          <Link
            href="/chat"
            aria-label="Messages"
            className={iconClass("/chat")}
          >
            <MessageCircle className="w-5 h-5" />
          </Link>

          {/* Profile Avatar */}
          {profile?.data ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="focus:outline-none p-1 rounded-full hover:bg-white/50 transition"
              >
                <CustomImage
                  src={profile.data?.image}
                  title="profile image"
                  width={52}
                  height={52}
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-full"
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 lg:w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                  <Link
                    href="/profile/myProfile"
                    className="block px-3 py-2 lg:px-4 lg:py-2 text-sm lg:text-base text-gray-700 hover:bg-gray-100 transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Job Seeker
                  </Link>
                  <Link
                    href="/profile/companyProfile"
                    className="block px-3 py-2 lg:px-4 lg:py-2 text-sm lg:text-base text-gray-700 hover:bg-gray-100 transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Recruiter
                  </Link>

                  <div
                    className="cursor-pointer px-3 py-2 lg:px-4 lg:py-2 text-sm lg:text-base text-gray-700 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Log Out
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className={btnClass("/login")}>
              Sign In
            </Link>
          )}
        </nav>

        {/* Mobile/Tablet Menu Button - Visible on <lg (1024px) */}
        <button
          className="lg:hidden p-1"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile & Tablet Navigation - Fullscreen dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <nav className="flex flex-col gap-3 px-3 py-4 sm:px-4">
            <Link
              href="/"
              className={linkClass("/")}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/jobs"
              className={linkClass("/jobs")}
              onClick={() => setMobileMenuOpen(false)}
            >
              Jobs
            </Link>
            <Link
              href="/my-job"
              className={linkClass("/my-job")}
              onClick={() => setMobileMenuOpen(false)}
            >
              My Job
            </Link>
            <Link
              href="/career-spotlight"
              className={linkClass("/career-spotlight")}
              onClick={() => setMobileMenuOpen(false)}
            >
              Career Spotlight
            </Link>
            <Link
              href="/pricing"
              className={linkClass("/pricing")}
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/faq"
              className={linkClass("/faq")}
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link
              href="/history"
              className={linkClass("/history")}
              onClick={() => setMobileMenuOpen(false)}
            >
              History
            </Link>
            <Link
              href="/my-resume"
              className={linkClass("/my-resume")}
              onClick={() => setMobileMenuOpen(false)}
            >
              My Resume
            </Link>
            <Link
              href="/analyze-resume"
              className={linkClass("/analyze-resume")}
              onClick={() => setMobileMenuOpen(false)}
            >
              Analyze Resume
            </Link>

            {/* Icons as Links */}
            <Link
              href="/notifications"
              className={`${linkClass(
                "/notifications"
              )} flex items-center gap-2`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Bell className="w-5 h-5" /> Notifications
            </Link>
            <Link
              href="/chat"
              className={`${linkClass("/chat")} flex items-center gap-2`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <MessageCircle className="w-5 h-5" /> Messages
            </Link>

            {/* Mobile/Tablet Profile Dropdown */}
            <div className="flex flex-col gap-2 py-2">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 focus:outline-none text-left w-full"
              >
                <User className="w-7 h-7 text-gray-500 border border-gray-300 rounded-full p-1" />
                <span className="text-sm sm:text-base text-gray-700 font-medium">
                  Profile
                </span>
              </button>
              {dropdownOpen && (
                <div className="flex flex-col ml-9 gap-1.5">
                  <Link
                    href="/profile/jobseeker"
                    className="text-sm sm:text-base text-gray-700 hover:text-[#123499] transition"
                    onClick={() => {
                      setDropdownOpen(false);
                      setMobileMenuOpen(false);
                    }}
                  >
                    Job Seeker
                  </Link>
                  <Link
                    href="/profile/recruiter"
                    className="text-sm sm:text-base text-gray-700 hover:text-[#123499] transition"
                    onClick={() => {
                      setDropdownOpen(false);
                      setMobileMenuOpen(false);
                    }}
                  >
                    Recruiter
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/login"
              className={`w-full text-center ${btnClass("/login")}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign In
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
