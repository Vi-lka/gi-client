"use client"

import React, { useEffect, useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { usePathname } from "next/navigation";
import { Moon, MoreHorizontal, Search, Sun } from 'lucide-react'
import { localesCodes } from '@/static/locales';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import SearchAll from './SearchAll';

export default function MoreMenu() {

  const pathname = usePathname();
  const pathnameNoLocale = pathname.split("/").slice(2).join("/")

  console.log(pathnameNoLocale)

  const { resolvedTheme, setTheme } = useTheme()

  const themes = ["light", "dark"]

  const localeCurrent = pathname.split("/")[1];

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return (
    <Button variant="ghost" className='lg:px-3.5 px-2 text-primary hover:text-primary focus:text-primary lg:border border-transparent hover:border-border focus:border-border hover:bg-transparent focus:bg-transparent rounded-3xl duration-300'>
      <MoreHorizontal className="w-8 h-8 lg:rotate-0 rotate-90" />
    </Button>
  )

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className='lg:px-3.5 px-2 text-primary hover:text-primary focus:text-primary lg:border border-transparent hover:border-border focus:border-border hover:bg-transparent focus:bg-transparent rounded-3xl duration-300'>
          <MoreHorizontal className="w-8 h-8 lg:rotate-0 rotate-90" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-1 w-fit min-w-[60px] text-foreground rounded-2xl">

        <DropdownMenuSub>
          <DropdownMenuSubTrigger icon={false} disabled={pathnameNoLocale === "search"} className='flex aspect-square justify-center rounded-xl'>
            <Search className='w-5 h-5'/>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent collisionPadding={40} sideOffset={6} alignOffset={0} className="w-fit min-w-0 rounded-2xl z-[100]">
              <SearchAll />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger icon={false} className='flex aspect-square justify-center font-medium uppercase text-base sm:text-sm rounded-xl'>
            {resolvedTheme === "light"
              ? <Sun className='w-5 h-5' /> 
              : <Moon className='w-5 h-5' /> 
            }
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent collisionPadding={100} sideOffset={6} alignOffset={0} className="w-fit rounded-2xl min-w-[50px] z-[100]">
              {themes.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-center last:mt-1 w-full aspect-square"
                    onClick={(e) => {
                      e.stopPropagation()
                      setTheme(item === "light" ? "light" : "dark")
                    }}
                  >
                      <DropdownMenuItem className={cn(
                          "font-Din w-full justify-center cursor-pointer sm:text-sm text-base uppercase font-normal rounded-xl",
                          item === resolvedTheme ? "bg-primary text-background" : "",
                      )}>
                        {item === "light"
                          ? <Sun className='w-5 h-5' /> 
                          : <Moon className='w-5 h-5' /> 
                        }
                      </DropdownMenuItem>
                  </div>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger icon={false} className='flex aspect-square justify-center font-medium uppercase text-base sm:text-sm rounded-xl'>
            {localeCurrent === "ru" ? "ру" : localeCurrent}
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent collisionPadding={50} sideOffset={6} alignOffset={0} className="w-fit rounded-2xl min-w-[50px] z-[100]">
              {localesCodes.map((locale, index) => (
                  <Link
                      key={index}
                      href={`/${locale}/${pathnameNoLocale}`}
                      locale={locale}
                      className="flex justify-center last:mt-1 w-full aspect-square"
                      scroll={false}
                      onClick={(e) => e.stopPropagation()}
                  >
                      <DropdownMenuItem className={cn(
                          "font-Din w-full justify-center cursor-pointer sm:text-sm text-base uppercase font-normal rounded-xl",
                          locale === localeCurrent ? "bg-primary text-background" : "",
                      )}>
                          {locale === "ru" ? "ру" : locale}
                      </DropdownMenuItem>
                  </Link>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}