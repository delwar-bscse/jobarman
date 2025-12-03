import { Plus } from "lucide-react";
import React from "react";

export default function Certification({ register, certArray }) {
  return (
    <section className="mb-6 sm:mb-8">
      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
        Certification
      </h2>

      <div
        className="mb-5 p-3 sm:p-4 border border-gray-300 rounded-lg bg-white shadow-sm space-y-3"
      >
        {certArray.fields.map((cer, i) => (
          <div
            key={cer.id} className="grid grid-cols-1  sm:gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600">Degree Name</label>
              <input
                {...register(`certifications.${i}.title`)}
                placeholder="Enter your certificate "
                className="flex items-center gap-2 border px-3 py-2 rounded-lg outline-none"
              />
            </div>
            {/* <textarea
              {...register(`certifications.${i}.description`)}
              placeholder="Enter your details"
              className="flex items-center gap-2 border px-3 py-2 rounded-lg outline-none"
            /> */}
            {/* <button
              type="button"
              onClick={() => certArray.remove(i)}
              className="text-red-500 text-sm mt-2"
            >
              Remove
            </button> */}
          </div>
        ))}
        <button
          type="button"
          className="text-blue-600 w-full flex items-center justify-center gap-1"
          onClick={() =>
            certArray.append({
              title: "",
              description: "",
            })
          }
        >
          {" "}
          <Plus size={16} /> Add Certification
        </button>
      </div>
    </section>
  );
}
