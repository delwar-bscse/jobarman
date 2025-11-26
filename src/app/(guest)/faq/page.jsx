"use client";
import Image from "next/image";
import React, { useState } from "react";

const faqs = [
  {
    q: "Can I access company information and salary details?",
    a: "Yes. Each job card and detail page can include company profile, location, and salary range when provided by the employer.",
  },
  {
    q: "How can I ensure I'm only seeing relevant job listings?",
    a: "Use filters like role, experience level, location, and salary range. Save filters to quickly revisit personalized results.",
  },
  {
    q: "Are there resources for career transitions into high-earning roles?",
    a: "We offer curated articles and courses on upskilling, plus mentorship programs from industry experts.",
  },
  {
    q: "How often are new job listings added to the board?",
    a: "New postings arrive daily. Turn on notifications to get alerts for matching roles.",
  },
  {
    q: "Which are the top companies hiring in the US?",
    a: "Our Top Companies section highlights brands actively hiring and trending across different sectors.",
  },
  {
    q: "What are effective strategies for an executive job search?",
    a: "Tailor your resume for leadership impact, network with decision-makers, and target niche executive boards.",
  },
  {
    q: "What are effective strategies for an executive job search?",
    a: "Leverage referrals, maintain a strong LinkedIn presence, and prepare concise achievement stories for interviews.",
  },
];

const Item = ({ i, open, onToggle, q, a }) => {
  const isOpen = open === i;
  return (
    <div className="rounded-md border border-gray-200 bg-white">
      <button
        onClick={() => onToggle(isOpen ? null : i)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <span className="text-sm text-gray-800">{q}</span>
        <span
          className={
            "w-6 h-6 grid place-items-center rounded-full border " +
            (isOpen ? "text-gray-700" : "text-gray-600")
          }
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>
      {isOpen && <div className="px-4 pb-4 text-sm text-gray-600">{a}</div>}
    </div>
  );
};

export default function FAQPage() {
  const [open, setOpen] = useState(null);

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="flex justify-start">
          <Image
            src="/forgot.svg"
            width={10}
            height={10}
            alt="FAQ Illustration"
            className="max-w-md w-full"
          />
        </div>

        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h1>

          <div className="mt-6 space-y-3">
            {faqs.map((f, idx) => (
              <Item
                key={idx}
                i={idx}
                open={open}
                onToggle={setOpen}
                q={f.q}
                a={f.a}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
