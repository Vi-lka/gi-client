"use client"

import React from 'react'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '../ui/navigation-menu'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export default function NavMenu({
  className
}: {
  className?: string
}) {
  return (
    <NavigationMenu delayDuration={100} className={className}>
      <NavigationMenuList className='relative gap-2 flex-wrap justify-between items-center'>
        <Link href="/" className='absolute 2xl:-left-20 -left-14'>
          <Image 
            src="/hi-icon.svg"
            alt="HI"
            width={80}
            height={80}
            className='object-contain w-10'
          />
        </Link>
        <NavMenuItem url='/info'>Сведения</NavMenuItem>
        <NavMenuItem url='/structure'>Структура</NavMenuItem>
        <NavMenuItem url='/education'>Обучение</NavMenuItem>
        <NavMenuItem url='/entrance'>Поступление</NavMenuItem>
        <NavMenuItem url='/courses-dpo'>Курсы ДПО</NavMenuItem>
        <NavMenuItem url='/science'>Наука</NavMenuItem>
        <NavMenuItem url='/projects'>Проекты</NavMenuItem>
        <NavMenuItem url='/journals'>Журналы</NavMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function NavMenuItem({
  children,
  url,
  blank,
}: {
  children: React.ReactNode,
  url: string,
  blank?: boolean,
}) {
  const pathName = usePathname();

  // Remove query parameters
  const pathWithoutQuery = pathName.split("?")[0];

  // Ex:"/my/nested/path" --> ["my", "nested", "path"]
  const pathNestedRoutes = pathWithoutQuery
    .split("/")
    .filter((v) => v.length > 0);

  const pathCurrentPage = "/" + pathNestedRoutes[0];

  return (
      <NavigationMenuItem className='!ml-0'>
          <Link href={url} legacyBehavior passHref>
              <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "h-fit lg:text-base text-sm 2xl:py-2 md:py-1 2xl:px-6 md:px-3 uppercase"
                  )}
                  active={pathCurrentPage === url}
                  target={blank ? "_blank" : "_self"}
              >
                  {children}
              </NavigationMenuLink>
          </Link>
      </NavigationMenuItem>
  );
}