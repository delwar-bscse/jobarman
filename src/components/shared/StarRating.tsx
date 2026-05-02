import { Star } from "lucide-react";

type StarRatingProps = {
  rating: number;
  max?: number;
};

const StarRating = ({ rating, max = 5 }: StarRatingProps) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(max)].map((_, i) => {
        const full = i < Math.floor(rating);
        const half = i === Math.floor(rating) && rating % 1 !== 0;

        return (
          <div key={i} className="relative w-4 h-4">
            {/* Empty base */}
            <Star className="w-4 h-4 text-gray-300" />

            {/* Full */}
            {full && (
              <Star className="absolute inset-0 w-4 h-4 fill-yellow-400 text-yellow-400" />
            )}

            {/* Half */}
            {half && (
              <div className="absolute inset-0 overflow-hidden w-1/2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;