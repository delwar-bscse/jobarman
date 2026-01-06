import { myFetch } from "utils/myFetch";
import ChartSection from "../../../../components/recruiter/recruitment-status/chart-section";

export default async function page({ searchParams }) {
  const id = (await searchParams)?.id;
  const res = await myFetch(`/job-post/insights/${id}`);

  return (
    <div className="min-h-screen">
      <ChartSection data={res?.data} />
    </div>
  );
}
