import { Plus } from "lucide-react";
import React from "react";

export default function Exprience({ register, expArray }) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">Experience</h2>

      {expArray.fields.map((item, i) => (
        <div key={item.id} className="border p-4 rounded-lg mb-4">
          <div className="grid grid-cols-2 gap-4">
            <input {...register(`title`)} className="border p-2 rounded" />
            <input {...register(`company`)} className="border p-2 rounded" />
            <input
              type="date"
              {...register(`startDate`)}
              className="border p-2 rounded"
            />
            <input
              type="date"
              {...register(`endDate`)}
              className="border p-2 rounded"
            />
          </div>

          <textarea
            {...register(`description`)}
            className="border p-2 rounded w-full mt-3"
          />

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
        className="text-blue-600 flex items-center gap-1"
      >
        <Plus size={16} /> Add Experience
      </button>
    </section>
  );
}
