"use client";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Github,
  Users,
  Settings,
  BriefcaseBusiness,
  FolderOpenDot,
  GraduationCap,
  Award,
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export default function ResumeDetails({ resume }) {
  const divRef = useRef(null);
  const {
    full_name,
    address,
    phone,
    email,
    social_media_link,
    nationality,
    clearance,
  } = resume.personalInfo || {};


  const handleDownload = async () => {
    const element = divRef.current;
    element.setAttribute("data-pdf", "true");

    const canvas = await html2canvas(element, {
      scale: 2, // sharp output, non-negotiable
      useCORS: true,
    });

    element.removeAttribute("data-pdf");

    const imgData = canvas.toDataURL("image/png");

    // A4 PDF (210 × 297 mm)
    const pdf = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();   // 210
    const pdfHeight = pdf.internal.pageSize.getHeight(); // 297

    const imgWidthPx = canvas.width;
    const imgHeightPx = canvas.height;

    // Convert px → mm (jsPDF uses mm)
    const pxToMm = 0.264583; // standard conversion
    const imgWidthMm = imgWidthPx * pxToMm;
    const imgHeightMm = imgHeightPx * pxToMm;

    // Scale to fit A4 while preserving aspect ratio
    const scale = Math.min(
      pdfWidth / imgWidthMm,
      pdfHeight / imgHeightMm
    );

    const finalWidth = imgWidthMm * scale;
    const finalHeight = imgHeightMm * scale;

    // Center content
    const x = (pdfWidth - finalWidth) / 2;
    const y = (pdfHeight - finalHeight) / 2;

    pdf.addImage(imgData, "PNG", x, y, finalWidth, finalHeight);
    pdf.save("payment-details-a4.pdf");
  };


  return (
    <div className="relative">
      <button className="absolute top-4 right-4 text-gray-600 hover:text-blue-600 font-semibold transition-colors duration-300" onClick={handleDownload}>Download</button>
      <div ref={divRef} className="h-full overflow-y-auto bg-white rounded-lg p-4 sm:p-5 lg:p-6 space-y-5 sm:space-y-6">
        {/* ==== Contact ==== */}
        <div className="border-b border-gray-300 pb-4 sm:pb-5">
          <h2 className="text-center text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            {full_name}
          </h2>

          <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-gray-700 justify-center bb-2">
            {[
              { Icon: MapPin, text: address },
              { Icon: Phone, text: phone },
              { Icon: Mail, text: email },
              { Icon: Linkedin, text: social_media_link },
            ].map(({ Icon, text }, i) => (
              <div key={i} className="flex items-center gap-1">
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500 pdf-no-truncate" />
                <p className="truncate max-w-28 sm:max-w-none pdf-no-truncate">{text}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mb-2">
            <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-700">
              <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500 pdf-no-truncate" />
              <span className="truncate max-w-32 sm:max-w-none pdf-no-truncate">
                {resume.github}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-700 text-center">
            <span className="font-medium">Work Auth:</span> {nationality} |{" "}
            <span className="font-medium">Clearance:</span> {clearance} |{" "}
            <span className="font-medium">Open To:</span> Remote
          </p>
        </div>

        {/* ==== Summary ==== */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-6 h-6 sm:w-7 sm:h-7 text-[#123499]" />
            <h3 className="text-lg sm:text-xl font-bold text-[#123499]">
              SUMMARY
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-800 leading-relaxed">
            {resume.summary ||
              `Database Administrator with 8+ years managing large SQL environments across on-prem and cloud (Azure/AWS). Expert in HA/DR, performance tuning, security, and backups/recovery. Proven record improving query performance, hardening data security, and delivering resilient platforms supporting 150+ critical apps / 50TB data at 99.97% availability.
Highlights: Reduced P90 query times by 65%, cut storage/costs 40% via compression/tiering, met RPO 15min / RTO 30min for business-critical databases`}
          </p>
          {resume.highlights && (
            <p className="text-xs sm:text-sm text-gray-700 mt-2">
              <span className="font-medium">Highlights:</span> {resume.highlights}
            </p>
          )}
        </div>

        {/* ==== Core Skills ==== */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Settings className="w-6 h-6 sm:w-7 sm:h-7 text-[#123499]" />
            <h3 className="text-lg sm:text-xl font-bold text-[#123499]">
              CORE SKILLS
            </h3>
          </div>
          <div className="grid grid-cols-1  sm:gap-4 text-xs sm:text-sm">
            <div className="space-y-2">
              <div>
                <h4 className="font-semibold text-gray-800">Platform:</h4>

                <div className=" text-gray-700 space-x-1">
                  {resume?.skills?.map((item, index) => (
                    <span key={item} className="">
                      {item}
                      {index < resume.skills.length - 1 && ","}
                    </span>
                  ))}
                </div>
              </div>

              {/* {resume.skills.hadr && (
              <div>
                <h4 className="font-semibold text-gray-800">HA/DR:</h4>
                <p className="text-gray-700">{resume.skills.hadr}</p>
              </div>
            )}
            {resume.skills.performance && (
              <div>
                <h4 className="font-semibold text-gray-800">Performance:</h4>
                <p className="text-gray-700">{resume.skills.performance}</p>
              </div>
            )}
            {resume.skills.security && (
              <div>
                <h4 className="font-semibold text-gray-800">
                  Security/Compliance:
                </h4>
                <p className="text-gray-700">{resume.skills.security}</p>
              </div>
            )} */}
            </div>
            {/* <div className="space-y-2">
            {resume.skills.automation && (
              <div>
                <h4 className="font-semibold text-gray-800">
                  Automation/DevOps:
                </h4>
                <p className="text-gray-700">{resume.skills.automation}</p>
              </div>
            )}
            {resume.skills.major && (
              <div>
                <h4 className="font-semibold text-gray-800">
                  Monitoring/Tools:
                </h4>
                <p className="text-gray-700">{resume.skills.major}</p>
              </div>
            )}
          </div> */}
          </div>
        </div>

        {/* ==== Experience ==== */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <BriefcaseBusiness className="w-6 h-6 sm:w-7 sm:h-7 text-[#123499]" />
            <h3 className="text-lg sm:text-xl font-bold text-[#123499]">
              EXPERIENCE
            </h3>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {resume?.workExperiences?.map((exp, idx) => (
              <div key={idx} className="border-l-2 border-blue-600 pl-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-1">
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                    {exp?.title}
                  </h4>
                  <span className="text-xs text-gray-600">
                    {exp?.startDate?.slice(0, 10)}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600">
                  {exp?.company}, {exp?.location}
                </p>
                {/* {exp.environment && (
                <p className="text-xs text-gray-500 italic">
                  Env: {exp.environment}
                </p>
              )} */}
                {/* <ul className="mt-2 text-xs sm:text-sm text-gray-700 space-y-1 list-disc list-inside">
                {exp.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul> */}
              </div>
            ))}
          </div>
        </div>

        {/* ==== Projects ==== */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <FolderOpenDot className="w-6 h-6 sm:w-7 sm:h-7 text-[#123499]" />
            <h3 className="text-lg sm:text-xl font-bold text-[#123499]">
              SELECTED PROJECTS
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2  gap-3">
            {resume?.projects?.map((project, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow"
              >
                <h4 className="font-semibold text-gray-900 text-sm mb-1">
                  {project?.title}
                </h4>
                <p className="text-xs text-gray-600 line-clamp-2 pdf-no-truncate">
                  {project?.description}
                </p>
                {project?.link && (
                  <Link href={project?.link} className="text-xs">
                    {project?.link}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ==== Education & Certifications ==== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-[#123499]" />
              <h3 className="text-lg sm:text-xl font-bold text-[#123499]">
                EDUCATION
              </h3>
            </div>
            <div className="border border-gray-200 rounded-lg p-3 space-y-2">
              {resume?.educations?.map((edu, idx) => (
                <div key={idx}>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {edu?.degree}
                  </h4>
                  <p className="text-xs text-gray-600">Grade : {edu?.grade}</p>
                  <p className="text-xs text-gray-500">
                    Passing Year : {edu?.passingYear}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* certification */}

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-6 h-6 sm:w-7 sm:h-7 text-[#123499]" />
              <h3 className="text-lg sm:text-xl font-bold text-[#123499]">
                CERTIFICATIONS
              </h3>
            </div>
            <div className="border border-gray-200 rounded-lg p-3">
              <ul className="text-xs sm:text-sm text-gray-700 space-y-1 list-disc list-inside">
                {resume?.certifications?.map((cert, idx) => (
                  <div key={idx}>
                    <p>{cert.title}</p>
                    <p>{cert.description}</p>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
