"use client";
import ResumeDetails from "@/components/jobSeekerResume/ResumeDetails";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, CloudCog } from "lucide-react";
import { useState } from "react";
import { myFetch } from "../../../../utils/myFetch";
import { useRouter } from "next/navigation";
import PdfViewer from "@/components/cui/PdfViewer";

export default function AutoApply({ data }) {
  const router = useRouter();
  const [selectedResume, setSelectedResume] = useState(null);
  const [selectedResumeReview, setSelectedResumeReview] = useState(null);
  const [matchPercentage, setMatchPercentage] = useState(0);
  const [selectedDesignation, setSelectedDesignation] = useState("");

  const handlePdf = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed.");
      return;
    }

    setSelectedResume(file);
    setSelectedResumeReview(URL.createObjectURL(file));
  };

  const handleAutoApply = async () => {
    const formData = new FormData();
    formData.append("resume", selectedResume);
    formData.append("title", selectedDesignation);
    formData.append("percentage", matchPercentage);

    const res = await myFetch("/application/auto-apply", {
      method: "POST",
      body: formData,
    });

    if (res.success) {
      localStorage.setItem("autoApplyDataId", JSON.stringify(res.data?._id));
      router.push("/auto-applying");
    }
  };

  return (
    <div className="max-w-7xl mx-auto min-h-screen bg-[#FBFBFB] px-4">
      <div className="flex items-center ">
        <ChevronLeft
          className="cursor-pointer"
          onClick={() => history.back()}
        />
        <h1
          onClick={() => window.history.back()}
          className="text-[#123499] text-2xl font-semibold my-3"
        >
          Auto Apply
        </h1>
      </div>
      <div className=" grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-1 bg-white rounded-lg  mt-1 p-3">
          <h1 className=" text-2xl font-semibold text-center text-[#2F2F2F]">
            Auto Apply
          </h1>

          {/* pdf file upload */}
          <div className="mt-4">
            <Label className="block text-sm font-medium text-gray-600 mb-2">
              Select Resume
            </Label>

            <Input
              type="file"
              accept="application/pdf"
              onChange={handlePdf}
              className="w-full border border-gray-300 text-sm px-3 py-2 rounded-lg"
            />
          </div>

          {/* select designation */}
          <div className="mt-5">
            <p className=" text-sm font-medium text-gray-600 mb-2">
              Choice Role
            </p>
            <Select onValueChange={(e) => setSelectedDesignation(e)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select item" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="frontend developer">
                    Frontend Developer
                  </SelectItem>
                  <SelectItem value="ui/ux">UI/UX</SelectItem>
                  <SelectItem value="backend developer">
                    Backend Developer
                  </SelectItem>
                  <SelectItem value="fullstack developer">
                    Full Stack Developer
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* percenties */}
          <div className="mt-5">
            <Label className="block text-sm font-medium text-gray-600 mb-2">
              Requirement Match
            </Label>
            <Input
              type="number"
              value={matchPercentage}
              onChange={(e) => setMatchPercentage(e.target.value)}
              placeholder="Enter percent's"
            />
          </div>

          <button
            onClick={handleAutoApply}
            className="w-full px-6 py-2 mt-5 text-sm sm:text-base border border-[#5980E5] bg-[#395FD2] text-white rounded-lg hover:bg-[#2A57DE] transition font-semibold"
          >
            Start Apply
          </button>
        </div>
        <div className="lg:col-span-2 bg-white  min-h-screen overflow-y-auto p-3">
          {selectedResumeReview ? (
            <PdfViewer fileUrl={selectedResumeReview} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p className="text-lg">Select a resume to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
