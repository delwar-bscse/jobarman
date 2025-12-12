"use client";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import InterviewSheduleModal from "../InterviewSheduleModal";
import Link from "next/link";

export default function Interviews({ data }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleParams = (id) => {
    const params = new URLSearchParams(searchParams);
    params.set("id", id);
    router.replace(`${pathname}?${params}`);
  };

  const formatTime = (t) =>
    t
      ? new Date(`1970-01-01 ${t}`).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        })
      : "";

  const formatDate = (d) =>
    d
      ? new Date(d).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "";

  return (
    <div className="max-w-7xl mx-auto ">
      {data?.map((item) => (
        <div
          className="flex justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200 w-full max-w-md"
          // onClick={() => handleParams(item._id)}
          key={item?._id}
        >
          {/* LEFT SIDE clickable → details page */}
          <Link
            href={`/interview-job-details/${item._id}`}
            className="flex items-center gap-10 flex-1"
          >
            <Image
              src="/chat-user.jpg"
              className="w-20 h-20 object-cover flex-shrink-0 bg-muted"
              width={10}
              height={10}
              alt="ok"
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
                Schedule:
                {formatDate(item?.interviewDetails?.date)} At{" "}
                {formatTime(item?.interviewDetails?.time)}
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
      ))}
    </div>
  );
}
