"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { myFetch } from "utils/myFetch";
import InterviewSheduleModal from "./InterviewSheduleModal";
import RejectModal from "./RejectModal";
import PdfViewer from "../../cui/PdfViewer";
import { formatUrl } from "utils/formatUrl";

// const PDFViewer = dynamic(() => import("pdf-viewer-reactjs"), { ssr: false });

export default function UserResume() {
  const [resumeShow, setResumeShow] = useState(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  console.log("resumeShow", formatUrl(resumeShow?.resume));

  useEffect(() => {
    const fetchData = async () => {
      const res = await myFetch(`/application/${id}`);
      setResumeShow(res?.data);
    };
    fetchData();
  }, [id]);

  if (!resumeShow?.resume) return <p>Loading...</p>;

  return (
    <div>
      {/* <PDFViewer
        document={{
          url: `${process.env.NEXT_PUBLIC_IMAGE_URL}${resumeShow?.resume}`,
        }}
      /> */}
      <PdfViewer fileUrl={formatUrl(resumeShow?.resume)} />

      {/* message */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Interview Button */}
          <InterviewSheduleModal
            trigger={
              <button className="w-full bg-green-700 text-white font-semibold rounded-md px-6 py-2">
                Interview
              </button>
            }
          />

          {/* Reject Button */}
          <RejectModal
            trigger={
              <button className="w-full bg-red-600 text-white font-semibold rounded-md px-6 py-2">
                Reject
              </button>
            }
          />
        </div>

        {/* Message Button */}
        <button className="w-full border border-blue-600 text-blue-600 font-semibold rounded-md px-6 py-2">
          Message
        </button>
      </div>
    </div>
  );
}
