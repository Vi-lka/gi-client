"use client"

import { Calendar } from '@/components/ui/calendar'
import type { EventPointT } from '@/lib/types/entities'
import React, { useState } from 'react'
// import { useDictionary } from '@/components/providers/DictionaryProvider';

type DateRange = {
  from: Date;
  to: Date;
}

export default function CalendarBlocks({
  locale,
  eventDays,
  // points
}: {
  locale: string,
  eventDays: (Date | DateRange)[],
  points: EventPointT[]
}) {

  // const dict = useDictionary()

  const [date, setDate] = useState<Date | undefined>(new Date())

  const singleDays = eventDays.map((day) => {
    if (typeof day.valueOf() === "number") {
      return day as Date
    }
  }).filter(item => item) as Date[]

  const firstDays = eventDays.map((day) => {
    if (typeof day.valueOf() === "object") {
      return (day as DateRange).from
    }
  }).filter(item => item) as Date[]

  const lastDays = eventDays.map((day) => {
    if (typeof day.valueOf() === "object") {
      return (day as DateRange).to
    }
  }).filter(item => item) as Date[]

  return (
    <Calendar
      mode="single"
      ISOWeek
      lang={locale}
      modifiers={{
        singleDays,
        eventDays,
        firstDays,
        lastDays
      }}
      modifiersClassNames={{
        eventDays: "!w-full aria-selected:bg-accent bg-secondary/70 aria-selected:hover:bg-accent aria-selected:hover:text-accent-foreground rounded-none",
        singleDays: "!rounded-xl",
        firstDays: "!rounded-l-xl",
        lastDays: "!rounded-r-xl"
      }}
      selected={date}
      onSelect={(selectedDate) => setDate(selectedDate)}
      className="w-full p-0"
    />
  )
}
