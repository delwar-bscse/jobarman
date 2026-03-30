import { NextResponse } from "next/server";
import { EUserRole } from "./enum/userRoleEnum";

const commonRoutes = [
  "/history",
  "/profile",
  "/chat",
  "/notifications",
];

const recruiterRoutes = [
  "/my-job",
  "/my-request",
  "/career-spotlight",
  "/job-post",
];

const employeeRoutes = [
  "/my-resume",
];

export function proxy(req) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("accessToken")?.value;
  const role = req.cookies.get("role")?.value;

  // 1. Authentication
  if (!token || !role) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const isCommonRoute = commonRoutes.some(route =>
    pathname.startsWith(route)
  );
  const isRecruiterRoute = recruiterRoutes.some(route =>
    pathname.startsWith(route)
  );
  const isEmployeeRoute = employeeRoutes.some(route =>
    pathname.startsWith(route)
  );

  // 2. Authorization
  if (isCommonRoute && role !== EUserRole.EMPLOYEE && role !== EUserRole.RECRUITER) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  else if (isRecruiterRoute && role !== EUserRole.RECRUITER) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  else if (isEmployeeRoute && role !== EUserRole.EMPLOYEE) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 3. Allow
  else {
    return NextResponse.next();
  }
}


export const config = {
  matcher: [
    "/my-job/:path*",
    "/my-request/:path*",
    "/career-spotlight/:path*",
    "/job-post/:path*",
    "/my-resume/:path*",
    "/history/:path*",
    "/profile/:path*",
    "/chat/:path*",
    "/notifications/:path*",
  ],
};
