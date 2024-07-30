import React from 'react'
import Hero from './(hero)/(client)/Hero'
import { Skeleton } from '@/components/ui/skeleton'
import { Loader2 } from 'lucide-react'
import HeaderLoading from '@/components/loadings/main/HeaderLoading'

export default function Loading() {
  return (
    <>
      <Hero 
        about={
          <Skeleton className='w-full h-full flex items-center justify-center'>
            <Loader2 className='animate-spin'/>
          </Skeleton>
        }
        menu={
          <Skeleton className='w-full h-full flex items-center justify-center'>
            <Loader2 className='animate-spin'/>
          </Skeleton>
        }
      />
      <HeaderLoading className='-mb-[76px]' />
      <main className="flex flex-col items-center gap-12 container md:w-5/6 mx-auto lg:pt-36 pt-32">
        <div className='w-full -mt-16'>
          <div className='w-full lg:pt-28 pt-20'>
            <Skeleton className='w-full h-screen flex items-center justify-center'>
              <Loader2 className='animate-spin'/>
            </Skeleton>
          </div>
        </div>
      </main>
    </>
  )
}
