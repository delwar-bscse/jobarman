/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useEffect, useRef, useState } from "react"
import { FileText, Eye, EyeOff, X } from "lucide-react"
import Image from "next/image"
import dayjs from "dayjs"
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import EmployeeSidebar from "./EmployeeSidebar"
import { myFetch } from "../../../utils/myFetch"
import RecruiterSidebar from "./ReqruiterSidebar"
import { usePathname } from "next/navigation"

export default function PaymentHistoryComponent() {
  const pathname = usePathname();
  const [paymentId, setPaymentId] = useState(null)
  const [showPasswordModal, setShowPasswordModal] = useState(true)
  const [showOTPModal, setShowOTPModal] = useState(false)
  const [showPaymentHistory, setShowPaymentHistory] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [transactions, setTransactions] = useState([])

  const divRef = useRef(null);

  const handlePasswordContinue = async () => {
    if (password.trim()) {
      const res = await myFetch("/subscription/transactions", { method: "POST", body: { password } });
      console.log("password response : ", res);

      if (res?.success) {
        setShowPasswordModal(false);
        setShowOTPModal(true);
      }
    }
  }

  const fetchPaymentDetails = async () => {
    const res = await myFetch(`/subscription/details/${paymentId}`, { method: "GET" });
    console.log("Payment details response : ", res);

    if (res?.success) {
      setSelectedTransaction(res?.data)
    }
  }

  useEffect(() => {
    console.log("Pathname : ", pathname);
    fetchPaymentDetails()
  }, [paymentId])

  const handleOTPChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`)?.focus()
      }
    }
  }

  const handleOTPVerify = async () => {
    console.log("otp : ", otp.join(""));
    const res = await myFetch(`/subscription/transactions-by-otp?otp=${otp.join("")}`, { method: "GET" });
    console.log("otp response : ", res);

    if (res?.success) {
      setTransactions(res?.data)
      setShowOTPModal(false)
      setShowPaymentHistory(true)
      setPaymentId(res?.data[0]?._id)
      // setSelectedTransaction(res?.data[0])
    }
  }

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
    <div className="w-full bg-[#FBFBFB]">
      <div className="flex min-h-screen max-w-7xl mx-auto py-10">
        {/* Sidebar */}
        {pathname === "/profile/payment" ? <EmployeeSidebar /> : <RecruiterSidebar />}

        {/* Main Content */}
        <div className="flex-1 ml-8">
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
                      <Image className="flex justify-self-center" src="/authlogo.svg" alt="Auth Logo" width={150} height={150} />
                    </div>

                    <p className="text-center text-gray-700 mb-6 text-sm">
                      For Security, Enter Your Account Password To Continue To Payment History.
                    </p>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
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
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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
                  <div className="bg-white rounded-lg p-8 w-96 relative">
                    <button
                      onClick={() => setShowOTPModal(false)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-6 h-6" />
                    </button>

                    <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">OTP Verification</h2>
                    <p className="text-center text-gray-600 text-sm mb-6">
                      Enter The 6-Digit Code We Sent To Your Email To Verify Your Payment.
                    </p>

                    <div className="flex gap-3 justify-center mb-6">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          id={`otp-${index}`}
                          type="text"
                          maxLength="1"
                          value={digit}
                          onChange={(e) => handleOTPChange(index, e.target.value)}
                          className="w-12 h-12 border-2 border-gray-300 rounded-lg text-center text-lg font-bold focus:outline-none focus:border-blue-500"
                        />
                      ))}
                    </div>

                    <p className="text-end text-md text-gray-600 mb-6">
                      Didn&apos;t receive a code?{" "}
                      <span className="text-blue-600 font-semibold cursor-pointer hover:underline">Resend</span>
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

              <div className="grid gap-8" style={{ gridTemplateColumns: "1fr 1fr" }}>
                {/* Transaction List */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h1 className="text-2xl font-semibold text-gray-900 mb-4">Payment History</h1>
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
                            <p className="font-semibold text-gray-900">{transaction.name}</p>
                            <p className="text-xs text-gray-600">{dayjs(transaction.startDate).format("YYYY-MM-DD HH:mm A")}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-900">{transaction.price}</p>
                            <p className="text-xs text-green-600 font-semibold">{transaction.status}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Details */}
                <div className="bg-white rounded-lg p-6 border border-gray-200 max-h-full overflow-y-auto">
                  {selectedTransaction && (
                    <div className="">
                      <div ref={divRef} className="">
                        <div className="mb-6">
                          <p className="text-3xl font-bold text-[#FF8F27]">{selectedTransaction.price}</p>
                          <p className="text-sm text-gray-600 mt-1">Service Information</p>
                          <p className="text-lg font-semibold text-gray-900 mt-2">{selectedTransaction.name}</p>
                          <p className="inline-block mt-2 px-3 py-1 leading-4 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                            {selectedTransaction.status}
                          </p>
                        </div>

                        <div className="border-t border-gray-200 pt-6">
                          <h3 className="font-bold text-gray-900 mb-4">User Information</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Name</span>
                              <span className="font-semibold text-gray-900">{selectedTransaction?.user?.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Location</span>
                              <span className="font-semibold text-gray-900">{selectedTransaction?.user?.address}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">E-Mail</span>
                              <span className="font-semibold text-gray-900">{selectedTransaction?.user?.email}</span>
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-gray-200 pt-6 mt-6">
                          <h3 className="font-bold text-gray-900 mb-4">Payment Details</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Service Fee</span>
                              <span className="font-semibold text-gray-900">{selectedTransaction.price}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Trx ID</span>
                              <span className="font-semibold text-gray-900">1234567891001</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Date & Time</span>
                              <span className="font-semibold text-gray-900">{dayjs(selectedTransaction.createdAt).format("YYYY-MM-DD HH:mm A")}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Tax</span>
                              <span className="font-semibold text-gray-900">0.00</span>
                            </div>
                            <div className="flex justify-between border-t border-gray-200 pt-3 mt-3">
                              <span className="font-bold text-gray-900">Total:</span>
                              <span className="font-bold text-gray-900">{selectedTransaction.price}</span>
                            </div>
                          </div>
                        </div>
                        <div className="h-2" />
                      </div>

                      <button onClick={handleDownload} className="w-full mt-6 border-2 border-blue-600 text-blue-600 font-bold py-3 px-4 rounded-lg hover:bg-blue-50">
                        Download Payment History
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}