/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ChevronLeft } from "lucide-react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
// import TextEditor from "./TextEditor";
import PersonalInfo from "./PersonalInfo";
import Projects from "./Projects";
import Certification from "./Certification";
import Education from "./Education";
import Exprience from "./Exprience";
import { myFetch } from "../../../utils/myFetch";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import Skills from "./Skills";
import { useEffect } from "react";

/* -----------------------------------------------------------
   MAIN FORM (React Hook Form Version)
----------------------------------------------------------- */

export default function AddNewResumeForm2({ name }) {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      resume_name: "",
      personalInfo: {
        full_name: "",
        email: "",
        phone: "",
        social_media_link: "",
        github_link: "",
        work_authorization: "",
        clearance: "",
        open_to_work: "",
        summury: "",
        address: "",
      },
      core_features: [
        {
          title: "",
          description: "",
        },
      ],
      workExperiences: [
        {
          title: "",
          company: "",
          startDate: "",
          endDate: "",
          description: "",
          isCurrentJob: false,
        },
      ],
      projects: [
        {
          title: "",
          description: "",
          link: "",
        },
      ],
      educations: [
        {
          degree: "",
          institution: "",
        },
      ],
      certifications: [{ title: "", description: "" }],
    },
  });


  useEffect(() => {
    const fetchResume = async () => {
      const res = await myFetch(`/resume/${id}`);
      console.log("Edit Resume res :", res.data);

      if (res.data) {
        const resume = res.data;

        const normalized = {
          resume_name: resume.resume_name || "",
          personalInfo: {
            full_name: resume.personalInfo?.full_name || "",
            email: resume.personalInfo?.email || "",
            phone: resume.personalInfo?.phone || "",
            social_media_link: resume.personalInfo?.social_media_link || "",
            github_link: resume.personalInfo?.github_link || "",
            work_authorization: resume.personalInfo?.work_authorization || "",
            clearance: resume.personalInfo?.clearance || "",
            open_to_work: resume.personalInfo?.open_to_work || "",
            summury: resume.personalInfo?.summury || "",
            address: resume.personalInfo?.address || "",
          },
          core_features: resume.core_features?.length
            ? resume.core_features
            : [{ title: "", description: "" }],
          workExperiences: resume.workExperiences?.length
            ? resume.workExperiences
            : [
              {
                title: "",
                company: "",
                startDate: "",
                endDate: "",
                description: "",
                isCurrentJob: false,
              },
            ],
          projects: resume.projects?.length
            ? resume.projects
            : [{ title: "", description: "", link: "" }],
          educations: resume.educations?.length
            ? resume.educations
            : [{ degree: "", institution: "" }],
          certifications: resume.certifications?.length
            ? resume.certifications
            : [{ title: "", description: "" }],
        };

        reset(normalized);
      }

    }
    fetchResume();
  },[]);

  // dynamic sections
  const skillArray = useFieldArray({ control, name: "core_features" });
  const expArray = useFieldArray({ control, name: "workExperiences" });
  const projArray = useFieldArray({ control, name: "projects" });
  const eduArray = useFieldArray({ control, name: "educations" });
  const certArray = useFieldArray({ control, name: "certifications" });

  const onSubmit = async (data) => {
    console.log("FORM DATA:", data);
    let method = id ? "PATCH" : "POST";
    let url = id ? `/resume/${id}` : "/resume";

    try {
      const res = await myFetch(url, {
        method: method,
        body: data,
      });

      console.log("res", res);
      if (res.success) {
        toast.success("Resume create successfully");
      } else {
        toast.error(res.message || "Resume create failed");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-7xl mx-auto p-6 bg-white min-h-screen"
    >
      {/* header */}
      <div className="flex items-center gap-4 mb-8">
        <button type="button" className="p-2 hover:bg-gray-200 rounded-lg">
          <ChevronLeft size={22} />
        </button>

        <div className="flex-1 flex flex-col items-center">
          <h1 className="text-3xl font-bold">
            {name ? "Add New Resume" : "Edit New Resume"}
          </h1>
          <input
            {...register("resume_name")}
            className="mt-2 w-full max-w-md px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 text-center"
          />
        </div>
      </div>

      {/* PERSONAL INFORMATION */}
      <PersonalInfo register={register} />

      {/* SUMMARY */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Summary</h2>
        <textarea {...register("personalInfo.summury")} className="border w-full min-h-28 rounded-sm p-2" />
      </section>

      {/* CORE SKILLS */}
      {/* <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Core Skills</h2>
        <Controller
          name="coreSkills"
          control={control}
          render={({ field }) => (
            <TextEditor value={field.value} onChange={field.onChange} />
          )}
        />
      </section> */}

      <Skills register={register} skillArray={skillArray} />

      {/* EXPERIENCE */}
      <Exprience register={register} expArray={expArray} />

      {/* Education */}
      <Education register={register} eduArray={eduArray} />

      {/* Certification */}
      <Certification register={register} certArray={certArray} />

      {/* Projects */}
      <Projects register={register} projArray={projArray} />

      {/* similar structure for Projects, Education, Certifications… */}

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-10 py-3 bg-blue-600 text-white rounded-lg shadow-md"
        >
          Add Resume
        </button>
      </div>
    </form>
  );
}
