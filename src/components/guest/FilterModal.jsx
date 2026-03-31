/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { myFetch } from "../../../utils/myFetch";
import { useRouter } from "next/navigation";
import { jobTypes } from "../employee/jobs/jobType";
import { useFilters } from "@/hooks/useFilters";

export default function FilterModal({ trigger }) {
  const { handleSingleFilter, handleSelectFilter } = useFilters();
  const [allCategories, setAllCategories] = useState([]);
  const { replace } = useRouter();
  const [category, setCategory] = useState("");
  const [jobType, setJobType] = useState();
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [distance, setDistance] = useState(0);

  const fetchData = async () => {
    const res = await myFetch("/job-category");
    setAllCategories(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = () => {
    if (jobType) {
      handleSelectFilter("job_type", jobType);
    };
    if (distance) {
      handleSingleFilter("radius", distance);
    };

    if (category) {
      handleSelectFilter("category", category);
    };

    if (minPrice) {
      handleSingleFilter("minPrice", minPrice);
    };

    if (maxPrice) {
      handleSingleFilter("maxPrice", maxPrice);
    };
    // redirect to jobs page after applying filters
    replace(`/jobs`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <div className="relative bg-white w-full max-w-md rounded-xl  p-6">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <Select onValueChange={(e) => setCategory(e)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {allCategories?.map((c) => (
                      <SelectItem key={c._id} value={c._id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Employee Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Type
              </label>
              <div className="flex flex-wrap gap-2">
                {jobTypes.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setJobType(t)}
                    className={`px-4 py-2 rounded-md text-sm ${jobType === t
                      ? "bg-[#FF8F27] text-white"
                      : "border"
                      }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Job Type */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Type
              </label>
              <div className="flex gap-2">
                {jobTypes.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setJobType(t)}
                    className={`px-4 py-2  text-sm rounded-full ${
                      jobType === t
                        ? "bg-[#093CD4] text-white"
                        : "border "
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div> */}

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
                    type="number"
                    min={0}
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder="$5000"
                  />
                </div>
                <div>
                  <span className="block text-xs text-gray-500 mb-1">
                    Max Salary
                  </span>
                  <input
                    type="number"
                    min={0}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
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
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
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
            onClick={handleSubmit}
            className="w-full mt-5 bg-orange-500 text-white rounded-lg py-3 font-semibold"
          >
            Apply
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}