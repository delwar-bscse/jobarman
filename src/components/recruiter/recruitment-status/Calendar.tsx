"use client";

import { Calendar } from "@/components/ui/calendar";
import * as React from "react";

export default function CalendarPage() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(2025, 5, 12)
  );

  const handleOk = () => {
    console.log("Selected date:", date);
    // Add your callback logic here
  };

  const handleCancel = () => {
    setDate(undefined); // or close modal
    console.log("Cancelled");
  };

  return (
    <div className="p-4 w-full max-w-sm mx-auto rounded-lg border shadow-sm">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
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
