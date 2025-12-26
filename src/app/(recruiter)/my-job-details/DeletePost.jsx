"use client";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { myFetch } from "utils/myFetch";
import { revalidate } from "utils/revalidateTags";

export default function DeletePost({ id }) {
  const router = useRouter();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await myFetch(`/job-post/${id}`, {
        method: "DELETE",
      });

      Swal.fire({
        title: "Deleted successfully",
        text: "The job post has been removed.",
        icon: "success",
      });
      revalidate("job-post");
      router.push("/my-job");
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to delete. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="w-10 h-10 flex items-center justify-center border border-red-600 rounded-lg hover:bg-gray-50 transition-colors"
    >
      <Trash2 className="w-4 h-4 text-red-600" />
    </button>
  );
}
