"use client"

import { Card, CardContent } from "@/components/ui/card";
import { CarouselItem } from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { EventDayT } from "@/lib/types/entities";

export default function CarouselItemMulti({
  items,
//   date
}: {
  items: {
    eventId: string;
    itemData: EventDayT;
  }[]
  date: Date
}) {
  return (
    <CarouselItem className=''>
      <Card className='min-w-0 h-full bg-primary text-primary-foreground dark:bg-card dark:text-card-foreground group/card border-transparent dark:border-border/20 dark:hover:border-border hover:shadow-md shadow-sm rounded-3xl transition duration-300'>
        {items.length > 0
          ? (
            <Tabs defaultValue={items[0].eventId} className="">
              <TabsList>
                {items.map((item, indx) => (
                  <TabsTrigger key={item.eventId} value={item.eventId}>{indx+1}</TabsTrigger>
                ))}
              </TabsList>
                {items.map((item, indx) => (
                  <TabsContent key={item.eventId} value={item.eventId}>
                    <CardContent key={indx} className="h-full flex items-center justify-center p-6">
                      {item.itemData.date.toDateString()} {item.itemData.title} 
                    </CardContent>
                  </TabsContent>
                ))}
            </Tabs>
          )
          : (
            <CardContent className="h-full flex items-center justify-center p-6">
              <span className="text-3xl font-semibold">Duplicate No Data</span>
            </CardContent>
          )
        }
      </Card>
    </CarouselItem>
  )
}