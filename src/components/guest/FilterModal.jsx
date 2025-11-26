import { X } from "lucide-react";
import React from "react";

export default function FilterModal() {
  let filtersOpen = false;
  return (
    <>
      {filtersOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setFiltersOpen(false)}
          />
          <div className="relative bg-white w-[92%] max-w-md rounded-xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                onClick={() => setFiltersOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                >
                  <option>Sr. UI/UX Designer</option>
                  <option>Frontend Engineer</option>
                  <option>Backend Engineer</option>
                  <option>Product Designer</option>
                </select>
              </div>

              {/* Employee Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee Type
                </label>
                <div className="flex gap-2">
                  {[
                    { label: "Full Time" },
                    { label: "Part Time" },
                    { label: "Intern" },
                  ].map((t) => (
                    <button
                      key={t.label}
                      type="button"
                      onClick={() => setEmployeeType(t.label)}
                      className={`px-4 py-2 rounded-md text-sm ${
                        employeeType === t.label
                          ? "bg-[#123499] text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Job Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Type
                </label>
                <div className="flex gap-2">
                  {[
                    { label: "Remote" },
                    { label: "Onsite" },
                    { label: "Hybrid" },
                  ].map((t) => (
                    <button
                      key={t.label}
                      type="button"
                      onClick={() => setJobType(t.label)}
                      className={`px-4 py-2 rounded-full text-sm ${
                        jobType === t.label
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Salary Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salary Range
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="block text-xs text-gray-500 mb-1">
                      Min Salary
                    </span>
                    <input
                      type="text"
                      value={minSalary}
                      onChange={(e) => setMinSalary(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 text-sm"
                      placeholder="$5000"
                    />
                  </div>
                  <div>
                    <span className="block text-xs text-gray-500 mb-1">
                      Max Salary
                    </span>
                    <input
                      type="text"
                      value={maxSalary}
                      onChange={(e) => setMaxSalary(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 text-sm"
                      placeholder="$8000"
                    />
                  </div>
                </div>
              </div>

              {/* Distance */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Distance
                </label>
                <input
                  type="range"
                  min={1}
                  max={20}
                  step={1}
                  value={distance}
                  onChange={(e) => setDistance(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1km</span>
                  <span>{distance} km</span>
                  <span>20 Km</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setFiltersOpen(false)}
              className="w-full mt-5 bg-orange-500 text-white rounded-lg py-3 font-semibold"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </>
  );
}
