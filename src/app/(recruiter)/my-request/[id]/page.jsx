import ActionButtons from "@/components/cui/ActionButtons";
import PdfViewer from "@/components/cui/PdfViewer";
import { myFetch } from "../../../../../utils/myFetch";

export default async function Page({ params }) {
  const { id } = await params;
  const res = await myFetch(`/application/${id}`, {
    revalidate: "application-details",
  });

  return (
    <div className="min-h-screen max-w-[900px] mx-auto py-4">
      <PdfViewer fileUrl={res.data?.resume || ""} />
      <ActionButtons applicationDetails={res.data} />
    </div>
  );
}
