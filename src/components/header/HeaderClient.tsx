"use client"

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import NavMenu from './NavMenu'
import NavSheet from './NavSheet'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import MoreMenu from './MoreMenu'
import { usePathname } from '@/lib/hooks/usePathname'
import Link from '../Link'
import { useLocale } from '@/lib/hooks/useLocale'
import type { LinksT, NavBarT } from '@/lib/types'

export default function HeaderClient({
    navBar,
    links
}: {
    navBar: NavBarT | null,
    links: LinksT
}) {

    const locale = useLocale()

    const [sticky, setSticky] = useState(false)
    const [shadow, setShadow] = useState(false)
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

        if (pathname !== "/") {
            setSticky(true)

            const fixedHeader = () => {
                if (scrollPosition > 22) {
                  setShadow(true)
                } else {
                  setShadow(false)
                }
            }
  
            window.addEventListener('scroll', fixedHeader)
  
            return () => {
                window.removeEventListener('scroll', fixedHeader);
            };
        } else {
            if (!sticky) setFixedTop(stickyHeader.current?.offsetTop)

            const fixedHeader = () => {
                if (fixedTop && scrollPosition > fixedTop - 2) {
                    setSticky(true)
                } else {
                    setSticky(false)
                }

                if (fixedTop && scrollPosition > fixedTop + 132) {
                    setShadow(true)
                } else {
                    setShadow(false)
                }
            }

            window.addEventListener('scroll', fixedHeader)

            return () => {
                window.removeEventListener('scroll', fixedHeader);
            };
        }

    }, [pathname, sticky, fixedTop, scrollPosition])

    const handleScrollToTop = () => {
        if (pathname !== "/") {
          setSticky(false)
        }
    }

    return (
        <header className='container md:w-5/6 mx-auto'>
            <div 
                ref={stickyHeader} 
                className={cn(
                    " bg-background z-50 py-6 duration-300",
                    sticky || pathname !== "/" ? "fixed w-full top-0 left-1/2 -translate-x-1/2" : "relative -mb-[112px]",
                    shadow ? "py-2 shadow-sm transition-all" : " transition-[padding]"
                )}
            >
                <div className={cn(
                    sticky || pathname !== "/" ? "container md:w-5/6 w-full" : ""
                )}>
                    <NavMenu navBar={navBar} links={links} onClick={handleScrollToTop} className='w-full max-w-none mx-auto justify-between lg:flex hidden nav-menu' />

                    <div className='lg:hidden flex items-center justify-between w-full'>
                        <Link locale={locale} href="/" onClick={handleScrollToTop}>
                            <Image 
                                src="/hi-icon.svg"
                                alt="HI"
                                width={40}
                                height={40}
                                className='object-contain'
                            />
                        </Link>
                        <div className='flex items-center gap-3'>
                            <MoreMenu />
                            <NavSheet className="text-primary" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
