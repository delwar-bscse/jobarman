/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import { toast } from "sonner";
import SkillsInput from "./skills-input";
import { myFetch } from "utils/myFetch";
const { formatUrl } = require("utils/formatUrl");
/* shadcn */
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { revalidate } from "utils/revalidateTags";
import GlobalBackButton from "../../../../shared/GlobalBackButton";

/* ---------------- CONSTANTS ---------------- */

const JOB_TYPE = {
  FULL_TIME: "FULL_TIME",
  PART_TIME: "PART_TIME",
  FREELANCE: "FREELANCE",
  INTERNSHIP: "INTERNSHIP",
  REMOTE: "REMOTE",
};

const JOB_LEVEL = {
  ENTRY_LEVEL: "ENTRY_LEVEL",
  MID_LEVEL: "MID_LEVEL",
  SENIOR_LEVEL: "SENIOR_LEVEL",
};

const EXPERIENCE_LEVEL = {
  ZERO_ONE: "0-1yrs",
  ONE_THREE: "1-3yrs",
  THREE_FIVE: "3-5yrs",
  FIVE_TEN: "5-10yrs",
  TEN_PLUS: "10+yrs",
};

/* ---------------- COMPONENT ---------------- */

function EditJobPostForm() {
  const inputRef = useRef(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const isEdit = !!id;

  const [imageFile, setImageFile] = useState(null);
  const [image, setImage] = useState(null);
  const [skills, setSkills] = useState([]);
  const [responsibilities, setResponsibilities] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      min_salary: "",
      max_salary: "",
      category: "",
      job_type: "",
      experience_level: "",
      job_level: "",
      location: "",
      description: "",
      deadline: "",
    },
  });

  /* ---------------- FETCH JOB ---------------- */

  const fetchDataJob = async () => {
    const resCat = await myFetch("/job-category");
    setAllCategories(resCat.data);

    if (!id) return;

    const res = await myFetch(`/job-post/${id}`);

    reset({
      title: res.data?.title,
      description: res.data?.description,
      category: res.data?.categoryId,
      job_type: res.data?.job_type,
      job_level: res.data?.job_level,
      experience_level: res.data?.experience_level,
      min_salary: res.data?.min_salary,
      max_salary: res.data?.max_salary,
      location: res.data?.location,
      deadline: dayjs(res.data?.deadline).format("YYYY-MM-DD"),
    });

    setSkills(res.data?.required_skills || []);
    setResponsibilities(res.data?.responsibilities || []);
    setImage(formatUrl(res.data?.thumbnail));
  };

  useEffect(() => {
    fetchDataJob();
  }, []);

  /* ---------------- IMAGE ---------------- */

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setImage(URL.createObjectURL(file));
  };

  const handleClickImage = () => {
    if (inputRef.current) inputRef.current.click();
  };

  /* ---------------- SUBMIT ---------------- */

  const onSubmit = async (data) => {
    //console.log("data", data);
    if (data.min_salary && data.max_salary && Number(data.min_salary) > Number(data.max_salary)) {
      toast.error("Min salary cannot be greater than max salary");
      return;
    }

    const formData = new FormData();

    // Append all form fields (including empty ones for edit)
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value ?? "");
    });

    // Append image only if a new one was selected
    if (imageFile) {
      formData.append("image", imageFile);
    }

    // Always send arrays (even if empty) so backend knows to clear them
    if (responsibilities.length > 0) {
      responsibilities.forEach((r) => formData.append("responsibilities[]", r));
    } else if (isEdit) {
      formData.append("responsibilities[]", ""); // or handle empty array differently
    }

    if (skills.length > 0) {
      skills.forEach((s) => formData.append("required_skills[]", s));
    }

    const url = id ? `/job-post/${id}` : "/job-post";
    const method = id ? "PATCH" : "POST";

    const res = await myFetch(url, {
      method,
      body: formData,
    });
    console.log("Post res", res);

    if (res.success) {
      toast.success(isEdit ? "Successfully Updated" : "Successfully Posted");
      await revalidate("edit-job");
      // router.back();
    } else {
      toast.error(res.error?.[0]?.message || "Operation failed");
    }
  };

  /* ---------------- JSX ---------------- */

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-4xl px-4">
        {/* Header */}
        <div onClick={() => router.back()} className="mb-6 flex items-center gap-3 cursor-pointer">
          <GlobalBackButton />
          <h1 className="text-2xl font-semibold">
            {isEdit ? "Edit Job Post" : "New Job Post"}
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Cover Image & Title */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-7">
            <div>
              <Label>Cover Image</Label>
              <div
                onClick={handleClickImage}
                className="border bg-white h-full p-2 cursor-pointer"
              >
                {image ? (
                  <Image
                    src={image}
                    alt="Job"
                    width={10}
                    height={10}
                    className="object-contain h-40 w-52"
                    sizes="100vh"
                  />
                ) : (
                  <div className="flex h-28 w-full items-center justify-center">
                    <p className="text-sm text-muted-foreground">
                      Upload Cover Image
                    </p>
                  </div>
                )}
              </div>
              <input
                ref={inputRef}
                hidden
                type="file"
                accept="image/*"
                onChange={handleImage}
              />
            </div>

            <div>
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input
                  {...register("title", {
                    required: !isEdit ? "Title is required" : false,
                  })}
                  className="bg-white"
                />

                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mt-7">
                <div className="space-y-2">
                  <Label>Min Salary</Label>
                  <Input
                    type="number"
                    min={0}
                    placeholder="e.g. 20000"
                    {...register("min_salary", {
                      required: !isEdit ? "Min salary is required" : false,
                    })}
                    className="bg-white"
                  />
                  {errors.min_salary && (
                    <p className="text-red-500 text-sm">
                      {errors.min_salary.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Max Salary</Label>
                  <Input
                    type="number"
                    min={0}
                    placeholder="e.g. 50000"
                    {...register("max_salary", {
                      required: !isEdit ? "Max salary is required" : false,
                    })}
                    className="bg-white"
                  />
                  {errors.max_salary && (
                    <p className="text-red-500 text-sm">
                      {errors.max_salary.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Category, Job Type, Experience, Job Level */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label>Category</Label>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: !isEdit ? "Category is required" : false }}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {allCategories?.map((c) => (
                          <SelectItem key={c?._id} value={c?._id}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.category && (
                  <p className="text-red-500 text-sm">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Job Type</Label>
                <Controller
                  name="job_type"
                  control={control}
                  rules={{ required: !isEdit ? "Job type is required" : false }}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(JOB_TYPE).map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.job_type && (
                  <p className="text-red-500 text-sm">
                    {errors.job_type.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Experience</Label>
              <Controller
                name="experience_level"
                control={control}
                rules={{
                  required: !isEdit ? "Experience is required" : false,
                }}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(EXPERIENCE_LEVEL).map((e) => (
                        <SelectItem key={e} value={e}>
                          {e}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.experience_level && (
                <p className="text-red-500 text-sm">
                  {errors.experience_level.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Job Level</Label>
              <Controller
                name="job_level"
                control={control}
                rules={{ required: !isEdit ? "Job level is required" : false }}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(JOB_LEVEL).map((l) => (
                        <SelectItem key={l} value={l}>
                          {l}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.job_level && (
                <p className="text-red-500 text-sm">
                  {errors.job_level.message}
                </p>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label>Location</Label>
            <Input
              placeholder="Enter location"
              {...register("location", {
                required: !isEdit ? "Location is required" : false,
              })}
              className="bg-white"
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Write a short job description..."
              {...register("description", {
                required: !isEdit ? "Description is required" : false,
              })}
              rows={5}
              className="bg-white"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Responsibilities */}
          <div className="space-y-2">
            <Label>Responsibilities</Label>
            <SkillsInput
              skills={responsibilities}
              setSkills={setResponsibilities}
            />
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <Label>Skills</Label>
            <SkillsInput skills={skills} setSkills={setSkills} />
          </div>

          {/* Deadline */}
          <div className="space-y-2">
            <Label>Deadline</Label>
            <Input
              type="date"
              {...register("deadline", {
                required: !isEdit ? "Deadline is required" : false,
              })}
              className="bg-white w-full"
            />
            {errors.deadline && (
              <p className="text-red-500 text-sm">{errors.deadline.message}</p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#2B4CB8] via-[#3B5FD9] to-[#4A6EFA]"
          >
            {isEdit ? "Update Job" : "Post Job"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function EditJobPost() {
  return (
    <Suspense
      fallback={<p className="flex items-center justify-center">Loading....</p>}
    >
      <EditJobPostForm />
    </Suspense>
  );
}
