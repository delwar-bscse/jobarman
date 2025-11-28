"use client";

import { useEffect, useState } from "react";
import { MapPin, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { DualRangeSlider } from '@/components/ui/dual-range-slider';


export default function FilterSide() {
  const [values, setValues] = useState([0, 100]);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const [searchTitle, setSearchTitle] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState([]);
  const [selectedDatePosted, setSelectedDatePosted] = useState("");
  const [salaryRange, setSalaryRange] = useState([0, 9999]);
  const [currentPage, setCurrentPage] = useState(1);

  const [showMoreCategories, setShowMoreCategories] = useState(false);
  // searchTerm minPrice maxPrice category job_type job_level experience_level

  const allCategories = [
    "Healthcare",
    "Information Technology",
    "Hotels & Tourism",
    "Education",
    "Financial Services",
    "Engineering",
    "Marketing",
    "Sales",
    "HR",
    "Operations",
  ];
  const visibleCategories = showMoreCategories
    ? allCategories
    : allCategories.slice(0, 4);

  const jobTypes = ["Full Time", "Part Time", "Contract", "Remote", "Hybrid"];
  const allTags = ["engineering", "design", "ux/ui", "marketing", "management", "construction"]
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

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleJobType = (type) => {
    setSelectedJobTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleExperience = (level) => {
    setSelectedExperience((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  const toggleSaveJob = (jobId) => {
    setSavedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleSearch = useDebouncedCallback((term) => {
    if (term) {
      params.set("searchTerm", term);
    } else {
      params.delete("searchTerm");
    }
    replace(`?${params.toString()}`);
  }, 300);

  const getSingleQueryParams = (type) => {
    return searchParams.get(type) || "";
  }
  const handleSingleQueryParams = (type, value) => {
    params.set(type, value);
    replace(`?${params.toString()}`);
  };


  const getQueryParams = (type) => {
    return new Set(
      (searchParams.get(type) || "")
        .split(",")
        .map(s => s.trim())
        .filter(Boolean)
    );
  };


  const handleQueryParams = (type, value) => {
    // safe read (handles null and empty)
    const raw = searchParams.get(type) || "";
    const prevArray = raw
      .split(",")
      .map(e => e.trim())
      .filter(Boolean);

    const newArray = prevArray.includes(value)
      ? prevArray.filter(e => e !== value)
      : [...prevArray, value];

    // console.log("Prev Categories : ", prevCategories)
    // console.log("New Categories : ", newCategories)

    // update params: remove param if empty
    if (newArray.length) {
      params.set(type, newArray.join(","));
    } else {
      params.delete(type);
    }

    replace(`?${params.toString()}`);
  };


  // useEffect(() =>{
  //   console.log("Search Title:", searchTitle);
  //   console.log("Selected Location:", selectedLocation);
  //   console.log("Selected Categories:", selectedCategories);
  //   console.log("Selected Job Types:", selectedJobTypes);
  //   console.log("Selected Experience Levels:", selectedExperience);
  //   console.log("Selected Date Posted:", selectedDatePosted);
  //   console.log("Salary Range:", salaryRange);

  // },[searchTitle, selectedLocation, selectedCategories, selectedJobTypes, selectedExperience, selectedDatePosted, salaryRange]);


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
              onChange={(e) => handleSearch(e.target.value)}
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
            <select
              value={getSingleQueryParams("location")}
              onChange={(e) => handleSingleQueryParams("location", e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC] appearance-none"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc === "All Cities" ? "Choose city" : loc}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category */}
        <div className="space-y-2">
          {visibleCategories.map((cat) => (
            <label key={cat} className="flex items-center">
              <input
                type="checkbox"
                checked={getQueryParams("category").has(cat)}
                onChange={() => handleQueryParams("category", cat)}
                className="w-4 h-4 text-[#0066CC] rounded focus:ring-2 focus:ring-[#0066CC]"
              />
              <span className="ml-2 text-sm text-gray-700">{cat}</span>
              <span className="ml-auto text-xs text-gray-500">10</span>
            </label>
          ))}
        </div>
        <div>
          {!showMoreCategories && allCategories.length > 4 && (
            <button
              onClick={() => setShowMoreCategories(true)}
              className="mt-3 w-full py-2 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-[#123499] to-[#2A57DE] hover:from-[#0F2C80] hover:to-[#1F45B8] transition"
            >
              Show More
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
                  checked={getQueryParams("job_type").has(type)}
                  onChange={() => handleQueryParams("job_type", type)}
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
                  checked={getQueryParams("experience_level").has(level)}
                  onChange={() => handleQueryParams("experience_level", level)}
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
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Salary Range
          </label>
          <input
            type="range"
            min="0"
            max="9999"
            value={salaryRange[1]}
            onChange={(e) => {
              setSalaryRange([salaryRange[0], Number.parseInt(e.target.value)])
            }}
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#0066CC]"
          />
          <div className="flex justify-between text-xs text-[#0066CC] mt-2">
            <span>${salaryRange[0].toLocaleString()}</span>
            <span>${salaryRange[1].toLocaleString()}</span>
          </div>
          <button className="mt-3 w-full py-2 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-[#123499] to-[#2A57DE] hover:from-[#0F2C80] hover:to-[#1F45B8] transition">
            Apply
          </button>
        </div>
        {/* <Dual Range Slider Component can be placed here */}
        <div className="w-full px-10">
          <DualRangeSlider
            label={(value) => value}
            value={values}
            onValueChange={setValues}
            min={0}
            max={100}
            step={1}
          />
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
                onClick={() => handleQueryParams("tags", tag)}
                className={`px-3 py-1 text-[#0066CC] text-xs rounded-full cursor-pointer hover:bg-blue-200 transition-colors duration-300 ${getQueryParams("tags").has(tag) ? "bg-blue-200 font-semibold" : "bg-blue-100"}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div >
  );
}
