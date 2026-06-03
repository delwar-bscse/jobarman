/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { MapPin, Search } from "lucide-react";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import { clientFetch } from "../../../../utils/clientFetch";
import { allTags, datePostedOptions, experienceLevels, jobTypes } from "./jobType";
import { useFilters } from "@/hooks/useFilters";


export default function FilterSide() {
  const { filters, setFilters, handleSingleFilter, handleSelectFilter } = useFilters();
  const [allCategories, setAllCategories] = useState([]);
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [values, setValues] = useState([1, 500000]);


  // Fetch categories (unchanged)
  useEffect(() => {
    const fetchData = async () => {
      const res = await clientFetch("/job-category");
      setAllCategories(res.data || []);
    };
    fetchData();
  }, []);


  const handlePrice = () => {
    setFilters((prev) => ({ ...prev, minPrice: values[0], maxPrice: values[1] }));
  };

  useEffect(() => {
    setValues([filters.minPrice, filters.maxPrice]);
  }, []);


  const visibleCategories = showMoreCategories ? allCategories : allCategories.slice(0, 4); 


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
              value={filters.preSearchTerm}
              onChange={(e) => handleSingleFilter("preSearchTerm", e.target.value)}
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
              value={filters.preLocation}
              onChange={(e) => handleSingleFilter("preLocation", e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
            />
          </div>
        </div>

        {/* Category */}
        <div className="space-y-2">
          {visibleCategories.map((cat) => (
            <label key={cat._id} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.category.has(cat._id)}
                onChange={() =>
                  handleSelectFilter("category", cat._id)
                }
                className="w-4 h-4 text-[#0066CC] rounded focus:ring-2 focus:ring-[#0066CC]"
              />
              <span className="ml-2 text-sm text-gray-700">
                {cat.name}
              </span>
              <span className="ml-auto text-xs text-gray-500">10</span>
            </label>
          ))}
        </div>

        <div>
          {allCategories.length > 4 && (
            <button
              onClick={() =>
                setShowMoreCategories(!showMoreCategories)
              }
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
                  checked={filters.job_type.has(type)}
                  onChange={() =>
                    handleSelectFilter("job_type", type)
                  }
                  className="w-4 h-4 text-[#0066CC] rounded focus:ring-2 focus:ring-[#0066CC]"
                />
                <span className="ml-2 text-sm text-gray-700">
                  {type}
                </span>
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
                  checked={filters.experience_level.has(level)}
                  onChange={() =>
                    handleSelectFilter("experience_level", level)
                  }
                  className="w-4 h-4 text-[#0066CC] rounded focus:ring-2 focus:ring-[#0066CC]"
                />
                <span className="ml-2 text-sm text-gray-700">
                  {level}
                </span>
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
                  checked={filters.date_posted === date}
                  onChange={() =>
                    handleSingleFilter("date_posted", date)
                  }
                  className="w-4 h-4 text-[#0066CC] focus:ring-2 focus:ring-[#0066CC]"
                />
                <span className="ml-2 text-sm text-gray-700">
                  {date}
                </span>
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
              max={500000}
              step={100}
            />
          </div>
          <button
            onClick={handlePrice}
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
                onClick={() =>
                  handleSelectFilter("tags", tag)
                }
                className={`px-3 py-1 text-[#0066CC] text-xs rounded-full cursor-pointer hover:bg-blue-200 transition-colors duration-300 ${filters.tags.has(tag)
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