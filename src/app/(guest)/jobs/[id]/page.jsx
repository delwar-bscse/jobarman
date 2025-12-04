"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, use, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { myFetch } from "../../../../../utils/myFetch";
import JobsDetailsLeft from "@/components/guest/jobs/JobsDetailsSidebar";
import JobDetailsRight from "@/components/guest/jobs/JobDetailsRight";

const HeroBanner = () => {
  return (
    <div className="relative">
      <Image
        src="/alljobs.png"
        alt="Job banner"
        width={1440}
        height={400}
        priority
        className="w-full h-56 sm:h-72 md:h-80 lg:h-96 object-cover"
      />
      <div className="absolute top-4 left-4">
        <Link
          href="/jobs"
          className="inline-flex items-center rounded-full bg-white/90 text-gray-900 px-3 py-1.5 shadow hover:bg-white"
        >
          <ChevronLeft size={20} className="mr-1" />
          Back
        </Link>
      </div>
    </div>
  );
};

const JobDetailsPage = ({ params }) => {
  const resolvedParams = use(params);
  const jobId = resolvedParams.id;

  //  details
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        setLoading(true);
        const res = await myFetch(`/job-post/${jobId}`);
        setDetails(res.data);
      } catch (err) {
        setError(err.message || "Failed to load job details");
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchPostDetails();
    }
  }, [jobId]);

  // favoriat list

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section to match provided screenshots */}
      <HeroBanner />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: job details */}
          {loading ? (
            <span>Loading...</span>
          ) : (
            <JobDetailsRight details={details} />
          )}

          {/* left side */}
          <JobsDetailsLeft details={details} />
        </div>
      </div>
      {/* {isApplyOpen && (
        <ApplyModal job={job} onClose={() => setIsApplyOpen(false)} />
      )} */}
    </div>
  );
};

export default JobDetailsPage;

// const ApplyModal = ({ job, onClose }) => {
//   const [resume, setResume] = useState(null);
//   const [coverLetter, setCoverLetter] = useState(null);

//   const onSubmit = (e) => {
//     e.preventDefault();

//     onClose();
//   };

//   const stop = (e) => e.stopPropagation();

//   return (
//     <div
//       className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
//       onClick={onClose}
//     >
//       <div className="mx-auto max-w-2xl w-full p-4" onClick={stop}>
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           <div className="flex items-center justify-between p-4 border-b">
//             <div className="flex items-center gap-3">
//               <Image
//                 src={job.image}
//                 alt={`${job.company}`}
//                 width={56}
//                 height={56}
//                 className="rounded-md"
//               />
//               <div>
//                 <p className="text-base font-semibold">{job.title}</p>
//                 <p className="text-sm text-gray-600">{job.location}</p>
//               </div>
//             </div>
//             <button
//               aria-label="Close"
//               onClick={onClose}
//               className="rounded-full p-2 hover:bg-gray-100"
//             >
//               <X size={20} />
//             </button>
//           </div>

//           <form onSubmit={onSubmit} className="p-4 space-y-5">
//             <div>
//               <label className="block text-gray-800 font-medium mb-2">
//                 Resume
//               </label>
//               <div className="rounded-lg border border-gray-300 bg-gray-50 p-3 flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <Image src="/file.svg" alt="file" width={32} height={32} />
//                   <span className="text-gray-700">
//                     {resume ? resume.name : "Upload your resume"}
//                   </span>
//                 </div>
//                 <label className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-700 cursor-pointer hover:bg-gray-100">
//                   <UploadCloud size={18} />
//                   <span className="text-sm font-medium">Choose File</span>
//                   <input
//                     type="file"
//                     accept=".pdf,.doc,.docx"
//                     className="hidden"
//                     onChange={(e) => setResume(e.target.files?.[0] ?? null)}
//                   />
//                 </label>
//               </div>
//             </div>

//             <div>
//               <label className="block text-gray-800 font-medium mb-2">
//                 Cover Letter
//               </label>
//               <div className="rounded-lg border border-gray-300 bg-gray-50 p-6 text-center">
//                 <label className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-700 cursor-pointer hover:bg-gray-100">
//                   <UploadCloud size={18} />
//                   <span className="text-sm font-medium">
//                     Upload Cover Letter
//                   </span>
//                   <input
//                     type="file"
//                     accept=".pdf,.doc,.docx"
//                     className="hidden"
//                     onChange={(e) =>
//                       setCoverLetter(e.target.files?.[0] ?? null)
//                     }
//                   />
//                 </label>
//                 {coverLetter && (
//                   <p className="mt-2 text-sm text-gray-600">
//                     {coverLetter.name}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
//             >
//               Submit
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };
