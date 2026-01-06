"use client";
import Link from "next/link";
import CustomImage from "../../../shared/CustomImage";
import { useClasses } from "utils/Navbar";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next/client";

export default function ProfileDropDown({
  data,
  dropdownRef,
  dropdownOpen,
  setDropdownOpen,
  role,
}) {
  const { btnClass } = useClasses();
  const router = useRouter();

  // handle logout
  const handleLogout = () => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    deleteCookie("role");
    router.push("/login");
  };

  return (
    <>
      {data ? (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="focus:outline-none p-1 rounded-full hover:bg-white/50 transition"
          >
            <CustomImage
              src={data?.image}
              title="profile image"
              width={52}
              height={52}
              className="w-8 h-8 lg:w-12 lg:h-12 rounded-full border"
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 lg:w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
              {role === "EMPLOYEE" ? (
                <Link
                  href="/profile/myProfile"
                  className="block px-3 py-2 lg:px-4 lg:py-2 text-sm lg:text-base text-gray-700 hover:bg-gray-100 transition"
                  onClick={() => setDropdownOpen(false)}
                >
                  Job Seeker
                </Link>
              ) : (
                <Link
                  href="/profile/companyProfile"
                  className="block px-3 py-2 lg:px-4 lg:py-2 text-sm lg:text-base text-gray-700 hover:bg-gray-100 transition"
                  onClick={() => setDropdownOpen(false)}
                >
                  Recruiter
                </Link>
              )}

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
    </>
  );
}
