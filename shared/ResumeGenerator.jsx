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
import { ScoreGeneratorRoles } from "@/constants/ScoreGeneratorRoles";
import { hasRole } from "../utils/getUserRoleClient";


const ResumeGenerator = () => {
  const [role, setRole] = useState("");
  const [customRole, setCustomRole] = useState("");
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

    // ✅ Allow PDF and Word files
    const allowedTypes = [
      "application/pdf",
      "application/msword", // .doc
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" // .docx
    ];

    if (allowedTypes.includes(file.type)) {
      setSelectedFile(file);
      setFileName(file.name);
    } else {
      toast.error("Please select a PDF or Word file.");
      setSelectedFile(null);
      setFileName(null);
      event.target.value = ""; // reset input
    }
  };

  const handleSubmitResume = async (e) => {
    e.preventDefault();
    const isRole =  hasRole();
    if(!isRole) {
      // toast.error("You are not logged in");
      router.push("/login");
      return
    };

    if (!selectedFile) {
      toast.error("Please upload a resume");
      return;
    }
    if(!role && !customRole){
      toast.error("Please select or type your field");
      return;
    }

    const formData = new FormData();
    formData.append("resume", selectedFile);
    formData.append("role", role === "custom" ? customRole : role);

    try {
      const res = await myFetch("/user/analyze-resume", {
        method: "POST",
        body: formData,
      });
      console.log("Resume Res : ", res);

      if (res?.success) {
        router.push(`/scroe-board/${res.data._id}`);
      } else {
        toast.error(res?.message || "Resume analysis failed");
      }
    } catch (err) {
      toast.error(err?.message || "Server error occurred");
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
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger className="w-full px-4 py-3 rounded-lg border border-[#5980E5] bg-[#395FD2] text-white">
              <SelectValue placeholder="Select your field" />
            </SelectTrigger>

            <SelectContent className="bg-[#395FD2] text-white border border-[#5980E5]">
              {Object.entries(ScoreGeneratorRoles).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>{role === "custom" && (
            <input
              type="text"
              placeholder="Please specify your field"
              value={customRole}
              onChange={(e) => setCustomRole(e.target.value)}
              className="mt-3 w-full px-4 py-2 rounded-lg border border-[#5980E5] bg-[#395FD2] text-white placeholder:text-gray-300"
            />
          )}


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
                  <p className="text-white text-xs sm:text-sm">
                    Supported format: PDF only
                  </p>
                </>
              ) : (
                <div className="w-full max-w-xs sm:max-w-sm">
                  <p className="text-white font-semibold text-sm sm:text-base">
                    Uploaded File:
                  </p>

                  <p className="text-white text-xs sm:text-sm"> {fileName}</p>
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
