import dayjs from "dayjs";
import { Download } from "lucide-react";

export default function InterviewRejectUserDetails({ data }) {
  const timelineItems = [
    {
      label: "Applied",
      date: dayjs(data?.createdAt).format("YYYY-MM-DD"),
      status: null,
    },
    { label: "Short Listed", date: "02 Sep 2025", status: null },
    {
      label: "Interview",
      date: dayjs(data?.date).format("YYYY-MM-DD"),
      status: data?.inteviewStatus,
    },
    { label: "Status", date: "Reject, 06 Sep 2025", status: data?.status },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-sm p-6">
        {/* Timeline Section */}
        <h2 className="text-xl font-semibold mb-6">Timeline</h2>

        <div className="space-y-6 mb-6">
          {timelineItems.map((item, index) => (
            <div key={index}>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                {item.label}
              </h3>
              <p
                className={`text-sm ${
                  item.status === "complete"
                    ? "text-blue-600"
                    : item.status === "reject"
                    ? "text-red-600"
                    : "text-gray-500"
                }`}
              >
                {item.date}
              </p>
            </div>
          ))}
        </div>

        {/* Resume Download Section */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">PDF</span>
            </div>
            {data?.resume && (
              <span className="text-sm font-medium text-gray-900">
                Resume.Pdf
              </span>
            )}
          </div>
          <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
            <Download className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Message Button */}
        <button className="w-full py-3 bg-white border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
          Message
        </button>
      </div>
    </div>
  );
}
