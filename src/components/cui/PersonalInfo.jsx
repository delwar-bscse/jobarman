import React from "react";

const PersonalInfo = ({ personalInfo, setPersonalInfo }) => {
  const isoToInputDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const handlePersonalInfoChange = (e) => {
    const name = e.target.name;
    let value = "";

    if (e.target.type === "text") {
      value = e.target.value;
    } else if (e.target.type === "number") {
      value = e.target.value;
    } else if (e.target.nodeName === "SELECT") {
      value = e.target.value;
    } else if (e.target.type === "date") {
      value = new Date(e.target.value).toISOString();
    } else if (e.target.nodeName === "TEXTAREA") {
      value = e.target.value;
    }

    setPersonalInfo((prevPersonalInfo) => ({
      ...prevPersonalInfo,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white rounded-lg">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={personalInfo.name}
            onChange={handlePersonalInfoChange}
            placeholder="Atiqur Rifat"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Designation
          </label>
          <input
            type="text"
            name="designation"
            value={personalInfo.designation}
            onChange={handlePersonalInfoChange}
            placeholder="UI/UX Designer"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Mobile Number
          </label>
          <input
            type="text"
            name="phone"
            value={personalInfo.phone}
            onChange={handlePersonalInfoChange}
            placeholder="+123456789"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Date Of Birth
          </label>
          <input
            type="date"
            name="date_of_birth"
            value={isoToInputDate(personalInfo.date_of_birth)}
            onChange={handlePersonalInfoChange}
            placeholder="01 January 2000"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Age
          </label>
          <input
            type="number"
            min="0"
            name="age"
            value={personalInfo.age}
            onChange={handlePersonalInfoChange}
            placeholder="25"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Gender
          </label>
          <select
            name="gender"
            onChange={handlePersonalInfoChange}
            value={personalInfo?.gender}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={personalInfo.address}
            onChange={handlePersonalInfoChange}
            placeholder="2471 Derby Ave, Strubens Valley, Gauteng"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Social Media Link
          </label>
          <input
            type="text"
            name="linkedin"
            value={personalInfo.linkedin}
            onChange={handlePersonalInfoChange}
            placeholder="LinkedIn.com/profile"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Summary
        </label>
        <textarea
          rows={3}
          value={personalInfo.bio}
          name="bio"
          onChange={handlePersonalInfoChange}
          placeholder="Experienced UX Designer with a passion for creating user-centered designs that enhance usability and drive engagement."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 resize-none"
        />
      </div>
    </div>
  );
};

export default PersonalInfo;
