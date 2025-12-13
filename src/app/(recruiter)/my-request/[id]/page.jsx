import ActionButtons from "@/components/cui/ActionButtons";
import PdfViewer from "@/components/cui/PdfViewer";


export default function Page() {
    // const pdfUrl = "https://shariful5001.binarybards.online/resume/supports-1765254106586.pdf";
    const pdfUrl = "/resume.pdf";

    return (
        <div className="max-w-[900px] mx-auto py-4">
            <PdfViewer fileUrl={pdfUrl} />
            <ActionButtons />
        </div>
    );
}
