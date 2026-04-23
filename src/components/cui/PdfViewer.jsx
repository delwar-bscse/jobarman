"use client";

import { Download } from "lucide-react";
import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { formatUrl } from "utils/formatUrl";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfViewer({ fileUrl, isDownloadable = true }) {
  const [numPages, setNumPages] = useState(null);
  const [width, setWidth] = useState(800);

  useEffect(() => {
    const updateWidth = () => {
      setWidth(Math.min(800, window.innerWidth - 4));
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div className="">
      {isDownloadable && <div className="flex justify-end">
        <a
          href={`${formatUrl(fileUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="bg-[#FF5900] hover:bg-[#FF5900]/90 text-white font-semibold py-2 px-4 rounded flex items-center gap-2"
        >
          <Download />
          <span>Download</span>
        </a>
      </div>}
      <div>
        <Document
          // file={`${process.env.NEXT_PUBLIC_IMAGE_URL}${fileUrl}`}
          file={
            fileUrl.startsWith("blob:")
              ? fileUrl
              : fileUrl.startsWith("http")
              ? fileUrl
              : `${process.env.NEXT_PUBLIC_IMAGE_URL}${fileUrl}`
          }
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading={<div className="p-8 text-center">Loading...</div>}
        >
          {numPages &&
            Array.from(new Array(numPages), (_, index) => (
              <div key={`page_${index + 1}`} className="flex justify-center">
                <Page
                  pageNumber={index + 1}
                  width={width}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </div>
            ))}
        </Document>
      </div>
    </div>
  );
}
