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

// import { NextResponse } from "next/server";

// /**
//  * @param {import("next/server").NextRequest} req
//  */
// export function middleware(req) {
//   try {
//     const url = req.nextUrl.clone();
//     const pathname = url.pathname;
//     const accessToken = url.searchParams.get("accessToken");

//     if (pathname === "/" && accessToken) {
//       // Remove accessToken from URL
//       url.searchParams.delete("accessToken");

//       // Set cookie on the redirect response
//       NextResponse.redirect(url).cookies.set("accessToken", accessToken, {
//         httpOnly: true,
//         path: "/",
//         secure: process.env.NODE_ENV === "production",
//         maxAge: 60 * 60 * 24, // 1 day
//       });

//       return NextResponse.redirect(new URL("/", req.url));
//     }

//     return NextResponse.next();
//   } catch (error) {
//     return NextResponse.next();
//   }
// }

// export const config = {
//   matcher: ["/:path*"],
// };
