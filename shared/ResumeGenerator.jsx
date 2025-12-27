"use client";
import React, { useRef, useState } from "react";
import { myFetch } from "../utils/myFetch";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ResumeGenerator = () => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const router = useRouter();

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current?.click();
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // ❌ Reject non-PDF files
    if (file.type !== "application/pdf") {
      alert("Please select a PDF file.");
      setSelectedFile(null);
      setFileName(null);
      event.target.value = ""; // reset input
      return;
    }

    // ✅ Accept PDF
    setSelectedFile(file);
    setFileName(file.name);
  };

  const handleSubmitResume = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("Please Resume Upload");
    }

    const formData = new FormData();
    if (selectedFile) {
      formData.append("resume", selectedFile);
    }
    try {
      const res = await myFetch("/user/analyze-resume", {
        method: "POST",
        body: formData,
      });

      if (res.success) {
        router.push(`/scroe-board/${res?.data?._id}`);
      }
    } catch (err) {
      toast.err(err.message);
    }
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

          <p className="text-white text-xs sm:text-sm mt-1 text-start">
            This Helps Us Analyze Your Resume Against Industry-Specific
            Requirements
          </p>
        </div>

        <div className="space-y-6">
          {/* Job Title Selector */}
          <Select>
            <SelectTrigger className=" w-full px-4 py-3 rounded-lg border border-[#5980E5] bg-[#395FD2] text-white text-sm sm:text-base hover:bg-[#2A57DE] ">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>

            <SelectContent className="bg-[#395FD2] text-white border border-[#5980E5]">
              <SelectItem value="software-developer">
                Software Developer
              </SelectItem>
              <SelectItem value="product-manager">Product Manager</SelectItem>
              <SelectItem value="data-scientist">Data Scientist</SelectItem>
              <SelectItem value="ux-designer">UX Designer</SelectItem>
              <SelectItem value="devops-engineer">DevOps Engineer</SelectItem>
              <SelectItem value="full-stack-engineer">
                Full Stack Engineer
              </SelectItem>
            </SelectContent>
          </Select>

          {/* File Upload */}
          <div
            onClick={handleClick}
            className={`border-2 border-dashed border-[#5980E5] bg-[#395FD2] rounded-xl p-6 sm:p-8 text-center hover:bg-[#2A57DE] transition cursor-pointer 
             `}
          >
            <input
              type="file"
              accept="application/pdf"
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
                    Supported format: PDF only
                  </p>
                </>
              ) : (
                <div className="w-full max-w-xs sm:max-w-sm">
                  <p className="text-white font-semibold text-sm sm:text-base">
                    Uploaded File:
                  </p>

                  <p> {fileName}</p>
                </div>
              )}
            </div>
          </div>

          {/* Analyze Button */}
          <div onClick={handleSubmitResume}>
            <button className="w-full px-6 mt-3 py-3 text-sm sm:text-base border border-[#5980E5] bg-[#395FD2] text-white rounded-lg hover:bg-[#2A57DE] transition font-semibold">
              Analyze Resume
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeGenerator;
