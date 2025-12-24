/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
// import RichTextEditor from "./rich-text-editor";
import SkillsInput from "./skills-input";
import Image from "next/image";
import BenefitsInput from "./benefits-input";
import ResponsibilitiesInput from "./responsibilities-input";
import { myFetch } from "utils/myFetch";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import { toast } from "sonner";
import { toCapitalizeSentence } from "utils/textFormat";
const { formatUrl } = require("utils/formatUrl");

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

export default function EditJobPost() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [imageFile, setImageFile] = useState(null);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    title: "UX Designer",
    min_salary: 0,
    max_salary: 0,
    category: "",
    employmentType: "Full Time",
    job_type: "Remote",
    experience_level: "0 years",
    job_level: "Mid Level",
    location: "Enter Your Location",
    description: "Add your description...",
    deadline: "2002-06-26",
  });

  // const [editorContent, setEditorContent] = useState("Add your description...");
  const [skills, setSkills] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [responsibilities, setResponsibilities] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchDataJob = async () => {
    const resCat = await myFetch("/job-category");
    setAllCategories(resCat.data);

    const res = await myFetch("/job-post/" + id);
    console.log("Get edit job details : ", res);

    setFormData((prev) => ({
      ...prev,
      title: res.data?.title,
      min_salary: res.data?.min_salary.toString(),
      max_salary: res.data?.max_salary.toString(),
      category:
        resCat?.data?.filter((item) => item._id === res?.data?.categoryId)[0]
          ?._id || "",
      employmentType: res.data?.employmentType,
      job_type: res.data?.job_type,
      experience_level: res.data?.experience_level,
      job_level: res.data?.job_level,
      location: res.data?.location,
      description: res.data?.description,
      deadline: dayjs(res.data?.deadline).format("YYYY-MM-DD"),
    }));

    const oldSkills = res.data?.required_skills || [];
    setSkills((prev) => [...prev, ...oldSkills]);
    const oldBenefits = res.data?.benefits || [];
    setBenefits((prev) => [...prev, ...oldBenefits]);
    const oldResponsibilities = res.data?.responsibilities || [];
    setResponsibilities((prev) => [...prev, ...oldResponsibilities]);
    const formatImage = formatUrl(res.data?.thumbnail);
    setImage(formatImage);
  };

  useEffect(() => {
    (async () => {
      await fetchDataJob();
    })();
  }, []);

  const handleUpdate = async () => {
    const newFormData = new FormData();

    newFormData.append("title", formData?.title);
    newFormData.append("description", formData?.description);
    newFormData.append("category", formData?.category);
    newFormData.append("job_type", formData?.job_type);
    newFormData.append("job_level", formData?.job_level);
    newFormData.append("experience_level", formData?.experience_level);
    newFormData.append("min_salary", formData?.min_salary.toString());
    newFormData.append("max_salary", formData?.min_salary.toString());
    newFormData.append("location", formData?.location);
    newFormData.append("deadline", formData?.deadline);
    imageFile && newFormData.append("image", imageFile);
    benefits?.forEach((benefit) => newFormData.append("benefits[]", benefit));
    responsibilities?.forEach((responsibility) =>
      newFormData.append("responsibilities[]", responsibility)
    );
    skills?.forEach((skill) => newFormData.append("required_skills[]", skill));

    let url = "/job-post";
    if (id) url = `/job-post/${id}`;

    const res = await myFetch(url, {
      method: id ? "PATCH" : "POST",
      body: newFormData,
    });

    console.log("Job Post Update res : ", res);

    if (res.success) {
      toast.success(id ? "Successfully Updated" : "Successfully Posted");
    } else {
      toast.error(res.message || "Oops  failed");
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageFile(file);
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8 flex items-center gap-3 sm:gap-4">
          <button className="rounded-lg p-2 hover:bg-gray-200 transition-colors">
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
          </button>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
            {id ? "Edit Job Post" : "New Job Post"}
          </h1>
        </div>

        {/* Main Form */}
        <div className="space-y-6 sm:space-y-8">
          {/* Company Logo Section */}

          <div className="flex justify-between gap-4">
            <div className="flex items-center justify-center w-1/2">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 "
              >
                {!image ? (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Upload Cover Image
                    </p>
                  </div>
                ) : (
                  <div className="w-full h-full">
                    <Image
                      src={image}
                      alt="Post image"
                      width={200}
                      height={150}
                      className="object-contain h-full w-full "
                    />
                  </div>
                )}

                <input
                  onChange={handleImage}
                  accept="image/*"
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                />
              </label>
            </div>

            <div className="space-y-4 sm:space-y-6 w-1/2">
              <div>
                {/* Job Title */}
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                />
              </div>

              {/* Salary Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Min Salary
                  </label>
                  <input
                    type="number"
                    name="min_salary"
                    value={formData.min_salary}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Max Salary
                  </label>
                  <input
                    type="number"
                    name="max_salary"
                    value={formData.max_salary}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Job Details Grid */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Job Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base bg-white"
              >
                {allCategories?.map((category) => (
                  <option key={category._id} value={category?._id}>
                    {category?.name}
                  </option>
                ))}
                {/* <option>UX Designer</option>
                <option>UI Designer</option>
                <option>Product Designer</option> */}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Employment Type
              </label>
              <select
                name="employmentType"
                value={formData.employmentType}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base bg-white"
              >
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Job Type
              </label>
              <select
                name="job_type"
                value={formData.job_type}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base bg-white"
              >
                {Object.entries(JOB_TYPE)?.map(([key, value]) => (
                  <option key={key} value={value}>
                    {toCapitalizeSentence(value)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Experience and Level */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Experience
              </label>
              <select
                name="experience_level"
                value={formData.experience_level}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base bg-white"
              >
                <option value="0-1yrs">0 years</option>
                {Object.entries(EXPERIENCE_LEVEL)?.map(([key, value]) => (
                  <option key={key} value={value} className="">
                    {toCapitalizeSentence(key)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Job Level
              </label>
              <select
                name="job_level"
                value={formData.job_level}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base bg-white"
              >
                {Object.entries(JOB_LEVEL)?.map(([key, value]) => (
                  <option key={key} value={value}>
                    {toCapitalizeSentence(value)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Job Description */}

          <label className="block text-sm font-medium text-gray-900 mb-3 sm:mb-4">
            Job Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full h-[200px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base p-3"
          />
          {/* <RichTextEditor value={editorContent} onChange={setEditorContent} />  */}

          {/* Responsibilities Section */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-3">
              Responsibilities
            </label>
            <ResponsibilitiesInput
              setResponsibilities={setResponsibilities}
              responsibilities={responsibilities}
            />
          </div>

          {/* Benefits Section */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-3">
              Benefits
            </label>
            <BenefitsInput setBenefits={setBenefits} benefits={benefits} />
          </div>

          {/* Skills Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Skills
              </label>
              <SkillsInput skills={skills} setSkills={setSkills} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Deadline
              </label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Update Button */}
          <div className="flex justify-center pb-4 sm:pb-6">
            <button
              onClick={handleUpdate}
              className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              {id ? "Update" : "Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
