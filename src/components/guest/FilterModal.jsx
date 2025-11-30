"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

export default function FilterModal({ trigger }) {
  const [employee, setEmployee] = useState("Full Time");
  const [type, setType] = useState("Remote");
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <div className="relative bg-white w-full max-w-md rounded-xl  p-6">
          <div className="space-y-5">
            <div>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="1">Sr. UI/UX Designer</SelectItem>
                    <SelectItem value="2">Frontend Engineer</SelectItem>
                    <SelectItem value="3">Backend Engineer</SelectItem>
                    <SelectItem value="4">Product Designer</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Employee Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employee Type
              </label>
              <div className="flex gap-2">
                {[
                  { label: "Full Time" },
                  { label: "Part Time" },
                  { label: "Intern" },
                ].map((t) => (
                  <button
                    key={t.label}
                    type="button"
                    onClick={() => setEmployee(t.label)}
                    className={`px-4 py-2 rounded-md text-sm ${
                      employee === t.label
                        ? "bg-[#FF8F27] text-white"
                        : "border"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Job Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Type
              </label>
              <div className="flex gap-2">
                {[
                  { label: "Remote" },
                  { label: "Onsite" },
                  { label: "Hybrid" },
                ].map((t) => (
                  <button
                    key={t.label}
                    type="button"
                    onClick={() => setType(t.label)}
                    className={`px-4 py-2  text-sm rounded-full ${
                      type === t.label ? "bg-[#093CD4] text-white" : "border "
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Salary Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salary Range
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="block text-xs text-gray-500 mb-1">
                    Min Salary
                  </span>
                  <input
                    type="text"
                    // value={minSalary}
                    // onChange={(e) => setMinSalary(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder="$5000"
                  />
                </div>
                <div>
                  <span className="block text-xs text-gray-500 mb-1">
                    Max Salary
                  </span>
                  <input
                    type="text"
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder="$8000"
                  />
                </div>
              </div>
            </div>

            {/* Distance */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Distance
              </label>
              <input
                type="range"
                min={1}
                max={20}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1km</span>
                {/* <span>{distance} km</span> */}
                <span>20 Km</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setFiltersOpen(false)}
            className="w-full mt-5 bg-orange-500 text-white rounded-lg py-3 font-semibold"
          >
            Apply
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
