import Image from "next/image";
const galleryImages = [
  "/gallery1.jpg",
  "/gallery2.jpg",
  "/gallery3.jpg",
  "/gallery4.jpg",
  "/gallery5.jpg",
  "/gallery6.jpg",
  "/gallery7.jpg",
  "/gallery8.jpg",
];

export default function Home({ companyInfo }) {
  return (
    <>
      {/* Left Column */}
      <div className="w-[536px] space-y-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Overview</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            {companyInfo.aboutUs}
          </p>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Gallery</h3>
          <div className="grid grid-cols-4 gap-3">
            {galleryImages.map((img, index) => (
              <div
                key={index}
                className="aspect-square rounded-lg overflow-hidden"
              >
                <Image
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  width={150}
                  height={150}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
