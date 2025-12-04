"use client";
import { Search, SlidersHorizontal } from "lucide-react";
import React, { Suspense, useState } from "react";
import FilterModal from "./FilterModal";
import { useRouter, useSearchParams } from "next/navigation";

function SearchSectionSuspense() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { replace } = useRouter();
  const [search, setSearch] = useState("");
  

  const handleSubmit = () => {
    console.log("serarcTerm : ", search);
    params.set("searchTerm", search);
    replace(`/jobs?${params.toString()}`, { scroll: true });
  }

  return (
    <section className="py-6 sm:py-10 lg:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4 sm:mb-6 lg:mb-8">
          <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-[#123499]">
            Find Your Dream Job Today!
          </h2>
          <p className="text-gray-600 mt-1 sm:mt-2 lg:mt-3 text-sm sm:text-base lg:text-lg">
            Connecting Talent with Opportunity: Your Gateway to Career Success
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center rounded-xl overflow-hidden border border-gray-200 shadow-sm">
          <div className="flex-1 flex items-center bg-blue-50 w-full">
            <input
            onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Job Title or Company"
              className="w-full bg-transparent px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 text-gray-700 placeholder-gray-500 outline-none text-sm sm:text-base lg:text-lg"
            />
          </div>

          <FilterModal
            trigger={
              <button
                type="button"
                aria-label="Open Filters"
                className="hidden sm:flex items-center px-3 sm:px-4 border-t sm:border-t-0 sm:border-l border-gray-200 text-gray-600 "
              >
                <SlidersHorizontal className="w-4 sm:w-5 lg:w-5 h-4 sm:h-5 lg:h-5" />
              </button>
            }
          />

          <button onClick={handleSubmit} className="flex items-center gap-2 bg-gradient-to-r from-[#123499] to-[#2A57DE] text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 font-medium text-sm sm:text-base lg:text-lg w-full sm:w-auto justify-center">
            <Search className="w-4 sm:w-4 lg:w-5 h-4 sm:h-4 lg:h-5" />
            Search Job
          </button>
        </div>
      </div>
    </section>
  );
}


export default function SearchSection() {
  return (
    <Suspense fallback={<div>Loading...</div>} >
      <SearchSectionSuspense />
    </Suspense>
  )
}
