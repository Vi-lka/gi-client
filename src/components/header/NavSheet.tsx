"use client"

import React from 'react'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '../ui/sheet'
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

  const entranceTitle = getLinkTitle(links.entrancePage.data?.attributes, dict.Header.nav.admission)
  const dpoTitle = getLinkTitle(links.dpo.data?.attributes, dict.Header.nav.dpo)
  const structureTitle = getLinkTitle(links.structure.data?.attributes, dict.Header.nav.structure)
  const infoTitle = getLinkTitle(links.info.data?.attributes, dict.Header.nav.info)

  return (
    <Sheet>
      <SheetTrigger>
        <CgMenuRight className={cn("h-[2.5rem] w-[2.5rem]", className)} />
      </SheetTrigger>

      <SheetContent>
        <SheetTitle></SheetTitle>
        <SheetDescription></SheetDescription>
        <NavigationMenu orientation="vertical" className="mx-auto">
          <NavigationMenuList className="flex flex-col items-center">
            <ScrollArea className="font-Raleway mt-[2vh] h-[90vh] w-full p-1">
              <SheetMenuItem title={infoTitle} href='/info' />
              <SheetMenuItem title={structureTitle} href='/structure' />
              <SheetMenuItem title={dict.Header.nav.education} href='/education' />
              <SheetMenuItem title={entranceTitle} href='/admission' />
              <SheetMenuItem title={dpoTitle} href='/dpo' />
              <SheetMenuItem title={dict.Header.nav.science} href='/science' />
              <SheetMenuItem title={dict.Header.nav.projects} href='/projects' />
              <SheetMenuItem title={dict.Header.nav.journals} href='/journals' />
            </ScrollArea>
          </NavigationMenuList>
        </NavigationMenu>
      </SheetContent>
    </Sheet>
  )
}


function SheetMenuItem({
  title,
  href,
  blank = false,
}: {
  title: string,
  href: string,
  blank?: boolean,
}) {

  const locale = useLocale()

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
            {title}
          </SheetClose>
        </Link>
      </li>
    </div>
  );
}
