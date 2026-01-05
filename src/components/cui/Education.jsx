const Education = ({ index, register, remove }) => (
  <div className="border border-gray-300 rounded-lg p-4">
    <div className="grid grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">Degree</label>
        <input {...register(`educations.${index}.degree`)} placeholder="Degree" className="w-full px-3 py-2 border rounded-lg text-sm focus:border-blue-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">Institution</label>
        <input {...register(`educations.${index}.institute`)} placeholder="Institution" className="w-full px-3 py-2 border rounded-lg text-sm focus:border-blue-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">Session</label>
        <input {...register(`educations.${index}.session`)} placeholder="Location" className="w-full px-3 py-2 border rounded-lg text-sm focus:border-blue-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">Year</label>
        <input {...register(`educations.${index}.passingYear`)} placeholder="Year" className="w-full px-3 py-2 border rounded-lg text-sm focus:border-blue-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">Grade</label>
        <input {...register(`educations.${index}.grade`)} placeholder="Description" className="w-full px-3 py-2 border rounded-lg text-sm focus:border-blue-500" />
      </div>
    </div>

    <div className="flex justify-end mt-4">
      <button type="button" onClick={() => remove(index)} className="text-red-500">Remove</button>
    </div>
  </div>
);

export default Education;
