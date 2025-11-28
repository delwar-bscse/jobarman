import { Plus } from "lucide-react";
import React from "react";

export default function Projects({ register, projArray }) {
  return (
    <section className="mb-6 sm:mb-8">
      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
        Selected Project
      </h2>
      {projArray.fields.map((proj, i) => (
        <div
          key={proj.id}
          className="mb-5 p-3 sm:p-4 border border-gray-300 rounded-lg bg-white shadow-sm"
        >
          <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-3">
            <input
              {...register(`projects.${i}.title`)}
              placeholder="Enter your title"
              className="flex items-center gap-2 border px-3 py-2 rounded-lg outline-none"
            />

            <textarea
              {...register(`description ${i}`)}
              className="flex items-center gap-2 border px-3 py-2 rounded-lg outline-none"
              placeholder="Enter your description"
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        className="text-blue-600 flex items-center gap-1"
        onClick={() => {
          projArray.append({
            title: "",
            description: "",
          });
        }}
      >
        <Plus className="w-4 h-4" /> Add Other Project
      </button>
    </section>
  );
}
