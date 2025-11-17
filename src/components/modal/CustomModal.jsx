"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function CustomModal({
  trigger,
  title = "Filter Options",
  children,
}) {

  return (
    <Dialog className="">
      <form>
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
        <DialogContent className="w-full max-w-[280px] sm:max-w-[424px]">
          <DialogHeader>
            <DialogTitle className="text-left">{title}</DialogTitle>
          </DialogHeader>

          <div className="py-4">{children}</div>

          <DialogFooter className="hidden">
            <DialogClose id="cancel" asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
