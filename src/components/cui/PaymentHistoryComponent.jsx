/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useRef, useState } from "react";
import { FileText, Eye, EyeOff, X } from "lucide-react";
import Image from "next/image";
import dayjs from "dayjs";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { myFetch } from "../../../utils/myFetch";
import { toast } from "sonner";
import PaymentHistory from "./Payment";

export default function PaymentHistoryComponent() {
  const [paymentId, setPaymentId] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(true);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [showPaymentHistory, setShowPaymentHistory] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const divRef = useRef(null);

  const handlePasswordContinue = async () => {
    if (password.trim()) {
      const res = await myFetch("/subscription/transactions", {
        method: "POST",
        body: { password },
      });

      if (res?.success) {
        setShowPasswordModal(false);
        setShowOTPModal(true);
        toast.success(res.message);
      } else {
        toast.error(res?.message);
      }
    }
  };

  const fetchPaymentDetails = async () => {
    const res = await myFetch(`/subscription/details/${paymentId}`, {
      method: "GET",
    });

    if (res?.success) {
      setSelectedTransaction(res?.data);
    }
  };

  useEffect(() => {
    fetchPaymentDetails();
  }, [paymentId]);

  const handleOTPChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
    }
  };

  const handleOTPVerify = async () => {
    const res = await myFetch(
      `/subscription/transactions-by-otp?otp=${otp.join("")}`,
      { method: "GET" }
    );

    if (res?.success) {
      setTransactions(res?.data);
      setShowOTPModal(false);
      setShowPaymentHistory(true);
      setPaymentId(res?.data[0]?._id);
      toast.success(res.message);
    } else {
      toast.error(res?.message);
    }
  };

  // Download payment details PDF
  const handleDownload = async () => {
    const element = divRef.current;

    // Capture the original div
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    // PDF setup
    // const pdf = new jsPDF("p", "mm", "a6");
    const pdf = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: [100, 160],
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Original image dimensions (in px)
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // Convert px → mm (because jsPDF uses mm)
    const ratio = imgWidth / imgHeight;
    const mmWidth = 92; // Choose any size, but maintain aspect ratio
    const mmHeight = mmWidth / ratio;

    // Center horizontally + vertically
    const x = (pdfWidth - mmWidth) / 2;
    const y = (pdfHeight - mmHeight) / 2;

    pdf.addImage(imgData, "PNG", x, y, mmWidth, mmHeight);
    pdf.save("payment-details.pdf");
  };

  return (
    <div className="max-w-7xl mx-auto min-h-screen bg-[#FBFBFB]">
      <div className="">
          {!showPaymentHistory ? (
            <div className="flex items-center justify-center min-h-screen">
              {/* Password Modal */}
              {showPasswordModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-8 w-96 relative">
                    <button
                      onClick={() => setShowPasswordModal(false)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-6 h-6" />
                    </button>

                    <div className="text-center mb-6">
                      <Image
                        className="flex justify-self-center"
                        src="/authlogo.svg"
                        alt="Auth Logo"
                        width={150}
                        height={150}
                      />
                    </div>

                    <p className="text-center text-gray-700 mb-6 text-sm">
                      For Security, Enter Your Account Password To Continue To
                      Payment History.
                    </p>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter your password"
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handlePasswordContinue}
                      className="w-full bg-gradient-to-r from-[#123499] to-[#2A57DE] text-white font-bold py-3 px-4 rounded-lg hover:from-[#0f2f85] hover:to-[#2247b6]"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* OTP Modal */}
              {showOTPModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-8 w-96 relative px-2">
                    <button
                      onClick={() => setShowOTPModal(false)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-6 h-6" />
                    </button>

                    <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
                      OTP Verification
                    </h2>
                    <p className="text-center text-gray-600 text-sm mb-6">
                      Enter The 6-Digit Code We Sent To Your Email To Verify
                      Your Payment.
                    </p>

                    <div className="flex gap-3 justify-center mb-6">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          id={`otp-${index}`}
                          type="text"
                          maxLength="1"
                          value={digit}
                          onChange={(e) =>
                            handleOTPChange(index, e.target.value)
                          }
                          className="w-12 h-12 border-2 border-gray-300 rounded-lg text-center text-lg font-bold focus:outline-none focus:border-blue-500"
                        />
                      ))}
                    </div>

                    <p className="text-end text-md text-gray-600 mb-6">
                      Didn&apos;t receive a code?{" "}
                      <span className="text-blue-600 font-semibold cursor-pointer hover:underline">
                        Resend
                      </span>
                    </p>

                    <button
                      onClick={handleOTPVerify}
                      className="w-full bg-gradient-to-r from-[#123499] to-[#2A57DE] text-white font-bold py-3 px-4 rounded-lg hover:from-[#0f2f85] hover:to-[#2247b6]"
                    >
                      Verify
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Payment History Display */
            <div className="max-w-6xl mx-auto">
              <div className="grid gap-8">
                {/* Transaction List */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                    Payment History
                  </h1>
                  <div className="space-y-3">
                    {transactions.map((transaction) => (
                      <div
                        key={transaction._id}
                        onClick={() => setPaymentId(transaction._id)}
                        className={`p-4 rounded-lg cursor-pointer transition-colors ${selectedTransaction?._id === transaction._id
                            ? "bg-[#FEF3E6] border"
                            : "bg-gray-50 border border-gray-200 hover:bg-gray-100"
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">
                              {transaction.name}
                            </p>
                            <p className="text-xs text-gray-600">
                              {dayjs(transaction.startDate).format(
                                "YYYY-MM-DD HH:mm A"
                              )}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-900">
                              {transaction.price}
                            </p>
                            <p className="text-xs text-green-600 font-semibold">
                              {transaction.status}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Details */}
                <div className="bg-white rounded-lg p-6 border border-gray-200 max-h-full overflow-y-auto">
                  {selectedTransaction && (
                    <PaymentHistory
                      divRef={divRef}
                      selectedTransaction={selectedTransaction}
                      handleDownload={handleDownload}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
    </div>
  );
}
