"use client"

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import NavMenu from './nav-menu/NavMenu'
import NavSheet from './NavSheet'
import { cn } from '@/lib/utils'
import MoreMenu from './MoreMenu'
import { usePathname } from '@/lib/hooks/usePathname'
import Link from '../Link'
import { useLocale } from '@/lib/hooks/useLocale'
import type { LinksT, NavBarT } from '@/lib/types/additional'
import HiLogo from './HiLogo'

export default function HeaderClient({
    navBar,
    links
}: {
    navBar: NavBarT | null,
    links: LinksT
}) {

    const locale = useLocale()

    const pathname = usePathname()

    const [shadow, setShadow] = useState(false)
    const [navPosition, setNavPosition] = useState<"top" | "bottom">(pathname === "/" ? "top" : "bottom")
    const [scrollPosition, setScrollPosition] = useState(0);
    const [offsetTop, setOffsetTop] = useState<number>();

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
            const fixedHeader = () => {
                if (scrollPosition >= 3) {
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
            setOffsetTop(stickyHeader.current?.offsetTop)

            const fixedHeader = () => {
                if (offsetTop && scrollPosition > offsetTop - offsetTop/5) {
                    setShadow(true)
                } else {
                    setShadow(false)
                }

                if (offsetTop && scrollPosition > offsetTop - offsetTop/2) {
                    setNavPosition("bottom")
                } else {
                    setNavPosition("top")
                }
            }

            window.addEventListener('scroll', fixedHeader)

            return () => {
                window.removeEventListener('scroll', fixedHeader);
            };
        }

    }, [pathname, offsetTop, scrollPosition])

    return (
        <header 
            ref={stickyHeader} 
            className={cn(
                'w-full h-full sticky top-0 z-50',
                pathname === "/" ? "-mb-[76px]" : "[&[data-aria-hidden=true]>div]:pr-[var(--removed-body-scroll-bar-size)]",
                shadow ? "shadow-sm transition-[box-shadow]" : "transition-[box-shadow]",
            )}
        >
            <div 
                className={cn(
                    "container md:w-5/6 mx-auto bg-background py-6 duration-300",
                    shadow ? "py-2 transition-[padding-top,padding-bottom]" : "transition-[padding-top,padding-bottom]"
                )}
            >
                <div className="relative">
                    {/* Desktop */}
                    <div className='relative lg:flex hidden'>
                        <Link 
                          locale={locale}
                          href="/#top" 
                          className='absolute top-1/2 -translate-y-1/2 2xl:-left-20 -left-14' 
                        >
                            <HiLogo className='w-10 h-10' />
                        </Link>

                        <NavMenu 
                            navBar={navBar} 
                            links={links} 
                            side={navPosition}
                            className='w-full max-w-none mx-auto justify-between lg:flex hidden nav-menu' 
                        />

                        <div className='absolute top-1/2 -translate-y-1/2 2xl:-right-20 -right-16 h-full flex items-center'>
                          <MoreMenu />
                        </div>
                    </div>
                    {/* Desktop */}

                    {/* Mobile */}
                    <div className='lg:hidden flex items-center justify-between w-full'>
                        <Link locale={locale} href="/#top">
                            <HiLogo className='w-10 h-10' />
                        </Link>

                        <div className='flex items-center gap-3'>
                            <MoreMenu />
                            <NavSheet links={links} className="text-primary" />
                        </div>
                    </div>
                    {/* Mobile */}
                </div>
            </div>
        </header>
    )
}
