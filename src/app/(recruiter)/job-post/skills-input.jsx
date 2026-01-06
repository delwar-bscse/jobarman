"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function SkillsInput({ skills, setSkills }) {
  const [inputValue, setInputValue] = useState("");

  const handleAddSkill = () => {
    if (inputValue.trim()) {
      setSkills([...skills, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-1">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          // onKeyDown={handleAddSkill}
          placeholder="Add a skill"
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
        />
        <p onClick={handleAddSkill} className="bg-gradient-to-r from-[#2B4CB8] via-[#3B5FD9] to-[#4A6EFA] text-white px-3 py-2 sm:py-3 rounded-lg">Add</p>
      </div>
      <div className="flex flex-col gap-2">
        {skills?.map((skill, index) => (
          <div
            key={index}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm"
          >
            <span className="text-gray-700">{skill}</span>
            <button
              onClick={() => handleRemoveSkill(index)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
