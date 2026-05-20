import CustomImage from "../../../shared/CustomImage";
import StarRating from "./StarRating";

export default function ReviewCard({ name, role, rating = 5, text, image }) {
  return (
    <div className="relative overflow-hidden bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col h-full group">
      {/* Hover left accent line */}
      <div className="absolute top-0 left-0 w-1.5 h-full bg-[#123499] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Profile info at the top */}
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-50">
        <CustomImage
          src={image || "/placeholder.svg"}
          alt={name}
          width={10}
          height={10}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="overflow-hidden">
          <h3 className="font-semibold text-gray-900 text-xs tracking-tight truncate">
            {name}
          </h3>
          <p className="text-[10px] text-gray-500 truncate">{role}</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Rating below profile */}
        <div className="mb-3">
          <StarRating rating={rating} />
        </div>

        {/* Testimonial text */}
        <p className="text-sm text-gray-600 leading-relaxed font-normal">
          "{text}"
        </p>
      </div>
    </div>
  );
}
