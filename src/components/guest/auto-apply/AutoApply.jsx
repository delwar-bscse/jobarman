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
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AutoApply({ data }) {
  const [formValues, setFormValues] = useState(null);

  return (
    <div className="max-w-7xl mx-auto min-h-screen bg-[#FBFBFB] px-4">
      <div className="flex items-center ">
        <ChevronLeft
          className="cursor-pointer"
          onClick={() => history.back()}
        />
        <h1 className="text-[#123499] text-2xl font-semibold my-3">
          Auto Apply
        </h1>
      </div>
      <div className=" grid grid-cols-3 gap-5">
        <div className="lg:col-span-1 bg-white rounded-lg  mt-1 p-3">
          {/* pdf file upload */}

          <h1 className=" text-2xl font-semibold text-center text-[#2F2F2F]">
            Auto Apply
          </h1>

          <div className="mt-4">
            <Label className="block text-sm font-medium text-gray-600 mb-2">
              Slect Resume
            </Label>

            <Input
              type="file"
              accept="application/pdf"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;

                if (file.type !== "application/pdf") {
                  alert("Only PDF files are allowed.");
                  return;
                }

                console.log("Selected PDF:", file);
                setFormValues(file);
              }}
              className="w-full border border-gray-300 text-sm px-3 py-2 rounded-lg"
            />

            {/* Show selected filename */}
            {formValues?.resumePdf && (
              <p className="mt-2 text-sm text-gray-700">
                Selected:{" "}
                <span className="font-semibold">
                  {formValues.resumePdf.name}
                </span>
              </p>
            )}
          </div>

          {/* select */}
          <div className="mt-5">
            <p className=" text-sm font-medium text-gray-600 mb-2">
              Choice Role
            </p>
            <Select>
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
              Requiment Match
            </Label>
            <Input type="text" placeholder="your percenties" />
          </div>

          <Link href="/auto-process">
            <button className="w-full px-6 py-2 mt-5 text-sm sm:text-base border border-[#5980E5] bg-[#395FD2] text-white rounded-lg hover:bg-[#2A57DE] transition font-semibold">
              Start Apply
            </button>
          </Link>
        </div>
        <div className="lg:col-span-2 bg-white   overflow-y-auto p-3">
          {Array.isArray(data) && data.length > 0 ? (
            <ResumeDetails resume={data[0]} />
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
