"use client"

import { Calendar } from '@/components/ui/calendar'
import React from 'react'
import type { Matcher, SelectSingleEventHandler } from 'react-day-picker'

export default function CalendarSegment({
  locale,
  activeDates,
  date,
  month,
  onSelect,
  setMonth,
  className
}: {
  locale: string,
  activeDates: Date[],
  date: Date | undefined,
  month: Date | undefined,
  onSelect: SelectSingleEventHandler | undefined
  setMonth: React.Dispatch<React.SetStateAction<Date | undefined>>
  className?: string,
}) {
  
  // const firstDays = eventDays.map((day) => {
  //   if (typeof day.valueOf() === "object") {
  //     return (day as DateRange).from
  //   }
  // }).filter(item => item) as Date[]

  // const lastDays = eventDays.map((day) => {
  //   if (typeof day.valueOf() === "object") {
  //     return (day as DateRange).to
  //   }
  // }).filter(item => item) as Date[]


  const disabledMatcher: Matcher = (day: Date) => {
    return !Boolean(activeDates.find(item => item.toDateString() === day.toDateString()));
  };

  return (
    <Calendar
      mode="single"
      ISOWeek
      lang={locale}
      modifiers={{
        activeDates,
        // singleDays,
        // firstDays,
        // lastDays
      }}
      modifiersClassNames={{
        activeDates: "!w-full aria-selected:bg-accent bg-secondary/70 aria-selected:hover:bg-accent aria-selected:hover:text-accent-foreground rounded-xl",
        // singleDays: "!rounded-xl",
        // firstDays: "!rounded-l-xl",
        // lastDays: "!rounded-r-xl"
      }}
      disabled={disabledMatcher}
      selected={date}
      month={month}
      onMonthChange={setMonth}
      onSelect={onSelect}
      className={className}
    />
  )
}
