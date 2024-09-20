"use client"

import React, { useEffect, useState } from 'react'
import type { SelectSingleEventHandler } from 'react-day-picker'
import CalendarSegment from './segments/CalendarSegment'
import CarouselSegment from './segments/CarouselSegment'
import { reConvertUTCDateToLocalDate, getDateIndx } from '@/lib/utils'
import type { CarouselApi } from '@/components/ui/carousel'
import TextSegment from './segments/TextSegment'
import { dateAtom, eventIdAtom, monthAtom } from '@/lib/hooks/atoms'
import { useAtom } from 'jotai'
import CalendarBlocksLoading from '@/components/loadings/CalendarBlocksLoading'
import type { EventDayT } from '@/lib/types/entities'

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

  const datesConverted = dates.map(item => reConvertUTCDateToLocalDate(item, true))
  const duplicatesConverted = duplicates.map(item => reConvertUTCDateToLocalDate(item, true))

  const eventsDaysConverted = eventsDays.map(item => {
    const daysConverted = item.days.map(day => {
      const {date, ...rest} = day
      return { date: reConvertUTCDateToLocalDate(date, true), ...rest }
    })
    return {eventId: item.eventId, days: daysConverted }
  })
  const datesByEventIdConverted = datesByEventId.map(item => {
    const { dates, eventData, ...restItem } = item
    const { 
      dateStart, 
      dateEnd, 
      ...restEventData 
    } = eventData

    const itemDatesConverted = dates.map(item => reConvertUTCDateToLocalDate(item, true))
    const dateStartConverted = reConvertUTCDateToLocalDate(dateStart, true)
    const dateEndConverted = dateEnd ? reConvertUTCDateToLocalDate(dateEnd, true) : dateEnd
    const eventDataConverted = {
      dateStart: dateStartConverted,
      dateEnd: dateEndConverted,
      ...restEventData
    }

    return {
      dates: itemDatesConverted,
      eventData: eventDataConverted,
      ...restItem
    }
  })

  const [loading, setLoading] = useState(true)
  
  const [eventId, setEventId] = useAtom(eventIdAtom)
  const [date, setDate] = useAtom(dateAtom)
  const [month, setMonth] = useAtom(monthAtom)
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi>()

  const thisMonthDates = datesConverted.filter(item => {
    const today = new Date();
    const isThisYear = item.getFullYear() === today.getFullYear()
    const isThisMonth = item.getMonth() === today.getMonth();
  
    return isThisYear && isThisMonth;
  })

  const nextMonthsDates = datesConverted.filter(item => {
    const today = new Date();
    const isNextMonths = new Date(item.getFullYear(), item.getMonth(), today.getDay()) > today;
  
    return isNextMonths;
  })

  const biggerThanTodayDates = thisMonthDates.filter(item => {
    const today = new Date();
    const isBiggerThanToday = item > today;

    return isBiggerThanToday;
  })

  const firstDate = biggerThanTodayDates[0] 
  ? biggerThanTodayDates[0] 
  : thisMonthDates[0] 
    ? thisMonthDates[0] 
    : nextMonthsDates[0]
      ? nextMonthsDates[0]
      : undefined
  
  useEffect(() => {
    setDate(firstDate ?? datesConverted[0])
    setMonth(firstDate ?? datesConverted[0])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!carouselApi) return
    carouselApi.scrollTo(firstDate ? getDateIndx(firstDate, datesConverted) : 0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carouselApi])

  useEffect(() => {
    const eventsInCurrentDate = datesByEventIdConverted.map(item => {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date])

  const handleSelectDate: SelectSingleEventHandler = (_, selectedDay) => {
    setDate(selectedDay)

    const indx = getDateIndx(selectedDay, datesConverted)

    carouselApi?.scrollTo(indx)
  }

  if (!date && loading) return <CalendarBlocksLoading />

  return (
    <div className='flex flex-wrap justify-between gap-6 md:mt-10'>
      <CalendarSegment 
        data={{ 
          dates: datesConverted, 
          duplicates: duplicatesConverted, 
          eventsDays: eventsDaysConverted, 
          datesByEventId: datesByEventIdConverted
        }}
        date={date}
        month={month}
        onSelect={handleSelectDate}
        className="xl:w-[calc(33%-1.5rem)] md:w-[calc(50%-1.5rem)] sm:w-full w-full p-0"
      />

      <CarouselSegment
        data={{ 
          dates: datesConverted, 
          duplicates: duplicatesConverted, 
          eventsDays: eventsDaysConverted, 
          datesByEventId: datesByEventIdConverted
        }}
        api={carouselApi}
        setApi={setCarouselApi}
        className='xl:w-[calc(33%-1.5rem)] md:w-[calc(50%-1.5rem)] max-w-none'
      />

      <TextSegment datesByEventId={datesByEventIdConverted} className='xl:w-[calc(33%-2.5rem)] xl:mt-0 mt-3' />
    </div>
  )
}

