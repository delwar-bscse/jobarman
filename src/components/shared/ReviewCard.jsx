import { Star } from "lucide-react";
import CustomImage from "../../../shared/CustomImage";
import StarRating from "./StarRating";

export default function ReviewCard({ name, role, rating = 5, text, image }) {
  return (
    <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center gap-3 mb-4">
        <CustomImage
          src={image || "/placeholder.svg"}
          alt={name}
          width={10}
          height={10}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h3 className="font-semibold text-gray-900 text-sm">{name}</h3>
          <p className="text-xs text-gray-500">{role}</p>
        </div>
      </div>

      <div className="flex gap-1 mb-3">
        <StarRating rating={rating} />
      </div>

      <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
    </div>
  );
}
