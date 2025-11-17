/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Star,
  Code,
  Palette,
  Users,
  Stethoscope,
  UtensilsCrossed,
  ArrowRight,
  CheckCircle,
  FileText,
  UploadCloud,
  PlusCircle,
  BadgeCheck,
  UserPlus,
  Zap,
  TrendingUp,
  Search,
  SlidersHorizontal,
  X,
  MapPin,
  Calendar,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

import Link from "next/link";

import ReviewCard from "@/components/shared/ReviewCard";
import JobCategoryCard from "@/components/shared/JobCategoryCard";
import SubscriptionCard from "@/components/shared/SubscriptionCard";
import ResumeGenerator from "../../../shared/ResumeGenerator";

const recentJobs = [
  {
    id: 1,
    title: "Sr. UIUX Designer",
    company: "Design-Hill",
    location: "California, United State.",
    type: "Full Time",
    remote: true,
    remaining: "05 Days Remaining",
    image: "/cardpic.png",
  },
  {
    id: 2,
    title: "Sr. UIUX Designer",
    company: "Design-Hill",
    location: "California, United State.",
    type: "Full Time",
    remote: true,
    remaining: "05 Days Remaining",
    image: "/cardpic.png",
  },
  {
    id: 3,
    title: "Sr. UIUX Designer",
    company: "Design-Hill",
    location: "California, United State.",
    type: "Full Time",
    remote: true,
    remaining: "05 Days Remaining",
    image: "/cardpic.png",
  },
  {
    id: 4,
    title: "Sr. UIUX Designer",
    company: "Design-Hill",
    location: "California, United State.",
    type: "Full Time",
    remote: true,
    remaining: "05 Days Remaining",
    image: "/cardpic.png",
  },
];

export default function Home() {
  const [reviews, setReviews] = useState([]);

  // Recent Job Request candidates data
  const recentRequests = [
    {
      id: 1,
      name: "Ronald Richards",
      role: "Sr. UIUX Designer",
      experience: "5 Years Experience",
      match: 90,
      avatar: "/avatars/floyd.svg",
      about:
        "A Dedicated And Reliable Professional With Strong Teamwork And Problem-Solving Skills, Committed To Delivering Quality Results On Time.",
    },
    {
      id: 2,
      name: "Albert Flores",
      role: "Sr. UIUX Designer",
      experience: "5 Years Experience",
      match: 70,
      avatar: "/avatars/courtney.svg",
      about:
        "A Dedicated And Reliable Professional With Strong Teamwork And Problem-Solving Skills, Committed To Delivering Quality Results On Time.",
    },
    {
      id: 3,
      name: "Cody Fisher",
      role: "Sr. UIUX Designer",
      experience: "5 Years Experience",
      match: 40,
      avatar: "/avatars/marvin.svg",
      about:
        "A Dedicated And Reliable Professional With Strong Teamwork And Problem-Solving Skills, Committed To Delivering Quality Results On Time.",
    },
  ];

  // Filters modal state
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [category, setCategory] = useState("Sr. UI/UX Designer");
  const [employeeType, setEmployeeType] = useState("Full Time");
  const [jobType, setJobType] = useState("Remote");
  const [minSalary, setMinSalary] = useState("5000");
  const [maxSalary, setMaxSalary] = useState("8000");
  const [distance, setDistance] = useState(10);

  // AI banner carousel state & data
  const [aiPage, setAiPage] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const aiSlides = [
    { src: "/alljobs.png", alt: "UX Conference" },
    { src: "/banner.png", alt: "We are Hiring UI/UX" },
    { src: "/company.jpg", alt: "Coaching Classes" },
    { src: "/cardpic.png", alt: "Career Growth" },
    { src: "/areYouEmploy.png", alt: "Employer Spotlight" },
  ];
  const startXRef = useRef(0);
  const draggingRef = useRef(false);
  const [paused, setPaused] = useState(false);

  const getClientX = (e) => ("touches" in e ? e.touches[0].clientX : e.clientX);
  const handleDragStart = (e) => {
    draggingRef.current = true;
    startXRef.current = getClientX(e);
  };
  const handleDragEnd = (e) => {
    if (!draggingRef.current) return;
    const diff = getClientX(e) - startXRef.current;
    const threshold = 60; // px
    if (diff < -threshold && aiPage < totalPages - 1) setAiPage(aiPage + 1);
    else if (diff > threshold && aiPage > 0) setAiPage(aiPage - 1);
    draggingRef.current = false;
    startXRef.current = 0;
  };

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w < 640) setSlidesPerView(1);
      else if (w < 1024) setSlidesPerView(2);
      else setSlidesPerView(3);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  const totalPages = Math.ceil(aiSlides.length / slidesPerView);
  const pages = Array.from({ length: totalPages }, (_, i) =>
    aiSlides.slice(i * slidesPerView, i * slidesPerView + slidesPerView)
  );

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/testimonials.json");
        if (!res.ok) return;
        const data = await res.json();
        setReviews(data);
      } catch (e) {
        // silent fail
      }
    };
    load();
  }, []);



  const jobCategories = [
    { icon: Stethoscope, label: "Healthcare", count: "2.5k jobs" },
    { icon: Code, label: "IT Jobs", count: "5.2k jobs" },
    { icon: Palette, label: "UX Designer", count: "1.8k jobs" },
    { icon: Users, label: "Management", count: "3.1k jobs" },
    { icon: Stethoscope, label: "Healthcare", count: "2.5k jobs" },
    { icon: UtensilsCrossed, label: "Restaurant", count: "1.2k jobs" },
  ];

  // testimonials data moved to shared module: ./components/shared/testimonials

  const howItWorks = [
    {
      step: "Step-1",
      title: "Create Account",
      description:
        "Create Your Account To Access Personalized Job Matches, Build Your Profile, And Start Applying With Ease.",
      icon: UserPlus,
    },
    {
      step: "Step-2",
      title: "Upload CV/Resume",
      description:
        "Our AI Analyzes Your Experience And Skills To Identify The Best Job Opportunities For You.",
      icon: UploadCloud,
    },
    {
      step: "Step-3",
      title: "Auto-Apply With AI",
      description:
        "Let AI Do The Hard Work: It Finds The Right Jobs, Matches Them To Your Skills, And Applies For You Automatically.",
      icon: PlusCircle,
    },
    {
      step: "Step-4",
      title: "Receive Interviews",
      description:
        "Relax While Our AI Brings The Right Opportunities Your Way, Turning Applications Into Interviews.",
      icon: BadgeCheck,
    },
  ];

  const [subscriptionPlans, setSubscriptionPlans] = useState([]);

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const res = await fetch("/subscription-plans.json");
        if (!res.ok) return;
        const data = await res.json();
        setSubscriptionPlans(data);
      } catch (e) {
        // silent fail
      }
    };
    loadPlans();
  }, []);

  return (
    <main className="w-full bg-white">
      <section className="py-12 sm:py-16 lg:py-20 bg-[#E1F6FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div>
              <p className="text-sm sm:text-base font-semibold text-orange-500 mb-2">
                AI-Powered Job Matching
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 leading-snug sm:leading-tight lg:leading-tight text-balance">
                Land Your Dream Job
                <br />
                In <span className="text-blue-600">IT</span> &{" "}
                <span className="text-orange-500">Healthcare</span>
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-6 text-balance">
                Our AI Matches You With The Right Roles And Even Applies On Your
                Behalf—So You Can Focus On What Matters. More Interviews, Better
                Opportunities, Faster.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button className="px-6 w-2/3 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-[#123499] to-[#2A57DE] text-white rounded-lg hover:opacity-90 transition font-medium flex items-center justify-center gap-2 text-sm sm:text-base">
                  Start Auto Apply <ArrowRight className="w-4 h-4" />
                </button>

              </div>
              <div className="flex flex-wrap gap-4 sm:gap-6 mt-6 sm:mt-8 text-xs sm:text-sm lg:text-base">
                <div className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-green-500" />
                  <span>AI Job Matching</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <BadgeCheck className="w-4 sm:w-5 h-4 sm:h-5 text-orange-500" />
                  <span>Verified Company</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Zap className="w-4 sm:w-5 h-4 sm:h-5 text-purple-500" />
                  <span>Fast Application</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <TrendingUp className="w-4 sm:w-5 h-4 sm:h-5 text-teal-500" />
                  <span>Career Growth</span>
                </div>
              </div>
            </div>

            {/* Right Images */}
            <div className="w-full flex justify-center lg:justify-end mt-6 lg:mt-0">
              <img
                src="/groupHome.svg"
                alt="Banner"
                className="rounded-lg w-full max-w-xs sm:max-w-md lg:max-w-lg h-auto"
              />
            </div>
          </div>
        </div>
      </section>


      {/* Search Section below Hero */}
      <section className="py-6 sm:py-10 lg:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4 sm:mb-6 lg:mb-8">
            <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-[#123499]">
              Find Your Dream Job Today!
            </h2>
            <p className="text-gray-600 mt-1 sm:mt-2 lg:mt-3 text-sm sm:text-base lg:text-lg">
              Connecting Talent with Opportunity: Your Gateway to Career Success
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            {/* Input area */}
            <div className="flex-1 flex items-center bg-blue-50 w-full">
              <input
                type="text"
                placeholder="Job Title or Company"
                className="w-full bg-transparent px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 text-gray-700 placeholder-gray-500 outline-none text-sm sm:text-base lg:text-lg"
              />
            </div>

            {/* Divider + sliders icon */}
            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              aria-label="Open Filters"
              className="hidden sm:flex items-center px-3 sm:px-4 border-t sm:border-t-0 sm:border-l border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              <SlidersHorizontal className="w-4 sm:w-5 lg:w-5 h-4 sm:h-5 lg:h-5" />
            </button>

            {/* Search button */}
            <button className="flex items-center gap-2 bg-gradient-to-r from-[#123499] to-[#2A57DE] text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 font-medium text-sm sm:text-base lg:text-lg w-full sm:w-auto justify-center">
              <Search className="w-4 sm:w-4 lg:w-5 h-4 sm:h-4 lg:h-5" />
              Search Job
            </button>
          </div>
        </div>
      </section>




      {/* AI Banner Carousel below Hero */}
      <section className="py-6 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="relative overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onMouseDown={handleDragStart}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchEnd={handleDragEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${aiPage * 100}%)` }}
            >
              {pages.map((group, pageIndex) => (
                <div
                  key={pageIndex}
                  className="min-w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {group.map((s, i) => (
                    <div
                      key={`${pageIndex}-${i}`}
                      className="bg-white rounded-xl shadow-sm border overflow-hidden"
                    >
                      <img
                        src={s.src}
                        alt={s.alt}
                        className="w-full h-40 sm:h-48 object-cover"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Dots navigation */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setAiPage(i)}
                  className={`w-2.5 h-2.5 rounded-full ${aiPage === i ? "bg-[#123499]" : "bg-gray-300"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Who’s Hiring Right Now banner */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-xl overflow-hidden">
            <img
              src="/company.jpg"
              alt="Hiring Now"
              className="w-full h-56 sm:h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/40 to-orange-600/70" />
            <div className="absolute inset-y-0 right-0 w-full sm:w-1/2 flex flex-col justify-center p-6 sm:p-10 text-white">
              <h2 className="text-2xl sm:text-4xl font-bold leading-tight text-balance">
                Who’s Hiring Right Now
              </h2>
              <p className="mt-3 text-sm sm:text-base text-orange-100 text-balance">
                Discover Leading Organizations That Are Rapidly Expanding And
                Building Stronger Teams.
              </p>
              <div className="mt-6">
                <Link href="/jobs">
                  <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {filtersOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setFiltersOpen(false)}
          />
          <div className="relative bg-white w-[92%] max-w-md rounded-xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                onClick={() => setFiltersOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-5">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                >
                  <option>Sr. UI/UX Designer</option>
                  <option>Frontend Engineer</option>
                  <option>Backend Engineer</option>
                  <option>Product Designer</option>
                </select>
              </div>

              {/* Employee Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee Type
                </label>
                <div className="flex gap-2">
                  {[
                    { label: "Full Time" },
                    { label: "Part Time" },
                    { label: "Intern" },
                  ].map((t) => (
                    <button
                      key={t.label}
                      type="button"
                      onClick={() => setEmployeeType(t.label)}
                      className={`px-4 py-2 rounded-md text-sm ${employeeType === t.label
                          ? "bg-[#123499] text-white"
                          : "bg-gray-100 text-gray-700"
                        }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Job Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Type
                </label>
                <div className="flex gap-2">
                  {[
                    { label: "Remote" },
                    { label: "Onsite" },
                    { label: "Hybrid" },
                  ].map((t) => (
                    <button
                      key={t.label}
                      type="button"
                      onClick={() => setJobType(t.label)}
                      className={`px-4 py-2 rounded-full text-sm ${jobType === t.label
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700"
                        }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Salary Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salary Range
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="block text-xs text-gray-500 mb-1">
                      Min Salary
                    </span>
                    <input
                      type="text"
                      value={minSalary}
                      onChange={(e) => setMinSalary(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 text-sm"
                      placeholder="$5000"
                    />
                  </div>
                  <div>
                    <span className="block text-xs text-gray-500 mb-1">
                      Max Salary
                    </span>
                    <input
                      type="text"
                      value={maxSalary}
                      onChange={(e) => setMaxSalary(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 text-sm"
                      placeholder="$8000"
                    />
                  </div>
                </div>
              </div>

              {/* Distance */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Distance
                </label>
                <input
                  type="range"
                  min={1}
                  max={20}
                  step={1}
                  value={distance}
                  onChange={(e) => setDistance(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1km</span>
                  <span>{distance} km</span>
                  <span>20 Km</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setFiltersOpen(false)}
              className="w-full mt-5 bg-orange-500 text-white rounded-lg py-3 font-semibold"
            >
              Apply
            </button>
          </div>
        </div>
      )}
      {/* Recent Job Post Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-3 text-balance">
            Recent Job Post
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8 text-balance">
            Discover Jobs That Truly Match Your Skills And Goals. Connect With
            Top Employers And Take The Next Step In Your Career Effortlessly.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center gap-4"
              >
                <img
                  src={job.image}
                  alt={job.title}
                  className="w-36 h-24 rounded-lg object-cover"
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
                    <span className="flex items-center gap-2 text-gray-700">
                      <span className="w-2 h-2 bg-blue-600 rounded-full inline-block"></span>
                      {job.remote ? "Remote" : "Onsite"}
                    </span>
                  </div>
                </div>
                <div className="hidden sm:flex flex-col items-end">
                  <div className="flex items-center gap-1 text-orange-500 text-sm font-medium">
                    <Calendar className="w-4 h-4" />
                    {job.remaining}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Link href="/jobs">
              <button className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium flex items-center gap-2">
                Brows All
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>
      {/* Recent Job Request Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-3 text-balance">
            Recent Job Request
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8 text-balance">
            Discover Jobs That Truly Match Your Skills And Goals. Connect With
            Top Employers And Take The Next Step In Your Career Effortlessly.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentRequests.map((p) => (
              <div
                key={p.id}
                className="relative bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex gap-4 items-start"
              >
                <img
                  src={p.avatar}
                  alt={p.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="text-gray-900 font-semibold">{p.name}</p>
                  <p className="text-sm text-gray-700">{p.role}</p>
                  <p className="text-xs text-gray-500">{p.experience}</p>
                  <p className="mt-3 text-xs text-gray-600 leading-relaxed">
                    {p.about}
                  </p>
                </div>
                <span className="absolute top-4 right-4 text-xs font-semibold text-green-600">
                  {p.match}% Match
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Link href="/jobs">
              <button className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium flex items-center gap-2">
                Brows All
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>
      {/* Job Categories Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12 text-balance">
            Job Category
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {jobCategories.map((category, index) => (
              <JobCategoryCard
                key={index}
                icon={category.icon}
                label={category.label}
                count={category.count}
              />
            ))}
          </div>

          <div className="flex justify-center">
            <Link href="/allCategory">
              <button className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium flex items-center gap-2">
                Browse All
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>
      {/* Social Proof Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-balance">
              Join over 1,000,000 professionals
            </h2>
            <p className="text-xl text-gray-600 mb-4 text-balance">
              already using Jobarman.
            </p>
            <p className="text-gray-600 max-w-2xl mx-auto text-balance">
              Explore Personalized Career Opportunities In Your Field With Our
              AI-Driven Platform, Designed To Connect You With The Right Roles
              That Match Your Skills And Ambitions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((t, index) => (
              <ReviewCard
                key={index}
                name={t.name}
                role={t.role}
                rating={t.rating}
                text={t.text}
                image={t.image}
              />
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Link href="/reviews">
              <button className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium">
                View All Reviews
              </button>
            </Link>
          </div>
        </div>
      </section>


      {/* Resume Score Generator Section */}
      <ResumeGenerator></ResumeGenerator>


      {/* How it works at Jobarman */}
      <section className="py-16 sm:py-24 bg-[#FFF6F6] mb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-balance">
              How it works at Jobarman
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-balance">
              Jobarman simplifies hiring with easy job posting, AI-powered
              screening, and smart applicant management. From posting to
              onboarding, everything happens seamlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl p-6 sm:p-8 bg-rose-50 border border-rose-100 hover:bg-white hover:shadow-md transition-all duration-300"
              >
                <p className="text-xs text-gray-500 mb-4">{item.step}</p>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-[#123499] text-white flex items-center justify-center mb-4">
                    {item.icon ? (
                      <item.icon className="w-8 h-8" />
                    ) : (
                      <Star className="w-8 h-8" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-[#123499] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Are You Employer Section */}
      <section className="bg-[#EFF5FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-[#EFF5FF] rounded-lg p-8 sm:p-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-balance">
                Are you employer?
              </h2>
              <p className="text-gray-600 mb-6 text-balance">
                Hiring has never been this easy. With our platform, you can post
                job openings in just a few steps and instantly connect with
                thousands of active job seekers. Manage applications in real
                time, review candidate profiles, and invite the right people for
                interviews directly from your dashboard.
              </p>
              <button className="px-16 py-3 bg-gradient-to-r from-[#123499] to-[#2A57DE] text-white rounded-lg transition font-medium">
                Post a Job
              </button>
            </div>
            <div>
              <img
                src="/areYouEmploy.png"
                alt="Employer"
                className="rounded-lg w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Subscription Plan Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-[#123499] mb-4 text-balance">
              Subscription Plan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {subscriptionPlans.map((plan, index) => (
              <SubscriptionCard key={index} plan={plan} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
