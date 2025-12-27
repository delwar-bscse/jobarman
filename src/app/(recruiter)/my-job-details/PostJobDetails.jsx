import CustomImage from "../../../../shared/CustomImage";
import { Briefcase, Eye, MapPin, Trash2 } from "lucide-react";
import Link from "next/link";
import { getRemainingDays } from "utils/remainingDays";
import DeletePost from "./DeletePost";

export default function PostJobDetails({ postJobDetails }) {
  const { title, thumbnail, location, job_type, deadline, _id } =
    postJobDetails?.data;

  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6 shadow-lg p-6 sm:p-8 rounded-lg border border-gray-200">
      {/* Left Content */}
      <div className="flex gap-4">
        <CustomImage
          src={thumbnail}
          className="w-16 h-16 object-cover"
          title={title}
        />

        <div className="flex-1">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            {title}
          </h1>
          <div className="flex flex-col gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-medium">
                <Briefcase className="w-3 h-3" />
                {job_type}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex flex-col sm:items-end gap-4">
        <div className="flex gap-2">
          <Link href={`/jobs/${_id}`}>
            <button className="w-10 h-10 flex items-center justify-center border border-green-600 rounded-lg hover:bg-gray-50 transition-colors">
              <Eye className="w-4 h-4 text-green-600" />
            </button>
          </Link>
          <DeletePost id={_id} />
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-600 mb-1">Time Remaining</p>
          <p className="text-lg sm:text-xl font-bold text-orange-500">
            {getRemainingDays(deadline)} Days Remaining
          </p>
        </div>
      </div>
    </div>
  );
}
