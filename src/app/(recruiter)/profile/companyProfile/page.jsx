"use client"

import { useState, useEffect } from "react"
import { MapPin, Edit, Trash, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import RecruiterSidebar from "@/components/cui/ReqruiterSidebar"

export default function CompanyProfilePage() {
  const [activeTab, setActiveTab] = useState("Home")
  const [activeJobTab, setActiveJobTab] = useState("Active Jobs")

  const companyImages = [
    "/company-office.jpg",
    "/company-office2.jpg",
    "/company-office3.jpg",
  ]

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const jobs = [
    {
      id: 1,
      title: "Sr. UI/UX Designer",
      company: "Design-Hill",
      location: "California, United State.",
      type: "Full Time",
      workMode: "Remote",
      daysRemaining: "20 Days Remaining",
      image: "/cardpic.png",
    },
    {
      id: 2,
      title: "Sr. UI/UX Designer",
      company: "Design-Hill",
      location: "California, United State.",
      type: "Full Time",
      workMode: "Remote",
      daysRemaining: "20 Days Remaining",
      image: "/cardpic.png",
    },
    {
      id: 3,
      title: "Sr. UI/UX Designer",
      company: "Design-Hill",
      location: "California, United State.",
      type: "Full Time",
      workMode: "Remote",
      daysRemaining: "20 Days Remaining",
      image: "/cardpic.png",
    },
    {
      id: 4,
      title: "Sr. UI/UX Designer",
      company: "Design-Hill",
      location: "California, United State.",
      type: "Full Time",
      workMode: "Remote",
      daysRemaining: "20 Days Remaining",
      image: "/cardpic.png",
    },
    {
      id: 5,
      title: "Sr. UI/UX Designer",
      company: "Design-Hill",
      location: "California, United State.",
      type: "Full Time",
      workMode: "Remote",
      daysRemaining: "20 Days Remaining",
      image: "/cardpic.png",
    },
    {
      id: 6,
      title: "Sr. UI/UX Designer",
      company: "Design-Hill",
      location: "California, United State.",
      type: "Full Time",
      workMode: "Remote",
      daysRemaining: "20 Days Remaining",
      image: "/cardpic.png",
    },
  ]

  const galleryImages = [
    "/gallery1.jpg",
    "/gallery2.jpg",
    "/gallery3.jpg",
    "/gallery4.jpg",
    "/gallery5.jpg",
    "/gallery6.jpg",
    "/gallery7.jpg",
    "/gallery8.jpg",
  ]

  const companyInfo = {
    aboutUs: "Dependopolis Is A Full-Service Integrated Marketing Agency Specializing In 360-Degree Marketing, Branding, Digital Transformation, And Digital Presence. Since 2021, We Have Partnered With Businesses To Create Tailored Strategies That Drive Sustainable Growth. Our Approach Combines Marketing Expertise With Innovative Digital Solutions, Translating Business Objectives Into Measurable Results. We Work With Both Emerging Ventures And Established Brands, Offering A Comprehensive Suite Of Services Designed To Enhance Brand Impact And Market Positioning.",
    specialties: "Brand And Creative, Branding & Identity, Digital Presence, Integrated Marketing, Digital Marketing",
    industry: "Marketing",
    companySize: "11-50 employees",
    headquarters: "Dhaka",
    type: "Public Company",
    founded: "2021",
    specialtiesList: "Digital Marketing, Paid Ads, Branding, and Creative"
  }

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? companyImages.length - 1 : prev - 1))
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === companyImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="w-full bg-[#FBFBFB]">
      <div className="flex min-h-screen max-w-7xl mx-auto py-10">
        {/* Sidebar */}
        <RecruiterSidebar />

        {/* Main Content */}
        <div className="flex-1 ml-8">
          <div className="max-w-5xl mx-auto">
            {/* Company Header Image with Navigation */}
            <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
              <Image
                src={companyImages[currentImageIndex]}
                alt="Company Office"
                width={1200}
                height={256}
                className="w-full h-full object-cover"
              />
              <button
                onClick={previousImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setActiveTab("Home")}
                className={`px-8 py-2.5 rounded-lg font-semibold transition-colors ${
                  activeTab === "Home"
                    ? "bg-[#FF8C00] text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setActiveTab("About")}
                className={`px-8 py-2.5 rounded-lg font-semibold transition-colors ${
                  activeTab === "About"
                    ? "bg-[#FF8C00] text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                About
              </button>
              <button
                onClick={() => setActiveTab("Jobs")}
                className={`px-8 py-2.5 rounded-lg font-semibold transition-colors ${
                  activeTab === "Jobs"
                    ? "bg-[#FF8C00] text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                Jobs
              </button>
            </div>

            {/* Tab Content */}
            <div className="grid gap-8" style={{ gridTemplateColumns: "536px 1fr" }}>
              {activeTab === "Home" && (
                <>
                  {/* Left Column */}
                  <div className="w-[536px] space-y-6">
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Overview</h3>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {companyInfo.aboutUs}
                      </p>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                      <h3 className="text-lg font-bold text-gray-900 mb-6">Gallery</h3>
                      <div className="grid grid-cols-4 gap-3">
                        {galleryImages.map((img, index) => (
                          <div key={index} className="aspect-square rounded-lg overflow-hidden">
                            <Image
                              src={img}
                              alt={`Gallery ${index + 1}`}
                              width={150}
                              height={150}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "About" && (
                <>
                  {/* Left Column */}
                  <div className="w-[536px] space-y-6">
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">About Us</h3>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {companyInfo.aboutUs}
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Specialties</h3>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {companyInfo.specialties}
                      </p>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Company Information</h3>
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="text-gray-600">Industry: </span>
                          <span className="text-gray-900 font-medium">{companyInfo.industry}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Company Size: </span>
                          <span className="text-gray-900 font-medium">{companyInfo.companySize}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Headquarters: </span>
                          <span className="text-gray-900 font-medium">{companyInfo.headquarters}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Type: </span>
                          <span className="text-gray-900 font-medium">{companyInfo.type}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Founded: </span>
                          <span className="text-gray-900 font-medium">{companyInfo.founded}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Specialties: </span>
                          <span className="text-gray-900 font-medium">{companyInfo.specialtiesList}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "Jobs" && (
                <div className="col-span-2">
                  {/* Active/Close Jobs Toggle */}
                  <div className="flex gap-4 mb-6">
                    <button 
                      onClick={() => setActiveJobTab("Active Jobs")}
                      className={`flex-1 font-semibold py-3 rounded-full transition-colors ${
                        activeJobTab === "Active Jobs"
                          ? "bg-gradient-to-r from-[#123499] to-[#2A57DE] text-white"
                          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      Active Jobs
                    </button>
                    <button 
                      onClick={() => setActiveJobTab("Close Jobs")}
                      className={`flex-1 font-semibold py-3 rounded-full transition-colors ${
                        activeJobTab === "Close Jobs"
                          ? "bg-gradient-to-r from-[#123499] to-[#2A57DE] text-white"
                          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      Close Jobs
                    </button>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Job Post</h3>

                  {/* Job Cards Grid */}
                  <div className="grid grid-cols-2 gap-6">
                    {jobs.map((job) => (
                      <div key={job.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="flex">
                          {/* Job Image */}
                          <div className="w-32 flex-shrink-0">
                            <Image
                              src={job.image}
                              alt={job.title}
                              width={128}
                              height={160}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Job Details */}
                          <div className="flex-1 p-4 relative">
                            {/* Action Icons */}
                            <div className="absolute top-3 right-3 flex gap-2">
                              <button className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded">
                                <Edit className="w-4 h-4 text-gray-600" />
                              </button>
                              <button className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded">
                                <MapPin className="w-4 h-4 text-gray-600" />
                              </button>
                              <button className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded">
                                <Trash className="w-4 h-4 text-red-600" />
                              </button>
                            </div>

                            <h4 className="text-base font-bold text-gray-900 mb-1 pr-20">{job.title}</h4>
                            <p className="text-sm text-[#147FC7] font-semibold mb-2">{job.company}</p>

                            <div className="flex items-center text-xs text-gray-600 mb-3">
                              <MapPin className="w-3 h-3 mr-1" />
                              {job.location}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex gap-2">
                                <div className="flex items-center gap-1">
                                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                  <span className="text-gray-400 text-xs font-medium">{job.type}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                  <span className="text-gray-400 text-xs font-medium">{job.workMode}</span>
                                </div>
                              </div>
                              <span className="text-[#FF8C00] text-xs font-semibold">{job.daysRemaining}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Edit Profile Button */}
            <Link href="/profile/editCompanyProfile">
              <button className="w-full mt-8 bg-gradient-to-r from-[#123499] to-[#2A57DE] hover:from-[#0f2f85] hover:to-[#2247b6] text-white font-bold py-3 px-4 rounded-lg">
                Edit Profile
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}