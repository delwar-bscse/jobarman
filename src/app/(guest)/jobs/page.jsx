import Image from "next/image";
import FilterSide from "@/components/employee/jobs/FilterSide";
import JobCard from "@/components/employee/jobs/JobCard";
import { myFetch } from "../../../../utils/myFetch";
import CustomPagination from "@/components/cui/CustomPagination";

export const formatEnum = (value) => {
  const newValues = value?.split(",");

  const returnValues = newValues?.map((value) => {
    if (typeof value !== "string") return "";

    return value.trim().toUpperCase().replace(/\s+/g, "_");
  });

  return returnValues?.join(",");
};

export const experienceLevel = (values = "") => {
  const enumArr = ["No experience", "Fresher", "Intermediate", "Expert"];
  const newValues = values.split(",");

  const newArry = newValues.map((value) => {
    if (value === enumArr[0]) {
      return "0-1yrs";
    } else if (value === enumArr[1]) {
      return "1-3yrs";
    } else if (value === enumArr[2]) {
      return "3-5yrs";
    } else if (value === enumArr[3]) {
      return "5+yrs";
    }
  });
  return newArry.join(",");
};

const JobsPage = async ({ searchParams }) => {
  const searchParamsValue = await searchParams;
  const page = Number(searchParamsValue.page) || 1;
  const searchTerm = searchParamsValue.searchTerm || "";
  const location = searchParamsValue.location || "";
  const category = searchParamsValue.category || "";
  const minPrice = searchParamsValue.minPrice || "1";
  const maxPrice = searchParamsValue.maxPrice || "9999";
  const experience_level =
    experienceLevel(searchParamsValue.experience_level) || "";
  // const experience_level2 = searchParamsValue.experience_level || "";
  const job_type = formatEnum(searchParamsValue.job_type) || "";
  const job_level = formatEnum(searchParamsValue.job_level) || "";
  const employeeType = searchParamsValue.employeeType || "";
  const radius = searchParamsValue.radius || 500;

  // get favorate data
  const res = await myFetch("/favourite", {
    tags: ["favoratesList"],
  });

  const jobs = await myFetch(
    `/job-post/feed?searchTerm=${searchTerm}&location=${location}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&experience_level=${experience_level}&job_level=${job_level}&job_type=${job_type}&page=${page}&employeeType=${employeeType}`,
    {
      method: "GET",
    }
  );
  const favoratesList = res?.data?.map((favorate) => favorate.post._id);

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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <FilterSide />

          {/* Job Cards Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-2 lg:px-0">
              {jobs?.data?.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                  favoratesList={favoratesList}
                />
              ))}
            </div>
            <div>
              <CustomPagination totalPages={jobs.pagination?.totalPage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
