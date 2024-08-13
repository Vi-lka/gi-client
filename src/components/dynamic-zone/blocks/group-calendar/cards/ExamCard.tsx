"use client"

import type { DiplomaT, ExamT } from '@/lib/types/entities';
import React from 'react'
import { getDayData } from '../getCalendarData';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { formatDate } from '@/lib/utils';
import { useLocale } from '@/lib/hooks/useLocale';
import Link from '@/components/Link'
import NextLink from "next/link";

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

  const data = getDayData({date, cardsData, type}) as ExamT | undefined

  if (!data) return (
    <div className='flex items-center justify-center text-center'>
      {dict.CalendarGroups.notFound}
    </div>
  )
  
  return (
    <div className='flex flex-col items-center justify-center gap-2'>
      <div className='flex flex-col items-center justify-center text-center'>
        <h6 className='font-medium'>
          {type === "exam" && dict.CalendarGroups.exams}
          {type === "test" && dict.CalendarGroups.tests}
        </h6>
        <p className='text-sm'>
          {formatDate(data.date, locale)}
        </p>
      </div>
      <div className='w-full flex flex-col gap-1.5'>
        <p className=''>{data.name}</p>
        <NextLink 
          href={`https://maps.yandex.ru/?text=${data.address}`} 
          target='__blank'
          className='group/card'
        >
          <p className='font-medium'>{dict.CalendarGroups.address}:</p>
          <p className='text-sm underline-offset-2 group-hover/card:underline group-hover/card:underline-offset-4 transition-all transform-gpu duration-300'>
            {data.address}
          </p>
        </NextLink>
        {data.teacher.data && (
          <Link 
            locale={locale} 
            href={`/structure/employees/${data.teacher.data.attributes.slug}`}
            className="group/card"
          >
            <p className='font-medium'>{dict.CalendarGroups.teacher}:</p>
            <p className='text-sm underline-offset-2 group-hover/card:underline group-hover/card:underline-offset-4 transition-all transform-gpu duration-300'>
              {data.teacher.data.attributes.title}
            </p>
          </Link>
        )}
      </div>
    </div>
  )
}
