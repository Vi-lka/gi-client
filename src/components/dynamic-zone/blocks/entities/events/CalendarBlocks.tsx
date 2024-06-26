"use client"

import type { EventDayT } from '@/lib/types/entities'
import React, { useState } from 'react'
import type { DateRange, SelectSingleEventHandler } from 'react-day-picker'
import CalendarSegment from './CalendarSegment'
import CarouselSegment from './CarouselSegment'
import { dateRange, matrixToArray } from '@/lib/utils'
import type { CarouselApi } from '@/components/ui/carousel'
// import { useDictionary } from '@/components/providers/DictionaryProvider';

export default function CalendarBlocks({
  locale,
  eventDays,
  days
}: {
  locale: string,
  eventDays: (Date | DateRange)[],
  days: EventDayT[]
}) {

  // const dict = useDictionary()


  // Get first Date
  let firstDay: Date = new Date()
  if (typeof eventDays[0].valueOf() === "object") {
    const start = (eventDays[0] as DateRange).from as Date
    firstDay = start
  } else {
    firstDay = (eventDays[0] as Date)
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

  const allEventDays = eventDays.map(day => {
    if (typeof day.valueOf() === "object") {
      const from = (day as DateRange).from as Date
      const to = (day as DateRange).to as Date

      const dates = dateRange(from, to);
      return dates
    } else {
      return [day as Date]
    }
  }).filter(item => item) as Date[][]

  const activeDates = matrixToArray(allEventDays).sort((a,b) => {
    return a.getTime() - b.getTime();
  })

  const handleSelectDate: SelectSingleEventHandler = (_, selectedDay) => {
    setDate(selectedDay)
    if (!carouselApi) {
      return
    }

    const idx = activeDates.map(Number).indexOf(+selectedDay);
    //                     ^^^^^^^^^^^^         ^ serialisation steps
    carouselApi.scrollTo(idx)
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
        days={days}
        setDate={setDate}
        setMonth={setMonth}
        className='lg:w-[calc(33%-1.5rem)] max-w-none'
      />
    </div>
  )
}
