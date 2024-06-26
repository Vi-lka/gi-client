"use client"

import type { EventDayT } from '@/lib/types/entities'
import React, { useState } from 'react'
import type { DateRange, SelectSingleEventHandler } from 'react-day-picker'
import CalendarSegment from './CalendarSegment'
import CarouselSegment from './carousel/CarouselSegment'
import { dateRange, getDateIndx, matrixToArray } from '@/lib/utils'
import type { CarouselApi } from '@/components/ui/carousel'
// import { useDictionary } from '@/components/providers/DictionaryProvider';

export default function CalendarBlocks({
  locale,
  allDates,
  eventsDays
}: {
  locale: string,
  allDates: (Date | DateRange)[],
  eventsDays: {
    eventId: string;
    days: EventDayT[]
  }[]
}) {

  // const dict = useDictionary()

  // Get first Date
  let firstDay: Date = new Date()
  if (typeof allDates[0].valueOf() === "object") {
    const start = (allDates[0] as DateRange).from as Date
    firstDay = start
  } else {
    firstDay = (allDates[0] as Date)
  }

  // States
  const [date, setDate] = useState<Date | undefined>(firstDay)
  const [month, setMonth] = useState<Date | undefined>(firstDay);
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi>()

  // Get Dates categories
  // const singleDays = eventDays.map((day) => {
  //   if (typeof day.valueOf() === "number") {
  //     return day as Date
  //   }
  // }).filter(item => item) as Date[]

  const allEventDays = allDates.map(date => {
    if (typeof date.valueOf() === "object") {
      const from = (date as DateRange).from as Date
      const to = (date as DateRange).to as Date

      const dates = dateRange(from, to);
      return dates
    } else {
      return [date as Date]
    }
  }).filter(item => item)

  const activeDates = matrixToArray(allEventDays).sort((a,b) => {
    return a.getTime() - b.getTime();
  })

  const uniqDates = activeDates.filter((item, index) => 
    getDateIndx(item, activeDates) === index
  );

  const handleSelectDate: SelectSingleEventHandler = (_, selectedDay) => {
    setDate(selectedDay)
    if (!carouselApi) {
      return
    }

    const indx = getDateIndx(selectedDay, uniqDates)
    carouselApi.scrollTo(indx)
  }

  return (
    <div className='flex flex-wrap gap-6'>
      <CalendarSegment 
        locale={locale}
        activeDates={activeDates}
        date={date}
        month={month}
        onSelect={handleSelectDate}
        setMonth={setMonth}
        className="lg:min-w-[calc(33%-1.5rem)] lg:w-fit w-full p-0"
      />

      <CarouselSegment
        api={carouselApi}
        setApi={setCarouselApi}
        activeDates={activeDates}
        eventsDays={eventsDays}
        setDate={setDate}
        setMonth={setMonth}
        className='lg:w-[calc(33%-1.5rem)] max-w-none'
      />
    </div>
  )
}
