"use client";
import { ChevronLeft, ChevronRight, Heart, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const mockJobs = [
  {
    id: 1,
    title: "Sr. UX Designer",
    company: "Design Lab",
    location: "California, United States",
    salary: "80-120k",
    type: "Full Time",
    date: "10 Oct 25",
    image: "/job-image-placeholder.png", // Placeholder image URL
  },
  {
    id: 2,
    title: "Sr. UX Designer",
    company: "Design Lab",
    location: "California, United States",
    salary: "80-120k",
    type: "Full Time",
    date: "10 Oct 25",
    image: "/job-image-placeholder.png",
  },
  {
    id: 3,
    title: "Sr. UX Designer",
    company: "Design Lab",
    location: "California, United States",
    salary: "80-120k",
    type: "Full Time",
    date: "10 Oct 25",
    image: "/job-image-placeholder.png",
  },
  {
    id: 4,
    title: "Sr. UX Designer",
    company: "Design Lab",
    location: "California, United States",
    salary: "80-120k",
    type: "Full Time",
    date: "10 Oct 25",
    image: "/job-image-placeholder.png",
  },
  {
    id: 5,
    title: "Sr. UX Designer",
    company: "Design Lab",
    location: "California, United States",
    salary: "80-120k",
    type: "Full Time",
    date: "10 Oct 25",
    image: "/job-image-placeholder.png",
  },
  {
    id: 6,
    title: "Sr. UX Designer",
    company: "Design Lab",
    location: "California, United States",
    salary: "80-120k",
    type: "Full Time",
    date: "10 Oct 25",
    image: "/job-image-placeholder.png",
  },
  {
    id: 7,
    title: "Sr. UX Designer",
    company: "Design Lab",
    location: "California, United States",
    salary: "80-120k",
    type: "Full Time",
    date: "10 Oct 25",
    image: "/job-image-placeholder.png",
  },
  {
    id: 8,
    title: "Sr. UX Designer",
    company: "Design Lab",
    location: "California, United States",
    salary: "80-120k",
    type: "Full Time",
    date: "10 Oct 25",
    image: "/job-image-placeholder.png",
  },
  {
    id: 9,
    title: "Sr. UX Designer",
    company: "Design Lab",
    location: "California, United States",
    salary: "80-120k",
    type: "Full Time",
    date: "10 Oct 25",
    image: "/job-image-placeholder.png",
  },
  {
    id: 10,
    title: "Sr. UX Designer",
    company: "Design Lab",
    location: "California, United States",
    salary: "80-120k",
    type: "Full Time",
    date: "10 Oct 25",
    image: "/job-image-placeholder.png",
  },
  {
    id: 11,
    title: "Sr. UX Designer",
    company: "Design Lab",
    location: "California, United States",
    salary: "80-120k",
    type: "Full Time",
    date: "10 Oct 25",
    image: "/job-image-placeholder.png",
  },
  {
    id: 12,
    title: "Sr. UX Designer",
    company: "Design Lab",
    location: "California, United States",
    salary: "80-120k",
    type: "Full Time",
    date: "10 Oct 25",
    image: "/job-image-placeholder.png",
  },
];

export default function JobCard() {
  const [savedJobs, setSavedJobs] = useState([]);
  return (
    <div className="lg:col-span-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mockJobs.map((job) => (
          <Link
            key={job.id}
            href={`/jobs/${job.id}`}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition flex cursor-pointer"
          >
            {/* Left Side Image */}
            <div className="w-52">
              <Image
                src="/cardpic.png"
                alt={`${job.title} image`}
                width={150}
                height={150}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Right Side Text and Details */}
            <div className="w-2/3 p-4 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-start gap-2 flex-1">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {job.title}
                      </h3>
                      <p className="text-sm text-gray-600">{job.company}</p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSaveJob(job.id);
                    }}
                    className="text-gray-400 hover:text-red-500 transition flex-shrink-0"
                  >
                    <Heart
                      size={20}
                      fill={
                        savedJobs.includes(job.id) ? "currentColor" : "none"
                      }
                      className={
                        savedJobs.includes(job.id) ? "text-red-500" : ""
                      }
                    />
                  </button>
                </div>

                {/* Location */}
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <MapPin size={16} className="mr-1 flex-shrink-0" />
                  {job.location}
                </div>

                {/* Job Details */}
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1">
                      <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                      <span className=" text-gray-400 text-xs font-semibold rounded">
                        {job.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                      <span className=" text-gray-400 text-xs font-semibold rounded">
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <div>
                    <Image
                      src="/calendar.svg"
                      alt="Calendar icon"
                      width={13}
                      height={16}
                      className="mr-1 inline-block"
                    />
                    <span className=" b text-[#FF8C00] text-xs font-semibold rounded">
                      {job.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-2 mt-8">
        <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
          <ChevronLeft size={20} />
        </button>
        <button className="px-4 py-2 bg-[#0066CC] text-white rounded font-semibold">
          1
        </button>
        <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
          2
        </button>
        <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
          3
        </button>
        <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
