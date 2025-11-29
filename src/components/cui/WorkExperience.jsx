import React, { useState } from 'react'
import { Calendar, X } from "lucide-react";

const WorkExperience = ({workExperienceList, setWorkExperienceList}) => {
  const [currentlyWorking, setCurrentlyWorking] = useState(false);

  return (
    <div className="bg-white rounded-lg">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Work Experience</h3>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Job Title</label>
          <input
            type="text"
            defaultValue="UI/UX Designer"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Company Name</label>
          <input
            type="text"
            defaultValue="Design Hill"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Location</label>
          <input
            type="text"
            defaultValue="2471 Derby Ave, Strubens Valley, Gauteng"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Start Date</label>
          <div className="relative">
            <input
              type="text"
              defaultValue="01 Jan 2020"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            />
            <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">End Date</label>
          <div className="relative">
            <input
              type="text"
              defaultValue="01 Jan 2020"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            />
            <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-2">Description</label>
        <textarea
          rows={3}
          defaultValue="Creative and detail-oriented UI/UX Designer with expertise in crafting intuitive mobile and web experiences. Skilled in wireframing, prototyping, and design systems"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 resize-none"
        />
      </div>

      <div className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          id="currentlyWorking"
          checked={currentlyWorking}
          onChange={(e) => setCurrentlyWorking(e.target.checked)}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="currentlyWorking" className="text-sm text-gray-700">
          Currently Work This Company
        </label>
      </div>
    </div>
  )
}

export default WorkExperience