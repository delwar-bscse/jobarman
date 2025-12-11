import { ArrowRight, Calendar, MapPin } from "lucide-react";
import CustomImage from "../../../shared/CustomImage";
import Link from "next/link";
import { myFetch } from "../../../utils/myFetch";

export default async function RecentJobPost() {
  const res = await myFetch("/job-post/recent-posts");

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-3 text-balance">
          Recent Job Post
        </h2>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8 text-balance">
          Discover Jobs That Truly Match Your Skills And Goals. Connect With Top
          Employers And Take The Next Step In Your Career Effortlessly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {res?.data?.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center gap-4"
            >
              <CustomImage
                src={job.thumbnail}
                title={job.title}
                width={30}
                height={30}
                className="w-10 h-10 rounded-lg"
              />
              <div className="flex-1">
                <Link
                  href={`/jobs/${job.id}`}
                  className="text-gray-900 font-semibold hover:text-blue-600"
                >
                  {job.title}
                </Link>
                <div className="text-sm mt-1">
                  <Link href="#" className="text-blue-600 hover:underline">
                    {job.company}
                  </Link>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-gray-600" />
                  <span>{job.location}</span>
                </div>
                <div className="mt-2 flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-2 text-gray-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full inline-block"></span>
                    {job.type}
                  </span>
                  <span className="flex items-center text-gray-700">
                    {/* <span className="w-2 h-2 bg-blue-600 rounded-full inline-block"></span> */}
                    {job.remote ? "Remote" : "Onsite"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Link href="/my-job">
            <button className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium flex items-center gap-2">
              Brows All
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
