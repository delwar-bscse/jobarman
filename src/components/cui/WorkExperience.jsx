/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Calendar, X } from "lucide-react";
import { el } from "date-fns/locale";

const WorkExperience = ({
  workExperienceList,
  setWorkExperienceList,
  singleWorkExperience,
}) => {
  const [workExperience, setWorkExperience] = useState({
    _id: singleWorkExperience?._id,
    title: singleWorkExperience?.title || "",
    company: singleWorkExperience?.company || "",
    startDate: singleWorkExperience?.startDate || "",
    endDate: singleWorkExperience?.endDate || "",
    description: singleWorkExperience?.description || "",
    location: singleWorkExperience?.location || "",
    isCurrentJob: singleWorkExperience?.isCurrentJob || false,
  });

  const isoToInputDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleWorkExperienceChange = (e) => {
    const name = e.target.name;
    let value = "";
    if (e.target.type === "text") {
      value = e.target.value;
    } else if (e.target.type === "checkbox") {
      value = e.target.checked;
    } else if (e.target.type === "date") {
      value = new Date(e.target.value).toISOString();
    } else if (e.target.nodeName === "TEXTAREA") {
      value = e.target.value;
    }

    setWorkExperience((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const updatedWorkExperienceList = workExperienceList.map((work) =>
      work._id === workExperience._id ? workExperience : work
    );
    setWorkExperienceList(updatedWorkExperienceList);
  }, [workExperience]);

  return (
    <div className="bg-white rounded-lg">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Job Title
          </label>
          <input
            name="title"
            value={workExperience?.title}
            onChange={handleWorkExperienceChange}
            type="text"
            placeholder="UI/UX Designer"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Company Name
          </label>
          <input
            type="text"
            name="company"
            value={workExperience?.company}
            onChange={handleWorkExperienceChange}
            placeholder="Design Hill"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={workExperience?.location}
            onChange={handleWorkExperienceChange}
            placeholder="2471 Derby Ave, Strubens Valley, Gauteng"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            value={isoToInputDate(workExperience?.startDate)}
            onChange={handleWorkExperienceChange}
            placeholder="01 Jan 2020"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            value={isoToInputDate(workExperience?.endDate)}
            onChange={handleWorkExperienceChange}
            placeholder="01 Jan 2020"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Description
        </label>
        <textarea
          rows={3}
          name="description"
          type="text"
          value={workExperience?.description}
          onChange={handleWorkExperienceChange}
          placeholder="Creative and detail-oriented UI/UX Designer with expertise in crafting intuitive mobile and web experiences. Skilled in wireframing, prototyping, and design systems"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 resize-none"
        />
      </div>

      <div className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          id={workExperience._id + "_currentlyWorking"}
          name="isCurrentJob"
          checked={workExperience?.isCurrentJob}
          onChange={handleWorkExperienceChange}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
        />
        <label
          htmlFor={workExperience._id + "_currentlyWorking"}
          className="text-sm text-gray-700 cursor-pointer"
        >
          Currently Work This Company
        </label>
      </div>
    </div>
  );
};

export default WorkExperience;
