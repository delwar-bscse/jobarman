import CustomImage from "../../../shared/CustomImage";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { getRemainingDays } from "../../../utils/remainingDays";

const JobPostCard = ({ job }) => {
  return (
    <div
      key={job._id}
      className="bg-white h-32 overflow-hidden rounded-xl shadow-sm border border-gray-200 p-1 flex items-center gap-4"
    >
      <CustomImage
        src={job.thumbnail}
        title={job.title}
        width={300}
        height={200}
        className="rounded-md h-full w-40"
      />
      <div className="flex-1">
        <div>
          <Link
            href={`/jobs/${job._id}`}
            className="text-gray-900 font-semibold hover:text-blue-600"
          >
            {job.title}
          </Link>
          <div className="text-sm mt-1">
            <p className="text-blue-600 hover:underline">{job.company}</p>
          </div>
          <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-gray-600" />
            <span>{job.location}</span>
          </div>
          <div className="mt-2 gap-4 text-sm">
            <div className="flex justify-between items-center">
              <span className="flex gap-2 items-center text-gray-700">
                <span className="w-2 h-2 bg-blue-600 rounded-full inline-block"></span>
                {job.job_type}
              </span>
            </div>
          </div>
        </div>
        <div>
          <span className="flex items-center gap-1 text-orange-500 text-sm font-medium">
            {getRemainingDays(job.deadline)} Days Remaining
          </span>
        </div>
      </div>
    </div>
  );
};

export default JobPostCard;
