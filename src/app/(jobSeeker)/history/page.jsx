"use client";
import AppliedJobs from "@/components/jobSeeker/AppliedJobs";
import Interviews from "@/components/jobSeeker/Interviews";
import RejectedJobs from "@/components/jobSeeker/RejectedJobs";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { myFetch } from "../../../../utils/myFetch";

const names = [
  { name: "PENDING", label: "Applied" },
  { name: "REJECTED", label: "Rejected" },
  { name: "INTERVIEW", label: "Interview" },
];

export default function HistoryPage() {
  const [active, setActive] = useState("PENDING");
  const [interviews, setInterviews] = useState("complete");
  const [data, setData] = useState([]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("status") || "PENDING";

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
      const res = await myFetch(`/application?status=${query ?? ""}`);
      setData(res.data);
    };
    fetchData();
  }, [query]);

  return (
    <div className="px-4 sm:px-6 py-6">
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {names?.map((item, i) => (
          <Button
            key={i}
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

      {active === "INTERVIEW" && (
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

      {active === "PENDING" && <AppliedJobs data={data} />}
      {active === "REJECTED" && <RejectedJobs data={data} />}
      {active === "INTERVIEW" && <Interviews data={data} />}
    </div>
  );
}
