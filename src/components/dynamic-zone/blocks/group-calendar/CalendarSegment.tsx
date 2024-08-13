"use client"

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { useLocale } from '@/lib/hooks/useLocale';
import { cn, reConvertUTCDateToLocalDate } from '@/lib/utils';
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import React, { useState, useTransition } from 'react'
import type {Matcher} from 'react-day-picker';
import { getCalendarLabels } from './getCalendarData';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import DayComponent from './DayComponent';
import type { DiplomaT, ExamT } from '@/lib/types/entities';

type Props = {
  dates: {
    examsDates: Date[];
    testsDates: Date[];
    stateExamsDates: Date[];
    diplomasDates: Date[];
    eduPracticesDates: Date[];
    internshipsDates: Date[];
    holidaysDates: Date[];
  },
  groupsData: {
    exams: ExamT[];
    tests: ExamT[];
    stateExams: DiplomaT[];
    diplomas: DiplomaT[];
  },
  className?: string
}

export default function CalendarSegment({
  dates,
  groupsData,
  className
}: Props) {
  const examsDates = dates.examsDates.map(item => reConvertUTCDateToLocalDate(item, true))
  const testsDates = dates.testsDates.map(item => reConvertUTCDateToLocalDate(item, true))
  const stateExamsDates = dates.stateExamsDates.map(item => reConvertUTCDateToLocalDate(item, true))
  const diplomasDates = dates.diplomasDates.map(item => reConvertUTCDateToLocalDate(item, true))
  const eduPracticesDates = dates.eduPracticesDates.map(item => reConvertUTCDateToLocalDate(item, true))
  const internshipsDates = dates.internshipsDates.map(item => reConvertUTCDateToLocalDate(item, true))
  const holidaysDates = dates.holidaysDates.map(item => reConvertUTCDateToLocalDate(item, true))

  const allDates = [
    ...examsDates, 
    ...testsDates,
    ...stateExamsDates,
    ...diplomasDates,
    ...eduPracticesDates,
    ...internshipsDates,
    ...holidaysDates
  ]

  const exams = groupsData.exams.map(item => {
    const {date, ...rest} = item
    const reConvertedDate = reConvertUTCDateToLocalDate(date)
    return {
      date: reConvertedDate,
      ...rest
    }
  })
  const tests = groupsData.tests.map(item => {
    const {date, ...rest} = item
    const reConvertedDate = reConvertUTCDateToLocalDate(date)
    return {
      date: reConvertedDate,
      ...rest
    }
  })
  const stateExams = groupsData.stateExams.map(item => {
    const {date, ...rest} = item
    const reConvertedDate = reConvertUTCDateToLocalDate(date)
    return {
      date: reConvertedDate,
      ...rest
    }
  })
  const diplomas = groupsData.diplomas.map(item => {
    const {date, ...rest} = item
    const reConvertedDate = reConvertUTCDateToLocalDate(date)
    return {
      date: reConvertedDate,
      ...rest
    }
  })

  const cardsData = {
    exams,
    tests,
    stateExams,
    diplomas,
    eduPractices: eduPracticesDates,
    internships: internshipsDates,
    holidays: holidaysDates,
  }

  const disabledMatcher: Matcher = (day: Date) => {
    return !Boolean(allDates.find(item => item.toDateString() === day.toDateString()));
  };

  const locale = useLocale()

  const dict = useDictionary()

  const currentYear = new Date()
  const [month, setMonth] = useState(new Date(currentYear.getFullYear(), 0, 1))
  const [isPendingMonth, startTransitionMonth] = useTransition()

  return (
    <>
      <div className='w-full flex gap-6 items-center justify-between mb-3'>
        <Button 
          variant="outline" 
          disabled={isPendingMonth}
          className='w-fit px-2 rounded-xl' 
          onClick={() => 
            startTransitionMonth(() => {
              setMonth(new Date(month.getFullYear()-1, 0, 1))
            })
          }
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </Button>
        <Button 
          variant="outline" 
          disabled={isPendingMonth}
          className='w-fit px-2 rounded-xl'
          onClick={() => 
            startTransitionMonth(() => {
              setMonth(new Date(month.getFullYear()+1, 0, 1))
            })
          }
        >
          <ChevronRightIcon className="h-5 w-5" />
        </Button>
      </div>
      {isPendingMonth 
        ? ("...isPendingMonth")
        : (
          <Calendar
            mode="single"
            ISOWeek
            numberOfMonths={12}
            disableNavigation
            showOutsideDays={false}
            lang={locale}
            modifiers={{
              examsDates,
              testsDates, 
              stateExamsDates,
              diplomasDates,
              eduPracticesDates,
              internshipsDates,
              holidaysDates
            }}
            modifiersClassNames={{
              examsDates: "!w-full aria-selected:bg-accent bg-exams/90 text-exams-foreground aria-selected:hover:bg-accent aria-selected:hover:text-accent-foreground rounded-xl",
              testsDates: "!w-full aria-selected:bg-accent bg-tests/90 text-tests-foreground aria-selected:hover:bg-accent aria-selected:hover:text-accent-foreground rounded-xl",
              stateExamsDates: "!w-full aria-selected:bg-accent bg-stateExams/90 text-stateExams-foreground aria-selected:hover:bg-accent aria-selected:hover:text-accent-foreground rounded-xl",
              diplomasDates: "!w-full aria-selected:bg-accent bg-diplomas/90 text-diplomas-foreground aria-selected:hover:bg-accent aria-selected:hover:text-accent-foreground rounded-xl",
              eduPracticesDates: "!w-full aria-selected:bg-accent bg-eduPractices/90 text-eduPractices-foreground aria-selected:hover:bg-accent aria-selected:hover:text-accent-foreground rounded-xl",
              internshipsDates: "!w-full aria-selected:bg-accent bg-internships/90 text-internships-foreground aria-selected:hover:bg-accent aria-selected:hover:text-accent-foreground rounded-xl",
              holidaysDates: "!w-full aria-selected:bg-accent bg-holidays/90 text-holidays-foreground aria-selected:hover:bg-accent aria-selected:hover:text-accent-foreground rounded-xl",
            }}
            disabled={disabledMatcher}
            month={month}
            className={cn("p-0", className)}
            classNames={{
              caption: "flex sm:justify-start justify-center sm:pl-4 pt-1 relative items-center",
              caption_label: "text-base font-semibold capitalize",
              months:"flex flex-wrap flex-col sm:flex-row min-[1140px]:gap-6 gap-4",
              month: "space-y-4 min-[1140px]:w-[calc(33.333333%-1.5rem)] sm:w-[calc(50%-1rem)] w-full",
              day_outside: "",
            }}
            components={{
              Day: (props) => <DayComponent cardsData={cardsData} {...props} />
            }}
          />
        )
      }
      <div className='w-full flex gap-6 items-center justify-between mt-3'>
        <Button 
          variant="outline" 
          disabled={isPendingMonth}
          className='w-fit px-2 rounded-xl' 
          onClick={() => 
            startTransitionMonth(() => {
              setMonth(new Date(month.getFullYear()-1, 0, 1))
            })
          }
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </Button>
        <Button 
          variant="outline" 
          disabled={isPendingMonth}
          className='w-fit px-2 rounded-xl'
          onClick={() => 
            startTransitionMonth(() => {
              setMonth(new Date(month.getFullYear()+1, 0, 1))
            })
          }
        >
          <ChevronRightIcon className="h-5 w-5" />
        </Button>
      </div>
      <div className='flex flex-wrap gap-x-6 gap-y-3 mt-3'>
        {getCalendarLabels(dict).map(item => (
          <p key={item.title} className='flex items-center gap-1'>
            <span className={cn("w-5 h-5 rounded-full", item.color)}/>
            <span>-</span>
            <span>{item.title}</span>
          </p>
        ))}
      </div>
    </>
  )
}
