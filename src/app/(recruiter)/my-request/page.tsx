import MyRequest from "@/components/recruiter/myRequest/MyRequest";
import { myFetch } from "utils/myFetch";

export default async function page({ searchParams }) {
  const { match } = await searchParams;
  const res = await myFetch(`/application/recent-applications?match=${match}`);

  return (
    <>
      <MyRequest res={res} />
    </>
  );
}
