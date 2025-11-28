import { Plus } from "lucide-react";
import React from "react";

export default function Certification({ register, certArray }) {
  return (
    <section className="mb-6 sm:mb-8">
      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
        Certification
      </h2>
      {certArray.fields.map((cer, i) => (
        <div
          key={cer.id}
          className="mb-5 p-3 sm:p-4 border border-gray-300 rounded-lg bg-white shadow-sm"
        >
          <div className="grid grid-cols-1  sm:gap-4">
            <input
              {...register(`certifications.${i}.title`)}
              placeholder="Enter your certificate "
              className="flex items-center gap-2 border px-3 py-2 rounded-lg outline-none"
            />

            <textarea
              {...register(`certifications.${i}.description`)}
              placeholder="Enter your details"
              className="flex items-center gap-2 border px-3 py-2 rounded-lg outline-none"
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        className="text-blue-600 flex items-center gap-1"
        onClick={() =>
          certArray.append({
            degree: "",
            university: "",
          })
        }
      >
        {" "}
        <Plus size={16} /> Add Certification
      </button>
    </section>
  );
}
