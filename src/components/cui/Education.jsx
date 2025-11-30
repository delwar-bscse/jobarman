/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'

const Education = ({ educationList, setEducationList, singleEducation }) => {
  const [education, setEducation] = useState({
    _id: singleEducation?._id,
    degree: singleEducation?.degree || "",
    institute: singleEducation?.institute || "",
    session: singleEducation?.session || "",
    passingYear: singleEducation?.passingYear || 0,
    grade: singleEducation?.grade || "",
  });

  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setEducation((prevEducation) => ({
      ...prevEducation,
      [name]: value,
    }));
  };

  useEffect(() => {
    const updatedEducationList = educationList.map((edu) =>
      edu._id === education._id ? education : edu
    );
    setEducationList(updatedEducationList);
  }, [education]);


  return (
    <div className="bg-white rounded-lg border-b border border-gray-200 p-4">

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Degree Name</label>
          <input
            name='degree'
            value={education?.degree}
            onChange={handleEducationChange}
            type="text"
            placeholder="Computer Science"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Institute</label>
          <input
            name='institute'
            value={education?.institute}
            onChange={handleEducationChange}
            type="text"
            placeholder="Oxford University"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Session</label>
          <input
            name='session'
            value={education?.session}
            onChange={handleEducationChange}
            type="text"
            placeholder="2020-2024"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Passing Year</label>
          <input
            name='passingYear'
            value={education?.passingYear}
            onChange={handleEducationChange}
            type="text"
            placeholder="2025"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Grade Point</label>
          <input
            name='grade'
            value={education?.grade}
            onChange={handleEducationChange}
            type="text"
            placeholder="GPA 5.00"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  )
}

export default Education