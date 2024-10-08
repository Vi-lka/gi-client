"use client"

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { DiplomaT, ExamT, RangeDatesT } from '@/lib/types/entities';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import React, { useRef, useState, useTransition } from 'react'
import { Button, useActiveModifiers, useDayRender } from 'react-day-picker'
import type {DayProps} from 'react-day-picker';
import dynamic from 'next/dynamic';
import CalendarCardLoading from './cards/CalendarCardLoading';

const ExamCard = dynamic(
  () => import('./cards/ExamCard'), {loading: () => <CalendarCardLoading />}
)
const DiplomaCard = dynamic(
  () => import('./cards/DiplomaCard'), {loading: () => <CalendarCardLoading />}
)
const RangeDatesCard = dynamic(
  () => import('./cards/RangeDatesCard'), {loading: () => <CalendarCardLoading />}
)

type Props = {
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
  }
} & DayProps

export default function DayComponent(props: Props) {
    const [open, setOpen] = useState(false);
    const [isPendingOpen, startTransitionOpen] = useTransition()
    const buttonRef = useRef<HTMLButtonElement>(null);
    const dayRender = useDayRender(props.date, props.displayMonth, buttonRef);
    const modifiers =  useActiveModifiers(props.date, props.displayMonth)

    const onOpenChange = (opened: boolean) => {
      if (!opened) setOpen(opened)
      else {
        startTransitionOpen(() => {
          setOpen(opened)
        })
      }
    }
  
    if (dayRender.isHidden) {
      return <div role="gridcell"></div>;
    }
    if (!dayRender.isButton) {
      return <div {...dayRender.divProps} />;
    }

    if (isPendingOpen) {
      const { children, ...restProps } = dayRender.buttonProps
      return (
        <Button name="day" ref={buttonRef} {...restProps}>
          {children}
          <Loader2 className={cn(
            '2xl:w-3 2xl:h-3 min-[1140px]:w-2 min-[1140px]:h-2 min-[940px]:w-3 min-[940px]:h-3 sm:w-2 sm:h-2 min-[400px]:w-3 min-[400px]:h-3 w-2 h-2',
            'absolute top-[0.2rem] left-[0.2rem] animate-spin'
          )}/>
        </Button>
      ) 
    }
    const { className, ...restProps } = dayRender.buttonProps
    return (
        <Popover open={open} onOpenChange={onOpenChange}>
          <PopoverTrigger disabled={isPendingOpen} asChild>
            <Button 
                name="day" 
                ref={buttonRef} 
                className={cn(
                    open ? "!bg-accent !text-accent-foreground !border-accent" : "", 
                    className
                )}
                {...restProps}
            />
          </PopoverTrigger>
          <PopoverContent className='rounded-2xl'>
            {modifiers.examsDates ? <ExamCard date={props.date} cardsData={props.cardsData} type="exam" /> : null}
            {modifiers.testsDates ? <ExamCard date={props.date} cardsData={props.cardsData} type="test" /> : null}
            {modifiers.stateExamsDates ? <DiplomaCard date={props.date} cardsData={props.cardsData} type="stateExam" /> : null}
            {modifiers.diplomasDates ? <DiplomaCard date={props.date} cardsData={props.cardsData} type="diploma" /> : null}
            {modifiers.reschedulingDates ? <ExamCard date={props.date} cardsData={props.cardsData} type="rescheduling" /> : null}
            {modifiers.retakesDates ? <ExamCard date={props.date} cardsData={props.cardsData} type="retakes" /> : null}
            {modifiers.eduPracticesDates ? <RangeDatesCard date={props.date} cardsData={props.cardsData} type="eduPractice" /> : null}
            {modifiers.internshipsDates ? <RangeDatesCard date={props.date} cardsData={props.cardsData} type="internship" /> : null}
            {modifiers.preGraduatePracticesDates ? <RangeDatesCard date={props.date} cardsData={props.cardsData} type="preGraduatePractices" /> : null}
            {modifiers.holidaysDates ? <RangeDatesCard date={props.date} cardsData={props.cardsData} type="holiday" /> : null}
          </PopoverContent>
        </Popover>
    );
}
