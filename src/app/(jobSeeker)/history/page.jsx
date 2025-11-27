"use client";
import AppliedJobs from "@/components/jobSeeker/AppliedJobs";
import Interviews from "@/components/jobSeeker/Interviews";
import RejectedJobs from "@/components/jobSeeker/RejectedJobs";
import { Button } from "@/components/ui/button";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { myFetch } from "../../../../utils/myFetch";

const names = [
  { name: "applied", label: "Applied" },
  { name: "rejected", label: "Rejected" },
  { name: "interviews", label: "Interviews" },
];

export default function HistoryPage() {
  const [active, setActive] = useState("applied");
  const [interviews, setInterviews] = useState("complete");
  const [data, setData] = useState([]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  console.log(params);

  const handleParams = (status) => {
    setActive(status);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (status) {
      newSearchParams.set("status", status);
    } else {
      newSearchParams.delete("status");
    }

    router.push(`?${newSearchParams.toString()}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await myFetch(`/application`);
      setData(res.data);
    };
    fetchData();
  }, []);

  return (
    <div className="px-4 sm:px-6 py-6">
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {names?.map((item) => (
          <Button
            key={item._id}
            onClick={() => handleParams(item.name)}
            className={
              active === item.name
                ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }
          >
            {item.label}
          </Button>
        ))}
      </div>

      {active === "interview" && (
        <div className="flex items-center justify-center gap-4 my-4">
          <Button
            onClick={() => setInterviews("complete")}
            className={
              interviews === "complete"
                ? "bg-[#2A57DE] text-white border-primary shadow-sm"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }
          >
            Complete
          </Button>

          <Button
            onClick={() => setInterviews("incomplete")}
            className={
              interviews === "incomplete"
                ? "bg-[#2A57DE] text-white border-primary shadow-sm"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }
          >
            InComplete
          </Button>
        </div>
      )}

      {active === "applied" && <AppliedJobs />}
      {active === "rejected" && <RejectedJobs />}
      {active === "interviews" && <Interviews />}
    </div>
  );
}
