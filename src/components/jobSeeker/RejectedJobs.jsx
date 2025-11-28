import React from "react";
import Card from "./Card";

export default function RejectedJobs({ data }) {
  // const data = Array.from({ length: 8 }).map((_, index) => ({
  //   id: index + 1,
  //   title: "Sr. UIUX Designer",
  //   company: "UX-Pilot",
  //   location: "California, United State.",
  //   status: "rejected",
  // }));

  return (
    <>
      <Card data={data} />
    </>
  );
}
