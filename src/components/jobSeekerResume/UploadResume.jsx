"use client";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { myFetch } from "utils/myFetch";
import { revalidate } from "utils/revalidateTags";
import { toast } from "sonner";
import { useEffect } from "react";

const UploadResume = ({ resume }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const file = data.resume?.[0];

    if (file && file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed.");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    if (file) formData.append("resume", file);

    let url = "/resume/external-resume";
    let method = "POST";

    if (resume) {
      url = `/resume/external-resume/${resume._id}`;
      method = "PATCH";
    }

    try {
      const res = await myFetch(url, {
        method,
        body: formData,
        tags: ["resume"],
      });

      console.log("Resume Post/Update :", {
        Response: res,
        URL: url,
        Method: method,
      });

      if (res.success) {
        toast.success(res.message || "Resume uploaded successfully.");
        revalidate("resume");
        reset();
        document.getElementById("cancel")?.click();
      } else {
        toast.error(res.message || "Resume upload failed.");
      }
    } catch (err) {
      toast.error(err.message || "Resume upload failed.");
    }
  };

  useEffect(() => {
    if (resume) {
      reset({
        name: resume.resume_name || "",
      });
    }
  }, [resume, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
      {/* Resume Name */}
      <div>
        <Label className="block text-sm font-medium text-gray-600 mb-2">
          Resume Name
        </Label>
        <Input
          type="text"
          className="w-full border border-gray-300 text-sm px-3 py-2 rounded-lg"
          {...register("name", {
            required: "Resume name is required",
          })}
        />
        {errors.name && (
          <p className="text-sm text-red-500 mt-1">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* File Upload */}
      <div>
        <Label className="block text-sm font-medium text-gray-600 mb-2">
          Select Resume
        </Label>
        <Input
          type="file"
          accept="application/pdf"
          className="w-full border border-gray-300 text-sm px-3 py-2 rounded-lg"
          {...register("resume")}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 sm:py-3 px-3 rounded-lg font-medium text-sm transition-all shadow-sm hover:shadow disabled:opacity-60"
      >
        {isSubmitting ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
};

export default UploadResume;
