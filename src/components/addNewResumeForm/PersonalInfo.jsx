import { MapPin, Phone, Mail, Link, Briefcase, User } from "lucide-react";

export default function PersonalInfo({ register }) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">Personal Information</h2>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium">Full Name</label>
          <div className="flex items-center gap-2 border px-3 py-2 rounded-lg">
            <User size={18} className="text-gray-400" />
            <input
              {...register("personalInfo.full_name")}
              placeholder="Enter your address"
              className="flex-1 outline-none text-sm"
            />
          </div>
        </div>
        {/* Address */}
        <div>
          <label className="text-sm font-medium">Address</label>
          <div className="flex items-center gap-2 border px-3 py-2 rounded-lg">
            <MapPin size={18} className="text-gray-400" />
            <input
              {...register("personalInfo.address")}
              placeholder="Enter your address"
              className="flex-1 outline-none text-sm"
            />
          </div>
        </div>

        {/* Contact */}
        <div>
          <label className="text-sm font-medium">Contact</label>
          <div className="flex items-center gap-2 border px-3 py-2 rounded-lg">
            <Phone size={18} className="text-gray-400" />
            <input
              {...register("personalInfo.phone")}
              placeholder="+1234567890"
              className="flex-1 outline-none text-sm"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium">Email</label>
          <div className="flex items-center gap-2 border px-3 py-2 rounded-lg">
            <Mail size={18} className="text-gray-400" />
            <input
              {...register("personalInfo.email")}
              placeholder="user@gmail.com"
              className="flex-1 outline-none text-sm"
            />
          </div>
        </div>

        {/* Social Media */}
        <div>
          <label className="text-sm font-medium">Social Media</label>
          <div className="flex items-center gap-2 border px-3 py-2 rounded-lg">
            <Link size={18} className="text-gray-400" />
            <input
              {...register("personalInfo.social_media_link")}
              placeholder="linkedin.com/profile"
              className="flex-1 outline-none text-sm"
            />
          </div>
        </div>

        {/* Portfolio */}
        {/* <div>
          <label className="text-sm font-medium">Portfolio</label>
          <div className="flex items-center gap-2 border px-3 py-2 rounded-lg">
            <Briefcase size={18} className="text-gray-400" />
            <input
              {...register("personalInfo.portfolio")}
              placeholder="github.com/username"
              className="flex-1 outline-none text-sm"
            />
          </div>
        </div> */}
      </div>
    </section>
  );
}
