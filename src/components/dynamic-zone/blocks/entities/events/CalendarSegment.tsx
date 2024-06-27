"use client"

import { Calendar } from '@/components/ui/calendar'
import { useLocale } from '@/lib/hooks/useLocale'
import { EventDayT } from '@/lib/types/entities'
import { getDateIndx } from '@/lib/utils'
import React from 'react'
import { useDayPicker, type Matcher, type SelectSingleEventHandler } from 'react-day-picker'

export default function CalendarSegment({
  data,
  date,
  month,
  onSelect,
  setMonth,
  className
}: {
  data: {
    dates: Date[],
    duplicates: Date[],
    eventsDays: {
      eventId: string;
      days: EventDayT[]
    }[],
  }
  date: Date | undefined,
  month: Date | undefined,
  onSelect: SelectSingleEventHandler | undefined
  setMonth: React.Dispatch<React.SetStateAction<Date | undefined>>
  className?: string,
}) {

  const locale = useLocale()
  
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
    return !Boolean(data.dates.find(item => item.toDateString() === day.toDateString()));
  };

  return (
    <Calendar
      mode="single"
      ISOWeek
      lang={locale}
      modifiers={{
        activeDates: data.dates,
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
      components={{
        DayContent: ({ ...props }) => {
          const {
            locale,
            formatters: { formatDay }
          } = useDayPicker();
        
          const duplicateIndx = getDateIndx(props.date, data.duplicates);

          // Find data for card
          const items = data.eventsDays.map(item => {
            const finded = item.days.find(day => day.date.toDateString() === props.date.toDateString())
            return { eventId: item.eventId, itemData: finded }
          }).filter(item => item) as Array<{
            eventId: string;
            itemData: EventDayT | undefined;
          }>
  
          // If duplicates
          if (duplicateIndx >= 0) return (
            <p className='relative'>
              {formatDay(props.date, { locale })}
              <sup className='absolute text-[10px] top-1 -right-1.5'>
                {items.length}
              </sup>
            </p>
          )
          else return <p>{formatDay(props.date, { locale })}</p>;
        },
      }}
    />
  )
}
