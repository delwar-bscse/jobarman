"use client";
import React, { useEffect, useState } from "react";
import WorkExperience from "./WorkExperience";
import { X } from "lucide-react";
import Education from "./Education";
import PersonalInfo from "./PersonalInfo";
import { FcCamera } from "react-icons/fc";
import Image from "next/image";
import { myFetch } from "../../../utils/myFetch";
import { formatUrl } from "../../../utils/formatUrl";
import { toast } from "sonner";

const MainContent = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    designation: "",
    phone: "",
    date_of_birth: "",
    // age: 20,
    gender: "",
    address: "",
    linkedin: "",
    bio: "",
  });
  const [educationList, setEducationList] = useState([]);
  const [workExperienceList, setWorkExperienceList] = useState([]);
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState([]);

  const fetchProfile = async () => {
    const res = await myFetch("/user/profile");

    if (res.data) {
      setProfileImage(formatUrl(res.data.image));
      setPersonalInfo({
        name: res.data.name || "",
        designation: res.data.designation || "",
        phone: res.data.phone || "",
        date_of_birth: res.data.date_of_birth || "",
        age: res.data.age || 0,
        gender: res.data.gender || "",
        address: res.data.address || "",
        linkedin: res.data.linkedin || "",
        bio: res.data.bio || "",
      });
      const eduList =
        res.data.educations?.map((edu) => ({
          degree: edu.degree || "",
          institute: edu.institute || "",
          session: edu.session || "",
          passingYear: edu.passingYear || 0,
          grade: edu.grade || "",
          _id: edu._id || "",
        })) || [];

      setEducationList(eduList);
      const workList = res.data.workExperiences?.map((work) => ({
          title: work.title || "",
          company: work.company || "",
          startDate: work.startDate || "",
          endDate: work.endDate || "",
          description: work.description || "",
          location: work.location || "",
          isCurrentJob: work.isCurrentJob || false,
          _id: work._id || "",
        })) || [];

      setWorkExperienceList(...workList);
      setSkills((prev) => [...prev, ...res.data.skills]);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  // Add and Remove Skills
  const addSkill = () => {
    typeof skill === "string" &&
      skill.trim() !== "" &&
      !skills.includes(skill) &&
      setSkills([...skills, skill.trim()]);
    setSkill("");
  };
  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  // add Work Experience
  const addWorkExperience = () => {
    setWorkExperienceList([
      ...workExperienceList,
      {
        _id: Date.now().toString(),
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
        location: "",
        isCurrentJob: false,
      },
    ]);
  };

  // add Education
  const addEducation = () => {
    setEducationList([
      ...educationList,
      {
        _id: Date.now().toString(),
        degree: "",
        institute: "",
        session: "",
        passingYear: 0,
        grade: "",
      },
    ]);
  };

  const handleSubmit = async () => {
    const sendEducationList = educationList.map((edu) => ({
      degree: edu.degree,
      institute: edu.institute,
      session: edu.session,
      passingYear: edu.passingYear,
      grade: edu.grade,
      isCurrentJob: edu.isCurrentJob,
    }));
    const sendWorkExperienceList = workExperienceList.map((work) => ({
      title: work.title,
      company: work.company,
      startDate: work.startDate,
      endDate: work.endDate,
      description: work.description,
      location: work.location,
      isCurrentJob: work.isCurrentJob,
    }));

    const formData = new FormData();
    formData.append("name", personalInfo.name);
    formData.append("designation", personalInfo.designation);
    formData.append("phone", personalInfo.phone);
    formData.append("date_of_birth", personalInfo.date_of_birth);
    formData.append("gender", personalInfo.gender);
    formData.append("address", personalInfo.address);
    formData.append("linkedin", personalInfo.linkedin);
    formData.append("bio", personalInfo.bio);
    formData.append("educations", JSON.stringify(sendEducationList));
    formData.append("workExperiences", JSON.stringify(sendWorkExperienceList));
    skills.length > 0 &&
      skills.forEach((skill) => {
        formData.append(`skills`, skill);
      });

    if (profileImageFile) {
      formData.append("image", profileImageFile);
    }

    const res = await myFetch("/user/profile", {
      method: "PATCH",
      body: formData,
    });

    if (res.success) {
      toast.success(res.message || "Profile updated successfully!");
      fetchProfile();
    } else {
      toast.error(res.message || "Failed to update profile. Please try again.");
    }
  };

  const handleProfileImage = (e) => {
    const file = e.target.files[0];
    setProfileImageFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex-1 md:ml-8">
      <div className=" bg-white md:p-8">
        {/* Profile Picture - Centered */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
              <Image
                src={profileImage || "/defaultProfile.png"}
                width={96}
                height={96}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
            <button
              onClick={() =>
                document.getElementById("takeEmployProfileImage").click()
              }
              className="absolute bottom-0 right-0 size-7 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center shadow-sm"
            >
              <FcCamera className="w-4 h-4 opacity-80" />
            </button>
            <input
              id="takeEmployProfileImage"
              onChange={handleProfileImage}
              type="file"
              className="hidden"
            />
          </div>
        </div>

        {/* Personal Information Header - Left Aligned */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Personal Information
        </h1>

        {/* Form Sections */}
        <div className="space-y-6">
          {/* Personal Information Section */}
          <div>
            <PersonalInfo
              setPersonalInfo={setPersonalInfo}
              personalInfo={personalInfo}
            />
          </div>

          {/* Education Qualification Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Educational Qualification
            </h3>

            <div className="space-y-4">
              {educationList?.length > 0 &&
                educationList?.map((singleEducation) => (
                  <Education
                    key={singleEducation._id}
                    setEducationList={setEducationList}
                    educationList={educationList}
                    singleEducation={singleEducation}
                  />
                ))}
            </div>

            <button
              onClick={addEducation}
              className="w-full py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
            >
              + Add Education
            </button>
          </div>

          {/* Work Experience Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Work Experience
            </h3>

            {workExperienceList?.length > 0 &&
              workExperienceList?.map((singleWorkExperience) => (
                <WorkExperience
                  key={singleWorkExperience._id}
                  setWorkExperienceList={setWorkExperienceList}
                  workExperienceList={workExperienceList}
                  singleWorkExperience={singleWorkExperience}
                />
              ))}

            <button
              onClick={addWorkExperience}
              className="w-full py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
            >
              + Add Experience
            </button>
          </div>

          {/* Skills Section */}
          <div className="bg-white rounded-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Skills</h3>

            <div className="flex items-start gap-3 mb-4">
              <input
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                type="text"
                placeholder="Computer Science"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={addSkill}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {skills?.length > 0 &&
                skills?.map((sk, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                  >
                    {sk}
                    <button onClick={() => removeSkill(sk)}>
                      <X className="w-3 h-3 cursor-pointer hover:text-purple-900" />
                    </button>
                  </div>
                ))}
            </div>
          </div>

          {/* Update Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-[#123499] to-[#2A57DE] hover:from-[#0f2f85] hover:to-[#2247b6] text-white font-bold py-3 px-4 rounded-lg"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
