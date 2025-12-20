"use client"

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image"
import { formatUrl } from "utils/formatUrl"

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
        <DialogContent className="w-full max-w-[280px] sm:max-w-[500px]">

          <div className="py-4">
            <Image
              src={formatUrl(image)}
              alt="Job"
              width={700}
              height={700}
              priority
              className="rounded-md w-100 h-auto object-cover cursor-pointer"
            />
          </div>
        </DialogContent>
      </form>
    </Dialog>
  )
}
