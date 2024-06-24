"use client"

import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import { Day, DayPicker, WeekNumber, useDayPicker } from "react-day-picker"

import { cn, getDateLocale } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import type { DictionariesType } from "@/lib/getDictionary"
import { getUnixTime } from "date-fns"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  lang,
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
        caption_label: "text-sm font-semibold capitalize",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1 rounded-xl",
        nav_button_next: "absolute right-1 rounded-xl",
        table: cn(
          "w-full border-collapse space-y-1",
        ),
        head_row: "flex justify-between",
        head_cell:
          "text-muted-foreground rounded-xl w-8 font-medium text-[0.8rem] uppercase",
        row: "flex w-full mt-2 justify-between",
        cell: cn(
          "animate-fade-in relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-xl",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-xl [&:has(>.day-range-start)]:rounded-l-xl first:[&:has([aria-selected])]:rounded-l-xl last:[&:has([aria-selected])]:rounded-r-xl"
            : "[&:has([aria-selected])]:rounded-xl"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-medium aria-selected:opacity-100 hover:bg-primary hover:text-primary-foreground rounded-xl"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        // Row: ({ ...props }) => {
        //   const { styles, classNames, showWeekNumber, components } = useDayPicker();
        
        //   const DayComponent = components?.Day ?? Day;
        //   const WeeknumberComponent = components?.WeekNumber ?? WeekNumber;
        
        //   let weekNumberCell;
        //   if (showWeekNumber) {
        //     weekNumberCell = (
        //       <td className={classNames.cell} style={styles.cell}>
        //         <WeeknumberComponent number={props.weekNumber} dates={props.dates} />
        //       </td>
        //     );
        //   }
        
        //   return (
        //     <tr 
        //       className={cn(classNames.row, "animate-fade-in")}
        //       style={styles.row}
        //     >
        //       {weekNumberCell}
        //       {props.dates.map((date) => (
        //         <td
        //           className={classNames.cell}
        //           style={styles.cell}
        //           key={getUnixTime(date)}
        //           role="presentation"
        //         >
        //           <DayComponent displayMonth={props.displayMonth} date={date} />
        //         </td>
        //       ))}
        //     </tr>
        //   );
        // },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        IconLeft: ({ ...props }) => <ChevronLeftIcon className="h-5 w-5" />,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        IconRight: ({ ...props }) => <ChevronRightIcon className="h-5 w-5" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
