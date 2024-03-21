"use client"

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import NavMenu from './NavMenu'
import Link from 'next/link'
import NavSheet from './NavSheet'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export default function MainHeader() {

    const [sticky, setSticky] = useState(false)
    const [scrollPosition, setScrollPosition] = useState(0);
    const [fixedTop, setFixedTop] = useState<number>();

    const handleScroll = () => {
        const position = window.scrollY;
        setScrollPosition(position);
    };

    console.log(scrollPosition)

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
                "",
                sticky ? "fixed w-full md:px-24 px-8 top-6 left-0" : "relative -mb-10"
            )}
        >
            <NavMenu className='mx-auto md:flex hidden' />
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
