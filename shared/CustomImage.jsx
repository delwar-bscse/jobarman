import Image from "next/image";
import React from "react";

export default function CustomImage(width = "20", height = "20") {
  return (
    <Image
      src={image}
      alt={title}
      width={10}
      height={10}
      className="w-36 h-24 rounded-lg object-cover"
    />
  );
}
