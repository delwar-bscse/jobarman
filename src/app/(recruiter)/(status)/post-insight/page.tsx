import { myFetch } from "utils/myFetch";
import ChartSection from "../../../../components/recruiter/recruitment-status/chart-section";

export default async function page() {
  const res = await myFetch("/job-post/insights/691ee038f0eaa81d00667734");
  return (
    <div>
      <ChartSection data={res?.data} />
    </div>
  );
}
