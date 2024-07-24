"use client"

import { Calendar } from '@/components/ui/calendar'
import { useLocale } from '@/lib/hooks/useLocale'
import React from 'react'
import { useDayPicker } from 'react-day-picker'
import type {Matcher, SelectSingleEventHandler} from 'react-day-picker';
import getItemData from '../getItemData'
import type { EventDayT } from '@/lib/types/entities'
import { useSetAtom } from 'jotai'
import { monthAtom } from '@/lib/hooks/atoms'

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
      eventData: {
        slug: string;
        title: string;
        location: string;
        online: string | null;
        dateStart: Date;
        dateEnd: Date | null;
        text: unknown;
      };
      dates: Date[];
    }[]
  }
  date: Date | undefined,
  month: Date | undefined,
  onSelect: SelectSingleEventHandler | undefined,
  className?: string,
}

export default function CalendarSegment({
  data,
  date,
  month,
  onSelect,
  className
}: Props) {

  const setMonth = useSetAtom(monthAtom)

  const locale = useLocale()

  const disabledMatcher: Matcher = (day: Date) => {
    return !Boolean(data.dates.find(item => item.toDateString() === day.toDateString()));
  };

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

          const { duplicateIndx, items } = getItemData({
            currentDate: props.date,
            duplicates: data.duplicates,
            datesByEventId: data.datesByEventId,
            eventsDays: data.eventsDays
          })

          // If duplicates
          if ((duplicateIndx >= 0) && (items.length > 1)) return (
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
