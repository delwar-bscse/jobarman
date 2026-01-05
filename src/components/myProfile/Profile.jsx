"use client";

import { X } from "lucide-react";
import Link from "next/link";
// import EmployeeSidebar from "../cui/EmployeeSidebar";

export default function ProfilePage({ data }) {
  const infoItems = [
    { label: "Gender", value: data.gender },
    { label: "Date Of Birth", value: data?.date_of_birth?.slice(0, 10) },
    { label: "Nationality", value: data.nationality },
    { label: "Language", value: data.language },
    { label: "Address", value: data.address },
    { label: "Mobile", value: data.phone },
    { label: "Email", value: data.email },
    { label: "LinkedIn", value: data.linkedin },
  ];

  return (
    <div className="">
      {/* Header Section */}
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Personal Information
      </h1>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className=" space-y-6">
          {/* Personal Information - Group 1 */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            {infoItems.slice(0, 5).map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center mb-4 last:mb-0"
              >
                <label className="text-sm font-medium text-gray-600">
                  {item.label}
                </label>
                <p className="text-gray-600 font-medium">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Personal Information - Group 2 */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            {infoItems.slice(5).map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center mb-4 last:mb-0"
              >
                <label className="text-sm font-medium text-gray-600">
                  {item.label}
                </label>
                <p className="text-gray-600 font-medium">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="bg-white rounded-lg p-6 border border-gray-200 flex-1">
            <h4 className="text-lg font-bold text-gray-900 mb-4">
              Summary
            </h4>
            <p className="text-gray-700 text-sm leading-relaxed">
              {data?.workExperiences[0]?.description}
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6 ">
          {/* Education Qualification */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-6">
              Education Qualification
            </h3>
            <div className="space-y-6">
              {data?.educations?.map((edu, index) => (
                <div
                  key={index}
                  className={
                    index !== data?.educations?.length - 1
                      ? "pb-6 border-b border-gray-200"
                      : ""
                  }
                >
                  <div className="pl-4 border-l-4 border-[#B0DCC1]">
                    <h4 className="font-semibold">{edu?.degree}</h4>
                    <p className="text-[#008F37] font-semibold text-md mt-2">
                      University : {edu?.institute}
                    </p>
                    <div className="mt-3 space-y-1 text-xs text-gray-600">
                      <p>Session : {edu?.startDate?.slice(0, 10)}</p>
                      <p>PassingYear : {edu?.passingYear}</p>
                      <p>Grade : {edu?.grade}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-6">
              Work Experience
            </h3>
            <div className="space-y-6">
              {data?.workExperiences.map((exp, index) => (
                <div
                  key={index}
                  className={
                    index !== data?.workExperiences?.length - 1
                      ? "pb-6 border-b border-gray-200"
                      : ""
                  }
                >
                  <div className="pl-4 border-l-4 border-[#B0CCE2]">
                    <h4 className="font-semibold">{exp.title}</h4>
                    <p className="text-[#147FC7] font-semibold text-md mt-2">
                      {exp.company}
                    </p>
                    <p className="text-gray-600 text-xs mt-1">
                      {exp.startDate.slice(0, 10)}
                    </p>
                    <p className="text-gray-600 text-xs mt-3">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Skills</h3>
            <div className="flex flex-wrap gap-3">
              {data?.skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                >
                  {skill}
                  <X className="w-3 h-3 cursor-pointer hover:text-purple-900" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Button */}
      <Link href={`/profile/editProfile`}>
        <button className="w-full mt-8 bg-gradient-to-r from-[#123499] to-[#2A57DE] hover:from-[#0f2f85] hover:to-[#2247b6] text-white font-bold py-3 px-4 rounded-lg">
          Edit Profile
        </button>
      </Link>
    </div>
  );
}
