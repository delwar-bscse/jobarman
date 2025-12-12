export default function About({ profileData, toCapitalizeSentence }) {
  return (
    <div className="space-y-6">
      <div className="">
        <h3 className="text-lg font-bold text-gray-900 mb-1">About Us</h3>
        <p className="text-gray-700 text-sm leading-relaxed">
          {profileData?.about_us}
        </p>
      </div>

      <div className="">
        <h3 className="text-lg font-bold text-gray-900 mb-1">Mission</h3>
        <p className="text-gray-700 text-sm leading-relaxed">
          {profileData?.mission}
        </p>
      </div>

      {/* Company History */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">
          Company History
        </h3>
        <div>
          {typeof profileData?.overview === "object" &&
            Object.entries(profileData?.overview)?.map(([key, value]) => {
              if (!value) return null;
              if (key === "_id") return null;
              return (
                <div key={key} className="flex gap-2">
                  <h3 className="text-gray-800 leading-relaxed w-40">
                    {toCapitalizeSentence(key)}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    : {value as any}
                  </p>
                </div>
              );
            })}
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">
          Contact Information
        </h3>
        <div>
          {typeof profileData?.overview === "object" &&
            Object.entries(profileData?.contactInfo)?.map(([key, value]) => {
              if (!value) return null;
              if (key === "_id") return null;
              return (
                <div key={key} className="flex gap-2">
                  <h3 className="text-gray-800 leading-relaxed w-20">
                    {toCapitalizeSentence(key)}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    : {value as any}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
