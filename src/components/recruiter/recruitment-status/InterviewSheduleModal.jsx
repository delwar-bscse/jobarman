"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { myFetch } from "utils/myFetch";
import { revalidate } from "utils/revalidateTags";
import { toast } from "sonner";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

export default function InterviewScheduleModal({ item, trigger }) {
  const interviewDetails = item?.interviewDetails;
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      date: dayjs(interviewDetails?.date).format("YYYY-MM-DD"),
      time: dayjs(
        `${new Date().toDateString()} ${interviewDetails?.time}`,
        "hh:mm A"
      ).format("HH:mm"),
      interview_type: interviewDetails?.interview_type,
    },
  });

  const onSubmit = async (data) => {
    const formatedTime = dayjs(
      `${new Date().toDateString()} ${data.time}`,
      "HH:mm"
    ).format("hh:mm A");

    try {
      const res = await myFetch(
        `/application/interview-change-time/${item._id}`,
        {
          method: "PATCH",
          body: {
            date: data?.date,
            time: formatedTime,
            interview_type: data?.interview_type,
          },
        }
      );

      console.log("res shedule", res);

      if (res.success) {
        await revalidate("interview-shedule");
        router.refresh();
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Interview Schedule</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Date */}
          <div className="mb-4">
            <Label
              htmlFor="interview-date"
              className="text-sm font-medium mb-1 block"
            >
              Date
            </Label>
            <Input type="date" {...register("date")} className="w-full" />
          </div>

          {/* Time */}
          <div className="mb-4">
            <Label
              htmlFor="interview-time"
              className="text-sm font-medium mb-1 block"
            >
              Time
            </Label>
            <Input type="time" {...register("time")} className="w-full" />
          </div>

          {/* Interview Type */}
          <div className="mb-6">
            <Label className="text-sm font-medium mb-2 block">
              Interview Type
            </Label>

            <div className="grid grid-cols-2 gap-2">
              <Label className="flex items-center border rounded-xl px-4 py-3 cursor-pointer gap-2 hover:bg-gray-50">
                <Input
                  type="radio"
                  value="onsite"
                  {...register("interview_type")}
                  className="accent-blue-600 h-4 w-4"
                />
                Onsite
              </Label>

              <Label className="flex items-center border rounded-xl px-4 py-3 cursor-pointer gap-2 hover:bg-gray-50">
                <Input
                  type="radio"
                  value="remote"
                  {...register("interview_type")}
                  className="accent-blue-600 h-4 w-4"
                />
                Remote
              </Label>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-700 text-white py-3 rounded-lg text-lg font-medium"
          >
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
