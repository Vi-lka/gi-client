"use client"

import { Card, CardContent } from "@/components/ui/card";
import { CarouselItem } from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { EventDayT } from "@/lib/types/entities";
import { motion } from "framer-motion";
import { useState } from "react";

export default function CarouselItemMulti({
  // date,
  items,
}: {
  date: Date,
  items: {
    eventId: string;
    itemData: EventDayT | undefined;
  }[]
}) {

  const [selectedTab, setSelectedTab] = useState(items[0].eventId);

  return (
    <CarouselItem className='relative'>
      {items.length > 0
        ? (
        <Tabs value={selectedTab} defaultValue={items[0].eventId} className="h-full">
          <TabsList className="absolute top-3 -left-1 z-50 flex-wrap h-fit sm:justify-around justify-center gap-y-1 bg-secondary  rounded-lg">
            {items.map((item, indx) => (
              <TabsTrigger 
                key={item.eventId} 
                value={item.eventId}
                onClick={() => setSelectedTab(item.eventId)}
                className="relative inline-flex py-1 px-3 rounded-md text-base text-primary/80 hover:text-primary data-[state=active]:text-primary-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none transition-all duration-200"
              >
                {selectedTab === item.eventId && (
                  <motion.span
                    layoutId={`bubble`}
                    className="absolute inset-0 z-[-1] bg-primary shadow rounded-md"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                {indx+1}
              </TabsTrigger>
            ))}
          </TabsList>
            {items.map((item, indx) => (
              <TabsContent key={item.eventId} value={item.eventId} className="h-full mt-0 animate-rotate-y animate-ease-in-out animate-duration-700">
                <Card className='min-w-0 h-full bg-primary text-primary-foreground dark:bg-card dark:text-card-foreground group/card border-transparent dark:border-border/20 dark:hover:border-border hover:shadow-md shadow-sm rounded-3xl transition duration-300'>
                  <CardContent key={indx} className="h-full flex items-center justify-center p-6 animate-fade animate-duration-500 animate-delay-200 animate-ease-in">
                    {item.itemData?.date.toDateString()} {item.itemData?.title} 
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
        </Tabs>
        )
        : (
          <Card className='min-w-0 h-full bg-primary text-primary-foreground dark:bg-card dark:text-card-foreground group/card border-transparent dark:border-border/20 dark:hover:border-border hover:shadow-md shadow-sm rounded-3xl transition duration-300'>
            <CardContent className="h-full flex items-center justify-center p-6">
              <span className="text-3xl font-semibold">Duplicate No Data</span>
            </CardContent>
          </Card>
        )
      }
    </CarouselItem>
  )
}