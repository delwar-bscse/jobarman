"use client";

import type React from "react";

import { useState } from "react";
import { Dot, X } from "lucide-react";

interface ResponsibilitiesInputProps {
  responsibilities: string[];
  setResponsibilities: (responsibilities: string[]) => void;
}

export default function ResponsibilitiesInput({ responsibilities, setResponsibilities }: ResponsibilitiesInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleAddBenefit = () => {
    if (inputValue.trim()) {
      setResponsibilities([...responsibilities, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveBenefit = (index: number) => {
    setResponsibilities(responsibilities.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          type="text"
          id="benefitsInputField"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add Responsibility"
          className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
        />
        <button onClick={handleAddBenefit} className="text-gray-700 font-bold flex items-center text-center border px-3
         rounded-sm">Add</button>
      </div>
      <ul className="space-y-2">
        {responsibilities.map((responsibility, index) => (
          <li
            key={index}
            className="flex justify-between items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm"
          >
            <span className="flex items-center">
              <Dot className="size-8 text-gray-600" />
              <span className="text-gray-700">{responsibility}</span>
            </span>
            <button
              onClick={() => handleRemoveBenefit(index)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
