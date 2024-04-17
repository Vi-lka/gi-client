import React from 'react'
import { Skeleton } from '../ui/skeleton'

export default function TimelineLoading() {
    return (
        <div className='w-full'>
            <Skeleton className='mb-8 md:w-32 w-full h-9 mx-auto'/>
            <ul className='timeline'>
                {Array.from({ length: 3 }).map((_, index)  => (
                    <li key={index} data-custom-attribute={index + 1}>
                        <div>
                            <Skeleton className="relative w-full h-11 md:top-[-3px] top-[-2px] px-6 py-2 mb-3"/>
                            <div className='w-full px-6'>
                                <Skeleton className="w-full h-9"/>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
