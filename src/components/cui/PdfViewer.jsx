"use client";

import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfViewer({ fileUrl }) {
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
      <Document
        file={fileUrl}
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
  );
}
