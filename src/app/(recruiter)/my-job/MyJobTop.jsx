"use client"
import Status from '@/components/recruiter/recruitment-status/Status'
import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { Suspense } from 'react'
import { useDebouncedCallback } from 'use-debounce'

const MyJobTopSuspense = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const handleSearch = useDebouncedCallback((type, value) => {
    if (value) {
      params.set(type, value);
    } else {
      params.delete(type);
    }
    replace(`?${params.toString()}`);
  }, 300);

  const getSingleQueryParams = (type) => {
    return searchParams.get(type) || "";
  };

  return (
    <div className="">
      <h2 onClick={() => location.history.back()} className="text-2xl font-bold">My Job Post</h2>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <Status />
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search With Job title"
            defaultValue={getSingleQueryParams("searchTerm")}
            onChange={(e) => handleSearch("searchTerm", e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
          />
        </div>
      </div>
    </div>
  )
}

// export default MyJobTop
export default function MyJobTop() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyJobTopSuspense />
    </Suspense>
  );
}