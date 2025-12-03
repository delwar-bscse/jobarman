import { Plus } from "lucide-react";
import React from "react";

export default function Skills({ register, skillArray }) {
  return (
    <section className="mb-6 sm:mb-8">
      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
        Core Skills
      </h2>

      <div
        className="mb-5 p-3 sm:p-4 border border-gray-300 rounded-lg bg-white shadow-sm"
      >
        {skillArray.fields.map((proj, i) => (
          <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600">Title</label>
              <input
                {...register(`core_features.${i}.title`)}
                placeholder="Enter title"
                className="flex items-center gap-2 border px-3 py-2 rounded-lg outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600">Description</label>
              <textarea
                rows={1}
                {...register(`core_features.${i}.description`)}
                className="border px-3 py-2 rounded-lg outline-none"
                placeholder="Enter description"
              />
            </div>




            {/* <input
              {...register(`projects.${i}.link`)}
              placeholder="Enter your link"
              className="flex items-center gap-2 border px-3 py-2 rounded-lg outline-none"
            /> */}
          </div>
        ))}
        <button
          type="button"
          className="text-blue-600 w-full flex items-center justify-center gap-1 mt-5"
          onClick={() => {
            skillArray.append({
              title: "",
              description: "",
            });
          }}
        >
          <Plus className="w-4 h-4" /> Add Other Skills
        </button>
      </div>
    </section>
  );
}
