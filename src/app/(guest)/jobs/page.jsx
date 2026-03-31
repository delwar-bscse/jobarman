/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Suspense, use, useEffect, useState } from "react";
import Image from "next/image";
import FilterSide from "@/components/employee/jobs/FilterSide";
import JobCard from "@/components/employee/jobs/JobCard";
import CustomPagination from "@/components/cui/CustomPagination";
import { myFetch } from "../../../../utils/myFetch";
import { useSearchParams } from "next/navigation";
import { Loader } from "lucide-react";
import { useFilters } from "@/hooks/useFilters";
// import { filter } from "lodash";

/* ================= utils (unchanged) ================= */

export const formatEnum = (value) => {
  const newValues = value?.split(",");
  return newValues
    ?.map((v) =>
      typeof v === "string"
        ? v.trim().toUpperCase().replace(/\s+/g, "_")
        : ""
    )
    .join(",");
};

export const experienceLevel = (values = "") => {
  const enumArr = ["No experience", "Fresher", "Intermediate", "Expert"];
  const newValues = values.split(",");

  return newValues
    .map((value) => {
      if (value === enumArr[0]) return "0-1yrs";
      if (value === enumArr[1]) return "1-3yrs";
      if (value === enumArr[2]) return "3-5yrs";
      if (value === enumArr[3]) return "5+yrs";
      return "";
    })
    .join(",");
};

/* ================= component ================= */

const JobsPageSuspense = () => {
  const { filters, setFilters, resetFilters } = useFilters();
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [favoritesList, setFavoritesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const {searchTerm, location, category, job_type, experience_level, date_posted, tags, minPrice, maxPrice} = filters;

  const page = searchParams.get("page") || 1;

  const fetchFavList = async () => {
    const res = await myFetch("/favourite", {
      tags: ["favoritesList"],
    });

    //console.log("favoritesList : ", res);
    setFavoritesList(res?.data?.map((favorate) => favorate?.post?._id));

  }

  useEffect(() => {

    fetchFavList();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const category = Array
        .from(filters.category)
        .filter(Boolean)   // 🔥 removes "", null, undefined
        .join(",");

      const job_type = formatEnum(Array.from(filters.job_type).join(",")) || "";
      const experience_level = experienceLevel(
        Array.from(filters.experience_level).join(",")
      );
      const dateLimit = filters.date_posted.toLowerCase()
      //console.log("Filters : ", category);
      const tags = Array.from(filters.tags).join(",");

      const queryParams = new URLSearchParams({
        ...(searchTerm && { searchTerm: searchTerm }),
        ...(location && { location: location }),
        ...(minPrice && { minPrice: minPrice }),
        ...(maxPrice && { maxPrice: maxPrice }),
        ...(category && { category }),
        ...(job_type && { job_type }),
        ...(experience_level && { experience_level }),
        ...(dateLimit && { dateLimit }),
        ...(tags && { tags }),
        page,
      });

      // console.log("Query Params : ", queryParams.toString());

      const jobsRes = await myFetch(
        `/job-post/feed?${queryParams.toString()}`,
        { method: "GET" }
      );
      // console.log("Jobs Res : ", jobsRes);

      const favRes = await myFetch("/favourite", {
        tags: ["favoritesList"],
      });

      setJobs(jobsRes?.data || []);
      setTotalPages(jobsRes?.pagination?.totalPage || 1);

      const favList = favRes?.data?.map(
        (f) => f?.post?._id
      );
      setFavoritesList(favList || []);
      
      if (jobsRes) setLoading(false)
    };

    fetchData();
  }, [searchTerm, location, category, job_type, experience_level, date_posted, tags, page]);

  return (
    <div className="min-h-screen bg-white">
      <div onClick={() => resetFilters()} className="max-w-7xl mx-auto cursor-pointer">
        <Image
          className="bg-gradient-to-r from-[#123499] to-[#2A57DE]"
          width={1621}
          height={264}
          src="/alljobs.png"
          alt="Job Image"
        />
      </div>

      <div className="max-w-7xl mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Sidebar */}
          <FilterSide
            filters={filters}
            setFilters={setFilters}
          />

          {/* Job Cards */}
          {!loading ? <div className="lg:col-span-3">
            {jobs.length ? <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-2 lg:px-0">
              {jobs.map((job, index) => (
                <JobCard
                  key={index}
                  job={job}
                  favoritesList={favoritesList}
                  fetchFavList={fetchFavList}
                />
              ))}
            </div> : <div className="flex flex-col items-center justify-center gap-4 lg:col-span-3 h-[calc(100vh-300px)]">
              <p className="text-xl font-medium">
                No Jobs Found
              </p>
            </div>}

            {jobs.length > 0 && <CustomPagination
              totalPages={totalPages}
            />}
          </div> : <div className="flex flex-col items-center justify-center gap-4 lg:col-span-3 h-[calc(100vh-300px)]">
            <h1 className="text-xl font-medium flex items-center gap-4">
              <Loader className="animate-spin" /> Loading...
            </h1>
          </div>}

        </div>
      </div>
    </div>
  );
};

export default function JobsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JobsPageSuspense />
    </Suspense>
  );
};

