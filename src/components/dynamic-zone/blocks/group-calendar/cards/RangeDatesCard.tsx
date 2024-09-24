import type { DiplomaT, ExamT, RangeDatesT } from '@/lib/types/entities';
import React from 'react'
import { getDayData } from '../getCalendarData';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { formatDate } from '@/lib/utils';
import { useLocale } from '@/lib/hooks/useLocale';

export default function RangeDatesCard({
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
    eduPractices: RangeDatesT[];
    internships: RangeDatesT[];
    preGraduatePractices: RangeDatesT[];
    holidays: RangeDatesT[];
  },
  type: "eduPractice" | "internship" | "preGraduatePractices" | "holiday"
}) {
  const locale = useLocale()
  const dict = useDictionary()

  const data = getDayData({date, cardsData, type}) as RangeDatesT | undefined

  if (!data) return (
    <div className='flex items-center justify-center text-center'>
      {dict.CalendarGroups.notFound}
    </div>
  )

  return (
    <div className='flex flex-col items-center justify-center gap-2'>
      <div className='flex flex-col items-center justify-center text-center'>
        <h6 className='font-medium'>
          {type === "eduPractice" && dict.CalendarGroups.eduPractices}
          {type === "internship" && dict.CalendarGroups.internships}
          {type === "preGraduatePractices" && dict.CalendarGroups.preGraduatePractices}
          {type === "holiday" && dict.CalendarGroups.holidays}
        </h6>
        <p className='text-sm'>
          {data.dateEnd 
            ? `${formatDate(data.dateStart, locale)} - ${formatDate(data.dateEnd, locale)}`
            : formatDate(data.date, locale)
          }
        </p>
      </div>

      {data.description && (
        <div className='w-full flex flex-col gap-1.5'>
          <p className='mt-2 text-sm'>{data.description}</p>
        </div>
      )}
    </div>
  )
}
