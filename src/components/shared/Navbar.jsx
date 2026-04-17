"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useClasses } from "./../../../utils/Navbar";
import NotificationMessageNavbar from "./NotificationMessageNavbar";
import ProfileDropdown from "./ProfileDropDown";
import { getUserRole } from "utils/getUserRoleClient";

const recuiter = [
  { href: "/", label: "Home" },
  { href: "/my-job", label: "My Job" },
  { href: "/my-request", label: "Job Request" },
  { href: "/career-spotlight", label: "Career Spotlight" },
  { href: "/pricing", label: "Pricing" },
  { href: "/job-post", label: "Post Job" },
];

const employee = [
  { href: "/", label: "Home" },
  { href: "/jobs", label: "Jobs" },
  { href: "/my-resume", label: "My Resume" },
  { href: "/history", label: "History" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
];

const withOutLogin = [
  { href: "/", label: "Home" },
  { href: "/jobs", label: "Jobs" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
];

export default function Navbar({ data }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { linkClass } = useClasses();
  const [profile, setProfile] = useState(null);

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
        // const data = await myFetch("/user/profile");
        if (isMounted) setProfile(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, [data]);

  const menus = {
    RECRUITER: recuiter,
    EMPLOYEE: employee,
    GUEST: withOutLogin,
  };

  // const role = profile?.data?.role;
  const role = getUserRole();
  const menu = menus[role] || menus.GUEST;

  return (
    <header className="w-full border-b-2 border-[#C7DEF2] sticky top-0 bg-white z-50">
      <div className="w-full mx-auto sm:px-4 lg:px-8 py-2 lg:py-3 flex items-center justify-between">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Jobarman"
            width={2000}
            height={400}
            sizes="100vh"
            className="w-20 h-10 sm:w-22 lg:w-28 lg:h-14"
          />
        </Link>

        {/* Desktop Navigation - Only visible on large screens (lg: 1024px+) */}
        <nav className="hidden lg:flex items-center gap-3 xl:gap-6 2xl:gap-8">
          {/* role based conditions */}
          {menu?.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={linkClass(item.href)}
            >
              {item.label}
            </Link>
          ))}

          {/* notification and message */}
          <NotificationMessageNavbar role={role} id={profile?.data?._id} />

          {/* Profile Section */}
          <ProfileDropdown
            data={profile?.data}
            dropdownRef={dropdownRef}
            dropdownOpen={dropdownOpen}
            setDropdownOpen={setDropdownOpen}
            role={role}
          />
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
        <div className="z-50 lg:hidden border-t border-gray-200 bg-white">

          <div className="flex gap-3 items-center justify-end">
            {/* notification and message */}
            <NotificationMessageNavbar role={role} />

            <ProfileDropdown
              data={profile?.data}
              dropdownRef={dropdownRef}
              dropdownOpen={dropdownOpen}
              setDropdownOpen={setDropdownOpen}
              role={role}
            />
          </div>
          <nav className="flex flex-col gap-3 px-3 py-4 sm:px-4">
            {menu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={linkClass(item.href)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
