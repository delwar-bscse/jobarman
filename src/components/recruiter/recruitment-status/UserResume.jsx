"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { myFetch } from "utils/myFetch";
import InterviewSheduleModal from "./InterviewSheduleModal";
import PdfViewer from "../../cui/PdfViewer";
import { formatUrl } from "utils/formatUrl";
import CancelInterview from "./interviews/CancelInterview";

export default function UserResume({ data }) {
  const [resumeShow, setResumeShow] = useState(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const res = await myFetch(`/application/${id}`);
      setResumeShow(res?.data);
    };

    fetchData();
  }, [id]);

  /* ---------------- Empty / Selection States ---------------- */

  if (!data?.length) {
    return (
      <p className="text-center my-[5%] text-gray-400">No data available</p>
    );
  }

  if (!id) {
    return (
      <p className="text-center my-[5%] text-gray-500">Please select an item</p>
    );
  }

  if (!resumeShow) {
    return (
      <p className="text-center my-[5%] text-gray-500">Loading resume...</p>
    );
  }

  /* ---------------- Main UI ---------------- */

  return (
    <div>
      <PdfViewer fileUrl={resumeShow?.resume} />

      <div className="p-4">
        <div
          className={`grid ${
            resumeShow?.inteviewStatus !== "cancelled"
              ? "md:grid-cols-2"
              : "md:grid-cols-1"
          } gap-4 mb-4`}
        >
          <InterviewSheduleModal
            item={resumeShow}
            trigger={
              <button className="w-full bg-green-700 text-white font-semibold rounded-md px-6 py-2">
                Interview
              </button>
            }
          />

          {resumeShow?.inteviewStatus !== "cancelled" && (
            <CancelInterview
              item={resumeShow?._id}
              trigger={
                <button className="w-full bg-red-600 text-white font-semibold rounded-md px-6 py-2">
                  Cancel Interview
                </button>
              }
            />
          )}
        </div>

        <button className="w-full border border-blue-600 text-blue-600 font-semibold rounded-md px-6 py-2">
          Message
        </button>
      </div>
    </div>
  );
}
