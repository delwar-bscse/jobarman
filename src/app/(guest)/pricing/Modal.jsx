import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import React from "react";

export default function Modal({ trigger }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <div className="px-6 pt-8 pb-6">
          <div className="flex flex-col items-center text-center">
            <Image
              src="/avatars/kristin.svg"
              alt="Profile"
              width={80}
              height={80}
              className="h-20 w-20 rounded-full border border-gray-200"
            />
            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              Shakir Ahmed
            </h2>
            <p className="text-sm text-gray-500">UI/UX Designer</p>
            <p className="mt-1 text-sm font-medium text-orange-600">
              Premium Plan
            </p>
          </div>

          {/* Details */}
          <div className="mt-6 divide-y divide-gray-200 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-gray-600">Pack Name</span>
              <span className="text-sm font-medium text-gray-900">
                Premium Plan
              </span>
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-gray-600">Price</span>
              <span className="text-sm font-medium text-gray-900">$19.99</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-gray-600">Start Date</span>
              <span className="text-sm font-medium text-gray-900">
                01 January 2025
              </span>
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-gray-600">End Date</span>
              <span className="text-sm font-medium text-gray-900">
                31 January 2025
              </span>
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-gray-600">Remaining Days</span>
              <span className="text-sm font-medium text-gray-900">25 Days</span>
            </div>
          </div>

          {/* Renew button */}
          <div className="mt-6">
            <button
              type="button"
              className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-white font-semibold hover:bg-indigo-700 transition-colors"
            >
              Renew Pack
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
