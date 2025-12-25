/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ChevronLeft, Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { myFetch } from "../../../../../utils/myFetch";
import RecruiterSidebar from "@/components/cui/RecruiterSidebar";
import Image from "next/image";
import { formatUrl } from "../../../../../utils/formatUrl";

export default function EditHome() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [galleryPreview, setGalleryPreview] = useState([]);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      bio: "",
      company_overview: "",
    },
  });

  const fetchProfile = async () => {
    const res = await myFetch(`/user/profile`);

    if (res.data) {
      const oldProfile = res.data;

      const cover = formatUrl(oldProfile.cover) || "";
      setPreview(cover);

      const normalized = {
        name: oldProfile.name || "",
        bio: oldProfile.bio || "",
        company_overview: oldProfile.company_overview || "",
      };

      reset(normalized);
    }
  };

  const fetchGallery = async () => {
    const res = await myFetch(`/user/gallery`);

    if (res.data) {
      const oldGallery = res.data.map((item) => {
        return {
          id: item?._id,
          image: formatUrl(item.image),
        };
      });

      setGalleryPreview(oldGallery);
    }
  };

  useEffect(() => {
    fetchGallery();
    fetchProfile();
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
    if (file) {
      formData.append("cover", file);
    }

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

  const handleFile = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setFile(file);
    };
    reader.readAsDataURL(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleGalleryFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataGallery = new FormData();
    formDataGallery.append("image", file);

    const resGallery = await myFetch("/user/gallery", {
      method: "POST",
      body: formDataGallery,
    });

    if (resGallery.success) {
      toast.success("Gallery update successfully");
      fetchGallery();
    } else {
      toast.error(resGallery.message || "Gallery update failed");
    }
  };

  const handleGalleryFileDelete = async (id) => {
    const res = await myFetch(`/user/gallery/${id}`, {
      method: "DELETE",
    });

    if (res.success) {
      fetchGallery();
    }
  };

  return (
    <div className="flex max-w-[1440px] mx-auto">
      <div>
        <RecruiterSidebar />
      </div>
      <div className="flex-1 max-w-[900px] mx-auto">
        <div className="w-full h-40 relative">
          {preview ? (
            <Image
              src={preview}
              alt="bg"
              width={1000}
              height={300}
              className="w-full h-40 object-cover"
            />
          ) : (
            <div className="w-full h-40 bg-gray-200" />
          )}
          <div
            onClick={() =>
              document.getElementById("recruiterCoverImage").click()
            }
            className="flex absolute bottom-4 right-4 items-center gap-2 bg-white p-2 rounded-lg text-gray-700 cursor-pointer"
          >
            <Pencil size={16} />
            <span>Edit Cover Image</span>
          </div>
          <button
            onClick={() => window.history.back()}
            type="button"
            className="absolute top-2 left-2 p-1 bg-gray-200 hover:bg-gray-200 rounded-full"
          >
            <ChevronLeft size={20} />
          </button>
          <input
            id="recruiterCoverImage"
            onChange={handleFile}
            type="file"
            accept="image/*"
            className="hidden"
          />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-7xl mx-auto p-6 bg-white min-h-screen"
        >
          {/* header */}
          {/* <div className="flex items-center gap-4 mb-8">
            <button onClick={() => window.history.back()} type="button" className="p-2 hover:bg-gray-200 rounded-lg">
              <ChevronLeft size={22} />
            </button>
          </div> */}
          {/* COMPANY NAME */}
          <div className="flex-1 items-center">
            <h2 className="text-xl font-bold mb-4">Company Name</h2>
            <input
              {...register("name")}
              placeholder="Type Company Name"
              className="mt-2 w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 text-center"
            />
          </div>

          {/* DESCRIPTION (Bio) */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Description</h2>
            <textarea
              {...register("bio")}
              placeholder="Enter company description"
              className="border w-full min-h-20 rounded-sm p-2"
            />
          </div>

          {/* OVERVIEW */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Overview</h2>
            <textarea
              placeholder="Type your overview"
              {...register("company_overview")}
              className="border w-full min-h-28 rounded-sm p-2"
            />
          </div>

          {/* similar structure for Projects, Education, Certifications… */}
          <div className="flex flex-wrap gap-3">
            <div
              onClick={() =>
                document.getElementById("recruiterGalleryImage").click()
              }
              className="border-2 border-dashed border-gray-400 size-48 flex flex-col items-center justify-center bg-gray-100 rounded-sm cursor-pointer"
            >
              <span className="text-5xl text-gray-500">+</span>
              <span className="font-semibold text-gray-500">Add Image</span>
              <input
                type="file"
                id="recruiterGalleryImage"
                accept="image/*"
                onChange={handleGalleryFile}
                className="hidden"
              />
            </div>
            {galleryPreview.length > 0 &&
              galleryPreview.map((item) => (
                <div
                  key={item.id}
                  className="relative size-48 border-2 border-gray-200 rounded-sm overflow-hidden"
                >
                  <Image
                    src={item.image}
                    alt="gallery image"
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                  <span
                    onClick={() => handleGalleryFileDelete(item.id)}
                    className="absolute top-2 right-2 bg-gray-300 rounded-full size-5 flex items-center justify-center text-[12px] font-semibold text-gray-600 cursor-pointer"
                  >
                    X
                  </span>
                </div>
              ))}
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
    </div>
  );
}
