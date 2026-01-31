import { auth } from "@/auth";

export default auth(function middleware(req) {
  const isLoggedIn = !!req.auth;
  const pathname = req.nextUrl.pathname;
  const isOnDashboard = pathname.startsWith("/dashboard");
  const isOnAdmin = pathname.startsWith("/admin");
  const isOnAuthPage = pathname.startsWith("/login") || pathname.startsWith("/signup");

  // 1. If trying to access protected routes but not logged in -> Redirect to Login
  if ((isOnDashboard || isOnAdmin) && !isLoggedIn) {
    return Response.redirect(new URL("/login", req.nextUrl));
  }

  // 2. If already logged in and trying to access login/signup -> Redirect to Dashboard
  if (isOnAuthPage && isLoggedIn) {
    return Response.redirect(new URL("/dashboard", req.nextUrl));
  }
});

// Configure which paths the middleware should run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};