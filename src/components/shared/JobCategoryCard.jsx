import CustomImage from "../../../shared/CustomImage";

export default function JobCategoryCard({ icon, label, count }) {
  return (
    <div className="border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
      <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
        {/* <Icon className="w-8 h-8 text-blue-600" /> */}
        <CustomImage src={icon} title={label} />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{label}</h3>
      <p className="text-sm text-gray-500">{count}</p>
    </div>
  );
}
