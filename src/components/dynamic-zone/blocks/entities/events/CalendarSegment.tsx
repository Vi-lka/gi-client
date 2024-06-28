"use client"

import { Calendar } from '@/components/ui/calendar'
import { useLocale } from '@/lib/hooks/useLocale'
import { getDateIndx } from '@/lib/utils'
import React from 'react'
import { useDayPicker   } from 'react-day-picker'
import type {Matcher, SelectSingleEventHandler} from 'react-day-picker';
import type { EventDayT } from '@/lib/types/entities'

type Props = {
  data: {
    dates: Date[],
    duplicates: Date[],
    eventsDays: {
      eventId: string;
      days: EventDayT[]
    }[],
    datesByEventId: {
      id: string;
      dates: Date[];
    }[]
  }
  date: Date | undefined,
  month: Date | undefined,
  onSelect: SelectSingleEventHandler | undefined
  setMonth: React.Dispatch<React.SetStateAction<Date | undefined>>
  className?: string,
}

export default function CalendarSegment({
  data,
  date,
  month,
  onSelect,
  setMonth,
  className
}: Props) {

  const locale = useLocale()

  const disabledMatcher: Matcher = (day: Date) => {
    return !Boolean(data.dates.find(item => item.toDateString() === day.toDateString()));
  };

  function getItemData(dateItem: Date) {
    const duplicateIndx = getDateIndx(dateItem, data.duplicates);

    const eventsInCurrentDate = data.datesByEventId.map(item => {
      const finded = item.dates.find(date => date.toDateString() === dateItem.toDateString())
      if (finded) return item.id
      else return undefined
    }).filter(item => item) as string[]

    // Find data for card
    const items = data.eventsDays.map(item => {
      const finded = item.days.find(day => day.date.toDateString() === dateItem.toDateString())
      return { eventId: item.eventId, itemData: finded }
    })
    .filter(item => item)
    .filter(item => eventsInCurrentDate.includes(item.eventId)) 
    .sort((a,b) => {
      return Number(a.eventId) - Number(b.eventId);
    }) as Array<{
      eventId: string;
      itemData: EventDayT | undefined;
    }>

    return { duplicateIndx, items }
  }

  return (
    <Calendar
      mode="single"
      ISOWeek
      lang={locale}
      modifiers={{
        activeDates: data.dates
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
          const { duplicateIndx, items } = getItemData(props.date)
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
