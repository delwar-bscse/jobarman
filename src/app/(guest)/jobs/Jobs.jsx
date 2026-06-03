/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import FilterSide from "@/components/employee/jobs/FilterSide";
import JobCard from "@/components/employee/jobs/JobCard";
import CustomPagination from "@/components/cui/CustomPagination";
import { clientFetch } from "../../../../utils/clientFetch";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { useFilters } from "@/hooks/useFilters";
import { scrollToTop } from "../../../../utils/scrollToTop";

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
      return ""
    })
    .join(",");
};

/* ================= skeleton loader ================= */

const JobCardSkeleton = () => (
  <div className="bg-white min-h-40 border border-gray-200 rounded-lg overflow-hidden flex animate-pulse">
    <div className="flex items-start justify-center p-2 pt-4">
      <div className="w-28 sm:w-40 h-24 sm:h-32 bg-gray-200 rounded" />
    </div>
    <div className="w-2/3 p-4 flex flex-col justify-between">
      <div>
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-3" />
        <div className="h-3 bg-gray-200 rounded w-1/4" />
      </div>
    </div>
  </div>
);

/* ================= component ================= */

const Jobs = ({ favoritesList, initialJobs = [], initialTotalPages = 1 }) => {
  const { filters, setFilters, resetFilters } = useFilters();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [jobs, setJobs] = useState(initialJobs);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const { searchTerm, location, category, job_type, experience_level, date_posted, tags, minPrice, maxPrice } = filters;

  const page = searchParams.get("page") || 1;

  // Skip the very first fetch — server already provided initialJobs
  const isFirstRender = useRef(true);

  // Abort controller ref for cancelling stale requests
  const abortControllerRef = useRef(null);

  // Serialize Set-based filters to stable strings for useEffect deps
  const categoryKey = Array.from(filters.category).sort().join(",");
  const jobTypeKey = Array.from(filters.job_type).sort().join(",");
  const experienceKey = Array.from(filters.experience_level).sort().join(",");
  const tagsKey = Array.from(filters.tags).sort().join(",");

  const fetchData = useCallback(async () => {
    // Cancel any in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);

    try {
      const categoryParam = Array
        .from(filters.category)
        .filter(Boolean)
        .join(",");

      const job_type = formatEnum(Array.from(filters.job_type).join(",")) || "";
      const experience_level = experienceLevel(
        Array.from(filters.experience_level).join(",")
      );
      const dateLimit = filters.date_posted ? filters.date_posted.toLowerCase() : "";
      const tags = Array.from(filters.tags).join(",");

      const queryParams = new URLSearchParams({
        ...(searchTerm && { searchTerm: searchTerm }),
        ...(location && { location: location }),
        ...(minPrice && { minPrice: minPrice }),
        ...(maxPrice && { maxPrice: maxPrice }),
        ...(categoryParam && { category: categoryParam }),
        ...(job_type && { job_type }),
        ...(experience_level && { experience_level }),
        ...(dateLimit && { dateLimit }),
        ...(tags && { tags }),
        page,
      });

      const jobsRes = await clientFetch(
        `/job-post/feed?${queryParams.toString()}`,
        { method: "GET" }
      );

      // If this request was aborted, don't update state
      if (controller.signal.aborted) return;

      if (jobsRes?.success) {
        setJobs(jobsRes?.data || []);
        setTotalPages(jobsRes?.pagination?.totalPage || 1);
        scrollToTop(300);
      } else {
        setJobs([]);
        setTotalPages(1);
      }
    } catch (error) {
      if (controller.signal.aborted) return;
      console.error("Error fetching jobs data:", error);
      setJobs([]);
      setTotalPages(1);
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }, [searchTerm, location, categoryKey, jobTypeKey, experienceKey, date_posted, tagsKey, minPrice, maxPrice, page]);

  useEffect(() => {
    // Skip fetch on first render — we already have server-provided data
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    fetchData();

    // Cleanup: abort on unmount or before next effect
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData]);

  return (
    <div className="min-h-screen bg-white relative">
      <div onClick={() => resetFilters()}
        className="max-w-7xl mx-auto cursor-pointer">
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
          <div className="lg:col-span-3">
            {loading ? (
              /* Skeleton cards — preserves layout during loading */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-2 lg:px-0">
                {Array.from({ length: 6 }).map((_, i) => (
                  <JobCardSkeleton key={i} />
                ))}
              </div>
            ) : jobs.length ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-2 lg:px-0">
                  {jobs.map((job, index) => (
                    <JobCard
                      key={job._id || index}
                      job={job}
                      favoritesList={favoritesList}
                    />
                  ))}
                </div>
                {jobs.length > 0 && <CustomPagination totalPages={totalPages} />}
              </>
            ) : (
              <div className="min-h-[calc(100vh-300px)] flex items-start justify-center relative">
                <div className="sticky top-1/2 -translate-y-1/2 flex items-center justify-center w-full py-20">
                  <p className="text-xl font-medium">
                    No Jobs Found
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Jobs
