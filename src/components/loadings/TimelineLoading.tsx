import React from 'react'
import { Skeleton } from '../ui/skeleton'

export default function TimelineLoading() {
    return (
        <div className='w-full lg:pt-28 pt-20'>
            <Skeleton className='lg:w-1/2 w-2/3 lg:h-10 h-9 mb-8'/>

            <div className='w-full'>
                <Skeleton className='mb-6 md:w-32 w-[95%] lg:h-9 h-8 md:mx-auto mr-0 ml-auto'/>
                <ul className='timeline'>
                    {Array.from({ length: 3 }).map((_, index)  => (
                        <li key={index} data-custom-attribute={index + 1}>
                            <div>
                                <Skeleton className="relative w-full h-11 md:top-[-3px] top-[-2px] px-6 py-2 mb-3"/>
                                <div className='w-full px-6'>
                                    <Skeleton className="w-full lg:h-6 h-5"/>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
