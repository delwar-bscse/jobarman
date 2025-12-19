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
import Image from "next/image"

export function ImageModal({
  trigger,
  image,
}) {

  return (
    <Dialog className="">
      <form>
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
        <DialogContent className="w-full max-w-[280px] sm:max-w-[424px]">

          <div className="py-4">
            <Image
              src={image}
              alt="Job"
              width={70}
              height={70}
              priority
              className="rounded-md"
            />
          </div>

          {/* <DialogFooter className="hidden">
            <DialogClose id="cancel" asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter> */}
        </DialogContent>
      </form>
    </Dialog>
  )
}
