"use client"

import type { DiplomaT, ExamT, RangeDatesT } from '@/lib/types/entities';
import React from 'react'
import { getDayData } from '../getCalendarData';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { formatDate } from '@/lib/utils';
import { useLocale } from '@/lib/hooks/useLocale';
import Link from '@/components/Link'
import NextLink from "next/link";
import dynamic from 'next/dynamic';
import CalendarCardLoading from './CalendarCardLoading';

const ExamCardTabs = dynamic(
  () => import('./ExamCardTabs'), {loading: () => <CalendarCardLoading />}
)

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
    rescheduling: ExamT[];
    retakes: ExamT[];
    eduPractices: RangeDatesT[];
    internships: RangeDatesT[];
    preGraduatePractices: RangeDatesT[];
    holidays: RangeDatesT[];
  },
  type: "exam" | "test" | "rescheduling" | "retakes"
}) {
  const locale = useLocale()
  const dict = useDictionary()

  const data = getDayData({date, cardsData, type}) as ExamT[]

  if (data.length === 0) return (
    <div className='flex items-center justify-center text-center'>
      {dict.CalendarGroups.notFound}
    </div>
  )

  if (data.length > 1) return (
    <ExamCardTabs date={date} data={data} type={type} />
  ) 
  else return (
    <div className='flex flex-col items-center justify-center gap-2'>
      <div className='flex flex-col items-center justify-center text-center'>
        <h6 className='font-medium'>
          {type === "exam" && dict.CalendarGroups.exams}
          {type === "test" && dict.CalendarGroups.tests}
          {type === "rescheduling" && dict.CalendarGroups.rescheduling}
          {type === "retakes" && dict.CalendarGroups.retakes}
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
        {data[0].description && (
          <p className='mt-2 text-sm'>{data[0].description}</p>
        )}
      </div>
    </div>
  )
}
