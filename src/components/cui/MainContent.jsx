/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import PersonalInfo from "./PersonalInfo";
import Education from "./Education";
import WorkExperience from "./WorkExperience";
import { myFetch } from "../../../utils/myFetch";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import SkillsSection from "./SkillsSection";
import Image from "next/image";
import { FcCamera } from "react-icons/fc";
import { formatUrl } from "../../../utils/formatUrl";
import { useRouter } from "next/navigation";
import { isValidFullName } from "../../../utils/isValidName";
import { revalidate } from "../../../utils/revalidateTags";

export default function MainContent() {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      personalInfo: {
        name: "",
        designation: "",
        phone: "",
        date_of_birth: "",
        gender: "",
        address: "",
        linkedin: "",
        bio: "",
      },
      educations: [],
      workExperiences: [],
      skills: [], // now an array of objects: [{ value: 'React' }]
    },
  });

  const eduArray = useFieldArray({ control, name: "educations" });
  const workArray = useFieldArray({ control, name: "workExperiences" });
  const skillsArray = useFieldArray({ control, name: "skills" });

  /** Fetch once, hydrate form */
  const fetchProfile = async () => {
    const res = await myFetch("/user/profile");
    if (!res.data) return;

    setProfileImage(formatUrl(res.data.image));

    const workExperiences = (res.data.workExperiences ?? []).map((item) => ({
      ...item,
      startDate: dayjs(item.startDate).format("YYYY-MM-DD"),
      endDate: dayjs(item.endDate).format("YYYY-MM-DD"),
    }));

    reset({
      personalInfo: {
        name: res.data.name ?? "",
        designation: res.data.designation ?? "",
        phone: res.data.phone ?? "",
        date_of_birth: dayjs(res.data.date_of_birth).format("YYYY-MM-DD") ?? "",
        gender: res.data.gender ?? "",
        address: res.data.address ?? "",
        linkedin: res.data.linkedin ?? "",
        bio: res.data.bio ?? "",
      },
      educations: res.data.educations ?? [],
      workExperiences,
      skills: (res.data.skills ?? []).map((s) => ({ value: s })),
    });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleProfileImage = (e) => {
    const file = e.target.files[0];
    setProfileImageFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data) => {
     if (!isValidFullName(data.personalInfo.name)) {
      toast.error("Please enter a valid name. Like 'John Doe'");
      return;
    }
    const formData = new FormData();

    // Personal Info
    Object.entries(data.personalInfo).forEach(([k, v]) =>
      formData.append(k, v)
    );

    // Education & Work
    formData.append("educations", JSON.stringify(data.educations));
    formData.append("workExperiences", JSON.stringify(data.workExperiences));

    // Skills
    data.skills.forEach((s) => formData.append("skills", s.value));
    // Profile Image
    if (profileImageFile) {
      formData.append("image", profileImageFile);
    }

    const res = await myFetch("/user/profile", {
      method: "PATCH",
      body: formData,
    });

    if (res.success) {
      revalidate("profile")
      router.push("/profile/myProfile")
      toast.success("Update successfully");
    } else {
      toast.error("Update failed");
    }
  };

  return (
    <div className="bg-white rounded-lg">
      {/* Profile Picture - Centered */}
      <div className="flex justify-center my-8">
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information */}
        <section className="space-y-4">
          <h3 className="font-bold text-xl">Personal Information</h3>
          <PersonalInfo register={register} />
        </section>

        {/* Education Qualification */}
        <section className="space-y-4">
          <h3 className="font-bold text-xl">Education Qualification</h3>
          <div className="space-y-4">
            {eduArray.fields.map((field, index) => (
              <Education
                key={field.id}
                index={index}
                register={register}
                remove={eduArray.remove}
              />
            ))}
          </div>
          <button
            type="button"
            className="w-full py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
            onClick={() =>
              eduArray.append({
                degree: "",
                institute: "",
                session: "",
                passingYear: "",
                grade: "",
              })
            }
          >
            + Add Education
          </button>
        </section>

        {/* Work Experience */}
        <section className="space-y-4">
          <h3 className="font-bold text-xl">Work Experience</h3>
          <div className="space-y-4">
            {workArray.fields.map((field, index) => (
              <WorkExperience
                key={field.id}
                index={index}
                register={register}
                remove={workArray.remove}
              />
            ))}
          </div>
          <button
            type="button"
            className="w-full py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
            onClick={() =>
              workArray.append({
                title: "",
                company: "",
                startDate: "",
                endDate: "",
                description: "",
                location: "",
                isCurrentJob: false,
              })
            }
          >
            + Add Experience
          </button>
        </section>

        {/* Skills Section */}
        <section className="bg-white rounded-lg space-y-4">
          <h3 className="text-lg font-bold text-gray-900">Skills</h3>

          {/* Input for adding skill */}
          <SkillsSection skillsArray={skillsArray} register={register} />
        </section>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#123499] to-[#2A57DE] hover:from-[#0f2f85] hover:to-[#2247b6] text-white font-bold py-3 px-4 rounded-lg"
        >
          Update
        </button>
      </form>
    </div>
  );
}
