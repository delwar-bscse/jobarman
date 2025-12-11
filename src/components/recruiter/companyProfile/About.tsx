export default function About({ companyInfo }) {
  return (
    <>
      {/* Left Column */}
      <div className="w-[536px] space-y-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">About Us</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            {companyInfo.aboutUs}
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Specialties</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            {companyInfo.specialties}
          </p>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Company Information
          </h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-gray-600">Industry: </span>
              <span className="text-gray-900 font-medium">
                {companyInfo.industry}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Company Size: </span>
              <span className="text-gray-900 font-medium">
                {companyInfo.companySize}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Headquarters: </span>
              <span className="text-gray-900 font-medium">
                {companyInfo.headquarters}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Type: </span>
              <span className="text-gray-900 font-medium">
                {companyInfo.type}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Founded: </span>
              <span className="text-gray-900 font-medium">
                {companyInfo.founded}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Specialties: </span>
              <span className="text-gray-900 font-medium">
                {companyInfo.specialtiesList}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
