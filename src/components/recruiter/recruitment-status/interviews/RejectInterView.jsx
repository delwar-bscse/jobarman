"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { myFetch } from "utils/myFetch";

export default function RejectInterView({ item, trigger }) {
  const handleReject = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const rejectedReason = formData.get("reason");
    try {
      const res = await myFetch(`/application/${item}`, {
        method: "PATCH",
        body: { status: "REJECTED", rejectedReason },
      });

      if (res?.success) {
        toast.success(res?.message || "Reject item successfully");
      } else {
        toast.error(res.message || "Reject item failed");
      }
    } catch (error) {
      toast.error(error.message || "Reject item failed");
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="">{trigger}</DialogTrigger>
      <DialogContent>
        <form className="mt-4" onSubmit={handleReject}>
          <Label className="text-xl mb-4"> Reject Interview</Label>
          <Textarea name="reason" className="mt-4" placeholder="Type here" />
          <Button className="w-full bg-[#2A57DE] mt-5 h-12" type="submit">
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
