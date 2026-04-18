"use client";

import { Heart, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CustomImage from "../../../../shared/CustomImage";
import { toast } from "sonner";
import { myFetch } from "../../../../utils/myFetch";
import { revalidate } from "../../../../utils/revalidateTags";

export default function FavoriteListPage({ data }) {
  const handleFavoriteItem = async (id) => {
    try {
      const res = await myFetch("/favourite", {
        method: "POST",
        body: { post: id },
      });

      console.log("res : ", res);

      if (res.success) {
        toast.success(res.message || "favorite item add/remove successfully");
        await revalidate("favoritesList");
      } else {
        toast.error(res.message || "Favorite list not added");
      }
    } catch (err) {
      toast.error(err.message || "Favorite Not Select Try Again");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Job Card 1 */}
      {data?.map((item) => (
        <Link href={`/jobs/${item?._id}`} key={item?._id}>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
            <div className="">
              <CustomImage
                src={item?.post?.thumbnail}
                title={item?.post?.title}
                width={150}
                height={150}
                className="object-cover w-full h-40"
              />
            </div>
            <div className=" p-4 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-start gap-2 flex-1">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {item?.post?.title}
                      </h3>
                      <p className="text-sm text-gray-600">Design Lab</p>
                    </div>
                  </div>
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleFavoriteItem(item?.post?._id);
                    }}
                    className="text-red-500">
                    <Heart size={28} fill="currentColor" />
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <MapPin size={16} className="mr-1 flex-shrink-0" />
                  {item?.post?.location}
                </div>

                <div>
                  <p className="text-gray-400 text-md mt-1">
                    Job Board :{" "}
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-50 text-green-700 border border-green-200">
                      {item?.post?.job_board}
                    </span>
                  </p>
                  <p className="text-gray-400 text-md my-2">
                    apply :{" "}
                    {true && (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-200 text-green-700 border border-green-200">
                        Applied
                      </span>
                    )}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1">
                      <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                      <span className="text-gray-400 text-xs font-semibold rounded">
                        {item?.post?.job_type}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {/* <span className="w-3 h-3 bg-blue-500 rounded-full"></span> */}
                      <span className="text-gray-400 text-xs font-semibold rounded">
                        {item?.post?.min_salar} {item?.max_salar}
                      </span>
                    </div>
                  </div>
                  <div>
                    <Image
                      src="/calendar.svg"
                      alt="Calendar icon"
                      width={13}
                      height={16}
                      className="mr-1 inline-block"
                    />
                    <span className="text-[#FF8C00] text-xs font-semibold rounded">
                      {item?.deadline?.slice(0, 10)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
