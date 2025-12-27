import CompanyProfilePage from "@/components/recruiter/companyProfile/CompanyProfile";
import React from "react";
import { myFetch } from "../../../../../utils/myFetch";

export default async function page() {
  const res = await myFetch("/job-post/feed/user");
  return (
    <>
      <CompanyProfilePage data={res?.data} />
    </>
  );
}
