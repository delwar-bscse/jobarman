/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ChevronLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { myFetch } from "../../../../../utils/myFetch";
import RecruiterSidebar from "@/components/cui/RecruiterSidebar";

export default function EditAbout() {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      about_us: "",
      mission: "",
      total_employees: 0,
      company_type: "",
      founded: "",
      revenue: 0,
      website: "",
      email: "",
      contact: "",
      address: "",
    },
  });

  const fetchProfile = async () => {
    const res = await myFetch(`/user/profile`);

    if (res.data) {
      const oldProfile = res.data;

      const normalized = {
        about_us: oldProfile.about_us || "",
        mission: oldProfile.mission || "",
        total_employees: oldProfile.overview?.total_employees || 0,
        company_type: oldProfile.overview?.company_type || "",
        founded: oldProfile.overview?.founded || "",
        revenue: oldProfile.overview?.revenue || 0,
        website: oldProfile.contactInfo?.website || "",
        email: oldProfile.contactInfo?.email || "",
        contact: oldProfile.contactInfo?.contact || "",
        address: oldProfile.contactInfo?.address || "",
      };

      reset(normalized);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const onSubmit = async (data) => {
    const f1 = {
      total_employees: data.total_employees,
      company_type: data.company_type,
      founded: data.founded,
      revenue: data.revenue,
    };
    const f2 = {
      website: data.website,
      email: data.email,
      contact: data.contact,
      address: data.address,
    };
    const formData = new FormData();

    formData.append("about_us", data.about_us);
    formData.append("mission", data.mission);
    formData.append("overview", JSON.stringify(f1));
    formData.append("contactInfo", JSON.stringify(f2));

    try {
      const res = await myFetch("/user/profile", {
        method: "PATCH",
        body: formData,
      });

      if (res.success) {
        toast.success("Profile update successfully");
      } else {
        toast.error(res.message || "Profile update failed");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex-1 max-w-[900px] mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-7xl mx-auto p-6 bg-white min-h-screen"
      >
        {/* header */}
        {/* <div className="flex items-center gap-4 mb-8">
            <button type="button" className="p-2 hover:bg-gray-200 rounded-lg">
              <ChevronLeft size={22} />
            </button>


          </div> */}

        {/* ABOUT US */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">About Us</h2>
          <textarea
            {...register("about_us")}
            placeholder="About Us"
            className="border w-full min-h-28 rounded-sm p-2"
          />
        </div>

        {/* MISSION */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Mission</h2>
          <textarea
            placeholder="Mission"
            {...register("mission")}
            className="border w-full min-h-28 rounded-sm p-2"
          />
        </div>

        <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-4  gap-3 pb-8">
          {/* TOTAL EMPLOYEES */}
          <div className="flex-1 items-center">
            <span className=" text-gray-700">Total Employees</span>
            <input
              {...register("total_employees")}
              type="number"
              min={0}
              placeholder="Total Employees"
              className="mt-2 w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* COMPANY TYPE */}
          <div className="flex-1 items-center">
            <span className=" text-gray-700">Company Type</span>
            <input
              {...register("company_type")}
              placeholder="Company Type"
              className="mt-2 w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* FOUNDED */}
          <div className="flex-1 items-center">
            <span className=" text-gray-700">Founded</span>
            <input
              {...register("founded")}
              type="number"
              min={0}
              placeholder="Founded"
              className="mt-2 w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* REVENUE */}
          <div className="flex-1 items-center">
            <span className=" text-gray-700">Revenue</span>
            <input
              {...register("revenue")}
              placeholder="Revenue"
              className="mt-2 w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-4 gap-3">
          {/* WEBSITE */}
          <div className="flex-1 items-center">
            <span className=" text-gray-700">Website</span>
            <input
              {...register("website")}
              placeholder="Website URL"
              className="mt-2 w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* EMAIL */}
          <div className="flex-1 items-center">
            <span className=" text-gray-700">Email</span>
            <input
              {...register("email")}
              placeholder="Email"
              className="mt-2 w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* CONTACT */}
          <div className="flex-1 items-center">
            <span className=" text-gray-700">Contact</span>
            <input
              {...register("contact")}
              placeholder="Contact"
              className="mt-2 w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* ADDRESS */}
          <div className="flex-1 items-center">
            <span className=" text-gray-700">Address</span>
            <input
              {...register("address")}
              placeholder="Address"
              className="mt-2 w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-center pt-8">
          <button
            type="submit"
            className="px-20 py-3 bg-blue-600 text-white rounded-lg shadow-md"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
