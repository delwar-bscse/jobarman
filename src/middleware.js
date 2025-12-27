import { NextResponse } from "next/server";

/**
 * @param {import("next/server").NextRequest} req
 */
export function middleware(req) {
  try {
    const pathname = req.nextUrl.pathname;
    const accessToken = req.nextUrl.searchParams.get("accessToken");

    if (pathname === "/" && accessToken) {
      // Create a response instance to set the cookie

      NextResponse.next().cookies.set("accessToken", accessToken, {
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
      });

      console.log("req.url ----------------", req.url);
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/:path*"],
};
