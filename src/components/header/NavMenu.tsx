"use client"

import React from 'react'
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from '../ui/navigation-menu'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useSelectedLayoutSegment } from 'next/navigation'
import MoreMenu from './MoreMenu'

export default function NavMenu({
  onClick,
  className
}: {
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  className?: string
}) {

  return (
    <NavigationMenu delayDuration={100} className={className}>
      <NavigationMenuList className='relative gap-2 flex-wrap justify-between items-center'>
        <Link 
          href="/#top" 
          className='absolute 2xl:-left-20 -left-14' 
          onClick={onClick}
        >
          <Image 
            src="/hi-icon.svg"
            alt="HI"
            width={80}
            height={80}
            className='object-contain w-10'
          />
        </Link>

        <NavMenuItem href='/info'>Сведения</NavMenuItem>
        <NavMenuItem href='/structure'>Структура</NavMenuItem>
        <NavMenuItem href='/education'>Обучение</NavMenuItem>
        <NavMenuItem href='/entrance'>Поступление</NavMenuItem>
        <NavMenuItem href='/dpo'>Курсы ДПО</NavMenuItem>
        <NavMenuItem href='/science'>Наука</NavMenuItem>
        <NavMenuItem href='/projects'>Проекты</NavMenuItem>
        <NavMenuItem href='/journals'>Журналы</NavMenuItem>

        <div className='absolute 2xl:-right-20 -right-14 h-full flex items-center'>
          <MoreMenu />
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function NavMenuItem({
  children,
  href,
  blank,
}: {
  children: React.ReactNode,
  href: string,
  blank?: boolean,
}) {
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/';
  const isActive = pathname === href;

  return (
    <NavigationMenuItem className='!ml-0'>
      <Link 
        aria-current={isActive ? 'page' : undefined}
        href={href}
        target={blank ? "_blank" : "_self"}
        // style={{fontWeight: isActive ? 'bold' : 'normal'}}
        className={cn(
          navigationMenuTriggerStyle(),
          "h-fit lg:text-base text-sm 2xl:py-2 md:py-1 2xl:px-6 md:px-3 uppercase"
        )}
      >
        {children}
      </Link>
    </NavigationMenuItem>
  );
}