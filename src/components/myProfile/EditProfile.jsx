/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import {
  Heart,
  FileText,
  Star,
  Settings,
  LogOut,
  X,
  Lock,
  HelpCircle,
  Trash2,
  User,
  Calendar,
  ArrowLeft,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Input } from "../ui/input";
import { myFetch } from "../../../utils/myFetch";

export default function EditProfilePage({ data }) {
  const [activeMenu, setActiveMenu] = useState("Edit Profile"); // Default to Edit Profile
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentlyWorking, setCurrentlyWorking] = useState(false);
  const pathname = usePathname(); // Get the current route

  const menuItems = [
    { icon: User, label: "My Profile", path: "/profile/myProfile" },
    { icon: Heart, label: "Favorite List", path: "/profile/favourite" }, // Updated to /profile/favourite
    { icon: FileText, label: "Payment History", path: "/profile/payment" },
    { icon: Star, label: "Platform Review", path: "/profile/platformReview" },
    {
      icon: Settings,
      label: "Settings",
      subItems: [
        {
          icon: Lock,
          label: "Change Password",
          path: "/profile/settings/changePassword",
        },
        {
          icon: HelpCircle,
          label: "Help and Support",
          path: "/profile/settings/helpSupport",
        },
        {
          icon: Trash2,
          label: "Delete Account",
          path: "/profile/settings/deleteAccount",
        },
      ],
    },
    { icon: LogOut, label: "Log Out", path: "/profile/logout" },
  ];

  const skills = [
    "React",
    "UI Design",
    "Website Design",
    "Prototyping",
    "Wireframe",
    "App design",
  ];

  // Update activeMenu based on the current route
  useEffect(() => {
    const currentPath = pathname;
    const matchingItem = menuItems.find(
      (item) =>
        item.path === currentPath ||
        (item.subItems && item.subItems.some((sub) => sub.path === currentPath))
    );
    if (matchingItem) {
      setActiveMenu(matchingItem.label);
      if (matchingItem.label === "Settings") {
        setIsSettingsOpen(true);
      } else {
        setIsSettingsOpen(false);
      }
    } else if (currentPath === "/profile/editProfile") {
      setActiveMenu("Edit Profile"); // Custom label for Edit Profile page
    }
  }, [pathname]);

  const handleMenuClick = (label) => {
    if (label === "Settings") {
      setIsSettingsOpen(!isSettingsOpen);
    } else {
      setActiveMenu(label);
      setIsSettingsOpen(false);
    }
  };

  const removeSkill = (skillToRemove) => {
    // Handle skill removal
  };

  //   form state
  const [formValues, setFormValues] = useState({
    name: data?.name || "",
    designation: data.designation || "",
    phone: data?.phone || "",
    date_of_birth: data?.date_of_birth || "",
    address: data.address || "",
    gender: data?.gender || "Male",
    // education
    degree: data?.educations?.[0]?.degree || "",
    institute: data?.educations?.[0]?.institute || "",
    passingYear: data?.educations?.[0]?.passingYear || 2025,
    grade: data?.educations?.[0]?.grade || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (const [key, value] of Object.entries(formValues)) {
      formData.append(key, value);
    }

    try {
      const res = await myFetch("/user/profile", {
        method: "PATCH",
        body: formData,
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="w-full bg-[#FBFBFB]">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto -mb-10 pt-10">
        <Link href="/profile/myProfile">
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
            <ArrowLeft className="w-5 h-5" />
            {/* Added text for clarity */}
          </button>
        </Link>
      </div>
      <div className="flex min-h-screen max-w-7xl mx-auto py-10">
        {/* Sidebar */}
        <div className="w-72 bg-white rounded-xl p-6 flex flex-col">
          {/* Profile Card */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-4xl">👤</span>
            </div>
            {/* <h2 className="text-xl font-bold text-gray-900">Atiqur Rifat</h2> */}
            <p className="text-sm text-gray-600">UX Designer</p>
            <div className="flex items-center justify-center gap-1 mt-2">
              <Image
                src="/premiumplan.svg"
                width={24}
                height={24}
                alt="Profile"
                className="w-6 h-6 rounded-full"
              />
              <span className="text-sm font-semibold text-[#FF8F27]">
                Premium Plan
              </span>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="space-y-2 flex-1">
            {menuItems.map((item, index) => (
              <div key={index}>
                <Link href={item.path || "#"}>
                  <button
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-left ${
                      activeMenu === item.label ||
                      (activeMenu === "Edit Profile" &&
                        item.label === "My Profile")
                        ? "bg-gradient-to-r from-[#123499] to-[#2A57DE] text-white"
                        : ""
                    }`}
                    onClick={() => handleMenuClick(item.label)}
                  >
                    <item.icon
                      className={`w-5 h-5 ${
                        activeMenu === item.label ||
                        (activeMenu === "Edit Profile" &&
                          item.label === "My Profile")
                          ? "text-white"
                          : "text-black"
                      }`}
                    />
                    <span className="text-sm font-medium">{item.label}</span>
                    {item.label === "Settings" && (
                      <span className="ml-auto text-gray-400">
                        {isSettingsOpen ? "⌄" : "›"}
                      </span>
                    )}
                  </button>
                </Link>
                {item.label === "Settings" && isSettingsOpen && (
                  <div className="ml-6 mt-2 space-y-2">
                    {item.subItems.map((subItem, subIndex) => (
                      <Link key={subIndex} href={subItem.path}>
                        <button
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-left ${
                            activeMenu === subItem.label
                              ? "bg-gradient-to-r from-[#123499] to-[#2A57DE] text-white"
                              : ""
                          }`}
                          onClick={() => setActiveMenu(subItem.label)}
                        >
                          <subItem.icon
                            className={`w-5 h-5 ${
                              activeMenu === subItem.label
                                ? "text-white"
                                : "text-black"
                            }`}
                          />
                          <span className="text-sm font-medium">
                            {subItem.label}
                          </span>
                        </button>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-8">
          <div className="max-w-5xl mx-auto bg-white p-8">
            {/* Profile Picture - Centered */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-4xl">👤</span>
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center shadow-sm">
                  <span className="text-sm">📷</span>
                </button>
              </div>
            </div>

            {/* Personal Information Header - Left Aligned */}
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
              Personal Information
            </h1>

            {/* Form Sections */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Personal Information Section */}
                <div className="bg-white rounded-lg">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Full Name
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formValues.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Designation
                      </label>
                      <Input
                        type="text"
                        name="designation"
                        value={formValues.designation}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Mobile Number
                      </label>
                      <Input
                        type="text"
                        name="phone"
                        value={formValues.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Date Of Birth
                      </label>
                      <div className="relative">
                        <Input
                          type="text"
                          name="date_of_birth"
                          value={formValues.date_of_birth}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                        />
                        <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                    {/* <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Age
                    </label>
                    <Input
                      type="text"
                      defaultValue="25"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div> */}
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Gender
                      </label>
                      <select
                        name="gender"
                        value={formValues.gender}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Address
                      </label>
                      <Input
                        type="text"
                        name="address"
                        value={formValues.address}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    {/* <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Social Media Link
                    </label>
                    <Input
                      type="text"
                      defaultValue="LinkedIn.com/profile"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div> */}
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Summary
                    </label>
                    <textarea
                      rows={3}
                      defaultValue="Creative and detail-oriented UI/UX Designer with expertise in crafting intuitive mobile and web experiences. Skilled in wireframing, prototyping, and design systems"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 resize-none"
                    />
                  </div>
                </div>

                {/* Education Qualification Section */}
                <div className="bg-white rounded-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Educational Qualification
                  </h3>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Degree Name
                      </label>
                      <Input
                        type="text"
                        name="degree"
                        value={formValues.degree}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Institute
                      </label>
                      <Input
                        type="text"
                        name="institute"
                        value={formValues.institute}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Session
                      </label>
                      <Input
                        type="text"
                        defaultValue="2020-2024"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Passing Year
                      </label>
                      <Input
                        type="text"
                        name="passingYear"
                        value={formValues.passingYear}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Grade Point
                      </label>
                      <Input
                        type="text"
                        name="grade"
                        value={formValues.grade}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Work Experience Section */}
                {/* <div className="bg-white rounded-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Work Experience
                </h3>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Job Title
                    </label>
                    <Input
                      type="text"
                      defaultValue="UI/UX Designer"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Company Name
                    </label>
                    <Input
                      type="text"
                      defaultValue="Design Hill"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Location
                    </label>
                    <Input
                      type="text"
                      defaultValue="2471 Derby Ave, Strubens Valley, Gauteng"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Start Date
                    </label>
                    <div className="relative">
                      <Input
                        type="text"
                        defaultValue="01 Jan 2020"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                      />
                      <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      End Date
                    </label>
                    <div className="relative">
                      <Input
                        type="text"
                        defaultValue="01 Jan 2020"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                      />
                      <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    defaultValue="Creative and detail-oriented UI/UX Designer with expertise in crafting intuitive mobile and web experiences. Skilled in wireframing, prototyping, and design systems"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Input
                    type="checkbox"
                    id="currentlyWorking"
                    checked={currentlyWorking}
                    onChange={(e) => setCurrentlyWorking(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="currentlyWorking"
                    className="text-sm text-gray-700"
                  >
                    Currently Work This Company
                  </label>
                </div>

                <button className="w-full py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
                  Add Experience
                </button>
              </div> */}

                {/* Skills Section */}
                {/* <div className="bg-white rounded-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Skills</h3>

                <div className="flex items-start gap-3 mb-4">
                  <Input
                    type="text"
                    placeholder="Computer Science"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                    >
                      {skill}
                      <button onClick={() => removeSkill(skill)}>
                        <X className="w-3 h-3 cursor-pointer hover:text-purple-900" />
                      </button>
                    </div>
                  ))}
                </div>
              </div> */}

                {/* Update Button */}
                <button
                  type="submit"
                  className="w-full mt-8 bg-gradient-to-r from-[#123499] to-[#2A57DE] hover:from-[#0f2f85] hover:to-[#2247b6] text-white font-bold py-3 px-4 rounded-lg"
                >
                  Edit Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
