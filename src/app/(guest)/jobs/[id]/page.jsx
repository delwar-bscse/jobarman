"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, use } from "react";
import {
  Heart,
  MapPin,
  DollarSign,
  ChevronLeft,
  Calendar,
  ArrowRight,
  Briefcase,
  GraduationCap,
  X,
  UploadCloud,
} from "lucide-react";

// Enhanced mock job data aligned to screenshot content
const mockJobsData = {
  1: {
    id: 1,
    title: "Senior UX Designer",
    company: "Flatco",
    location: "Dhaka, Bangladesh",
    salary: "$50k-80k/Month",
    type: "Full Time",
    date: "01 Sep 2025",
    image: "/cardpic.png",
    description:
      "Velstar Is A Shopify Plus Agency, And We Partner With Brands To Help Them Grow, We Also Do The Same With Our People! Here At Velstar, We Don't Just Make Websites, We Create Exceptional Digital Experiences That Consumers Love. Our Team Of Designers, Developers, Strategists, And Creators Work Together To Push Brands To The Next Level. From Platform Migration, User Experience & User Interface Design, To Digital Marketing, We Have A Proven Track Record In Delivering Outstanding ECommerce Solutions And Driving Sales For Our Clients. The Role Will Involve Translating Project Specifications Into Clean, Test-Driven, Easily Maintainable Code. You Will Work With The Project And Development Teams As Well As With The Technical Director, Adhering Closely To Project Plans And Delivering Work That Meets Functional & Non-Functional Requirements. You Will Have The Opportunity To Create New, Innovative, Secure And Scalable Features For Our Clients On The Shopify Platform",
    requirements: [
      "Great Troubleshooting And Analytical Skills Combined With The Desire To Tackle Challenges Head-On",
      "3+ Years Of Experience In Back-End Development Working Either With Multiple Smaller Projects Simultaneously Or Large-Scale Applications",
      "Experience With HTML, JavaScript, CSS, PHP, Symphony And/Or Laravel",
    ],
    responsibilities: [
      "Translate specs into clean, test-driven code",
      "Work closely with project and development teams",
      "Deliver functional and non-functional requirements",
      "Create secure and scalable Shopify features",
      "Participate in code reviews and improvements",
    ],
    benefits: [
      "Early Finish On Fridays For Our End Of Week Catch Up (4:30 Finish, And Drink Of Your Choice From The Bar)",
    ],
    companyInfo: {
      size: "50-200 employees",
      industry: "Ecommerce / Technology",
      founded: "2018",
      website: "www.flatco.com",
    },
    postedDate: "01 Sep 2025",
    expireDate: "25 Sep 2025",
    applicants: "24 applicants",
    remote: false,
    experience: "Entry Level",
  },
};

const HeroBanner = ({ title }) => {
  return (
    <div className="relative">
      <Image
        src="/alljobs.png"
        alt="Job banner"
        width={1440}
        height={400}
        priority
        className="w-full h-56 sm:h-72 md:h-80 lg:h-96 object-cover"
      />
      <div className="absolute top-4 left-4">
        <Link
          href="/jobs"
          className="inline-flex items-center rounded-full bg-white/90 text-gray-900 px-3 py-1.5 shadow hover:bg-white"
        >
          <ChevronLeft size={20} className="mr-1" />
          Back
        </Link>
      </div>
    </div>
  );
};

const JobDetailsPage = ({ params }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const resolvedParams = use(params);
  const jobId = resolvedParams.id;
  const job = mockJobsData[jobId] || mockJobsData[1];
  const companySlug = job.company.toLowerCase().replace(/\s+/g, "-");

  const toggleSaveJob = () => setIsSaved((prev) => !prev);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section to match provided screenshots */}
      <HeroBanner title={job.title} />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: job details */}
          <div className="lg:col-span-2">
            {/* Job Header Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                {/* Left: Logo + Title + Pills */}
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden ring-1 ring-gray-200">
                    <Image
                      src={job.image}
                      alt={`${job.company} logo`}
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                      {job.title}
                    </h1>
                    <div className="mt-1 text-sm">
                      <span className="text-gray-600">at</span>{" "}
                      <Link
                        href={`/company/${companySlug}`}
                        className="text-blue-600 font-medium hover:underline"
                      >
                        {job.company}
                      </Link>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-50 text-green-700 border border-green-200">
                        FULL-TIME
                      </span>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        Onsite
                      </span>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                        {job.type}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Save + Apply */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleSaveJob}
                    className="rounded-full border border-gray-300 w-10 h-10 grid place-items-center text-gray-600 hover:bg-gray-100"
                  >
                    <Heart
                      size={18}
                      className={isSaved ? "text-red-500" : ""}
                      fill={isSaved ? "currentColor" : "none"}
                    />
                  </button>
                  <button
                    onClick={() => setIsApplyOpen(true)}
                    className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold inline-flex items-center gap-2"
                  >
                    Apply Now <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Job Description
              </h2>
              <p className="text-gray-700 leading-relaxed">{job.description}</p>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Requirements
              </h2>
              <ul className="space-y-2">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Responsibilities */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Responsibilities
              </h2>
              <ul className="space-y-2">
                {job.responsibilities.map((resp, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Benefits & Perks
              </h2>
              <ul className="space-y-2">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Profile Match + Location */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="grid grid-cols-2 divide-x">
                <div className="pr-6">
                  <p className="text-base font-medium text-gray-800">
                    Profile Match
                  </p>
                  <p className="text-2xl font-bold text-green-600 mt-1">70%</p>
                </div>
                <div className="pl-6 flex flex-col items-center text-center">
                  <MapPin size={28} className="text-blue-600 mb-2" />
                  <p className="text-base font-medium text-gray-800">
                    Job Location
                  </p>
                  <p className="text-gray-600 mt-1">{job.location}</p>
                </div>
              </div>
            </div>

            {/* Job Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Job Overview
              </h3>
              {/* Top row: 3 columns */}
              <div className="grid grid-cols-3 gap-8 text-sm">
                <div className="flex flex-col items-start p-3">
                  <Calendar size={24} className="text-blue-600 mb-2" />
                  <span className="text-gray-600">Job Posted:</span>
                  <span className="font-semibold text-gray-900">
                    {job.postedDate}
                  </span>
                </div>
                <div className="flex flex-col items-start p-3">
                  <Calendar size={24} className="text-blue-600 mb-2" />
                  <span className="text-gray-600">Job Expire In:</span>
                  <span className="font-semibold text-gray-900">
                    {job.expireDate}
                  </span>
                </div>
                <div className="flex flex-col items-start p-3">
                  <Briefcase size={24} className="text-blue-600 mb-2" />
                  <span className="text-gray-600">Job Level:</span>
                  <span className="font-semibold text-gray-900">
                    {job.experience}
                  </span>
                </div>
              </div>
              {/* Bottom row: 2 columns */}
              <div className="mt-4 grid grid-cols-2 gap-8 text-sm">
                <div className="flex flex-col items-start p-3">
                  <DollarSign size={24} className="text-blue-600 mb-2" />
                  <span className="text-gray-600">Salary</span>
                  <span className="font-semibold text-gray-900">
                    {job.salary}
                  </span>
                </div>
                <div className="flex flex-col items-start p-3">
                  <GraduationCap size={24} className="text-blue-600 mb-2" />
                  <span className="text-gray-600">Education</span>
                  <span className="font-semibold text-gray-900">
                    Graduation
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isApplyOpen && (
        <ApplyModal job={job} onClose={() => setIsApplyOpen(false)} />
      )}
    </div>
  );
};

export default JobDetailsPage;

const ApplyModal = ({ job, onClose }) => {
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();

    onClose();
  };

  const stop = (e) => e.stopPropagation();

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="mx-auto max-w-2xl w-full p-4" onClick={stop}>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <Image
                src={job.image}
                alt={`${job.company}`}
                width={56}
                height={56}
                className="rounded-md"
              />
              <div>
                <p className="text-base font-semibold">{job.title}</p>
                <p className="text-sm text-gray-600">{job.location}</p>
              </div>
            </div>
            <button
              aria-label="Close"
              onClick={onClose}
              className="rounded-full p-2 hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={onSubmit} className="p-4 space-y-5">
            <div>
              <label className="block text-gray-800 font-medium mb-2">
                Resume
              </label>
              <div className="rounded-lg border border-gray-300 bg-gray-50 p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image src="/file.svg" alt="file" width={32} height={32} />
                  <span className="text-gray-700">
                    {resume ? resume.name : "Upload your resume"}
                  </span>
                </div>
                <label className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-700 cursor-pointer hover:bg-gray-100">
                  <UploadCloud size={18} />
                  <span className="text-sm font-medium">Choose File</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(e) => setResume(e.target.files?.[0] ?? null)}
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-gray-800 font-medium mb-2">
                Cover Letter
              </label>
              <div className="rounded-lg border border-gray-300 bg-gray-50 p-6 text-center">
                <label className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-700 cursor-pointer hover:bg-gray-100">
                  <UploadCloud size={18} />
                  <span className="text-sm font-medium">
                    Upload Cover Letter
                  </span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(e) =>
                      setCoverLetter(e.target.files?.[0] ?? null)
                    }
                  />
                </label>
                {coverLetter && (
                  <p className="mt-2 text-sm text-gray-600">
                    {coverLetter.name}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
// Remove dangling render placed outside component
// (Deleted) {isApplyOpen && <ApplyModal job={job} onClose={() => setIsApplyOpen(false)} />}
