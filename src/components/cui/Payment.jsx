"use client";
import dayjs from "dayjs";
import React from "react";

export default function PaymentHistory({ divRef, selectedTransaction }) {
  return (
    <div className="">
      <div ref={divRef} className="">
        <div className="mb-6">
          <p className="text-3xl font-bold text-[#FF8F27]">
            {selectedTransaction.price}
          </p>
          <p className="text-sm text-gray-600 mt-1">Service Information</p>
          <p className="text-lg font-semibold text-gray-900 mt-2">
            {selectedTransaction.name}
          </p>
          <p className="inline-block mt-2 px-3 py-1 leading-4 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
            {selectedTransaction.status}
          </p>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="font-bold text-gray-900 mb-4">User Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Name</span>
              <span className="font-semibold text-gray-900">
                {selectedTransaction?.user?.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Location</span>
              <span className="font-semibold text-gray-900">
                {selectedTransaction?.user?.address}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">E-Mail</span>
              <span className="font-semibold text-gray-900">
                {selectedTransaction?.user?.email}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 mt-6">
          <h3 className="font-bold text-gray-900 mb-4">Payment Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Service Fee</span>
              <span className="font-semibold text-gray-900">
                {selectedTransaction.price}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Trx ID</span>
              <span className="font-semibold text-gray-900">1234567891001</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date & Time</span>
              <span className="font-semibold text-gray-900">
                {dayjs(selectedTransaction?.createdAt)?.format(
                  "YYYY-MM-DD HH:mm A"
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span className="font-semibold text-gray-900">0.00</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-3 mt-3">
              <span className="font-bold text-gray-900">Total:</span>
              <span className="font-bold text-gray-900">
                {selectedTransaction.price}
              </span>
            </div>
          </div>
        </div>
        <div className="h-2" />
      </div>

      <button
        // onClick={handleDownload}
        className="w-full mt-6 border-2 border-blue-600 text-blue-600 font-bold py-3 px-4 rounded-lg hover:bg-blue-50"
      >
        Download Payment History
      </button>
    </div>
  );
}
