// export default withAuth({
//   // callbacks: {
//   //   authorized: async ({ req, token }) => {
//   //     //  console.log("User role:", token?.role);
//   //     if (req.nextUrl.pathname.startsWith("/admin"))
//   //       return token?.role === "admin";
//   //     return !!token;
//   //   },
//   // },
//   callbacks: {
//     authorized: async ({ req, token }) => {
//       // Check if the user is trying to access an admin route
//       console.log("hta hadi :  ", token);
//       if (req.nextUrl.pathname.startsWith("/admin")) {
//         // Ensure that only users with the ADMIN role can access these routes
//         if (token?.role !== "ADMIN") {
//           return NextResponse.redirect(new URL("/profile", req.url)); // Redirect to home or other suitable page
//         }
//         return true; // Allow access for ADMIN users
//       }
//       // For other routes, ensure the user is authenticated
//       return !!token;
//     },
//   },

//   pages: {
//     signIn: "/login",
//   },
// });

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  // Log the token for debugging purposes
  // console.log("Token:", token);

  if (!token) {
    // Redirect to login if no token is found
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/admin")) {
    // Ensure that only users with the ADMIN role can access admin routes
    if (token?.role !== "ADMIN") {
      // Redirect to profile page if the user is not an admin
      return NextResponse.redirect(new URL("/profile", req.url));
    }
  }

  // Continue processing the request if all checks pass
  return NextResponse.next();
}

export const config = {
  matcher: [ "/profile", "/orders", "/admin/:path*"], // Paths where authentication is required
};
