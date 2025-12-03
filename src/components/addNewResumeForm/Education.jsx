import { Plus } from "lucide-react";
import React from "react";

export default function Education({ register, eduArray }) {
  return (
    <section className="mb-6 sm:mb-8">
      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Education</h2>

      <div
        className="mb-5 p-3 sm:p-4 border border-gray-300 rounded-lg bg-white shadow-sm space-y-3"
      >
        {eduArray.fields.map((edu, i) => (
          <div key={edu.id} className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 text-sm">Degree Name</label>
              <input
                {...register(`educations.${i}.degree`)}
                placeholder="Enter your degree"
                className="flex items-center gap-2 border px-3 py-2 rounded-lg outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 text-sm">University Name</label>
              <input
                {...register(`educations.${i}.institution`)}
                placeholder="Enter your university"
                className="flex items-center gap-2 border px-3 py-2 rounded-lg outline-none"
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          className="text-blue-600 w-full flex items-center justify-center mt-5 gap-1"
          onClick={() =>
            eduArray.append({
              degree: "",
              institution: "",
            })
          }
        >
          {" "}
          <Plus size={16} /> Add Education
        </button>
      </div>
    </section>
  );
}
