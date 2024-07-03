"use client"

import { eventIdAtom } from '@/lib/hooks/atoms';
import { useAtomValue } from 'jotai';
import React from 'react'

export default function TextSegment({
  date,
  datesByEventId
}: {
  date: Date | undefined,
  datesByEventId: {
    id: string;
    dates: Date[];
  }[]
}) {

  const eventId = useAtomValue(eventIdAtom)

  console.log(eventId)
  
  return (
    <div key={eventId} className='animate-fade-in'>
      TextSegment: {eventId}
    </div>
  )
}
