import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CancelInterview({ trigger }) {
  return (
    <Dialog>
      <DialogTrigger className="w-[50%]">{trigger}</DialogTrigger>
      <DialogContent>
        <div className="mt-4">
          <Label className="text-xl mb-4"> Cancel Reason</Label>
          <Textarea className="mt-4" placeholder="Type here" />
          <Button className="w-full bg-[#2A57DE] mt-5 h-12" type="submit">
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
