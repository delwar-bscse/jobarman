"use client"

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

export function MessageModal({
  trigger,
  children,
}) {

  return (
    <Dialog className="">
      <form>
        <DialogTrigger asChild>
          <div className="cursor-pointer">
            {trigger}
          </div>
        </DialogTrigger>
        <DialogContent className="w-[360px]">
          {children}
        </DialogContent>
      </form>
    </Dialog>
  )
}
