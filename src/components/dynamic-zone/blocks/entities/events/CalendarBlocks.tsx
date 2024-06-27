"use client"

import type { EventDayT } from '@/lib/types/entities'
import React, { useState } from 'react'
import type { SelectSingleEventHandler } from 'react-day-picker'
import CalendarSegment from './CalendarSegment'
import CarouselSegment from './carousel/CarouselSegment'
import { getDateIndx } from '@/lib/utils'
import type { CarouselApi } from '@/components/ui/carousel'
// import { useDictionary } from '@/components/providers/DictionaryProvider';

export default function CalendarBlocks({
  dates,
  duplicates,
  eventsDays,
  datesByEventId,
}: {
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
}) {

  // const dict = useDictionary()

  // States
  const [date, setDate] = useState<Date | undefined>(dates[0])
  const [month, setMonth] = useState<Date | undefined>(dates[0]);
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi>()

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
        data={{ dates, duplicates, eventsDays, datesByEventId }}
        date={date}
        month={month}
        onSelect={handleSelectDate}
        setMonth={setMonth}
        className="lg:min-w-[calc(33%-1.5rem)] lg:w-fit w-full p-0"
      />

      <CarouselSegment
        data={{ dates, duplicates, eventsDays, datesByEventId }}
        api={carouselApi}
        setApi={setCarouselApi}
        setDate={setDate}
        setMonth={setMonth}
        className='lg:w-[calc(33%-1.5rem)] max-w-none'
      />
    </div>
  )
}
