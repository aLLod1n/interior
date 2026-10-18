import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, localeCookie, locales } from "@/i18n/config";

// Sends locale-less URLs (e.g. "/" or "/projects") to the visitor's saved language, or Georgian by default.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return;

  const saved = request.cookies.get(localeCookie)?.value;
  const lang = isLocale(saved) ? saved : defaultLocale;
  request.nextUrl.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip Next internals, API routes and files with an extension (images, favicon…).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
