import React from "react";
import { myFetch } from "../../../../utils/myFetch";
import AutoApply from "@/components/guest/auto-apply/AutoApply";

export default async function page() {
  const res = await myFetch("/resume", {
    tags: ["resume"],
  });
  return (
    <div>
      <AutoApply data={res?.data} />
    </div>
  );
}
