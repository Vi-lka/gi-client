"use client";

import { usePathname as usePathnameNext } from "next/navigation";

export function usePathname() {
  const pathname = usePathnameNext();
  const segments = pathname.split("/");

  const normalizedPathname = "/" + segments.slice(2).join("/")

  return normalizedPathname;
}