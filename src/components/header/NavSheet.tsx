"use client"

import React from 'react'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '../ui/sheet'
import { NavigationMenu, NavigationMenuList, navigationMenuTriggerStyle } from '../ui/navigation-menu'
import { ScrollArea } from '../ui/scroll-area'
import { cn } from '@/lib/utils'
import { CgMenuRight } from "react-icons/cg";
import { useSelectedLayoutSegment } from 'next/navigation'
import { useLocale } from '@/lib/hooks/useLocale'
import Link from '../Link'
import { useDictionary } from '../providers/DictionaryProvider'
import { getLinkTitle } from '@/lib/getSubLinks'
import type { LinksT } from '@/lib/types/additional'

export default function NavSheet({
  links,
  className
}: {
  links: LinksT,
  className?: string
}) {
  const dict = useDictionary()

  const locale = useLocale()

  const entranceTitle = getLinkTitle(links.entrancePage.data?.attributes, dict.Header.nav.admission)
  const dpoTitle = getLinkTitle(links.dpo.data?.attributes, dict.Header.nav.dpo)

  return (
    <Sheet>
      <SheetTrigger>
        <CgMenuRight className={cn("h-[2.5rem] w-[2.5rem]", className)} />
      </SheetTrigger>

      <SheetContent>
        <NavigationMenu orientation="vertical" className="mx-auto">
          <NavigationMenuList className="flex flex-col items-center">
            <ScrollArea className="font-Raleway mt-[2vh] h-[90vh] w-full p-1">
              <SheetMenuItem locale={locale} href='/info'>{dict.Header.nav.info}</SheetMenuItem>
              <SheetMenuItem locale={locale} href='/structure'>{dict.Header.nav.structure}</SheetMenuItem>
              <SheetMenuItem locale={locale} href='/education'>{dict.Header.nav.education}</SheetMenuItem>
              <SheetMenuItem locale={locale} href='/entrance'>{entranceTitle}</SheetMenuItem>
              <SheetMenuItem locale={locale} href='/dpo'>{dpoTitle}</SheetMenuItem>
              <SheetMenuItem locale={locale} href='/science'>{dict.Header.nav.science}</SheetMenuItem>
              <SheetMenuItem locale={locale} href='/projects'>{dict.Header.nav.projects}</SheetMenuItem>
              <SheetMenuItem locale={locale} href='/journals'>{dict.Header.nav.journals}</SheetMenuItem>
            </ScrollArea>
          </NavigationMenuList>
        </NavigationMenu>
      </SheetContent>
    </Sheet>
  )
}


function SheetMenuItem({
  locale,
  children,
  href,
  blank = false,
}: {
  locale: string,
  children: React.ReactNode,
  href: string,
  blank?: boolean,
}) {
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/';
  const isActive = pathname === href;

  return (
    <div className="mb-1 mt-3 flex w-full gap-1 py-2">
      <li className='flex justify-center w-full'>
        <Link 
          locale={locale}
          aria-current={isActive ? 'page' : undefined}
          href={href}
          target={blank ? "_blank" : "_self"}
          // style={{fontWeight: isActive ? 'bold' : 'normal'}}
          className={cn(
            navigationMenuTriggerStyle(),
            "w-full h-fit"
          )}
        >
          <SheetClose className="px-3 py-2 text-base text-left w-full h-full uppercase">
              {children}
          </SheetClose>
        </Link>
      </li>
    </div>
  );
}
