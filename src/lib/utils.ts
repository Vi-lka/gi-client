import {  clsx } from "clsx"
import type {ClassValue} from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getShortDescription(
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