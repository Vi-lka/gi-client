"use client"

import type { DiplomaT, ExamT } from '@/lib/types/entities';
import React, { useState } from 'react'
import { getDayData } from '../getCalendarData';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { formatDate } from '@/lib/utils';
import { useLocale } from '@/lib/hooks/useLocale';
import Link from '@/components/Link'
import NextLink from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

export default function ExamCard({
  date,
  cardsData,
  type,
}: {
  date: Date, 
  cardsData: {
    exams: ExamT[];
    tests: ExamT[];
    stateExams: DiplomaT[];
    diplomas: DiplomaT[];
    eduPractices: Date[];
    internships: Date[];
    holidays: Date[];
  },
  type: "exam" | "test"
}) {
  const locale = useLocale()
  const dict = useDictionary()

  const data = getDayData({date, cardsData, type}) as ExamT[]

  const [selectedTab, setSelectedTab] = useState(data[0] ? data[0].name : "")

  if (data.length === 0) return (
    <div className='flex items-center justify-center text-center'>
      {dict.CalendarGroups.notFound}
    </div>
  )

  if (data.length > 1) return (
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
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  ) 
  else return (
    <div className='flex flex-col items-center justify-center gap-2'>
      <div className='flex flex-col items-center justify-center text-center'>
        <h6 className='font-medium'>
          {type === "exam" && dict.CalendarGroups.exams}
          {type === "test" && dict.CalendarGroups.tests}
        </h6>
        <p className='text-sm'>
          {formatDate(data[0].date, locale)}
        </p>
      </div>
      <div className='w-full flex flex-col gap-1.5'>
        <p className=''>{data[0].name}</p>
        <NextLink 
          href={`https://maps.yandex.ru/?text=${data[0].address}`} 
          target='__blank'
          className='group/card'
        >
          <p className='font-medium'>{dict.CalendarGroups.address}:</p>
          <p className='text-sm underline-offset-2 group-hover/card:underline group-hover/card:underline-offset-4 transition-all transform-gpu duration-300'>
            {data[0].address}
          </p>
        </NextLink>
        {data[0].teacher.data && (
          <Link 
            locale={locale} 
            href={`/structure/employees/${data[0].teacher.data.attributes.slug}`}
            className="group/card"
          >
            <p className='font-medium'>{dict.CalendarGroups.teacher}:</p>
            <p className='text-sm underline-offset-2 group-hover/card:underline group-hover/card:underline-offset-4 transition-all transform-gpu duration-300'>
              {data[0].teacher.data.attributes.title}
            </p>
          </Link>
        )}
      </div>
    </div>
  )
}