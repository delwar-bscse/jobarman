/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Suspense, useEffect, useState } from "react";
import { MapPin, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import { myFetch } from "../../../../utils/myFetch";

function FilterSideSuspense() {
  const [values, setValues] = useState([0, 9999]);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [allCategories, setAllCategories] = useState([]);
  const params = new URLSearchParams(searchParams);

  const [showMoreCategories, setShowMoreCategories] = useState(false);

  // Initialize salary range set from query params
  useEffect(() => {
    const fetchData = async () => {
      const minPrice = Number(searchParams.get("minPrice")) || 1;
      const maxPrice = Number(searchParams.get("maxPrice")) || 9999;
      setValues([minPrice, maxPrice]);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await myFetch("/job-category");
      setAllCategories(res.data);
      console.log("Categories : ", res.data);
    };

    fetchData();
  }, []);

  // const allCategories = ["Healthcare", "Information Technology", "Hotels & Tourism", "Education", "Financial Services", "Engineering", "Marketing", "Sales", "HR", "Operations",];
  const visibleCategories = showMoreCategories
    ? allCategories
    : allCategories.slice(0, 4);

  const jobTypes = [
    "Full Time",
    "Part Time",
    "Contract",
    "Remote",
    "Hybrid",
    "Freelance",
    "Internship",
  ];
  const allTags = [
    "engineering",
    "design",
    "ux/ui",
    "marketing",
    "management",
    "construction",
  ];
  const experienceLevels = [
    "No experience",
    "Fresher",
    "Intermediate",
    "Expert",
  ];
  const datePostedOptions = [
    "All",
    "Last hour",
    "Last 24 hours",
    "Last 7 days",
    "Last 30 days",
  ];
  const locations = [
    "All Cities",
    "New York",
    "San Francisco",
    "Los Angeles",
    "Chicago",
    "Boston",
  ];

  // Debounced Search Handler
  const handleSearch = useDebouncedCallback((type, value) => {
    if (value) {
      params.set(type, value);
    } else {
      params.delete(type);
    }
    replace(`?${params.toString()}`);
  }, 300);

  // Apply Salary Filter
  const handleSalary = () => {
    params.set("minPrice", values[0]);
    params.set("maxPrice", values[1]);
    replace(`?${params.toString()}`, { scroll: false });
  };

  // Single Value Query Params Getter
  const getSingleQueryParams = (type) => {
    return searchParams.get(type) || "";
  };

  // Single Value Query Params Handler
  const handleSingleQueryParams = (type, value) => {
    params.set(type, value);
    replace(`?${params.toString()}`, { scroll: false });
  };

  // Multi Value Query Params Getter
  const getMultipleQueryParams = (type) => {
    return new Set(
      (searchParams.get(type) || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    );
  };

  // Multi Value Query Params Handler
  const handleMultipleQueryParams = (type, value) => {
    // safe read (handles null and empty)
    const raw = searchParams.get(type) || "";
    const prevArray = raw
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean);

    const newArray = prevArray.includes(value)
      ? prevArray.filter((e) => e !== value)
      : [...prevArray, value];

    // update params: remove param if empty
    if (newArray.length) {
      params.set(type, newArray.join(","));
    } else {
      params.delete(type);
    }

    replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="lg:col-span-1">
      <div className="bg-[#E6EFF6] rounded-lg p-6 sticky top-8">
        {/* Search */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Search by Job Title
          </label>
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Job title or company"
              defaultValue={getSingleQueryParams("searchTerm")}
              onChange={(e) => handleSearch("searchTerm", e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
            />
          </div>
        </div>

        {/* Location */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Location
          </label>
          <div className="relative">
            <MapPin
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="location..."
              defaultValue={getSingleQueryParams("location")}
              onChange={(e) => handleSearch("location", e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
            />
            {/* <select
              value={getSingleQueryParams("location")}
              onChange={(e) => handleSingleQueryParams("location", e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC] appearance-none"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc === "All Cities" ? "Choose city" : loc}
                </option>
              ))}
            </select> */}
          </div>
        </div>

        {/* Category */}
        <div className="space-y-2">
          {visibleCategories.map((cat, index) => (
            <label key={index} className="flex items-center">
              <input
                type="checkbox"
                checked={getMultipleQueryParams("category").has(cat._id)}
                onChange={() => handleMultipleQueryParams("category", cat._id)}
                className="w-4 h-4 text-[#0066CC] rounded focus:ring-2 focus:ring-[#0066CC]"
              />
              <span className="ml-2 text-sm text-gray-700">{cat.name}</span>
              <span className="ml-auto text-xs text-gray-500">10</span>
            </label>
          ))}
        </div>
        <div>
          {allCategories.length > 4 && (
            <button
              onClick={() => setShowMoreCategories(!showMoreCategories)}
              className="mt-3 w-full py-2 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-[#123499] to-[#2A57DE] hover:from-[#0F2C80] hover:to-[#1F45B8] transition"
            >
              {showMoreCategories ? "Show Less" : "Show More"}
            </button>
          )}
        </div>

        {/* Job Type */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Job Type
          </label>
          <div className="space-y-2">
            {jobTypes.map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="checkbox"
                  checked={getMultipleQueryParams("job_type").has(type)}
                  onChange={() => handleMultipleQueryParams("job_type", type)}
                  className="w-4 h-4 text-[#0066CC] rounded focus:ring-2 focus:ring-[#0066CC]"
                />
                <span className="ml-2 text-sm text-gray-700">{type}</span>
                <span className="ml-auto text-xs text-gray-500">10</span>
              </label>
            ))}
          </div>
        </div>

        {/* Experience Level */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Experience Level
          </label>
          <div className="space-y-2">
            {experienceLevels.map((level) => (
              <label key={level} className="flex items-center">
                <input
                  type="checkbox"
                  checked={getMultipleQueryParams("experience_level").has(
                    level
                  )}
                  onChange={() =>
                    handleMultipleQueryParams("experience_level", level)
                  }
                  className="w-4 h-4 text-[#0066CC] rounded focus:ring-2 focus:ring-[#0066CC]"
                />
                <span className="ml-2 text-sm text-gray-700">{level}</span>
                <span className="ml-auto text-xs text-gray-500">10</span>
              </label>
            ))}
          </div>
        </div>

        {/* Date Posted */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Date Posted
          </label>
          <div className="space-y-2">
            {datePostedOptions.map((date) => (
              <label key={date} className="flex items-center">
                <input
                  type="radio"
                  name="datePosted"
                  checked={getSingleQueryParams("date_posted") === date}
                  onChange={() => handleSingleQueryParams("date_posted", date)}
                  className="w-4 h-4 text-[#0066CC] focus:ring-2 focus:ring-[#0066CC]"
                />
                <span className="ml-2 text-sm text-gray-700">{date}</span>
                <span className="ml-auto text-xs text-gray-500">10</span>
              </label>
            ))}
          </div>
        </div>

        {/* Salary Range */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-7">
            Salary Range
          </label>
          <div className="w-full">
            <DualRangeSlider
              label={(value) => value}
              value={values}
              onValueChange={setValues}
              min={1}
              max={9999}
              step={10}
            />
          </div>
          <button
            onClick={handleSalary}
            className="mt-3 w-full py-2 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-[#123499] to-[#2A57DE] hover:from-[#0F2C80] hover:to-[#1F45B8] transition"
          >
            Apply
          </button>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <span
                key={tag}
                onClick={() => handleMultipleQueryParams("tags", tag)}
                className={`px-3 py-1 text-[#0066CC] text-xs rounded-full cursor-pointer hover:bg-blue-200 transition-colors duration-300 ${
                  getMultipleQueryParams("tags").has(tag)
                    ? "bg-blue-200 font-semibold"
                    : "bg-blue-100"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FilterSide() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FilterSideSuspense />
    </Suspense>
  );
}
