import { Headset, Star } from "lucide-react";
import React from "react";
import { UploadCloud, PlusCircle, BadgeCheck, UserPlus } from "lucide-react";

const howItWorks = [
  {
    step: "Step-1",
    title: "Create Account",
    description: "Create your account to access personalized job matches, build your profile, and start applying with ease.",
    icon: UserPlus,
  },
  {
    step: "Step-2",
    title: "Upload CV/Resume",
    description: "Our AI analyzes your experience and skills to identify the best job opportunities for you.",
    icon: UploadCloud,
  },
  {
    step: "Step-3",
    title: "Find & Match Jobs",
    description:"AI finds jobs posted directly on Jobarman and opportunities sourced from trusted employers and job boards — all in one place. AI matches them to your skills",
    icon: PlusCircle,
  },
  {
    step: "Step-4",
    title: "Complete Application",
    description: "Apply directly on Jobarman for supported roles, or securely continue on the employer’s official website to complete your application",
    icon: BadgeCheck,
  },
  {
    step: "Step-5",
    title: "Receive Interviews",
    description: "Relax while employers review your application and reach out directly to you for next steps and interviews.",
    icon: Headset,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 sm:py-24 bg-[#FFF6F6] mb-14">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {howItWorks.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl py-6 sm:py-8 px-2 sm:px-4 bg-rose-50 border border-rose-100 hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer"
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
  );
}
