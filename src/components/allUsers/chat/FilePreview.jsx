/* eslint-disable @next/next/no-img-element */
import React from "react";

const FilePreview = ({ file }) => {
    if (file.type.startsWith("image/")) {
        return (
            <a href={file.url} target="_blank" rel="noopener noreferrer">
                <img src={file.url} alt={file.name} className="max-w-[150px] rounded-lg mt-2" />
            </a>
        );
    } else {
        return (
            <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline mt-2 block"
            >
                {file.name}
            </a>
        );
    }
};

export default FilePreview;