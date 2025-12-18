"use client";
import { useEffect, useState } from "react";
import Circle from "./Circle";
import JobList from "./JobList";
import { myFetch } from "../../../../utils/myFetch";

export default function AutoProcess({ value = 175, total = 200 }) {
  const [score, setScore] = useState({
    completed: 0,
    total: 0
  });
  const [autoApplyData, setAutoApplyData] = useState([]);

  const fetchApplyResult = async (id) => {
    const res = await myFetch(`/application/auto-apply/${id}`)
    console.log("Auto apply result response : ", res);
    if(res?.success){
      setAutoApplyData(res?.data);
    }
  }

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("autoApplyDataId"));
    console.log("Auto apply data id : ", id);
    (()=> fetchApplyResult(id))()
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto p-6">
      <Circle />
      {/* card */}
      {autoApplyData.length > 0 && <JobList autoApplyData={autoApplyData}/>}
    </div>
  );
}
