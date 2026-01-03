"use client";
import { useState } from "react";
import { MapPin, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import dayjs from "dayjs";
import CustomImage from "shared/CustomImage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { myFetch } from "utils/myFetch";
import { toast } from "sonner";
import { isEmployee } from "utils/matchUserRole";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["application/pdf"];

export default function JobApplyModal({ trigger, details }) {
  const [resumeFile, setResumeFile] = useState(null);
  const [coverLetterFile, setCoverLetterFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: details?.title || "",
      year_of_experience: "",
    },
  });

  // Validate and handle PDF upload
  const validateFile = (file) => {
    if (!file) return { valid: false, error: "No file selected" };

    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      return { valid: false, error: "Only PDF files are allowed" };
    }

    if (file.size > MAX_FILE_SIZE) {
      return { valid: false, error: "File size must be less than 5MB" };
    }

    return { valid: true, error: null };
  };

  // Handle resume upload
  const handlePdf = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validation = validateFile(file);

    if (!validation.valid) {
      alert(validation.error);
      e.target.value = "";
      return;
    }

    setResumeFile(file);
    setError(null);
  };

  // Handle cover letter upload
  const handleDoc = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validation = validateFile(file);

    if (!validation.valid) {
      alert(validation.error);
      e.target.value = "";
      return;
    }

    setCoverLetterFile(file);
  };

  // Handle form submission
  const onSubmit = async (data) => {

    const isEmployer = await isEmployee();
    if (!isEmployer) {
      toast.error("Please login as a job seeker to apply this job.");
      return;
    }
    // Validate required files
    if (!resumeFile) {
      setError("Resume is required");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();

      // Append form fields
      for (let [key, value] of Object.entries(data)) {
        formData.append(key, String(value));
      }

      // Append files
      formData.append("resume", resumeFile);

      if (coverLetterFile) {
        formData.append("doc", coverLetterFile);
      }

      formData.append("post", details?._id);

      // Submit form
      const res = await myFetch("/application", {
        method: "POST",
        body: formData,
      } as any);

      console.log("Apply res : ", res);

      if (res.success) {
        reset();
        setResumeFile(null);
        setCoverLetterFile(null);
        toast.success(res.message || "Application submitted successfully!");
        setOpen(false);
      } else {
        toast.error(res.message || "Submission failed. Please try again.");
        console.log("Submission error:", res.message);
      }
    } catch (err) {
      toast.error("Submission error:", err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header Section */}
        <div className="p-8 pb-6">
          <div className="grid sm:grid-cols-[40%_60%] gap-4">
            {/* Company Image */}
            <div className="  rounded-2xl flex-shrink-0 flex items-center justify-center text-white p-4">
              <CustomImage
                src={details?.post?.thumbnail}
                className="w-40 h-32 object-cover"
                title={details?.title}
              />
            </div>

            {/* Job Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {details?.user?.name || "No Name"}
                  </h2>
                  <a
                    href="#"
                    className="text-blue-600 text-lg font-semibold hover:underline"
                  >
                    {details?.title}
                  </a>
                </div>
              </div>

              {/* Job Type Badges */}
              <div className="flex gap-3 mt-4 px-1 mb-1">
                <span className="flex items-center gap-2 text-blue-600 font-medium">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  {details?.job_type}
                </span>
              </div>

              {/* Location and Date */}
              <div className="grid md:grid-cols-2 gap-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">{details?.location}</span>
                </div>
                <div className="flex items-center gap-2 text-orange-500 font-semibold">
                  <Calendar className="w-5 h-5" />
                  <span>{dayjs(details?.deadline).format("YYYY-MM-DD")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-8 pb-8">
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Job Title */}
            <div className="mb-4">
              <Label htmlFor="title" className="block mb-2">
                Job Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                {...register("title", {
                  required: "Job title is required",
                })}
                className={errors.title ? "border-red-500" : ""}
              />
            </div>

            {/* Years of Experience */}
            <div className="mb-4">
              <Label htmlFor="experience" className="block mb-2">
                Years of Experience <span className="text-red-500">*</span>
              </Label>

              <Input
                id="experience"
                type="number"
                step="0.5"
                min="0"
                placeholder="e.g., 2.5"
                {...register("year_of_experience", {
                  required: "Experience is required",
                })}
                className={errors.year_of_experience ? "border-red-500" : ""}
              />

              {errors.year_of_experience && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.year_of_experience.message}
                </p>
              )}
            </div>

            {/* Resume Upload */}
            <div className="mb-4">
              <Label htmlFor="resume-input" className="block mb-2">
                Resume (PDF) <span className="text-red-500">*</span>
              </Label>
              <input
                type="file"
                accept="application/pdf"
                onChange={handlePdf}
                className="w-full border border-gray-300 text-sm px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Upload resume PDF file"
              />
              <p className="text-xs text-gray-500 mt-1">
                Maximum file size: 5MB
              </p>
            </div>

            {/* Cover Letter Upload */}
            <div className="mb-6">
              <Label htmlFor="cover-letter-input" className="block mb-2">
                Cover Letter (PDF){" "}
                <span className="text-gray-400 text-sm">(Optional)</span>
              </Label>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleDoc}
                className="w-full border border-gray-300 text-sm px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Upload cover letter PDF file"
              />
              <p className="text-xs text-gray-500 mt-1">
                Maximum file size: 5MB
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold text-lg py-2 rounded-2xl transition-colors shadow-lg"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  Submitting...
                </span>
              ) : (
                "Submit Application"
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
