import { Plus } from "lucide-react";
import React from "react";

export default function Exprience({ register, expArray }) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">Experience</h2>
      {/* Title, Company Name, Designation, Start Date, End date, Description */}

      {expArray.fields.map((item, i) => (
        <div key={item.id} className="border p-4 rounded-lg mb-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col  gap-1">
              <label className="text-sm text-gray-600">Title</label>
              <input
                {...register(`workExperiences.${i}.title`)}
                className="border p-2 rounded"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600">Company Name</label>
              <input
                {...register(`workExperiences.${i}.company`)}
                className="border p-2 rounded"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600">Designation</label>
              <input
                {...register(`workExperiences.${i}.designation`)}
                className="border p-2 rounded"
              />
            </div>
            <div className="flex flex-col  gap-1">
              <label className="text-sm text-gray-600">Start Date</label>
              <input
                type="date"
                {...register(`workExperiences.${i}.startDate`)}
                className="border p-2 rounded"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600">Start Date</label>
              <input
                type="date"
                {...register(`workExperiences.${i}.endDate`)}
                className="border p-2 rounded"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1 mt-3">
            <label className="text-sm text-gray-600">Description</label>
            <textarea
              {...register(`workExperiences.${i}.description`)}
              className="border p-2 rounded w-full"
            />
          </div>

          <button
            type="button"
            onClick={() => expArray.remove(i)}
            className="text-red-500 text-sm mt-2"
          >
            Remove Experience
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          expArray.append({
            title: "",
            company: "",
            startDate: "",
            endDate: "",
            description: "",
          })
        }
        className="text-blue-600 w-full flex items-center justify-center gap-1"
      >
        <Plus size={16} /> Add Experience
      </button>
    </section>
  );
}
