import React from 'react'
import DpoCourseLoading from './items/DpoCourseLoading'

export default function DpoCoursesLoading() {
    return (
        <div className="grid lg:grid-cols-2 grid-cols-1 lg:auto-rows-fr lg:gap-8 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
                <DpoCourseLoading key={index} />
            ))}
        </div>
    )
}
