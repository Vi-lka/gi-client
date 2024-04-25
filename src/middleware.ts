import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

import { localesCodes } from "./static/locales";

const defaultLocale = "en";

function getLocale(request: NextRequest) {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Use negotiator and intl-localematcher to get best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  
  let locale = ''

  try {
    locale = matchLocale(languages, localesCodes, defaultLocale)
  } catch (error) {
    locale = defaultLocale
  }

  return locale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
  // If you have one
  if (
    [
      "/manifest.json",
      "/favicon.ico",
      // Your other files in `public`
    ].includes(pathname)
  )
    return;

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = localesCodes.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url),
    );
  } else {
    // Store current request url in a custom header, which you can read later
    const requestHeaders = new Headers(request.headers);

    const pathnameArray = pathname.split("/")
    const locale = pathnameArray[1]
    const slug = pathname.split("/")[pathnameArray.length - 1]

    requestHeaders.set('x-url', request.url);
    requestHeaders.set('x-locale', locale);
    requestHeaders.set('x-slug', slug);

    return NextResponse.next({
      request: {
        // Apply new request headers
        headers: requestHeaders,
      }
    })
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\..*|favicon.ico|robots.txt|sitemap.xml|manifest.json|opengraph-image.png|opengraph-image.alt.txt|images/).*)",
  ],
};