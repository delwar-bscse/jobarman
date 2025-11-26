"use client";
import React, { useRef, useState } from "react";

const ResumeGenerator = () => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleClick = () => {
    if (!fileURL) {
      fileInputRef.current?.click();
    }
  };

  const processFile = (file) => {
    if (!file) return;
    setFileName(file.name);
    setFileURL(URL.createObjectURL(file));
  };

  const handleFileChange = (e) => processFile(e.target.files[0]);
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    processFile(e.dataTransfer.files[0]);
  };

  return (
    <section className="py-10 sm:py-16 max-w-7xl px-4 mb-14 rounded-xl mx-auto bg-gradient-to-r from-[#123499] to-[#2A57DE]">
      <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2">
            Resume Score Generator
          </h2>

          <p className="text-blue-100 text-start mt-5 text-lg sm:text-xl">
            Choose The Job Title You Are Targeting
          </p>

          <p className="text-blue-200 text-xs sm:text-sm mt-1 text-start">
            This Helps Us Analyze Your Resume Against Industry-Specific
            Requirements
          </p>
        </div>

        <div className="space-y-6">
          {/* Job Title Selector */}
          <select className="w-full px-4 py-3 rounded-lg border border-[#5980E5] bg-[#395FD2] text-white text-sm sm:text-base hover:bg-[#2A57DE] focus:outline-none focus:ring-2 focus:ring-white">
            <option>Software Developer</option>
            <option>Product Manager</option>
            <option>Data Scientist</option>
            <option>UX Designer</option>
            <option>DevOps Engineer</option>
            <option>Full Stack Engineer</option>
          </select>

          {/* File Upload */}
          <div
            onClick={handleClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed border-[#5980E5] bg-[#395FD2] rounded-xl p-6 sm:p-8 text-center hover:bg-[#2A57DE] transition cursor-pointer 
              ${dragActive ? "opacity-80" : ""}`}
          >
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />

            <div className="flex flex-col items-center gap-3">
              {!fileName ? (
                <>
                  <svg
                    className="w-10 h-10 sm:w-12 sm:h-12 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                    />
                  </svg>

                  <p className="text-white font-semibold text-sm sm:text-base">
                    Drop Your Resume Here Or Click To Browse
                  </p>
                  <p className="text-blue-200 text-xs sm:text-sm">
                    Supported format: PDF, DOCX
                  </p>
                </>
              ) : (
                <div className="w-full max-w-xs sm:max-w-sm">
                  <p className="text-white font-semibold text-sm sm:text-base">
                    Uploaded File:
                  </p>

                  <a
                    href={fileURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-200 underline text-xs sm:text-sm break-all mt-1 block"
                  >
                    {fileName}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Analyze Button */}
          <button className="w-full px-6 py-3 text-sm sm:text-base border border-[#5980E5] bg-[#395FD2] text-white rounded-lg hover:bg-[#2A57DE] transition font-semibold">
            Analyze Resume
          </button>
        </div>
      </div>
    </section>
  );
};

export default ResumeGenerator;
