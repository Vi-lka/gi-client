import React from 'react'
import { Button } from '../ui/button'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { Skeleton } from '../ui/skeleton';

export default function GroupCalendarLoading() {
  const labels = [
    [ 1, 2, 3, 4 ],
    [ 5, 6 ],
    [ 7, 8, 9 ],
    [ 10, 11, 12 ]
  ]
  return (
    <>
      <div className='w-full flex gap-6 items-center justify-between mb-3'>
        <Button 
          variant="outline" 
          disabled
          className='w-fit px-2 rounded-xl' 
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </Button>
        <Button 
          variant="outline" 
          disabled
          className='w-fit px-2 rounded-xl'
        >
          <ChevronRightIcon className="h-5 w-5" />
        </Button>
      </div>

      <BigCalendarLoading />

      <div className='w-full flex gap-6 items-center justify-between mt-3'>
        <Button 
          variant="outline" 
          disabled
          className='w-fit px-2 rounded-xl' 
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </Button>
        <Button 
          variant="outline" 
          disabled
          className='w-fit px-2 rounded-xl'
        >
          <ChevronRightIcon className="h-5 w-5" />
        </Button>
      </div>

      <div className='flex md:justify-around flex-wrap gap-x-6 md:gap-y-6 gap-y-8 mt-3'>
        {labels.map((arr, indx) => (
          <div key={indx} className='flex flex-col gap-4'>
            {arr.map(item => (
              <div key={item} className='flex items-center gap-1'>
                <Skeleton className='w-7 h-7 rounded-full'/>
                <span>-</span>
                <Skeleton className='w-24 h-6 rounded-xl'/>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}


export function BigCalendarLoading() {
    return (
        <div className='flex flex-wrap flex-col sm:flex-row min-[1140px]:gap-6 gap-4'>
            {Array.from({ length: 12 }).map((_, monthIndx) => (
                <div key={monthIndx} className='space-y-4 min-[1140px]:w-[calc(33.333333%-1.5rem)] sm:w-[calc(50%-1rem)] w-full rdp-caption_start'>
                    <div className='flex sm:justify-start justify-center sm:pl-3 pt-1 relative items-center'>
                        <Skeleton className='lg:w-28 w-24 h-6 rounded-xl'/>
                    </div>
                    <table className='w-full border-collapse space-y-1'>
                        <thead className=''>
                            <tr className='flex justify-between'>
                                {Array.from({ length: 7 }).map((_, thIndx) => (
                                    <th key={thIndx} className='w-full flex items-center justify-center'>
                                        <Skeleton className='w-8 h-[22px] rounded-xl'/>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className=''>
                            {Array.from({ length: 5 }).map((_, trIndx) => (
                                <tr key={trIndx} className='flex w-full mt-2 justify-between'>
                                    {Array.from({ length: 7 }).map((_, tdIndx) => (
                                        <td key={tdIndx} className='w-full relative p-0 xl:mx-1 mx-0.5'>
                                            <Skeleton className='w-full h-8 rounded-xl'/>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    )
}