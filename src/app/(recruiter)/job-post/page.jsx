/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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

export default function EditJobPost() {
  const inputRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [imageFile, setImageFile] = useState(null);
  const [image, setImage] = useState(null);
  const [skills, setSkills] = useState([]);
  const [responsibilities, setResponsibilities] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  const { register, handleSubmit, reset, control } = useForm({
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
    console.log("get category", res.data);

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

  /* ---------------- SUBMIT ---------------- */

  const handleClickImage = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    imageFile && formData.append("image", imageFile);

    responsibilities.forEach((r) => formData.append("responsibilities[]", r));

    skills.forEach((s) => formData.append("required_skills[]", s));

    const url = id ? `/job-post/${id}` : "/job-post";

    const res = await myFetch(url, {
      method: id ? "PATCH" : "POST",
      body: formData,
    });

    console.log("res", res);

    if (res.success) {
      toast.success(id ? "Successfully Updated" : "Successfully Posted");
      revalidate("edit-job");
      if (!id) {
        router.push("/my-job");
      } else {
        router.back(-1);
      }
    } else {
      toast.error(res.error[0].message || "Oops failed");
    }
  };

  /* ---------------- JSX ---------------- */

  return (
    <div className="min-h-screen bg-muted py-8">
      <div className="mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <Button variant="ghost" size="icon">
            <ChevronLeft />
          </Button>
          <h1 className="text-2xl font-semibold">
            {id ? "Edit Job Post" : "New Job Post"}
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* one */}
          <div className="grid grid-cols-[40%_60%] gap-7">
            <div>
              <Label>Cover Image</Label>
              <div onClick={handleClickImage} className="border h-full p-2">
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
                  <div className="flex h-full w-full items-center justify-center cursor-pointer">
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
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input id="title" {...register("title")} />
              </div>

              {/* Salary */}
              <div className="grid grid-cols-2 gap-4 mt-7">
                <div className="space-y-2">
                  <Label>Min Salary</Label>
                  <Input type="number" {...register("min_salary")} />
                </div>
                <div className="space-y-2">
                  <Label>Max Salary</Label>
                  <Input type="number" {...register("max_salary")} />
                </div>
              </div>
            </div>
          </div>

          {/* two */}
          <div className="space-y-6">
            {/* Category + Job Type */}
            <div className="grid grid-cols-2 gap-5">
              {/* Category */}
              <div className="space-y-2">
                <Label>Category</Label>

                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>

                      <SelectContent>
                        {allCategories?.map((c) => (
                          <SelectItem key={c._id} value={c._id}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* Job Type */}
              <div className="space-y-2">
                <Label>Job Type</Label>

                <Controller
                  name="job_type"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
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
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-2">
              <Label>Experience</Label>

              <Controller
                name="experience_level"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
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
            </div>

            {/* Job Level */}
            <div className="space-y-2">
              <Label>Job Level</Label>

              <Controller
                name="job_level"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
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
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label>Location</Label>
            <Input {...register("location")} />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea {...register("description")} rows={5} />
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
            <Input type="date" {...register("deadline")} />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#2B4CB8] via-[#3B5FD9] to-[#4A6EFA]"
          >
            {id ? "Update Job" : "Post Job"}
          </Button>
        </form>
      </div>
    </div>
  );
}
