"use client"

import { Carousel, CarouselContent } from '@/components/ui/carousel'
import type { EventDayT } from '@/lib/types/entities'
import React from 'react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import type { CarouselApi } from '@/components/ui/carousel'
import { cn, getDateIndx } from '@/lib/utils'
import CarouselItemMulti from './CarouselItemMulti'
import CarouselItemSingle from './CarouselItemSingle'

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
  },
  api: CarouselApi,
  setApi: React.Dispatch<React.SetStateAction<CarouselApi>>
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>,
  setMonth: React.Dispatch<React.SetStateAction<Date | undefined>>,
  className?: string,
}

export default function CarouselSegment({
  data,
  api,
  setApi,
  setDate,
  setMonth,
  className,
}: Props) {
 
  React.useEffect(() => {
    if (!api) {
      return
    }
 
    setDate(data.dates[api.selectedScrollSnap()])
    setMonth(data.dates[api.selectedScrollSnap()])
 
    api.on("select", () => {
      setDate(data.dates[api.selectedScrollSnap()])
      setMonth(data.dates[api.selectedScrollSnap()])
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api])

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
    <Carousel
      setApi={setApi}
      opts={{ align: "center", axis: "y" }}
      plugins={[
        WheelGesturesPlugin()
      ]}
      orientation="vertical"
      className={cn("w-full max-w-lg", className)}
    >
      <CarouselContent className="-mt-4 h-[280px]">
        {data.dates.map((dateItem, indx) => {
          const { duplicateIndx, items } = getItemData(dateItem)
          // If duplicates
          if (duplicateIndx >= 0) return (
            <CarouselItemMulti key={indx} date={dateItem} items={items} />
          )
          else return <CarouselItemSingle key={indx} date={dateItem} data={items[0]} />
        })}
      </CarouselContent>
    </Carousel>
  )
}

