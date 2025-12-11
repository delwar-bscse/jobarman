import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function RejectModal({ trigger }) {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <div className="">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Reject Reason</h2>
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
