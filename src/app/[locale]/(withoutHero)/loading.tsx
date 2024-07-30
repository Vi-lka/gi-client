import Breadcrumbs from '@/components/Breadcrumbs'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Skeleton } from '@/components/ui/skeleton'
import { Loader2 } from 'lucide-react'
import React from 'react'

export default function Loading() {
  return (
    <>
      <div className='w-full'>
        <Breadcrumb>
          <BreadcrumbList>
            {Array.from({ length: 2 }).map((_, index) => (
              <BreadcrumbItem key={index}>
                {index !== 1
                  ?
                  <>
                    <Skeleton className='w-20 h-5'/>
                    <BreadcrumbSeparator />
                  </> 
                  :  // last element
                  <BreadcrumbPage>
                    <Skeleton className='w-20 h-5'/>
                  </BreadcrumbPage>
                }
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        <Skeleton className='w-5/6 h-12 my-6'/>

        <div className='flex flex-wrap gap-y-3 lg:gap-x-6 gap-x-3 mt-6'>
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="w-28 h-7 p-0.5"/>
          ))}
        </div>

        <div className='w-full lg:pt-14 pt-10'>
          <Skeleton className='w-full h-screen flex items-center justify-center'>
            <Loader2 className='animate-spin'/>
          </Skeleton>
        </div>
      </div>
    </>
  )
}
