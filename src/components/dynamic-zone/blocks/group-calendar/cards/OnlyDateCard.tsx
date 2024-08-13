import type { DiplomaT, ExamT } from '@/lib/types/entities';
import React from 'react'
import { getDayData } from '../getCalendarData';
import { useDictionary } from '@/components/providers/DictionaryProvider';

export default function OnlyDateCard({
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
  type: "eduPractice" | "internship" | "holiday"
}) {
  const dict = useDictionary()

  const data = getDayData({date, cardsData, type}) as Date | undefined

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
          {type === "holiday" && dict.CalendarGroups.holidays}
        </h6>
      </div>
    </div>
  )
}
