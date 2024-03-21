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
      <NavigationMenuList className='xl:gap-4 lg:gap-3 gap-2 flex-wrap justify-center items-center'>
        <Link href="/">
          <Image 
            src="/hi-icon.svg"
            alt="HI"
            width={40}
            height={40}
            className='object-contain'
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
      <NavigationMenuItem className='px-[0.1rem]'>
          <Link href={url} legacyBehavior passHref>
              <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "2xl:text-base text-sm"
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