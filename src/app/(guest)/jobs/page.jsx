/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Suspense, use, useEffect, useState } from "react";
import Image from "next/image";
import FilterSide from "@/components/employee/jobs/FilterSide";
import JobCard from "@/components/employee/jobs/JobCard";
import CustomPagination from "@/components/cui/CustomPagination";
import { myFetch } from "../../../../utils/myFetch";
import { useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [favoratesList, setFavoratesList] = useState([]);
  // const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const page = searchParams.get("page") || 1;
  const searchTerm = searchParams.get("searchTerm") || "";
  const category = searchParams.get("category") || "";
  const minPrice = searchParams.get("minPrice") || "1";
  const maxPrice = searchParams.get("maxPrice") || "99999";
  const job_type = searchParams.get("job_type") || "";
  const employeeType = searchParams.get("employeeType") || "";
  const radius = searchParams.get("radius") || 500;

  // 🔥 single source of truth
  const [filters, setFilters] = useState({
    searchTerm: "",
    location: "",
    category: new Set(),
    job_type: new Set(),
    experience_level: new Set(),
    date_posted: "",
    tags: new Set(),
    minPrice: 1,
    maxPrice: 500000,
  });

  useEffect(() => {
    console.log("filter modal : ", minPrice, maxPrice)
    setFilters((prev) => ({
      ...prev,
      searchTerm,
      category: new Set(category.split(",")),
      job_type: new Set(employeeType.split(",")),
      radius,
    }));
  }, [searchTerm, category, minPrice, maxPrice, employeeType, radius]);

  useEffect(() => {
    const fetchData = async () => {

      const category = Array
        .from(filters.category)
        .filter(Boolean)   // 🔥 removes "", null, undefined
        .join(",");

      const job_type = formatEnum(Array.from(filters.job_type).join(",")) || "";
      const experience_level = experienceLevel(
        Array.from(filters.experience_level).join(",")
      );
      const dateLimit = filters.date_posted.toLowerCase()
      console.log("Filters : ", category);
      const tags = Array.from(filters.tags).join(",");

      const jobsRes = await myFetch(
        `/job-post/feed?searchTerm=${filters.searchTerm}&location=${filters.location}&minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}&page=${page}&category=${category}&experience_level=${experience_level}&job_type=${job_type}&dateLimit=${dateLimit}&tags=${tags}`,
        { method: "GET" }
      );

      console.log("Jobs Res : ", jobsRes);

      const favRes = await myFetch("/favourite", {
        tags: ["favoratesList"],
      });

      setJobs(jobsRes?.data || []);
      setTotalPages(jobsRes?.pagination?.totalPage || 1);

      const favList = favRes?.data?.map(
        (f) => f?.post?._id
      );
      setFavoratesList(favList || []);
    };

    fetchData();
  }, [filters, page]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-2 lg:px-0">
              {jobs.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                // favoratesList={favoratesList}
                />
              ))}
            </div>

            {jobs.length > 0 && <CustomPagination
              totalPages={totalPages}
            />}
          </div>

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

