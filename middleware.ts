import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. Define Public Routes
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)"
]);

// 2. Define Onboarding Route
const isOnboardingRoute = createRouteMatcher([
  "/onboarding"
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  // 1. If it's a public route, let them pass
  if (isPublicRoute(req)) return;

  // 2. If it's the onboarding page, let them pass
  if (isOnboardingRoute(req)) return;

  // 3. If no user, redirect to login
  if (!userId) return redirectToSignIn();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};