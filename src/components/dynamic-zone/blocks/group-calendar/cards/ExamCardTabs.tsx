"use client"

import { useDictionary } from '@/components/providers/DictionaryProvider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLocale } from '@/lib/hooks/useLocale';
import type { ExamT } from '@/lib/types/entities';
import { motion } from 'framer-motion';
import React, { useState } from 'react'
import NextLink from "next/link";
import Link from '@/components/Link'
import { formatDate } from '@/lib/utils';

export default function ExamCardTabs({
  date,
  data,
  type,
}: {
  date: Date, 
  data: ExamT[];
  type: "exam" | "test" | "rescheduling" | "retakes"
}) {
  const locale = useLocale()
  const dict = useDictionary()

  const [selectedTab, setSelectedTab] = useState(data[0] ? data[0].name : "")

  return (
    <Tabs value={selectedTab} defaultValue={data[0].name} className="h-full">
      <TabsList className="absolute -top-4 md:-left-2 left-0 flex-wrap h-fit sm:justify-around justify-center gap-y-1 bg-apricot rounded-lg z-50">
        {data.map((item, indx) => (
          <TabsTrigger 
            key={indx} 
            value={item.name}
            onClick={() => setSelectedTab(item.name)}
            className="relative inline-flex py-0.5 px-2.5 rounded-md text-base text-primary/80 hover:text-primary data-[state=active]:text-primary-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none transition-all duration-200"
          >
            {selectedTab === item.name && (
              <motion.span
                layoutId={`bubble${date}`}
                className="absolute inset-0 z-[-1] bg-primary shadow rounded-md"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
            {indx+1}
          </TabsTrigger>
        ))}
      </TabsList>
      {data.map((item, indx) => (
        <TabsContent
          key={indx} 
          value={item.name} 
          className="h-full mt-0"
        >
          <div className='flex flex-col items-center justify-center gap-2'>
            <div className='flex flex-col items-center justify-center text-center'>
              <h6 className='font-medium'>
                {type === "exam" && dict.CalendarGroups.exams}
                {type === "test" && dict.CalendarGroups.tests}
                {type === "rescheduling" && dict.CalendarGroups.rescheduling}
                {type === "retakes" && dict.CalendarGroups.retakes}
              </h6>
              <p className='text-sm'>
                {formatDate(item.date, locale)}
              </p>
            </div>
            <div className='w-full flex flex-col gap-1.5 animate-fade animate-duration-500 animate-ease-in-out'>
              <p className=''>{item.name}</p>
              <NextLink 
                href={`https://maps.yandex.ru/?text=${item.address}`} 
                target='__blank'
                className='group/card'
              >
                <p className='font-medium'>{dict.CalendarGroups.address}:</p>
                <p className='text-sm underline-offset-2 group-hover/card:underline group-hover/card:underline-offset-4 transition-all transform-gpu duration-300'>
                  {item.address}
                </p>
              </NextLink>
              {item.teacher.data && (
                <Link 
                  locale={locale} 
                  href={`/structure/employees/${item.teacher.data.attributes.slug}`}
                  className="group/card"
                >
                  <p className='font-medium'>{dict.CalendarGroups.teacher}:</p>
                  <p className='text-sm underline-offset-2 group-hover/card:underline group-hover/card:underline-offset-4 transition-all transform-gpu duration-300'>
                    {item.teacher.data.attributes.title}
                  </p>
                </Link>
              )}
              {item.description && (
                <p className='mt-2 text-sm'>{item.description}</p>
              )}
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
