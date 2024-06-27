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
  allDates,
  eventsDays
}: {
  allDates: (Date | DateRange)[],
  eventsDays: {
    eventId: string;
    days: EventDayT[]
  }[]
}) {

  // const dict = useDictionary()

  const allEventDates = allDates.map(date => {
    if (typeof date.valueOf() === "object") {
      const from = (date as DateRange).from as Date
      const to = (date as DateRange).to as Date

      const dates = dateRange(from, to);
      return dates
    } else {
      return [date as Date]
    }
  }).filter(item => item)

  const sortedDates = matrixToArray(allEventDates).sort((a,b) => {
    return a.getTime() - b.getTime();
  })
  // Uniq Dates
  const dates = sortedDates.filter((item, index) => 
    getDateIndx(item, sortedDates) === index
  );

  const duplicatesDates = sortedDates.filter((item, index) => 
    sortedDates.some((elem, idx) => elem.toDateString() === item.toDateString() && idx !== index)
  )
  // Uniq Duplicates
  const duplicates = duplicatesDates.filter((item, index) => 
    getDateIndx(item, duplicatesDates) !== index
  );

  // States
  const [date, setDate] = useState<Date | undefined>(dates[0])
  const [month, setMonth] = useState<Date | undefined>(dates[0]);
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi>()

  // Get Dates categories
  // const singleDays = eventDays.map((day) => {
  //   if (typeof day.valueOf() === "number") {
  //     return day as Date
  //   }
  // }).filter(item => item) as Date[]

  const handleSelectDate: SelectSingleEventHandler = (_, selectedDay) => {
    setDate(selectedDay)
    if (!carouselApi) {
      return
    }

    const indx = getDateIndx(selectedDay, dates)
    carouselApi.scrollTo(indx)
  }

  return (
    <div className='flex flex-wrap gap-6'>
      <CalendarSegment 
        data={{ dates, duplicates, eventsDays }}
        date={date}
        month={month}
        onSelect={handleSelectDate}
        setMonth={setMonth}
        className="lg:min-w-[calc(33%-1.5rem)] lg:w-fit w-full p-0"
      />

      <CarouselSegment
        data={{ dates, duplicates, eventsDays }}
        api={carouselApi}
        setApi={setCarouselApi}
        setDate={setDate}
        setMonth={setMonth}
        className='lg:w-[calc(33%-1.5rem)] max-w-none'
      />
    </div>
  )
}
