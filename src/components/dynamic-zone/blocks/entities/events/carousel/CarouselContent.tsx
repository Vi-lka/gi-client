"use client"

import type { EventDayT } from "@/lib/types/entities";
import { CarouselContent as EmblaCarouselContent } from '@/components/ui/carousel'
import CarouselItemSingle from './CarouselItemSingle'
import CarouselItemMulti from './CarouselItemMulti'
import { getDateIndx } from "@/lib/utils";

export default function CarouselContent({
  data,
  uniqDates,
  duplicates
}: {
  data: {
    eventId: string;
    days: EventDayT[]
  }[],
  uniqDates: Date[],
  duplicates: Date[],
}) {

  return (
    <EmblaCarouselContent className="-mt-4 h-[280px]">
      {uniqDates.map((dateItem, indx) => {
        const duplicateIndx = getDateIndx(dateItem, duplicates);

        // Find data for card
        const items = data.map(item => {
          const finded = item.days.find(day => day.date.toDateString() === dateItem.toDateString())
          if (finded) return { eventId: item.eventId, itemData: finded }
          else return undefined
        }).filter(item => item) as Array<{
          eventId: string;
          itemData: EventDayT;
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