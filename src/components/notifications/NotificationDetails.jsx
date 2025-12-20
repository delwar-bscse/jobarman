"use client";

import { IoIosArrowBack } from "react-icons/io";
import { RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Suspense, useState } from "react";
import { CustomModal } from "@/components/modal/CustomModal";
import { useRouter, useSearchParams } from "next/navigation";

function NotificationDetailsSuspense() {
  const [isRotated, setIsRotated] = useState(false);
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const { replace } = useRouter();

  const handleFilterDate = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const date = formData.get("date");

    const params = new URLSearchParams(searchParams);
    date ? params.set("date", date) : params.delete("date");

    replace(`?${params.toString()}`);
  };

  return (
    <div className="flex gap-3 justify-between  mb-6">
      <div
        onClick={() => history.back()}
        className="flex items-center text-gray-800 hover:text-gray-700 gap-2cursor-pointer"
      >
        <IoIosArrowBack className="text-2xl sm:text-3xl font-bold" />
        <h1 className="text-2xl sm:text-3xl font-semibold">Notifications</h1>
      </div>
      <div className="flex items-center gap-1">
        <CustomModal
          title="Filter Notifications"
          trigger={
            <button className="border border-gray-400 px-3 py-1 text-gray-500 rounded-md cursor-pointer">
              Filters
            </button>
          }
        >
          <div className="space-y-4">
            <form onSubmit={handleFilterDate} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-2">
                  <Label htmlFor="date" className="whitespace-nowrap">
                    Date
                  </Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    className="w-full"
                    defaultValue={date}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-blue-500 py-2 px-4 text-white transition-colors duration-300 hover:bg-blue-600"
              >
                Apply
              </button>
            </form>
          </div>
        </CustomModal>
        <div>
          <RotateCcw
            onClick={() => resetDate()}
            className={`text-gray-500 cursor-pointer ${
              isRotated ? "animate-spinOnce" : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
}

export default function NotificationDetails() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotificationDetailsSuspense />
    </Suspense>
  );
}
