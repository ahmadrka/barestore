import { NextRequest, NextResponse } from "next/server";
import { removeCookie } from "./lib/helper/cookies";

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const refreshToken = req.cookies.get("refreshToken")?.value;
  const token = req.cookies.get("accessToken")?.value;
  const isAuthPage = req.nextUrl.pathname.startsWith("/auth");

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  const userRoutes = [
    "/home",
    "/dashboard",
    "/products",
    "/staff",
    "/statistic",
  ];

  const isUserRoute = userRoutes.some((route) => pathname.startsWith(route));

  if (isUserRoute && !refreshToken) {
    await removeCookie("accessToken");
    await removeCookie("refreshToken");
    await removeCookie("userData");
    const url = new URL("/auth", req.url);
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
