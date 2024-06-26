"use client"

import { Carousel } from '@/components/ui/carousel'
import type { EventDayT } from '@/lib/types/entities'
import React from 'react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import type { CarouselApi } from '@/components/ui/carousel'
import { cn, getDateIndx } from '@/lib/utils'
import CarouselContent from './CarouselContent'


export default function CarouselSegment({
  api,
  setApi,
  activeDates,
  eventsDays,
  setDate,
  setMonth,
  className,
}: {
  api: CarouselApi,
  setApi: React.Dispatch<React.SetStateAction<CarouselApi>>
  activeDates: Date[],
  eventsDays: {
    eventId: string;
    days: EventDayT[]
  }[],
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>,
  setMonth: React.Dispatch<React.SetStateAction<Date | undefined>>,
  className?: string,
}) {

  const uniqDates = activeDates.filter((item, index) => 
    getDateIndx(item, activeDates) === index
  );

  const duplicates = activeDates.filter((item, index) => 
    activeDates.some((elem, idx) => elem.toDateString() === item.toDateString() && idx !== index)
  )
  const uniqDuplicates = duplicates.filter((item, index) => 
    getDateIndx(item, duplicates) !== index
  );
 
  React.useEffect(() => {
    if (!api) {
      return
    }
 
    setDate(uniqDates[api.selectedScrollSnap()])
    setMonth(uniqDates[api.selectedScrollSnap()])
 
    api.on("select", () => {
      setDate(uniqDates[api.selectedScrollSnap()])
      setMonth(uniqDates[api.selectedScrollSnap()])
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api])

  return (
    <Carousel
      setApi={setApi}
      opts={{ align: "center", axis: "y" }}
      plugins={[
        WheelGesturesPlugin({ forceWheelAxis: "y" })
      ]}
      orientation="vertical"
      className={cn("w-full max-w-lg", className)}
    >
      <CarouselContent 
        data={eventsDays}
        uniqDates={uniqDates}
        duplicates={uniqDuplicates}
      />
    </Carousel>
  )
}

