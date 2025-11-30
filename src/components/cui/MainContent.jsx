import React, { useEffect, useState } from 'react'
import WorkExperience from './WorkExperience';
import { X } from "lucide-react";
import Education from './Education';
import PersonalInfo from './PersonalInfo';
import { FcCamera } from "react-icons/fc";
import Image from 'next/image';
import { myFetch } from '../../../utils/myFetch';

const MainContent = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [personalInfo, setPersonalInfo] = useState({
    name: "BD Calling IT",
    designation: "Raj Mistri",
    phone: "+8801883847915",
    date_of_birth: "2004-03-15T00:00:00.000Z",
    // age: 20,
    gender: "Female",
    address: "Dhaka,Bangladesh",
    linkedin: "edrer",
    bio: "This is huge company",
  }
  );
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
  const [skills, setSkills] = useState([]);


  useEffect(() => {
    const fetchProfile = async () => {
      const res = await myFetch('/user/profile', 'GET');
      console.log("profile data: ", res.data);

      if (res.data) {
        setPersonalInfo({
          name: res.data.name || "",
          designation: res.data.designation || "",
          phone: res.data.phone || "",
          date_of_birth: res.data.date_of_birth || "",
          age: res.data.age || 0,
          gender: res.data.gender || "",
          address: res.data.address || "",
          linkedin: res.data.linkedin || "",
          bio: res.data.bio || "",
        });
        const eduList = res.data.education?.map((edu) => ({
          degree: edu.degree || "",
          institute: edu.institute || "",
          session: edu.session || "",
          passingYear: edu.passingYear || 0,
          grade: edu.grade || "",
          _id: edu._id || "",
        }));
        setEducationList(eduList);
        const workList = res.data.workExperience?.map((work) => ({
          title: work.title || "",
          company: work.company || "",
          startDate: work.startDate || "",
          endDate: work.endDate || "",
          description: work.description || "",
          location: work.location || "",
          isCurrentJob: work.isCurrentJob || false,
          _id: work._id || "",
        }));
        setWorkExperienceList(workList);
        setSkills((prev) => [...prev, ...res.data.skills]);
      }
    }
    fetchProfile();
  }, []);


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

  // add Work Experience
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
    console.log("Personal Info: ",)
    console.log("Education List:", educationList);
    console.log("Work Experience List:", workExperienceList);
  }

  const handleProfileImage = (e) => {
    const file = e.target.files[0];
    setProfileImageFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  }




  return (
    <div className="flex-1 ml-8">
      <div className="max-w-5xl mx-auto bg-white p-8">

        {/* Profile Picture - Centered */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
              <Image src={profileImage || "/defaultProfile.png"} width={96} height={96} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
            </div>
            <button onClick={() => document.getElementById("takeEmployProfileImage").click()} className="absolute bottom-0 right-0 size-7 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center shadow-sm">
              <FcCamera className="w-4 h-4 opacity-80" />
            </button>
            <input id='takeEmployProfileImage' onChange={handleProfileImage} type="file" className="hidden" />
          </div>
        </div>

        {/* Personal Information Header - Left Aligned */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Personal Information</h1>

        {/* Form Sections */}
        <div className="space-y-6">
          {/* Personal Information Section */}
          <div>
            <PersonalInfo setPersonalInfo={setPersonalInfo} personalInfo={personalInfo} />
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
            {workExperienceList.map((singleWorkExperience) => (
              <WorkExperience key={singleWorkExperience._id} setWorkExperienceList={setWorkExperienceList} workExperienceList={workExperienceList} singleWorkExperience={singleWorkExperience} />
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
              {skills?.map((sk, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                >
                  {sk}
                  <button onClick={() => removeSkill(sk)}>
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