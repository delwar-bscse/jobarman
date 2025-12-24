import Link from "next/link";
import CustomImage from "shared/CustomImage";

export default function MyRequestCard({ res }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
      {res?.data?.map((item) => (
        <Link href={`/my-request/${item._id}`} key={item._id}>
          <div
            key={item._id}
            className="relative bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex gap-4 items-start"
          >
            <CustomImage
              src={item.user.image}
              title={item.user.name}
              width={10}
              height={10}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="text-gray-900 font-semibold">{item.user.name}</p>
              <p className="text-sm text-gray-700">{item.user.designation}</p>
              <p className="text-xs text-gray-500">
                {item.year_of_experience} years expricence
              </p>
              <p className="mt-3 text-xs text-gray-600 leading-relaxed">
                {item.user.bio}
              </p>
            </div>
            <span className="absolute top-4 right-4 text-xs font-semibold text-green-600">
              {item.jobMatch || 0}% Match
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
