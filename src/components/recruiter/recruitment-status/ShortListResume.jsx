"use client";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ShortListResume({ data }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleParams = (id) => {
    const params = new URLSearchParams(searchParams);
    params.set("id", id);
    router.replace(`${pathname}?${params}`);
  };

  return (
    <div>
      {data?.map((item) => (
        <div
          className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200 w-full cursor-pointer"
          key={item._id}
          onClick={() => handleParams(item._id)}
        >
          {/* Profile Image */}
          <Image
            src="/chat-user.jpg"
            className="w-20 h-20 sm:w-20 sm:h-20  object-cover flex-shrink-0 bg-muted"
            width={10}
            height={10}
            alt="ok"
            sizes="100vh"
          />
          {/* Details */}
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-gray-900">
              {item?.user?.name}
            </h2>
            <p className="text-sm text-gray-700">{item?.title}</p>
            <p className="text-xs text-gray-500">
              {item?.year_of_experience} Years Experience
            </p>

            <button className="mt-2 w-fit rounded-lg border border-blue-600 px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 transition">
              Schedule: 01 Oct 2025 At 11 Am
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
