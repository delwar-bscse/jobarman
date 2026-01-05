"use client";
import { useRef } from "react";

const SkillsSection = ({ skillsArray, register }) => {
  const inputRef = useRef(null);

  const addSkill = () => {
    const value = inputRef.current?.value.trim();
    if (!value) return;
    skillsArray.append({ value });
    inputRef.current.value = "";
  };

  return (
    <>
      {/* Input and Add button */}
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Add a skill"
          className="flex-1 px-3 py-2 border rounded-lg text-sm focus:border-blue-500"
          ref={inputRef}
        />
        <button
          type="button"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
          onClick={addSkill}
        >
          Add
        </button>
      </div>

      {/* Skills list */}
      <div className="flex flex-wrap gap-2 mt-2">
        {skillsArray.fields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
          >
            <input type="hidden" {...register(`skills.${index}.value`)} />
            {field.value}
            <button
              type="button"
              onClick={() => skillsArray.remove(index)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default SkillsSection;
