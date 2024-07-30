import HiLogo from '@/components/header/HiLogo'
import MoreMenu from '@/components/header/MoreMenu'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import React from 'react'
import { CgMenuRight } from 'react-icons/cg'

export default function HeaderLoading({
  className
}: {
  className?: string
}) {
  return (
    <header className={cn('w-full h-full sticky top-0 z-50', className)}>
      <div className="container md:w-5/6 mx-auto bg-background py-6 duration-300">
        <div className="relative">
          {/* Desktop */}
          <div className='relative lg:flex hidden'>
            <div className='absolute top-1/2 -translate-y-1/2 2xl:-left-20 -left-14'>
              <HiLogo className='w-10 h-10' />
            </div>
            <div className='w-full max-w-none mx-auto justify-between lg:flex gap-3 hidden nav-menu'>
              {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton key={index} className='w-28 h-8 py-0.5' />
              ))}
            </div>
            <div className='absolute top-1/2 -translate-y-1/2 2xl:-right-20 -right-16 h-full flex items-center'>
              <MoreMenu />
            </div>
          </div>
          {/* Desktop */}
          {/* Mobile */}
          <div className='lg:hidden flex items-center justify-between w-full'>
            <div>
              <HiLogo className='w-10 h-10' />
            </div>
            <div className='flex items-center gap-3'>
              <MoreMenu />
              <CgMenuRight className="h-[2.5rem] w-[2.5rem] text-primary" />
            </div>
          </div>
          {/* Mobile */}
        </div>
      </div>
    </header>
  )
}
