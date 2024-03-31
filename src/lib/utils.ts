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

export function splitArray<T>(arr: T[], size: number) {
  const arr2 = arr.slice(0)
  const arrays = [];
  while (arr2.length > 0) {
      arrays.push(arr2.splice(0, size));
  }
  return arrays;
}