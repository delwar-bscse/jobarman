"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Heart, FileText, Star, Settings, LogOut, X, Lock, HelpCircle, Trash2, User } from "lucide-react"
import Image from "next/image"
import Swal from "sweetalert2"
import { myFetch } from "../../../../../utils/myFetch"

export default function PlatformReviewPage() {
  const router = useRouter()
  const pathname = usePathname()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [rating, setRating] = useState()
  const [review, setReview] = useState("")
  const [hoveredStar, setHoveredStar] = useState(0)

  const getActiveMenu = () => {
    if (pathname === "/profile") return "My Profile"
    if (pathname === "/profile/favoriteList") return "Favorite List"
    if (pathname === "/profile/paymentHistory") return "Payment History"
    if (pathname === "/profile/platformReview") return "Platform Review"
    if (pathname === "/profile/settings") return "Settings"
    if (pathname === "/profile/logout") return "Log Out"
    return "My Profile"
  }

  const menuItems = [
    { icon: User, label: "My Profile", route: "/profile/myProfile" },
    { icon: Heart, label: "Favorite List", route: "/profile/favourite" },
    { icon: FileText, label: "Payment History", route: "/profile/payment" },
    { icon: Star, label: "Platform Review", route: "/profile/platformReview" },
    {
      icon: Settings,
      label: "Settings",
      subItems: [
        { icon: Lock, label: "Change Password", route: "/profile/settings/changePassword" },
        { icon: HelpCircle, label: "Help and Support", route: "/profile/settings/helpSupport" },
        { icon: Trash2, label: "Delete Account", route: "/profile/settings/deleteAccount" },
      ],
    },
    { icon: LogOut, label: "Log Out", route: "/profile/logout" },
  ]

  const handleMenuClick = (item) => {
    if (item.label === "Settings") {
      setIsSettingsOpen(!isSettingsOpen)
    } else if (item.route) {
      router.push(item.route)
      setIsSettingsOpen(false)
    }
  }

  const handleSubMenuClick = (subItem) => {
    if (subItem.route) {
      router.push(subItem.route)
      setIsSettingsOpen(false)
    }
  }

  const handleSubmit = async () => {
    console.log("Rating : ", rating)
    console.log("Review : ", review)

    if (!review.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Please enter a review",
        text: "Review text cannot be empty",
        confirmButtonColor: "#123499",
      })
      return
    }
    if (rating <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Please enter your rating",
        text: "Rating cannot be empty",
        confirmButtonColor: "#123499",
      })
      return
    }

    const res = await myFetch("/review", { method: "POST", body: { rating, comment: review } });
    console.log(res?.data);

    if (res?.success) {
      Swal.fire({
        icon: "success",
        title: "Review Submitted!",
        text: "Thank you for your feedback. Your review has been submitted successfully.",
        confirmButtonColor: "#123499",
      }).then(() => {
        setReview("")
        setRating(0)
      })
    }else{
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Unable to submit your review. Please try again later.",
        confirmButtonColor: "#123499",
      })
    }
  }

  const activeMenu = getActiveMenu()

  return (
    <div className="w-full bg-[#FBFBFB]">
      <div className="flex min-h-screen max-w-7xl mx-auto py-10">
        {/* Sidebar */}
        <div className="w-72 bg-white rounded-xl p-6 flex flex-col">
          {/* Profile Card */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-4xl">👤</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Atiqur Rifat</h2>
            <p className="text-sm text-gray-600">UX Designer</p>
            <div className="flex items-center justify-center gap-1 mt-2">
              <Image src="/premiumplan.svg" width={24} height={24} alt="Profile" className="w-6 h-6 rounded-full" />
              <span className="text-sm font-semibold text-[#FF8F27]">Premium Plan</span>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="space-y-2 flex-1">
            {menuItems.map((item, index) => (
              <div key={index}>
                <button
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-left ${activeMenu === item.label ? "bg-gradient-to-r from-[#123499] to-[#2A57DE] text-white" : ""
                    }`}
                  onClick={() => handleMenuClick(item)}
                >
                  <item.icon className={`w-5 h-5 ${activeMenu === item.label ? "text-white" : "text-black"}`} />
                  <span className="text-sm font-medium">{item.label}</span>
                  {item.label === "Settings" && (
                    <span className="ml-auto text-gray-400">{isSettingsOpen ? "⌄" : "›"}</span>
                  )}
                </button>
                {item.label === "Settings" && isSettingsOpen && (
                  <div className="ml-6 mt-2 space-y-2">
                    {item.subItems.map((subItem, subIndex) => (
                      <button
                        key={subIndex}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-left ${activeMenu === subItem.label ? "bg-gradient-to-r from-[#123499] to-[#2A57DE] text-white" : ""
                          }`}
                        onClick={() => handleSubMenuClick(subItem)}
                      >
                        <subItem.icon
                          className={`w-5 h-5 ${activeMenu === subItem.label ? "text-white" : "text-black"}`}
                        />
                        <span className="text-sm font-medium">{subItem.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Main Content - Modal */}
        <div className="flex-1 ml-8 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md w-full border border-gray-200">
            {/* Close Button */}
            {/* <div className="flex justify-end mb-6">
              <button className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div> */}

            {/* Logo */}
            <div className="flex justify-center mb-6">
              <Image src="/authlogo.svg" width={250} height={250} alt="JOBARMAN Logo" />
            </div>


            {/* Star Rating */}
            <div className="flex justify-center gap-3 mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-10 h-10 ${star <= (hoveredStar || rating) ? "fill-[#FF8F27] text-[#FF8F27]" : "text-gray-300"
                      }`}
                  />
                </button>
              ))}
            </div>

            {/* Review Text Area */}
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your experience with JOBARMAN..."
              className="w-full p-4 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-[#FF8F27] resize-none"
              rows={5}
            />

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-[#123499] to-[#2A57DE] hover:from-[#0f2f85] hover:to-[#2247b6] text-white font-bold py-3 px-4 rounded-lg transition-all"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
