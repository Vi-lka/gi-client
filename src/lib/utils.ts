import { clsx } from "clsx"
import type {ClassValue} from "clsx";
import { twMerge } from "tailwind-merge"
import type { DictionariesType } from "./getDictionary";
import { format } from "date-fns-tz";
import { ru, enUS } from "date-fns/locale";
import React from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}




/**
 * Gets only the valid children of a component,
 * and ignores any nullish or falsy child.
 *
 * @param children the children
 */
export function getValidChildren(children: React.ReactNode) {
  return React.Children.toArray(children).filter((child) =>
    React.isValidElement(child),
  ) as React.ReactElement[]
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



export function convertUTCDateToLocalDate(date: Date, deleteTime?: boolean) {
  const convertedDate = new Date(date.getTime() - date.getTimezoneOffset()*60*1000);
  if (deleteTime) return new Date(convertedDate.getFullYear(), convertedDate.getMonth(), convertedDate.getDate());
  else return convertedDate;
}

export function reConvertUTCDateToLocalDate(date: Date, deleteTime?: boolean) {
  const convertedDate = new Date(date.getTime() + date.getTimezoneOffset()*60*1000);
  if (deleteTime) return new Date(convertedDate.getFullYear(), convertedDate.getMonth(), convertedDate.getDate());
  else return convertedDate;
}

export function dateRange(start: Date, end: Date) {
  // end.setDate(end.getDate()+1)
  const endDt = convertUTCDateToLocalDate(new Date(end.getFullYear(), end.getMonth(), end.getDate()))
  
  const startDt = convertUTCDateToLocalDate(new Date(start.getFullYear(), start.getMonth(), start.getDate()))

  const arr = [];
  for (startDt; startDt <= endDt; startDt.setDate(startDt.getDate()+1)){
    arr.push(new Date(startDt));
  }
  return arr;
};


// export function dateRange(start:  Date | string, end: Date | string) {
//   return eachDayOfInterval({ start, end })
// };


export function filterUniqueDates(dates: Date[], convert?: boolean) {

  const datesNoTime = dates.map(date => 
    convert ? convertUTCDateToLocalDate(new Date(date.getFullYear(), date.getMonth(), date.getDate())) : date
  )

  const lookup = new Set();
  
  return datesNoTime.filter(date => {
     const serialised = date.getTime();
    if (lookup.has(serialised)) {
      return false;
    } else { 
      lookup.add(serialised);
      return true;
    }
  })
}



export function getDateIndx(
  date: Date, 
  array: Date[]
) {
  return array.findIndex(item => {
    return item.getTime() === date.getTime()
  });
}



export function matrixToArray<T>(matrix: T[][]) {
  const array: T[] = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      array.push(matrix[i][j]);
    }
  }
  return array
}


export function matrixObjectsToArray(matrix: {
  dates: Date[];
  description: string | null;
  dateStart: Date;
  dateEnd: Date | null;
}[]) {
  const array: {
    date: Date;
    description: string | null;
    dateStart: Date;
    dateEnd: Date | null;
  }[] = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].dates.length; j++) {
      array.push(
        { 
          date: matrix[i].dates[j], 
          description: matrix[i].description,
          dateStart: matrix[i].dateStart,
          dateEnd: matrix[i].dateEnd
        }
      );
    }
  }
  return array
}



export function shortUrl(url: string | null | undefined) {
  if (!url) return
  
  const uend = url.slice(url.length - 15);
  const ustart = url.replace('http://', '').replace('https://', '').substring(0, 32);
  const shorter = ustart + '...' + uend;

  return shorter;
}




export function calcEach(index: number, skip: number, gap: number) {

  const inEach = skip + gap + 2

  let currentIndex = index+1

  if (currentIndex > inEach) {
    while (currentIndex > inEach) {
      currentIndex = currentIndex - inEach
    }
  }

  if (currentIndex <= gap) return false

  if ((currentIndex === inEach) || (currentIndex === (inEach - gap))) return true
}




export function calcBento(index: number, length: number) {
  const isEven = length % 2 === 0
  const isMultipleSeven = length % 7 === 0
  const isMultipleFive = length % 5 === 0
  const isMultipleThree = length % 3 === 0

  if (length === 3) return calcEach(index, 0, 3)
  if (isMultipleFive || isMultipleSeven) {
    return calcEach(index, 2, 3)
  }
  if (isMultipleThree) {
    return calcEach(index, ((index === 1) || (index === 8)) ? 0 : 1, 0)
  }
  if (isEven) {
    return calcEach(index, (index === 1) ? 0 : 1, (index === 6) ? 1 : 0)
  }
}




export function resetPaginationts(params: URLSearchParams) {
  const hasPage = params.has("page");
  const hasPageEmployees = params.has("page_employees");
  const hasPageDpo = params.has("page_dpo");
  const hasPageDepartments = params.has("page_departments");

  if (hasPage) params.set("page", "1");
  if (hasPageEmployees) params.set("page_employees", "1");
  if (hasPageDpo) params.set("page_dpo", "1");
  if (hasPageDepartments) params.set("page_departments", "1");
}




export function objectToArray<A>(input: { [s: string]: A }): A[] {
  const result = Object.entries(input).map(a => {
    return {...a[1]}
  })
  return result
}




// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function updateValueByKey<T extends object>(key: string, newValue: any, obj: T) {
  if (!newValue || String(newValue).length === 0) return obj
  
  const newObj = { ...obj };

  for (const prop in newObj) {
    if (prop === key) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      newObj[prop] = newValue;
    } else if (typeof newObj[prop] === 'object') {
      (newObj[prop] as object) = updateValueByKey(key, newValue, newObj[prop] as object);
    }
  }

  return newObj
}




export function genSearchFilter<T extends object>(key: string, newValue: string | undefined, obj: {or: T[]},) {

  if (!newValue) return undefined

  const searchArr = newValue?.split(" ")

  const objects = searchArr.map((item) => {
    const newObj = updateValueByKey(key, item, obj)

    if (newObj?.or) {
      const resultArray = {or: 
        objectToArray((newObj as {or: {}}).or)
      }
      return resultArray
    }  
  })

  return objects
}




export const grayscale = "lg:dark:grayscale-[60%] lg:dark:contrast-[1.2] dark:grayscale-[30%] dark:contrast-[1.05] dark:hover:grayscale-0 dark:hover:contrast-100 transition-[filter] duration-200 ease-in"