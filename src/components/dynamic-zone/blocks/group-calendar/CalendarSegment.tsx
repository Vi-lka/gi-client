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
import type { DiplomaT, ExamT, RangeDatesT } from '@/lib/types/entities';
import { BigCalendarLoading } from '@/components/loadings/GroupCalendarLoading';
import DayContentComponent from './DayContentComponent';
import { Info } from 'lucide-react';

type Props = {
  dates: {
    examsDates: Date[];
    testsDates: Date[];
    stateExamsDates: Date[];
    diplomasDates: Date[];
    reschedulingDates: Date[];
    retakesDates: Date[];
    eduPracticesDates: Date[];
    internshipsDates: Date[];
    preGraduatePracticesDates: Date[];
    holidaysDates: Date[];
  },
  weekends: Date[],
  groupsData: {
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
  className?: string
}

export default function CalendarSegment({
  dates,
  weekends,
  groupsData,
  className
}: Props) {
  const examsDates = dates.examsDates.map(item => reConvertUTCDateToLocalDate(item, true))
  const testsDates = dates.testsDates.map(item => reConvertUTCDateToLocalDate(item, true))
  const stateExamsDates = dates.stateExamsDates.map(item => reConvertUTCDateToLocalDate(item, true))
  const diplomasDates = dates.diplomasDates.map(item => reConvertUTCDateToLocalDate(item, true))
  const reschedulingDates = dates.reschedulingDates.map(item => reConvertUTCDateToLocalDate(item, true))
  const retakesDates = dates.retakesDates.map(item => reConvertUTCDateToLocalDate(item, true))
  const eduPracticesDates = dates.eduPracticesDates.map(item => reConvertUTCDateToLocalDate(item, true))
  const internshipsDates = dates.internshipsDates.map(item => reConvertUTCDateToLocalDate(item, true))
  const preGraduatePracticesDates = dates.preGraduatePracticesDates.map(item => reConvertUTCDateToLocalDate(item, true))
  const holidaysDates = dates.holidaysDates.map(item => reConvertUTCDateToLocalDate(item, true))

  const weekendsDates = weekends.map(item => reConvertUTCDateToLocalDate(item, true))

  const allDates = [
    ...examsDates, 
    ...testsDates,
    ...stateExamsDates,
    ...diplomasDates,
    ...reschedulingDates,
    ...retakesDates,
    ...eduPracticesDates,
    ...internshipsDates,
    ...preGraduatePracticesDates,
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
  const rescheduling = groupsData.rescheduling.map(item => {
    const {date, ...rest} = item
    const reConvertedDate = reConvertUTCDateToLocalDate(date)
    return {
      date: reConvertedDate,
      ...rest
    }
  })
  const retakes = groupsData.retakes.map(item => {
    const {date, ...rest} = item
    const reConvertedDate = reConvertUTCDateToLocalDate(date)
    return {
      date: reConvertedDate,
      ...rest
    }
  })
  const eduPractices = groupsData.eduPractices.map(item => {
    const {date, dateStart, dateEnd, ...rest} = item
    const reConvertedDate = reConvertUTCDateToLocalDate(date)
    const reConvertedStart = reConvertUTCDateToLocalDate(dateStart)
    const reConvertedEnd = dateEnd ? reConvertUTCDateToLocalDate(dateEnd) : null
    return {
      date: reConvertedDate,
      dateStart: reConvertedStart,
      dateEnd: reConvertedEnd,
      ...rest
    }
  })
  const internships = groupsData.internships.map(item => {
    const {date, dateStart, dateEnd, ...rest} = item
    const reConvertedDate = reConvertUTCDateToLocalDate(date)
    const reConvertedStart = reConvertUTCDateToLocalDate(dateStart)
    const reConvertedEnd = dateEnd ? reConvertUTCDateToLocalDate(dateEnd) : null
    return {
      date: reConvertedDate,
      dateStart: reConvertedStart,
      dateEnd: reConvertedEnd,
      ...rest
    }
  })
  const preGraduatePractices = groupsData.preGraduatePractices.map(item => {
    const {date, dateStart, dateEnd, ...rest} = item
    const reConvertedDate = reConvertUTCDateToLocalDate(date)
    const reConvertedStart = reConvertUTCDateToLocalDate(dateStart)
    const reConvertedEnd = dateEnd ? reConvertUTCDateToLocalDate(dateEnd) : null
    return {
      date: reConvertedDate,
      dateStart: reConvertedStart,
      dateEnd: reConvertedEnd,
      ...rest
    }
  })
  const holidays = groupsData.holidays.map(item => {
    const {date, dateStart, dateEnd, ...rest} = item
    const reConvertedDate = reConvertUTCDateToLocalDate(date)
    const reConvertedStart = reConvertUTCDateToLocalDate(dateStart)
    const reConvertedEnd = dateEnd ? reConvertUTCDateToLocalDate(dateEnd) : null
    return {
      date: reConvertedDate,
      dateStart: reConvertedStart,
      dateEnd: reConvertedEnd,
      ...rest
    }
  })

  const cardsData = {
    exams,
    tests,
    stateExams,
    diplomas,
    rescheduling,
    retakes,
    eduPractices,
    internships,
    preGraduatePractices,
    holidays,
  }

  const disabledMatcher: Matcher = (day: Date) => {
    return (
      !Boolean(
        allDates.find(item => item.toDateString() === day.toDateString())
      )
      // ||
      // Boolean(
        // holidays.find(item => item.date.toDateString() === day.toDateString())
      // )
    );
  };

  const locale = useLocale()

  const dict = useDictionary()

  const currentYear = new Date()
  const [month, setMonth] = useState(new Date(currentYear.getFullYear(), 0, 1))
  const [isPendingMonth, startTransitionMonth] = useTransition()

  function weekendsDays(day: Date) {
    return ((day.getDay() === 0));
  }

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
        ? (<BigCalendarLoading />)
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
              reschedulingDates,
              retakesDates,
              eduPracticesDates,
              internshipsDates,
              preGraduatePracticesDates,
              holidaysDates,
              weekendsDates,
              weekendsDays
            }}
            modifiersClassNames={{
              testsDates: "!w-full aria-selected:bg-accent border-[3px] border-tests text-tests-foreground aria-selected:hover:bg-accent aria-selected:hover:!text-accent-foreground aria-selected:!text-accent-foreground hover:!text-background rounded-xl !opacity-100",
              examsDates: "!w-full aria-selected:bg-accent bg-exams text-exams-foreground aria-selected:hover:bg-accent aria-selected:hover:!text-accent-foreground aria-selected:!text-accent-foreground hover:!text-background rounded-xl !opacity-100",
              stateExamsDates: "!w-full aria-selected:bg-accent border-[3px] border-stateExams text-stateExams-foreground aria-selected:hover:bg-accent aria-selected:hover:!text-accent-foreground aria-selected:!text-accent-foreground hover:!text-background rounded-xl !opacity-100",
              diplomasDates: "!w-full aria-selected:bg-accent bg-diplomas text-diplomas-foreground aria-selected:hover:bg-accent aria-selected:hover:!text-accent-foreground aria-selected:!text-accent-foreground hover:!text-background rounded-xl !opacity-100",
              reschedulingDates: "!w-full aria-selected:bg-accent border-[3px] border-internships text-internships-foreground aria-selected:hover:bg-accent aria-selected:hover:!text-accent-foreground aria-selected:!text-accent-foreground hover:!text-background rounded-xl !opacity-100",
              retakesDates: "!w-full aria-selected:bg-accent bg-internships text-exams-foreground aria-selected:hover:bg-accent aria-selected:hover:!text-accent-foreground aria-selected:!text-accent-foreground hover:!text-background rounded-xl !opacity-100",
              eduPracticesDates: "!w-full aria-selected:bg-accent border-[3px] border-dashed border-eduPractices text-eduPractices-foreground aria-selected:hover:bg-accent aria-selected:hover:!text-accent-foreground aria-selected:!text-accent-foreground hover:!text-background rounded-xl !opacity-100",
              internshipsDates: "!w-full aria-selected:bg-accent border-[3px] border-dashed border-internships text-internships-foreground aria-selected:hover:bg-accent aria-selected:hover:!text-accent-foreground aria-selected:!text-accent-foreground hover:!text-background rounded-xl !opacity-100",
              preGraduatePracticesDates: "!w-full aria-selected:bg-accent border-[3px] border-dashed border-preGraduatePractices text-preGraduatePractices-foreground aria-selected:hover:bg-accent aria-selected:hover:!text-accent-foreground aria-selected:!text-accent-foreground hover:!text-background rounded-xl !opacity-100",
              holidaysDates: "!w-full aria-selected:bg-accent text-holidays-foreground aria-selected:hover:bg-accent aria-selected:hover:!text-accent-foreground aria-selected:!text-accent-foreground hover:!text-background rounded-xl !opacity-100",
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
              Day: (props) => <DayComponent cardsData={cardsData} {...props} />,
              DayContent: (props) => <DayContentComponent cardsData={cardsData} {...props}/>,
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
      <div className='flex md:justify-around flex-wrap gap-x-6 md:gap-y-6 gap-y-8 mt-3'>
        {getCalendarLabels(dict).map((arr, indx) => (
          <div key={indx} className='flex flex-col gap-4'>
            {arr.map(item => (
              <p key={item.title} className='flex items-center gap-1'>
                {item.color === "info"
                  ? <Info className='w-6 h-6'/>
                  : item.number 
                    ? <span className={cn("font-medium", item.color)}>31</span>
                    : <span className={cn("w-6 h-6 rounded-full", item.color)}/>
                }
                <span>-</span>
                <span>{item.title}</span>
              </p>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}
