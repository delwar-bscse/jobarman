import MyRequest from "@/components/recruiter/myRequest/MyRequest";
import { myFetch } from "utils/myFetch";

export default async function page() {
  const res = await myFetch("/application/recent-applications");
  return (
    <>
      <MyRequest res={res} />
    </>
  );
}
