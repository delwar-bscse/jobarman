import Link from "next/link";
import CustomImage from "shared/CustomImage";

export default function CandidateCard({ candidate }) {
  return (
    <Link href={`/my-request/${candidate._id}`}>
      <div className="border rounded-lg p-4 sm:p-5 shadow-md hover:shadow-lg transition-shadow">
        <div className="flex justify-between">
          {/* Candidate Info */}
          <div className="flex gap-3 sm:gap-4 mb-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 rounded-lg overflow-hidden">
              <CustomImage
                src={candidate.user.image || "/placeholder.svg"}
                alt={candidate.user.name}
                width={56}
                height={56}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm sm:text-base text-gray-900 truncate">
                {candidate.user.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 truncate">
                {candidate.title}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {candidate.year_of_experience} Years Experience
              </p>
            </div>
          </div>
          {/* Match Badge */}
          <div className="flex justify-end mb-3">
            <span
              className={`text-[#008F37] font-semibold text-xs sm:text-sm px-3 py-1 rounded-full`}
            >
              {candidate.jobMatch}% Match
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 mb-4">
          {candidate.user.bio}
        </p>
      </div>
    </Link>
  );
}
