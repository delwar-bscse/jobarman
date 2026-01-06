"use client";
import { ChevronLeft } from "lucide-react";
import CandidateMatch from "./CandidateMatch";
import MyRequestCard from "./MyRequestCard";
import PercentageHeader from "@/app/(recruiter)/my-job-details/PercentageHeader";

export default function MyRequest({ res }) {
  return (
    <div className="min-h-screen max-w-7xl mx-auto my-9">
      <div
        className="flex items-center mb-3 cursor-pointer"
        onClick={() => history.back()}
      >
        <ChevronLeft />
        <h1 className="text-2xl text-blue-600 font-medium ">My Request</h1>
      </div>
      <PercentageHeader />
      <MyRequestCard res={res} />
    </div>
  );
}
