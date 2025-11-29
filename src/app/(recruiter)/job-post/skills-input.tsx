"use client";

import type React from "react";

import { useState } from "react";
import { X } from "lucide-react";

interface SkillsInputProps {
  skills: string[];
  setSkills: (skills: string[]) => void;
}

export default function SkillsInput({ skills, setSkills }: SkillsInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      setSkills([...skills, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleAddSkill}
        placeholder="Add a skill and press Enter"
        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
      />
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm"
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
