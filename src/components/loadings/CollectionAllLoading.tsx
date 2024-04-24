import React from 'react'
import { Skeleton } from '../ui/skeleton'
import { Loader2 } from 'lucide-react'

export default function CollectionAllLoading() {
    return (
        <div className='w-full lg:pt-28 pt-20'>
            <Skeleton className='lg:w-1/2 w-2/3 lg:h-10 h-9 mb-6'/>

            <Skeleton className='w-full aspect-square flex items-center justify-center'>
              <Loader2 className='animate-spin'/>
            </Skeleton>
        </div>
    )
}
