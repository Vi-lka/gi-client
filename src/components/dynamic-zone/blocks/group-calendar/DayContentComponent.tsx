import React from 'react'
import { useActiveModifiers, useDayPicker  } from 'react-day-picker';
import type { ActiveModifiers, DateFormatter } from 'react-day-picker';
import { getDayData } from './getCalendarData';
import type { DiplomaT, ExamT, RangeDatesT } from '@/lib/types/entities';
import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';
import type { Locale } from 'date-fns';

export default function DayContentComponent(props: {
    date: Date;
    displayMonth: Date;
    activeModifiers: ActiveModifiers;
    cardsData: {
        exams: ExamT[];
        tests: ExamT[];
        stateExams: DiplomaT[];
        diplomas: DiplomaT[];
        rescheduling: ExamT[];
        retakes: ExamT[];
        eduPractices: RangeDatesT[];
        preGraduatePractices: RangeDatesT[];
        internships: RangeDatesT[];
        holidays: RangeDatesT[];
    }
}) {
    const {
        locale,
        formatters: { formatDay }
      } = useDayPicker();
      const modifiers =  useActiveModifiers(props.date, props.displayMonth)

      const matchWeekendsDates = modifiers.weekendsDates && !(
        modifiers.examsDates || modifiers.testsDates || modifiers.stateExamsDates || modifiers.diplomasDates || 
        modifiers.eduPracticesDates || modifiers.internshipsDates || modifiers.preGraduatePracticesDates || modifiers.holidaysDates ||
        modifiers.reschedulingDates || modifiers.retakesDates
      ) as true

      const matchWeekendsDays = modifiers.weekendsDays && !(
        modifiers.examsDates || modifiers.testsDates || modifiers.stateExamsDates || modifiers.diplomasDates || 
        modifiers.eduPracticesDates || modifiers.internshipsDates || modifiers.preGraduatePracticesDates || modifiers.holidaysDates ||
        modifiers.reschedulingDates || modifiers.retakesDates
      ) as true

      switch (true) {
        case modifiers.examsDates:
            return (
                <MultiDayContent 
                    date={props.date} 
                    cardsData={props.cardsData} 
                    locale={locale} 
                    formatDay={formatDay} 
                    type='exam' 
                />
            );

        case modifiers.testsDates:
            return (
                <MultiDayContent 
                    date={props.date} 
                    cardsData={props.cardsData} 
                    locale={locale} 
                    formatDay={formatDay} 
                    type='test' 
                />
            );
        
        case modifiers.stateExamsDates:
            return (
                <SingleDayContent
                    date={props.date} 
                    cardsData={props.cardsData} 
                    locale={locale} 
                    formatDay={formatDay} 
                    type="stateExam" 
                />
            );

        case modifiers.diplomasDates:
            return (
                <SingleDayContent
                    date={props.date} 
                    cardsData={props.cardsData} 
                    locale={locale} 
                    formatDay={formatDay} 
                    type="diploma" 
                />
            );

        case modifiers.reschedulingDates:
            return (
                <MultiDayContent 
                    date={props.date} 
                    cardsData={props.cardsData} 
                    locale={locale} 
                    formatDay={formatDay} 
                    type="rescheduling" 
                />
            );

        case modifiers.retakesDates:
            return (
                <MultiDayContent 
                    date={props.date} 
                    cardsData={props.cardsData} 
                    locale={locale} 
                    formatDay={formatDay} 
                    type="retakes" 
                />
            );

        case modifiers.eduPracticesDates:
            return (
                <SingleDayContent
                    date={props.date} 
                    cardsData={props.cardsData} 
                    locale={locale} 
                    formatDay={formatDay} 
                    type="eduPractice" 
                />
            );

        case modifiers.internshipsDates:
            return (
                <SingleDayContent
                    date={props.date} 
                    cardsData={props.cardsData} 
                    locale={locale} 
                    formatDay={formatDay} 
                    type="internship" 
                />
            );
        
        case modifiers.preGraduatePracticesDates:
            return (
                <SingleDayContent
                    date={props.date} 
                    cardsData={props.cardsData} 
                    locale={locale} 
                    formatDay={formatDay} 
                    type="preGraduatePractices" 
                />
            )
    
        case modifiers.holidaysDates:
            return (
                <SingleDayContent
                    date={props.date} 
                    cardsData={props.cardsData} 
                    locale={locale} 
                    formatDay={formatDay} 
                    type="holiday" 
                />
            )

        case matchWeekendsDates:
            return <p className='text-destructive dark:brightness-125'>{formatDay(props.date, { locale })}</p>;

        case matchWeekendsDays:
            return <p className='text-destructive dark:brightness-125'>{formatDay(props.date, { locale })}</p>;
      
        default:
            return <p>{formatDay(props.date, { locale })}</p>;
      }
}


function SingleDayContent({
    date,
    cardsData,
    type,
    locale,
    formatDay
}: {
    date: Date;
    cardsData: {
        exams: ExamT[];
        tests: ExamT[];
        stateExams: DiplomaT[];
        diplomas: DiplomaT[];
        rescheduling: ExamT[];
        retakes: ExamT[];
        eduPractices: RangeDatesT[];
        preGraduatePractices: RangeDatesT[];
        internships: RangeDatesT[];
        holidays: RangeDatesT[];
    };
    type: "stateExam" | "diploma" | "eduPractice" | "internship" | "preGraduatePractices" | "holiday";
    locale: Locale | undefined;
    formatDay: DateFormatter
}) {
    const data = getDayData({date, cardsData, type}) as DiplomaT | RangeDatesT | undefined

    return (
        <p className='relative'>
            {formatDay(date, { locale })}
            {!!data?.description && (
              <Info className={cn(
                '2xl:w-2.5 2xl:h-2.5 min-[1140px]:w-1.5 min-[1140px]:h-1.5 min-[940px]:w-2.5 min-[940px]:h-2.5 sm:w-1.5 sm:h-1.5 min-[400px]:w-2.5 min-[400px]:h-2.5 w-1.5 h-1.5',
                'absolute bottom-0',
                '2xl:-left-[0.7rem] min-[1140px]:-left-[0.4rem] min-[940px]:-left-[0.7rem] sm:-left-[0.4rem] min-[400px]:-left-[0.7rem] -left-[0.4rem]'
              )}/>
            )}
        </p>
    )
}


function MultiDayContent({
    date,
    cardsData,
    type,
    locale,
    formatDay
}: {
    date: Date;
    cardsData: {
        exams: ExamT[];
        tests: ExamT[];
        stateExams: DiplomaT[];
        diplomas: DiplomaT[];
        rescheduling: ExamT[];
        retakes: ExamT[];
        eduPractices: RangeDatesT[];
        preGraduatePractices: RangeDatesT[];
        internships: RangeDatesT[];
        holidays: RangeDatesT[];
    };
    type: "test" | "exam" | "rescheduling" | "retakes";
    locale: Locale | undefined;
    formatDay: DateFormatter
}) {
    const data = getDayData({date, cardsData, type}) as ExamT[]
    const findedDescription = data.find(item => !!item.description)

    if (data.length > 1) return (
        <p className='relative'>
          {formatDay(date, { locale })}
          <sup className='absolute text-[10px] top-1 -right-1.5'>
            {data.length}
          </sup>
          {!!findedDescription && (
            <Info className={cn(
              '2xl:w-2.5 2xl:h-2.5 min-[1140px]:w-1.5 min-[1140px]:h-1.5 min-[940px]:w-2.5 min-[940px]:h-2.5 sm:w-1.5 sm:h-1.5 min-[400px]:w-2.5 min-[400px]:h-2.5 w-1.5 h-1.5',
              'absolute bottom-0',
              '2xl:-left-[0.7rem] min-[1140px]:-left-[0.4rem] min-[940px]:-left-[0.7rem] sm:-left-[0.4rem] min-[400px]:-left-[0.7rem] -left-[0.4rem]'
            )}/>
          )}
        </p>
      )
      else return (
        <p className='relative'>
            {formatDay(date, { locale })}
            {!!findedDescription && (
              <Info className={cn(
                '2xl:w-2.5 2xl:h-2.5 min-[1140px]:w-1.5 min-[1140px]:h-1.5 min-[940px]:w-2.5 min-[940px]:h-2.5 sm:w-1.5 sm:h-1.5 min-[400px]:w-2.5 min-[400px]:h-2.5 w-1.5 h-1.5',
                'absolute bottom-0',
                '2xl:-left-[0.7rem] min-[1140px]:-left-[0.4rem] min-[940px]:-left-[0.7rem] sm:-left-[0.4rem] min-[400px]:-left-[0.7rem] -left-[0.4rem]'
              )}/>
            )}
        </p>
    )
}