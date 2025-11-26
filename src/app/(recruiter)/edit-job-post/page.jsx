"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import RichTextEditor from "./rich-text-editor";
import SkillsInput from "./skills-input";

export default function EditJobPost() {
  const [formData, setFormData] = useState({
    jobTitle: "UX Designer",
    minSalary: "1,000",
    maxSalary: "6,000",
    jobCategory: "UX Designer",
    employmentType: "Full Time",
    jobType: "Remote",
    experience: "5 years",
    jobLevel: "Mid Level",
    location: "Enter Your Location",
    jobDescription: "Add your description...",
    skills: ["Job keyword", "tags etc."],
    deadline: "01 Sep 2025",
  });

  const [editorContent, setEditorContent] = useState("Add your description...");
  const [skills, setSkills] = useState(["Job keyword", "tags etc."]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {};

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8 flex items-center gap-3 sm:gap-4">
          <button className="rounded-lg p-2 hover:bg-gray-200 transition-colors">
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
          </button>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Edit Job Post
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
                <input id="dropzone-file" type="file" className="hidden" />
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
                  name="jobTitle"
                  value={formData.jobTitle}
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
                    type="text"
                    name="minSalary"
                    value={formData.minSalary}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Max Salary
                  </label>
                  <input
                    type="text"
                    name="maxSalary"
                    value={formData.maxSalary}
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
                name="jobCategory"
                value={formData.jobCategory}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base bg-white"
              >
                <option>UX Designer</option>
                <option>UI Designer</option>
                <option>Product Designer</option>
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
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Contract</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Job Type
              </label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base bg-white"
              >
                <option>Remote</option>
                <option>On-site</option>
                <option>Hybrid</option>
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
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base bg-white"
              >
                <option>5 years</option>
                <option>1-2 years</option>
                <option>3-5 years</option>
                <option>5+ years</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Job Level
              </label>
              <select
                name="jobLevel"
                value={formData.jobLevel}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base bg-white"
              >
                <option>Mid Level</option>
                <option>Junior</option>
                <option>Senior</option>
                <option>Lead</option>
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
          <RichTextEditor value={editorContent} onChange={setEditorContent} />

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
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
