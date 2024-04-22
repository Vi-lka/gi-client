import {  clsx } from "clsx"
import type {ClassValue} from "clsx";
import { twMerge } from "tailwind-merge"
import type { DictionariesType } from "./getDictionary";
import { format } from "date-fns";
import { ru, enUS } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getShortText(
  description: string,
  length?: number,
) {
  const array = description.split(" ");

  const sliceLength = length ? length : 30;

  if (array.length >= sliceLength + 1) {
    return array.slice(0, sliceLength).join(" ") + "...";
  } else return array.join(" ");
}

export function calcWidth({index, current, count}: {index: number, current: number, count: number}) {
  const per = (100 / count) / count
  let perCount = 0

  if (index === (current - 1)) {
      Array.from({ length: count }).forEach((_, i) => {
          perCount = perCount + Math.abs(index - i)
      })

      return per * count + per * perCount
  } else {
      perCount = Math.abs((current - 1) - index)

      return per * count - per * perCount
  }
}

export function splitArray<T>(arr: T[], size: number) {
  const arr2 = arr.slice(0)
  const arrays = [];
  while (arr2.length > 0) {
      arrays.push(arr2.splice(0, size));
  }
  return arrays;
}

export function declOfNum(number: number, titles: string[]) {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

export function uniqArray<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

export function getDateLocale(locale: keyof DictionariesType) {
  switch (locale) {
      case "ru":
          return ru;
      
      case "en":
          return enUS;
  
      default:
          return enUS;
  }
}

export function formatDate(date: Date, locale: string) {
  const str = format(date, "P", { 
      locale: getDateLocale(locale as keyof DictionariesType)
  })
  return str
}

export function shortUrl(url: string | null | undefined) {
  if (!url) return
  
  const uend = url.slice(url.length - 15);
  const ustart = url.replace('http://', '').replace('https://', '').substring(0, 32);
  const shorter = ustart + '...' + uend;

  return shorter;
}

export const grayscale = "lg:dark:grayscale-[60%] lg:dark:contrast-[1.2] dark:grayscale-[30%] dark:contrast-[1.05] dark:hover:grayscale-0 dark:hover:contrast-100 transition-[filter] duration-200 ease-in"