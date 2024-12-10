import type { DiplomaT, ExamT, RangeDatesT } from '@/lib/types/entities';
import React from 'react'
import { getDayData } from '../getCalendarData';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { formatDate, formatTime } from '@/lib/utils';
import { useLocale } from '@/lib/hooks/useLocale';
import NextLink from "next/link";

export default function DiplomaCard({
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
  type: "stateExam" | "diploma"
}) {
  const locale = useLocale()
  const dict = useDictionary()

  const data = getDayData({date, cardsData, type}) as DiplomaT | undefined

  if (!data) return (
    <div className='flex items-center justify-center text-center'>
      {dict.CalendarGroups.notFound}
    </div>
  )

  return (
    <div className='flex flex-col items-center justify-center gap-2'>
      <div className='flex flex-col items-center justify-center text-center'>
        <h6 className='font-medium'>
          {type === "stateExam" && dict.CalendarGroups.stateExams}
          {type === "diploma" && dict.CalendarGroups.diplomas}
        </h6>
        <p className='text-sm'>
          {formatDate(data.date, locale)}
          {!!data.time && ` - ${formatTime(data.time)}`}
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
        <div className=''>
          <p className='font-medium'>{dict.CalendarGroups.chairman}:</p>
          <p className='text-sm'>{data.chairman}</p>
        </div>
        {data.description && (
          <p className='mt-2 text-sm'>{data.description}</p>
        )}
      </div>
    </div>
  )
}
