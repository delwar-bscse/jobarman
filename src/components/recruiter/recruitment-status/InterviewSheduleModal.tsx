import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InterviewSheduleModal({ trigger }) {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <div className="">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Interview Schedule</h2>
          </div>

          {/* Date */}
          <div className="mb-4">
            <label className="text-sm font-medium mb-1 block">Date</label>
            <div className="relative">
              <Input
                type="date"
                defaultValue="01 Oct 2025"
                className="w-full border rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Time */}
          <div className="mb-4">
            <label className="text-sm font-medium mb-1 block">Time</label>
            <div className="relative">
              <Input
                type="time"
                defaultValue="09:00 AM"
                className="w-full border rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {/* <span className="absolute right-3 top-3 text-gray-500 text-lg">
                ⏰
              </span> */}
            </div>
          </div>

          {/* Interview Type */}
          <div className="mb-4">
            <label className="text-sm font-medium mb-2 block">
              Interview Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center border rounded-xl px-4 py-3 cursor-pointer gap-2 hover:bg-gray-50">
                <Input
                  type="radio"
                  name="type"
                  className="accent-blue-600 h-4 w-4"
                />
                Onsite
              </label>

              <label className="flex items-center border rounded-xl px-4 py-3 cursor-pointer gap-2 hover:bg-gray-50">
                <Input
                  type="radio"
                  name="type"
                  className="accent-blue-600 h-4 w-4"
                />
                Remote
              </label>
            </div>
          </div>

          {/* Note */}
          <div className="mb-6">
            <Label className="text-sm font-medium mb-1 block">Note</Label>
            <textarea
              placeholder="Type Here"
              className="w-full border rounded-xl px-4 py-3 min-h-[80px] resize-none text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <Button className="w-full bg-blue-700 text-white py-3 rounded text-lg font-medium  transition">
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
