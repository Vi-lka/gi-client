"use client"

import type { EventDayT } from "@/lib/types/entities";
import { CarouselContent as EmblaCarouselContent } from '@/components/ui/carousel'
import CarouselItemSingle from './CarouselItemSingle'
import CarouselItemMulti from './CarouselItemMulti'
import { getDateIndx } from "@/lib/utils";

export default function CarouselContent({
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

  return (
    <EmblaCarouselContent className="-mt-4 h-[280px]">
      {dates.map((dateItem, indx) => {
        const duplicateIndx = getDateIndx(dateItem, duplicates);

        const eventsInCurrentDate = datesByEventId.map(item => {
          const finded = item.dates.find(date => date.toDateString() === dateItem.toDateString())
          if (finded) return item.id
          else return undefined
        }).filter(item => item) as string[]

        // Find data for card
        const items = eventsDays.map(item => {
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

        // If duplicates
        if (duplicateIndx >= 0) return (
          <CarouselItemMulti key={indx} date={dateItem} items={items} />
        )
        else return <CarouselItemSingle key={indx} date={dateItem} data={items[0]} />
      })}
    </EmblaCarouselContent>
  )
}