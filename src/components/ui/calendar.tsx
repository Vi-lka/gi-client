"use client"

import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import { DayPicker } from "react-day-picker"

import { cn, getDateLocale } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import type { DictionariesType } from "@/lib/getDictionary"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  lang,
  components,
  ...props
}: CalendarProps) {

  const dateLocale = getDateLocale(lang as keyof DictionariesType)
  
  return (
    <DayPicker
      locale={dateLocale}
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4 w-full",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "md:text-base text-sm font-semibold capitalize",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-8 w-8 bg-transparent p-0 opacity-80 hover:opacity-100 transition-all duration-200"
        ),
        nav_button_previous: "absolute left-1 rounded-xl",
        nav_button_next: "absolute right-1 rounded-xl",
        table: cn(
          "w-full border-collapse space-y-1",
        ),
        head_row: "flex justify-between",
        head_cell:
          "text-muted-foreground rounded-xl w-full font-medium md:text-sm text-xs uppercase",
        row: "flex w-full mt-2 justify-between",
        cell: cn(
          "relative animate-fade animate-duration-500 animate-ease-in-out w-full relative p-0 xl:mx-1 mx-0.5 text-center md:text-base text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected])]:border-accent [&:has([aria-selected].day-outside)]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-xl",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-xl [&:has(>.day-range-start)]:rounded-l-xl first:[&:has([aria-selected])]:rounded-l-xl last:[&:has([aria-selected])]:rounded-r-xl"
            : "[&:has([aria-selected])]:rounded-xl"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "group/day h-8 md:w-9 w-8 hover:w-full aria-selected:w-full p-0 font-medium md:text-base text-sm aria-selected:opacity-100 hover:bg-primary hover:border-primary hover:text-primary-foreground aria-selected:border-accent aria-selected:hover:bg-accent aria-selected:hover:text-accent-foreground transition-all duration-200"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-accent border-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground",
        day_today: "border-2 border-accent/70 hover:border-primary aria-selected:hover:border-accent",
        day_outside:
          "day-outside text-muted-foreground opacity-50  aria-selected:bg-accent aria-selected:text-accent-foreground aria-selected:opacity-100",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        IconLeft: ({ ...props }) => <ChevronLeftIcon className="h-5 w-5" />,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        IconRight: ({ ...props }) => <ChevronRightIcon className="h-5 w-5" />,
        ...components,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
