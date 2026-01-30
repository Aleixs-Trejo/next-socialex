import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth.config";

export async function proxy(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  // Redirije a que llene sus datos
  if (
    session?.user &&
    session.user.onboardingCompleted === false &&
    !pathname.startsWith("/onboarding") &&
    !pathname.startsWith("/api") &&
    !pathname.startsWith("/auth")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/onboarding";
    url.searchParams.set("auth", "google");

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/((?!_next|favicon.ico).*)",
  ],
};