"use client";
import { ChevronLeft, Plus } from "lucide-react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import TextEditor from "./TextEditor";
import PersonalInfo from "./PersonalInfo";
import Projects from "./Projects";
import { Certificate } from "crypto";
import Certification from "./Certification";
import Education from "./Education";
import Exprience from "./Exprience";

/* -----------------------------------------------------------
   MAIN FORM (React Hook Form Version)
----------------------------------------------------------- */

export default function AddNewResumeForm2() {
  const { register, handleSubmit, control, watch, setValue } = useForm({
    defaultValues: {
      resumeName: "",
      personalInfo: {
        address: "",
        contact: "",
        email: "",
        socialMedia: "",
        portfolio: "",
      },
      summary: "",
      coreSkills: "",
      experiences: [
        {
          title: "",
          company: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
      projects: [
        {
          title: "",
          description: "",
        },
      ],
      education: [
        {
          degree: "Bsc In Computer Science",
          university: "University Of Washington, Seattle, WA",
        },
      ],
      certifications: [{ name: "Bsc In Computer Science", details: "" }],
    },
  });

  // dynamic sections
  const expArray = useFieldArray({ control, name: "experiences" });
  const projArray = useFieldArray({ control, name: "projects" });
  const eduArray = useFieldArray({ control, name: "education" });
  const certArray = useFieldArray({ control, name: "certifications" });

  const onSubmit = (data) => {
    console.log("FORM DATA:", data);
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

        <div className="flex-1">
          <h1 className="text-3xl font-bold">Add New Resume</h1>
          <input
            {...register("resumeName")}
            className="mt-2 w-full max-w-md px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* PERSONAL INFORMATION */}
      <PersonalInfo register={register} />

      {/* SUMMARY */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Summary</h2>
        <Controller
          name="summary"
          control={control}
          render={({ field }) => (
            <TextEditor value={field.value} onChange={field.onChange} />
          )}
        />
      </section>

      {/* CORE SKILLS */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Core Skills</h2>
        <Controller
          name="coreSkills"
          control={control}
          render={({ field }) => (
            <TextEditor value={field.value} onChange={field.onChange} />
          )}
        />
      </section>

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
