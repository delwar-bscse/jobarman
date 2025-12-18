import AddNewResumeForm from "@/components/addNewResumeForm/AddNewResumeForm";
import AddNewResumeForm2 from "@/components/addNewResumeForm/AddResume";
import React from "react";
import { myFetch } from "../../../../utils/myFetch";

const AddNewResume = async ({ searchParams }) => {
  // const name = (await searchParams).name;
  const id = (await searchParams).id;
  const res = await myFetch("/resume");

  return (
    <div className="bg-[#FBFBFB]">
      <AddNewResumeForm2 />
    </div>
  );
};

export default AddNewResume;
