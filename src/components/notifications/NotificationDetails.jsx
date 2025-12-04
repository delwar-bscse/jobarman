"use client";

import { GoStarFill } from "react-icons/go";
import { IoIosArrowBack } from "react-icons/io";

import { ChevronDownIcon, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Suspense, useState } from "react";
import { CustomModal } from "@/components/modal/CustomModal";
import { FaBars } from "react-icons/fa";
import Notifications from "@/components/notifications/Notifications";
import { useRouter, useSearchParams } from "next/navigation";

function NotificationDetailsSuspense() {
  const [isRotated, setIsRotated] = useState(false);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(undefined);
  const [time, setTime] = useState(undefined);



  const handleFilterData = () => {
    if (date && time) {
      const newDate = new Date(date);
      const newTime = time ? time.split(":").map(Number) : null;
      newDate.setHours(newTime[0], newTime[1], newTime[2] || 0, 0);
      const dateTime = newDate.toISOString();
      params.set("date", dateTime);
      replace(`?${params.toString()}`, { scroll: false });
    } else if (date) {
      const dateTime = date ? date.toISOString() : null;
      params.set("date", dateTime);
      replace(`?${params.toString()}`, { scroll: false });
    }
  };

  const resetDate = () => {
    setIsRotated(true);
    params.delete("date");
    replace(`?${params.toString()}`, { scroll: false });
    setDate(undefined);
    setTime(undefined);
    setTimeout(() => {
      setIsRotated(false);
    }, 500);
  }

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
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-1">
                <Label htmlFor="date-picker" className="px-1">
                  Date
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date-picker"
                      className="w-32 justify-between font-normal"
                    >
                      {date ? date.toLocaleDateString() : "Select date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setDate(date);
                        setOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center gap-1">
                <Label htmlFor="time-picker" className="px-1">
                  Time
                </Label>
                <Input
                  type="time"
                  id="time-picker"
                  step="1"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  defaultValue="00:00:00"
                  className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none w-32"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleFilterData}
                className="mt-4 bg-blue-500 text-white py-2 px-4 w-full rounded-md hover:bg-blue-600 transition-colors duration-300"
              >
                Apply
              </button>
            </div>
          </div>
        </CustomModal>
        <div>
          <RotateCcw onClick={() => resetDate()} className={`text-gray-500 cursor-pointer ${isRotated ? "animate-spinOnce" : ""}`} />
        </div>
      </div>
    </div>
  );
}

export default function NotificationDetails() {
  return (
    <Suspense fallback={<div>Loading...</div>} >
      <NotificationDetailsSuspense />
    </Suspense>
  )
}
