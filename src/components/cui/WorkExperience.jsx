const WorkExperience = ({ index, register, remove }) => (
  <div className=" border border-gray-300 rounded-lg p-4 space-y-4">
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">Title</label>
        <input {...register(`workExperiences.${index}.title`)} placeholder="Title" className="w-full px-3 py-2 border rounded-lg text-sm focus:border-blue-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">Company Name</label>
        <input {...register(`workExperiences.${index}.company`)} placeholder="Company Name" className="w-full px-3 py-2 border rounded-lg text-sm focus:border-blue-500" />
      </div>


      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">Start Date</label>
        <input type="date" {...register(`workExperiences.${index}.startDate`)} className="w-full px-3 py-2 border rounded-lg text-sm focus:border-blue-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">End Date</label>
        <input type="date" {...register(`workExperiences.${index}.endDate`)} className="w-full px-3 py-2 border rounded-lg text-sm focus:border-blue-500" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">Designation</label>
        <input {...register(`workExperiences.${index}.designation`)} placeholder="Designation" className="w-full px-3 py-2 border rounded-lg text-sm focus:border-blue-500" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">Description</label>
        <textarea rows={1} {...register(`workExperiences.${index}.description`)} placeholder="Description" className="w-full px-3 py-2 border rounded-lg text-sm focus:border-blue-500" />
      </div>
    </div>
    <div className="w-full flex justify-between items-center">
      <label className="flex gap-2">
        <input
          type="checkbox"
          {...register(`workExperiences.${index}.isCurrentJob`)}
        />
        Currently working here
      </label>
      <button type="button" onClick={() => remove(index)} className="text-red-500">Remove</button>
    </div>
  </div>
);

export default WorkExperience;
