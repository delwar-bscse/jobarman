"use client";

import { FileText, Edit2, Trash2, Plus } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Swal from "sweetalert2";
import { myFetch } from "../../../utils/myFetch";
import { revalidate } from "../../../utils/revalidateTags";

export default function ResumeList({ data }) {
  const params = useParams();
  const activeResumeId = params?.id;

  const handleDeleteResume = (e, id) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation(); // Stop event bubbling

    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this resume!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await myFetch(`/resume/${id}`, {
          method: "DELETE",
        });

        if (res.success) {
          revalidate("resume");
          Swal.fire({
            title: "Deleted!",
            text: "Your resume has been deleted.",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Unable to delete the resume.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
      {/* Title */}
      <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
        My Resumes
      </h1>

      {/* Scrollable list */}
      <div className="flex-1 space-y-2 sm:space-y-3 overflow-y-auto pr-1">
        {data?.length > 0 ? (
          data.map((resume) => {
            const isActive = activeResumeId === resume._id;

            return (
              <Link key={resume._id} href={`/my-resume/${resume._id}`}>
                <div
                  className={`p-2.5 sm:p-3 rounded-lg my-3 border cursor-pointer transition-all flex items-center gap-2.5 sm:gap-3 bg-white  ${
                    isActive ? "border-green-500 shadow-md" : "border-gray-200"
                  }`}
                >
                  {/* Icon */}
                  <div className="bg-orange-500 p-1.5 sm:p-2 rounded-lg flex-shrink-0">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                      {resume.resume_name}
                    </h3>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-1 sm:gap-1.5">
                    <Link
                      href={`/add-new-resume?id=${resume._id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
                    </Link>
                    <button
                      onClick={(e) => handleDeleteResume(e, resume._id)}
                      className="p-1.5 hover:bg-red-100 rounded transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p className="text-sm">No resumes found. Create your first one!</p>
          </div>
        )}
      </div>

      {/* Add button */}
      <Link
        href={{ pathname: "/add-new-resume", query: { name: "add-form" } }}
        className="block mt-3 sm:mt-4"
      >
        <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 sm:py-3 px-3 rounded-lg font-medium text-sm transition-all shadow-sm hover:shadow">
          <Plus className="w-5 h-5" />
          Add New Resume
        </button>
      </Link>
    </div>
  );
}
