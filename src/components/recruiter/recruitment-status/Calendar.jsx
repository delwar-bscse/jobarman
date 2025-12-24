"use client";

import { Calendar } from "@/components/ui/calendar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import * as React from "react";

export default function CalendarPage() {
  const [date, setDate] = React.useState();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleOk = () => {
    // Add your callback logic here
  };

  const handleCancel = () => {
    setDate(undefined); // or close modal
  };

  const handleSelectDate = (selectedDate) => {
    setDate(selectedDate);

    if (!selectedDate) return;

    const params = new URLSearchParams(searchParams);
    params.set("interview_date", selectedDate.toLocaleDateString("en-CA"));
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="p-4 w-full max-w-sm mx-auto rounded-lg border shadow-sm">
      <Calendar
        mode="single"
        selected={date}
        onSelect={handleSelectDate}
        className="rounded-lg"
        buttonVariant="ghost"
      />

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-4">
        {/* Cancel */}
        <button
          onClick={handleCancel}
          className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>

        {/* OK */}
        <button
          onClick={handleOk}
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
        >
          OK
        </button>
      </div>
    </div>
  );
}
