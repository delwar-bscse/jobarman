"use client";
import { useState } from "react";
import { ChevronLeft, Upload } from "lucide-react";
import Image from "next/image";
import { SubmitHandler, useForm, Controller } from "react-hook-form";

import { Input } from "../ui/input";
import { Label } from "../ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { myFetch } from "utils/myFetch";
import { useRouter } from "next/navigation";

type Inputs = {
  organization_name: string;
  service_type: string;
  location: string;
  mode: string;
  pricing: string;
  focus_area: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  contact_info: string;
};

type OptionsWithBody = {
  method?: string;
  headers?: {};
  cache?: string;
  body?: any; // Or a more specific type for 'body'
};
export default function AdsCreateForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      organization_name: "",
      service_type: "",
      location: "",
      mode: "",
      pricing: "",
      focus_area: "",
      start_date: "",
      end_date: "",
      start_time: "",
      end_time: "",
      contact_info: "",
    },
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [vaildImage, setValidImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageTypes = ["image/jpg", "image/jpeg", "image/png"];

    const file = e.target.files?.[0];
    if (!file) return;

    if (!imageTypes.includes(file.type)) {
      toast.error("Only JPG, JPEG, PNG images are allowed");
      setValidImage("Only JPG, JPEG, PNG images are allowed");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewImage(url);
    setFile(file);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    const formData = new FormData();

    const contact = {
      type: "email",
      details: data.contact_info,
    };

    const entries = Object.entries(data);

    for (const [key, value] of entries) {
      if (key != "contact_info") formData.append(key, value);
    }

    data.contact_info &&
      formData.append("contact_info", JSON.stringify(contact));

    if (file) {
      formData.append("image", file);
    }
    try {
      const res = await myFetch("/spotlight", {
        method: "POST",
        body: formData,
      } as OptionsWithBody);

      if (res.success) {
        toast.success(res.message || "Not create post");
        reset();
        router.push(res?.data);
      } else {
        toast.error(res.error[0].message || "try again failed post create");
      }
    } catch (err) {
      toast.error(err.message || "Ads post create");
    } finally {
      setLoading(false);
    }
  };

  const errorText = "text-red-500 text-xs mt-1";

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
        {/* Header */}
        <button onClick={() => router.back()} className="flex items-center text-blue-600 mb-6 hover:text-blue-700">
          <ChevronLeft className="w-5 h-5" />
          <span className="ml-1 font-medium">Create Ad</span>
        </button>

        {/* Cover Image Upload */}
        <div className="mb-8">
          <Label className="relative block w-full h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 transition-colors cursor-pointer">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <div className="flex flex-col items-center justify-center h-full">
              {previewImage ? (
                <Image
                  src={previewImage}
                  alt="Cover"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <>
                  <Upload className="w-10 h-10 text-blue-600 mb-2" />
                  <span className="text-sm text-blue-600 font-medium">
                    Upload Cover Image
                  </span>
                </>
              )}
            </div>
          </Label>
          {/* image error */}
          {<p className="text-red-500 mt-2">{vaildImage}</p>}
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Organization Name + Location */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <Label>Organization Name</Label>
              <Input
                {...register("organization_name", {
                  required: "Organization name is required",
                })}
                placeholder="Enter your name"
              />
              {errors.organization_name && (
                <p className={errorText}>{errors.organization_name.message}</p>
              )}
            </div>

            <div>
              <Label>Location</Label>
              <Input
                {...register("location", {
                  required: "Location is required",
                })}
                placeholder="Enter location"
              />
              {errors.location && (
                <p className={errorText}>{errors.location.message}</p>
              )}
            </div>
          </div>

          {/* Mode + Service Type + Pricing */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div>
              <Label>Mode</Label>
              <Controller
                control={control}
                name="mode"
                rules={{ required: "Mode is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Remote">Remote</SelectItem>
                        <SelectItem value="Onsite">Onsite</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.mode && (
                <p className={errorText}>{errors.mode.message}</p>
              )}
            </div>

            <div>
              <Label>Service Type</Label>
              <Controller
                control={control}
                name="service_type"
                rules={{ required: "Service type is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Training Program">
                          Training Program
                        </SelectItem>
                        <SelectItem value="Hiring">Hiring</SelectItem>
                        <SelectItem value="Staffing">Staffing</SelectItem>
                        <SelectItem value="Career Coaching">
                          Career Coaching
                        </SelectItem>
                        <SelectItem value="Resume Service">
                          Resume Service
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.service_type && (
                <p className={errorText}>{errors.service_type.message}</p>
              )}
            </div>

            <div>
              <Label>Pricing / Fee Options</Label>
              <Controller
                control={control}
                name="pricing"
                rules={{ required: "Pricing is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select pricing" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="tuition">Tuition</SelectItem>
                        <SelectItem value="placement fee">
                          Placement Fee
                        </SelectItem>
                        <SelectItem value="free trial">Free Trial</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.pricing && (
                <p className={errorText}>{errors.pricing.message}</p>
              )}
            </div>
          </div>

          {/* Focus Area + Dates */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div>
              <Label>Focus Area / Industry</Label>
              <Controller
                control={control}
                name="focus_area"
                rules={{ required: "Focus area is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="healthcare">Health Care</SelectItem>
                        <SelectItem value="cybersecurity">
                          Cybersecurity
                        </SelectItem>
                        <SelectItem value="dataengineering">
                          Data Engineering
                        </SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="cloud">Cloud</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.focus_area && (
                <p className={errorText}>{errors.focus_area.message}</p>
              )}
            </div>

            <div>
              <Label>Start Date</Label>
              <Input
                type="date"
                {...register("start_date", {
                  required: "Start date is required",
                })}
                className="flex justify-center"
              />
              {errors.start_date && (
                <p className={errorText}>{errors.start_date.message}</p>
              )}
            </div>

            <div>
              <Label>End Date</Label>
              <Input
                type="date"
                {...register("end_date", { required: "End date is required" })}
                className="flex justify-center"
              />
              {errors.end_date && (
                <p className={errorText}>{errors.end_date.message}</p>
              )}
            </div>
          </div>

          {/* Time + Contact */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div>
              <Label>Start Time</Label>
              <Input
                type="time"
                {...register("start_time", {
                  required: "Start time is required",
                })}
                className="flex justify-center"
              />
              {errors.start_time && (
                <p className={errorText}>{errors.start_time.message}</p>
              )}
            </div>

            <div>
              <Label>End Time</Label>
              <Input
                type="time"
                {...register("end_time", { required: "End time is required" })}
                className="flex justify-center"
              />
              {errors.end_time && (
                <p className={errorText}>{errors.end_time.message}</p>
              )}
            </div>

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                {...register("contact_info", {
                  required: "Email is required",
                })}
                placeholder="Enter your email"
              />
              {errors.contact_info && (
                <p className={errorText}>{errors.contact_info.message}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`bg-blue-600 text-white px-16 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors ${
                loading && "cursor-not-allowed"
              }`}
            >
              {loading ? "Loading..." : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
