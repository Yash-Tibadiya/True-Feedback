import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  if (token) {
    if (
      url.pathname === "/sign-in" ||
      url.pathname === "/sign-up" ||
      url.pathname.startsWith("/verify")
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/sign-in", "/sign-up", "/dashboard/:path*", "/verify/:path*"],
};
