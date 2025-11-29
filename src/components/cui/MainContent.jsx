import React, { useState } from 'react'
import WorkExperience from './WorkExperience';
import { Calendar, X } from "lucide-react";
import Education from './Education';
import { set } from 'date-fns';

const MainContent = () => {
  const [educationList, setEducationList] = useState([
    {
      degree: "Bachelor of Science in Computer Science",
      institute: "University of California, Berkeley",
      session: "2018 - 2020",
      passingYear: 2022,
      grade: "A",
      _id: "6929aabe566a3286d235f90d"
    }
  ]);
  const [workExperienceList, setWorkExperienceList] = useState([
    {
      title: "Backend Developer",
      company: "TechNova Solutions",
      startDate: "2023-01-10T00:00:00.000Z",
      endDate: "2024-11-01T00:00:00.000Z",
      description: "Worked on building scalable microservices using Node.js, Express, and MongoDB. Implemented real-time features using Redis and WebSockets.",
      location: "Dhaka, Bangladesh",
      isCurrentJob: false,
      _id: "692ac1fbedb37f5ac29d497e"
    }
  ]);
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState(["React", "UI Design", "Website Design", "Prototyping", "Wireframe", "App design"]);


  // Add and Remove Skills
  const addSkill = () => {
    typeof (skill) === "string" && skill.trim() !== "" && !skills.includes(skill) && setSkills([...skills, skill.trim()]);
    setSkill("");
    console.log("Add Skill", skills)
  }
  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
    console.log("Remove Skill", skills)
  }

  const addWorkExperience = () => {
    setWorkExperienceList([...workExperienceList, {
      _id: Date.now().toString(),
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
      location: "",
      isCurrentJob: false,
    }]);
  }

  // add Education
  const addEducation = () => {
    setEducationList([...educationList, {
      _id: Date.now().toString(),
      degree: "",
      institute: "",
      session: "",
      passingYear: 0,
      grade: "",
    }]);
  }

  const handleSubmit = () => {
    console.log("Education List:", educationList);
  }


  return (
    <div className="flex-1 ml-8">
      <div className="max-w-5xl mx-auto bg-white p-8">

        {/* Profile Picture - Centered */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-4xl">👤</span>
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center shadow-sm">
              <span className="text-sm">📷</span>
            </button>
          </div>
        </div>

        {/* Personal Information Header - Left Aligned */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Personal Information</h1>

        {/* Form Sections */}
        <div className="space-y-6">
          {/* Personal Information Section */}
          <div className="bg-white rounded-lg">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue="Atiqur Rifat"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Designation</label>
                <input
                  type="text"
                  defaultValue="UI/UX Designer"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Mobile Number</label>
                <input
                  type="text"
                  defaultValue="+123456789"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Date Of Birth</label>
                <div className="relative">
                  <input
                    type="text"
                    defaultValue="01 January 2000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                  <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Age</label>
                <input
                  type="text"
                  defaultValue="25"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Gender</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Address</label>
                <input
                  type="text"
                  defaultValue="2471 Derby Ave, Strubens Valley, Gauteng"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Social Media Link</label>
                <input
                  type="text"
                  defaultValue="LinkedIn.com/profile"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">Summary</label>
              <textarea
                rows={3}
                defaultValue="Creative and detail-oriented UI/UX Designer with expertise in crafting intuitive mobile and web experiences. Skilled in wireframing, prototyping, and design systems"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>
          </div>

          {/* Education Qualification Section */}
          <div className='space-y-4'>

            <h3 className="text-lg font-bold text-gray-900 mb-4">Educational Qualification</h3>

            <div className='space-y-4'>
              {educationList.map((singleEducation) => (
                <Education key={singleEducation._id} setEducationList={setEducationList} educationList={educationList} singleEducation={singleEducation} />
              ))}
            </div>


            <button onClick={addEducation} className="w-full py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
              + Add Education
            </button>
          </div>


          {/* Work Experience Section */}
          <div className='space-y-4'>
            {workExperienceList.map((singleEorkExperience) => (
              <WorkExperience key={singleEorkExperience._id} setWorkExperienceList={setWorkExperienceList} workExperienceList={workExperienceList} singleEorkExperience={singleEorkExperience} />
            ))}


            <button onClick={addWorkExperience} className="w-full py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
              + Add Experience
            </button>
          </div>


          {/* Skills Section */}
          <div className="bg-white rounded-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Skills</h3>

            <div className="flex items-start gap-3 mb-4">
              <input
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                type="text"
                placeholder="Computer Science"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
              <button onClick={addSkill} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                >
                  {skill}
                  <button onClick={() => removeSkill(skill)}>
                    <X className="w-3 h-3 cursor-pointer hover:text-purple-900" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Update Button */}
          <button onClick={handleSubmit} className="w-full bg-gradient-to-r from-[#123499] to-[#2A57DE] hover:from-[#0f2f85] hover:to-[#2247b6] text-white font-bold py-3 px-4 rounded-lg">
            Update
          </button>
        </div>
      </div>
    </div>
  )
}

export default MainContent