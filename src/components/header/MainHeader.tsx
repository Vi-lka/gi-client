"use client"

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import NavMenu from './NavMenu'
import Link from 'next/link'
import NavSheet from './NavSheet'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

export default function MainHeader() {

    const [sticky, setSticky] = useState(false)
    const [scrollPosition, setScrollPosition] = useState(0);
    const [fixedTop, setFixedTop] = useState<number>();

    const pathname = usePathname()

    const handleScroll = () => {
        const position = window.scrollY;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])

    const stickyHeader = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {

        if (!sticky) setFixedTop(stickyHeader.current?.offsetTop)

        const fixedHeader = () => {
          if (fixedTop && scrollPosition > fixedTop) {
            setSticky(true)
          } else {
            setSticky(false)
          }
        }
        window.addEventListener('scroll', fixedHeader)

        return () => {
            window.removeEventListener('scroll', fixedHeader);
        };

    }, [fixedTop, scrollPosition, sticky])

    return (
        <div 
            ref={stickyHeader} 
            className={cn(
                "bg-gradient-to-b from-background via-background to-transparent z-50",
                sticky || pathname !== "/" ? "fixed w-full md:px-24 px-8 pt-6 pb-20 top-0 left-0" : "relative -mb-10"
            )}
        >
            <NavMenu className='w-full mx-auto md:flex hidden' />
            <div className='md:hidden flex items-center justify-between w-full'>
                <Link href="/">
                    <Image 
                        src="/hi-icon.svg"
                        alt="HI"
                        width={40}
                        height={40}
                        className='object-contain'
                    />
                </Link>
                <NavSheet className="text-primary" />
            </div>
        </div>
    )
}
