import Image from "next/image";

export default function Home({ profileData, galleryPreview }) {
  return (
    <div className="space-y-8">
      {/* Left Column */}
      <div className="space-y-6">
        <div className="">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Overview</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            {profileData?.company_overview}
          </p>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        <div className="">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Gallery</h3>
          <div className="grid grid-cols-4 gap-3">
            {galleryPreview?.map((item) => (
              <div
                key={item.id}
                className="aspect-square rounded-lg overflow-hidden"
              >
                <Image
                  src={item.image}
                  alt={`Gallery Image ${item.id}`}
                  width={150}
                  height={150}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
