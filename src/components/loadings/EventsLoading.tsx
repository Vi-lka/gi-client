import React from 'react'
import EventLoading from './items/EventLoading'

export default function EventsLoading() {
  return (
    <div className="grid grid-cols-1 lg:auto-rows-fr lg:gap-8 gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <EventLoading key={index} />
      ))}
    </div>
  )
}
