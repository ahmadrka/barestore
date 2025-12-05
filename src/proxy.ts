import { NextRequest, NextResponse } from "next/server";

export default function Proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const isLoggedIn = true; // Simulate Token Check

  const userRoutes = [
    "/home",
    "/dashboard",
    "/products",
    "/staff",
    "/statistic",
  ];
  const adminRoutes = [""];

  if (userRoutes.some((route) => pathname.startsWith(route)) && !isLoggedIn) {
    const url = new URL("/auth", req.url);
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
