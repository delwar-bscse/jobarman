/* eslint-disable @next/next/no-img-element */

import Image from "next/image";

const applicants = [
  {
    name: "Savannah Nguyen",
    position: "Sr. UIUX Designer",
    match: "90%",
    avatar: "/professional-woman-avatar.jpg",
  },
  {
    name: "Albert Flores",
    position: "Sr. UIUX Designer",
    match: "70%",
    avatar: "/professional-woman-avatar-2.jpg",
  },
  {
    name: "Floyd Miles",
    position: "Sr. UIUX Designer",
    match: "40%",
    avatar: "/professional-man-avatar.jpg",
  },
];

export function RecentApplicants({ title, type }) {
  return (
    <div className="bg-card rounded-lg p-4 sm:p-6 border border-border shadow-sm">
      <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-foreground">
        {title}
      </h3>

      <div className="space-y-3 sm:space-y-4">
        {applicants.map((applicant, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 sm:p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <Image
                src="/chat-user.jpg"
                title={applicant.name}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0 bg-muted"
                width={10}
                height={10}
                alt="ok"
                sizes="100vh"
              />
              <div className="min-w-0">
                <p className="font-semibold text-sm sm:text-base text-foreground truncate">
                  {applicant.name}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground truncate">
                  {applicant.position}
                </p>
              </div>
            </div>
            <div className="text-xs sm:text-sm font-semibold text-primary flex-shrink-0 ml-2">
              {applicant.match} Match
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
