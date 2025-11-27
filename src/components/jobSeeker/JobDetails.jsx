import Image from "next/image";

export default function JobDetails() {
  const items = timelineFor(job.status);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full sm:max-w-2xl md:max-w-4xl bg-white rounded-xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border border-gray-300 w-8 h-8 grid place-items-center text-gray-600 hover:bg-gray-100"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {/* Left: job preview */}
          <div>
            <div className="rounded-xl border border-gray-200 bg-white">
              <div className="p-3">
                <Image
                  src="/cardpic.png"
                  alt="We are Hiring"
                  width={10}
                  height={10}
                  className="w-full h-36 sm:h-48 md:h-36 object-cover rounded-md"
                />
              </div>
              <div className="px-4 pb-4">
                <p className="text-base font-semibold">{job.title}</p>
                <a
                  href="#"
                  className="text-sm text-blue-600 font-medium hover:underline"
                >
                  {job.company}
                </a>
                <div className="mt-2 flex items-center gap-2 text-xs text-gray-600">
                  <Image
                    src="/globe.svg"
                    alt="location"
                    width={12}
                    height={12}
                    className="w-4 h-4"
                  />
                  <span>{job.location}</span>
                </div>
                <button
                  className={`mt-3 w-full rounded-md border bg-white text-xs py-1 ${
                    statusStyles[job.status]
                  }`}
                >
                  {job.status === "rejected"
                    ? "Reject"
                    : job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                </button>
              </div>
            </div>

            {job.status === "rejected" && (
              <div className="mt-4">
                <p className="font-semibold text-sm text-red-600">
                  Reject Reason
                </p>
                <div className="mt-2 rounded-md border border-red-200 bg-red-50 p-3 text-xs text-gray-700">
                  Thank you for applying for the UI/UX Designer position...
                </div>
              </div>
            )}
          </div>

          {/* Right: timeline + attachments */}
          <div>
            <div className="rounded-lg border border-gray-200 p-4">
              <p className="font-semibold text-sm text-gray-800">
                Application Timeline
              </p>
              <div className="mt-3 space-y-3 text-sm">
                {items.map((it) => (
                  <div key={it.label}>
                    <p className="font-medium">{it.label}</p>
                    <p className="text-xs text-gray-500">{it.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-gray-200 p-4">
              <p className="font-semibold text-sm text-gray-800">Attachment</p>
              <div className="mt-3 space-y-3">
                <div className="flex items-center gap-3 rounded-md border border-gray-200 p-3">
                  <Image
                    src="/file.svg"
                    alt="file"
                    height={20}
                    width={20}
                    className="w-5 h-5"
                  />
                  <div className="text-sm">
                    <p className="font-medium">Resume wade adoyeo 20_89_4</p>
                    <p className="text-[11px] text-gray-500">
                      PDF Document 306kb
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-md border border-gray-200 p-3">
                  <Image src="/file.svg" alt="file" className="w-5 h-5" />
                  <div className="text-sm">
                    <p className="font-medium">Experience Certificate</p>
                    <p className="text-[11px] text-gray-500">
                      PDF Document 306kb
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4">
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-md">
            View Job Post
          </button>
        </div>
      </div>
    </div>
  );
}
