"use client"

import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { usePathname } from "next/navigation";
import { MoreHorizontal, Search, Sun } from 'lucide-react'
import { localesCodes } from '@/static/locales';
import Link from '../Link';
import { cn } from '@/lib/utils';

export default function MoreMenu() {

  const pathname = usePathname();

  const localeCurrent = pathname.split("/")[1];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className='lg:px-3.5 px-2 text-primary hover:text-primary focus:text-primary lg:border border-transparent hover:border-primary focus:border-primary hover:bg-transparent focus:bg-transparent rounded-3xl duration-300'>
          <MoreHorizontal className="w-8 h-8 lg:rotate-0 rotate-90" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-1 w-fit min-w-[60px] text-foreground rounded-2xl">
        <DropdownMenuItem className='flex aspect-square justify-center rounded-xl'>
          <Search className='w-5 h-5' />
        </DropdownMenuItem>
        <DropdownMenuItem className='flex aspect-square justify-center rounded-xl'>
          <Sun className='w-5 h-5' />
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger icon={false} className='flex aspect-square justify-center font-medium uppercase text-base sm:text-sm rounded-xl'>
            {localeCurrent === "ru" ? "ру" : localeCurrent}
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent sideOffset={6} alignOffset={-6} className="w-fit rounded-2xl min-w-[50px] z-[100]">
              {localesCodes.map((locale, index) => (
                  <Link
                      key={index}
                      href="/" 
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