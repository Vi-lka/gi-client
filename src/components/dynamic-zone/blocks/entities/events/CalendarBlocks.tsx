"use client"

import type { EventDayT } from '@/lib/types/entities'
import React, { useEffect, useState } from 'react'
import type { SelectSingleEventHandler } from 'react-day-picker'
import CalendarSegment from './segments/CalendarSegment'
import CarouselSegment from './segments/CarouselSegment'
import { getDateIndx } from '@/lib/utils'
import type { CarouselApi } from '@/components/ui/carousel'
import TextSegment from './segments/TextSegment'
import { dateAtom, eventIdAtom, monthAtom } from '@/lib/hooks/atoms'
import { useAtom } from 'jotai'
import CalendarBlocksLoading from '@/components/loadings/CalendarBlocksLoading'
import { fromZonedTime } from 'date-fns-tz'

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
}) {

  const [loading, setLoading] = useState(true)
  
  const [eventId, setEventId] = useAtom(eventIdAtom)
  const [date, setDate] = useAtom(dateAtom)
  const [month, setMonth] = useAtom(monthAtom)
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi>()

  useEffect(() => {
    setDate(dates[0])
    setMonth(dates[0])
  }, [dates, setDate, setMonth])

  useEffect(() => {
    const eventsInCurrentDate = datesByEventId.map(item => {
      if (!date) return undefined
  
      const finded = item.dates.find(item => item.toDateString() === date.toDateString())
      if (finded) return item.id
  
      else return undefined
    })
    .filter(item => item)
    .sort((a,b) => {
      return Number(a) - Number(b);
    }) as string[]

    const include = eventsInCurrentDate.includes(eventId)

    if (!include) setEventId(eventsInCurrentDate[0])

    setLoading(false)
  }, [date, datesByEventId, eventId, setEventId])

  // prevent timezones
  const formatedDates = dates.map(date => {
    const formated = fromZonedTime(date, "Asia/Krasnoyarsk")
    return formated
  })

  const handleSelectDate: SelectSingleEventHandler = (_, selectedDay) => {
    setDate(selectedDay)

    // prevent timezones
    const formatedSelectedDay = fromZonedTime(selectedDay, "Asia/Krasnoyarsk")

    const indx = getDateIndx(formatedSelectedDay, formatedDates)

    console.log("indx: ", indx)
    console.log("SelectedDate: ", formatedSelectedDay)
    console.log("Dates: ", formatedDates)

    carouselApi?.scrollTo(indx)
  }

  if (!date && loading) return <CalendarBlocksLoading />

  return (
    <div className='flex flex-wrap justify-between gap-6 md:mt-10'>
      <CalendarSegment 
        data={{ dates, duplicates, eventsDays, datesByEventId }}
        date={date}
        month={month}
        onSelect={handleSelectDate}
        setMonth={setMonth}
        className="xl:w-[calc(33%-1.5rem)] md:w-[calc(50%-1.5rem)] sm:w-full w-full p-0"
      />

      <CarouselSegment
        data={{ dates, duplicates, eventsDays, datesByEventId }}
        api={carouselApi}
        setApi={setCarouselApi}
        setDate={setDate}
        setMonth={setMonth}
        className='xl:w-[calc(33%-1.5rem)] md:w-[calc(50%-1.5rem)] max-w-none'
      />

      <TextSegment datesByEventId={datesByEventId} className='xl:w-[calc(33%-2.5rem)]' />
    </div>
  )
}
