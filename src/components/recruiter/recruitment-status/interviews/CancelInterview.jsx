"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { myFetch } from "utils/myFetch";
import { revalidate } from "utils/revalidateTags";

export default function CancelInterview({ item, trigger }) {
  const [open, setOpen] = useState(false);
  const handleReject = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const reason = formData.get("reason");

    try {
      const res = await myFetch(`/application/cancel-interview/${item}`, {
        method: "DELETE",
        body: { reason },
      });

      if (res?.success) {
        toast.success(res?.message || "Cancel Interview item successfully");
        await revalidate("status");
        setOpen(false);
      } else {
        toast.error(res.message || "Cancel Interview item failed");
      }
    } catch (error) {
      toast.error(error.message || "RCancel Interview  item failed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="">{trigger}</DialogTrigger>
      <DialogContent>
        <form className="mt-4" onSubmit={handleReject}>
          <Label className="text-xl mb-4"> Cancel Reason</Label>
          <Textarea name="reason" className="mt-4" placeholder="Type here" />
          <Button className="w-full bg-[#2A57DE] mt-5 h-12" type="submit">
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
