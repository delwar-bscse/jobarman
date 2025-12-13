"use client";
import { Pencil } from "lucide-react";
import Image from "next/image";
import InterviewSheduleModal from "../InterviewSheduleModal";
import Link from "next/link";
import CustomImage from "shared/CustomImage";
import dayjs from "dayjs";

export default function Interviews({ data }) {
  return (
    <div className="max-w-7xl mx-auto ">
      {data?.map((item) => {
        const formatedTime = dayjs(
          `${new Date().toDateString()} ${item?.interviewDetails?.time}`,
          "HH:mm"
        ).format("hh:mm A");

        return (
          <div
            className="flex justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200 w-full max-w-md"
            key={item?._id}
          >
            {/* LEFT SIDE clickable → details page */}
            <Link
              href={`/interview-job-details/${item._id}`}
              className="flex items-center gap-10 flex-1"
            >
              <CustomImage
                src={item.user.image}
                className="w-20 h-20 object-cover flex-shrink-0 bg-muted"
                width={10}
                height={10}
                title="ok"
              />

              <div className="flex flex-col">
                <h2 className="text-lg font-semibold text-gray-900">
                  {item?.user?.name}
                </h2>
                <p className="text-sm text-gray-700">{item?.title}</p>
                <p className="text-xs text-gray-500">
                  {item?.year_of_experience} Years Experience
                </p>

                <button className="mt-2 w-fit rounded-lg border border-blue-600 px-3 py-1 text-xs font-medium text-blue-600">
                  Schedule:{" "}
                  {dayjs(item?.interviewDetails?.date).format("YYYY-MM-DD")} At{" "}
                  {formatedTime}
                </button>
              </div>
            </Link>

            {/* RIGHT SIDE → modal trigger NOT wrapped in Link */}
            <div onClick={(e) => e.stopPropagation()}>
              <InterviewSheduleModal
                item={item}
                trigger={
                  <button>
                    <Pencil />
                  </button>
                }
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
