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
  const searchParams = req.nextUrl.searchParams;

  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");
  const roleParam = searchParams.get("role");

  // 1. Intercept OAuth tokens callback in search params and set cookies securely
  if (accessToken && roleParam) {
    const cleanUrl = new URL(pathname === "/login-success" ? "/" : pathname, req.url);
    
    // Check if there is a callbackUrl stored in the request cookies
    const callbackUrlCookie = req.cookies.get("callbackUrl")?.value;
    
    // Clean up query parameters to protect against token exposure in browser history/logs
    cleanUrl.searchParams.delete("accessToken");
    cleanUrl.searchParams.delete("refreshToken");
    cleanUrl.searchParams.delete("role");

    // If on /login-success, redirect to the callbackUrl or fallback to homepage
    let redirectUrl = cleanUrl;
    if (pathname === "/login-success" && callbackUrlCookie) {
      try {
        redirectUrl = new URL(callbackUrlCookie, req.url);
      } catch (err) {
        redirectUrl = new URL("/", req.url);
      }
    }

    const response = NextResponse.redirect(redirectUrl);

    // Set secure HttpOnly cookies for credentials
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    response.cookies.set("refreshToken", refreshToken || accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // role is needed on the client, so httpOnly is false
    response.cookies.set("role", roleParam, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // Clear the temporary callbackUrl cookie if it was set
    if (callbackUrlCookie) {
      response.cookies.delete("callbackUrl");
    }

    return response;
  }

  // 2. Standard Path Protection (Guards)
  const token = req.cookies.get("accessToken")?.value;
  const role = req.cookies.get("role")?.value;

  const isCommonRoute = commonRoutes.some(route =>
    pathname.startsWith(route)
  );
  const isRecruiterRoute = recruiterRoutes.some(route =>
    pathname.startsWith(route)
  );
  const isEmployeeRoute = employeeRoutes.some(route =>
    pathname.startsWith(route)
  );

  if (isCommonRoute || isRecruiterRoute || isEmployeeRoute) {
    if (!token || !role) {
      // Retain target URL to redirect back after login
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (isCommonRoute && role !== EUserRole.EMPLOYEE && role !== EUserRole.RECRUITER) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (isRecruiterRoute && role !== EUserRole.RECRUITER) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (isEmployeeRoute && role !== EUserRole.EMPLOYEE) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
