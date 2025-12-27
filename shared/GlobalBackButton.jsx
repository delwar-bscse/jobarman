"use client";
import { ChevronLeft } from "lucide-react";

export default function GlobalBackButton() {
  return (
    <ChevronLeft
      className="w-6 h-6 text-blue-600 mr-2 cursor-pointer"
      onClick={() => history.back()}
    />
  );
}
