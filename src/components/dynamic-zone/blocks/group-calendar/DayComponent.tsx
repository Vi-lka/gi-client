"use client"

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { DiplomaT, ExamT } from '@/lib/types/entities';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import React, { useRef, useState, useTransition } from 'react'
import { Button, useActiveModifiers, useDayRender } from 'react-day-picker'
import type {DayProps} from 'react-day-picker';
import ExamCard from './cards/ExamCard';
import DiplomaCard from './cards/DiplomaCard';
import OnlyDateCard from './cards/OnlyDateCard';

type Props = {
  cardsData: {
    exams: ExamT[];
    tests: ExamT[];
    stateExams: DiplomaT[];
    diplomas: DiplomaT[];
    eduPractices: Date[];
    internships: Date[];
    holidays: Date[];
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
          <Loader2 className='w-3 h-3 absolute top-0.5 right-0.5'/>
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
                    open ? "!bg-accent !text-accent-foreground" : "", 
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
            {modifiers.eduPracticesDates ? <OnlyDateCard date={props.date} cardsData={props.cardsData} type="eduPractice" /> : null}
            {modifiers.internshipsDates ? <OnlyDateCard date={props.date} cardsData={props.cardsData} type="internship" /> : null}
            {modifiers.holidaysDates ? <OnlyDateCard date={props.date} cardsData={props.cardsData} type="holiday" /> : null}
          </PopoverContent>
        </Popover>
    );
}
