/* eslint-disable react-hooks/exhaustive-deps */
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

const RatingComponent = ({initialValue, handleValue, size}:{initialValue?:number, handleValue?: (value: number) => void, size?: number}) => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number | null>(null);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLButtonElement>,
    star: number
  ) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;

    const value = x < width / 2 ? star - 0.5 : star;
    setHover(value);
  };

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    star: number
  ) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;

    const value = x < width / 2 ? star - 0.5 : star;
    setRating(value);
    handleValue && handleValue(value);
  };

  useEffect(() => {
    if (initialValue) {
      setRating(initialValue);
    }
  },[]);

  const iconSize = (value:number) => {
    const size = value.toString() ?? "10";
    return `w-${size} h-${size}`;
  }

  return (
    <div className="flex justify-center">
      {[1, 2, 3, 4, 5].map((star) => {
        const displayValue = hover ?? rating;

        return (
          <button
            key={star}
            onMouseMove={(e) => handleMouseMove(e, star)}
            onMouseLeave={() => setHover(null)}
            onClick={(e) => handleClick(e, star)}
            className="relative transition-transform"
          >
            <Star className={`${size ? iconSize(size) : "w-10 h-10"} fill-gray-200 text-gray-200`} />

            <Star
              className={`absolute top-0 left-0 ${size ? iconSize(size) : "w-10 h-10"} fill-[#FF8F27] text-[#FF8F27] pointer-events-none`}
              style={{
                clipPath:
                  displayValue >= star
                    ? "inset(0 0 0 0)"
                    : displayValue >= star - 0.5
                    ? "inset(0 50% 0 0)"
                    : "inset(0 100% 0 0)",
                transition: "clip-path 0.3s ease",
              }}
            />
          </button>
        );
      })}
    </div>
  );
};

export default RatingComponent;