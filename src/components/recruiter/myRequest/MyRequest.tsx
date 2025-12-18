"use client";
import { ChevronLeft } from "lucide-react";
import CustomImage from "shared/CustomImage";
import CandidateMatch from "./CandidateMatch";
import Link from "next/link";
import MyRequestCard from "./MyRequestCard";

export default function MyRequest({ res }) {
  return (
    <div className="max-w-7xl mx-auto my-9">
      <div
        className="flex items-center mb-3 cursor-pointer"
        onClick={() => history.back()}
      >
        <ChevronLeft />
        <h1 className="text-2xl text-blue-600 font-medium ">All Request</h1>
      </div>

      <CandidateMatch />

      <MyRequestCard res={res} />
    </div>
  );
}
