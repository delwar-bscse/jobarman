"use client";
import { ChevronLeft } from "lucide-react";
import React from "react";

export default function HeaderTitle({ postJobDetails }) {
  return (
    <button
      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors mb-4"
      onClick={() => history.back()}
    >
      <ChevronLeft className="w-4 h-4" />
      <span className="text-sm font-medium">{postJobDetails?.data?.title}</span>
    </button>
  );
}
