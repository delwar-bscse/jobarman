import Image from "next/image";

const jobData = {
  title: "Sr. UI/UX Designer",
  company: "UX Analysis Company Ltd.",
  location: "San Francisco",
  progress: "95%",
  status: "Applying",
  image: "/job.png", // update with your image path
};

export default function JobList() {
  // Create an array of 5 copies of jobData
  const jobsArray = Array.from({ length: 5 }, () => ({ ...jobData }));

  return (
    <div className="space-y-4">
      {jobsArray.map((job, index) => (
        <div
          key={index}
          className="w-full bg-white rounded-xl shadow-sm p-4 flex items-center gap-4"
        >
          {/* Job Image */}
          <div>
            <Image
              src={job.image}
              alt="Job"
              width={70}
              height={70}
              className="rounded-md"
            />
          </div>

          {/* Text Section */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold">{job.title}</h2>
            <p className="text-sm text-gray-600">{job.company}</p>
            <p className="text-sm text-gray-600">{job.location}</p>
          </div>

          {/* Right Section */}
          <div className="flex flex-col items-end gap-2">
            <span className="text-lg font-bold">{job.progress}</span>
            <button className="bg-[#123499] text-white text-sm px-5 py-2 rounded-full">
              {job.status}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
