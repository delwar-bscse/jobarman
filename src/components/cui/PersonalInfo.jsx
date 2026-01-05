import React from "react";

const PersonalInfo = ({ register }) => {
  return (
    <div className="">
      {/* Row 1 */}
      <div className="grid lg:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Full Name
          </label>
          <input
            {...register("personalInfo.name")}
            type="text"
            placeholder="Atiqur Rifat"
            className="w-full px-3 py-2 border rounded-lg text-sm focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Designation
          </label>
          <input
            {...register("personalInfo.designation")}
            type="text"
            placeholder="UI/UX Designer"
            className="w-full px-3 py-2 border rounded-lg text-sm focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Mobile Number
          </label>
          <input
            {...register("personalInfo.phone")}
            type="text"
            placeholder="+123456789"
            className="w-full px-3 py-2 border rounded-lg text-sm focus:border-blue-500"
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid lg:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Date Of Birth
          </label>
          <input
            {...register("personalInfo.date_of_birth")}
            type="date"
            className="w-full px-3 py-2 border rounded-lg text-sm focus:border-blue-500"
          />
        </div>

        {/* <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Age
          </label>
          <input
            {...register("personalInfo.age", { valueAsNumber: true })}
            type="number"
            min={0}
            placeholder="25"
            className="w-full px-3 py-2 border rounded-lg text-sm focus:border-blue-500"
          />
        </div> */}

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Gender
          </label>
          <select
            {...register("personalInfo.gender")}
            className="w-full px-3 py-2 border rounded-lg text-sm focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Row 3 */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Address
          </label>
          <input
            {...register("personalInfo.address")}
            type="text"
            placeholder="2471 Derby Ave, Strubens Valley"
            className="w-full px-3 py-2 border rounded-lg text-sm focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Social Media Link
          </label>
          <input
            {...register("personalInfo.linkedin")}
            type="text"
            placeholder="linkedin.com/in/username"
            className="w-full px-3 py-2 border rounded-lg text-sm focus:border-blue-500"
          />
        </div>
      </div>

      {/* Bio */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Summary
        </label>
        <textarea
          {...register("personalInfo.bio")}
          rows={3}
          placeholder="Experienced UX Designer with a passion for user-centered design."
          className="w-full px-3 py-2 border rounded-lg text-sm focus:border-blue-500 resize-none"
        />
      </div>
    </div>
  );
};

export default PersonalInfo;
