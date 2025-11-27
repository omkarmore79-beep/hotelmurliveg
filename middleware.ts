import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Initialize Supabase middleware client
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const pathname = req.nextUrl.pathname;

  // Redirect non-logged-in users away from /admin pages (except login)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login") && !session) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  // Redirect logged-in users away from login page
  if (pathname.startsWith("/admin/login") && session) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*"],
};
