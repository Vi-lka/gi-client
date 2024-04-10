"use client";

import { usePathname } from "next/navigation";

export function useLocale() {
  const pathName = usePathname();
  const segments = pathName.split("/");
  const locale = segments[1];

  return locale;
}