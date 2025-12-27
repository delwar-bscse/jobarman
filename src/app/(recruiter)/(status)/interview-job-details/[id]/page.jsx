import InterviewJobDetails from "@/components/recruiter/recruitment-status/interviews/InterviewJobDetails";
import { myFetch } from "utils/myFetch";

export default async function page({ params }) {
  const id = (await params).id;
  const res = await myFetch(`/application/${id}`, {
    method: "GET",
    tags: ["status"],
  });

  return (
    <>
      <InterviewJobDetails data={res?.data} />
    </>
  );
}
