"use client"

import React from 'react'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '../ui/navigation-menu'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useSelectedLayoutSegment } from 'next/navigation'
import MoreMenu from './MoreMenu'
import Link from '../Link'
import { useLocale } from '@/lib/hooks/useLocale'
import type { ImageT, LinksT, NavBarT } from '@/lib/types'
import getSubLinks from '@/lib/getSubLinks'

export default function NavMenu({
  navBar,
  links,
  onClick,
  className
}: {
  navBar: NavBarT | null,
  links: LinksT,
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  className?: string
}) {

  const locale = useLocale()

  const entranceTitle = links.entrancePage.data 
    ? (links.entrancePage.data.attributes.navBarConfig && links.entrancePage.data.attributes.navBarConfig.navBarTitle)
      ? links.entrancePage.data.attributes.navBarConfig.navBarTitle 
      : links.entrancePage.data.attributes.title 
    : "Поступление"
  const dpoTitle = links.dpo.data 
    ? (links.dpo.data.attributes.navBarConfig && links.dpo.data.attributes.navBarConfig.navBarTitle) 
      ? links.dpo.data.attributes.navBarConfig.navBarTitle 
      : links.dpo.data.attributes.title 
    : "Курсы ДПО"

  const entranceLinks = getSubLinks({
      title: entranceTitle,
      link: "/entrance",
      navBarData: navBar?.entrance?.subLinks,
      linksData: links.entrancePage.data?.attributes.content
  })
  const dpoLinks = getSubLinks({
      title: dpoTitle,
      link: "/dpo",
      navBarData: navBar?.dpo?.subLinks,
      linksData: links.dpo.data?.attributes.content
  })

  return (
    <NavigationMenu delayDuration={100} className={className}>
      <NavigationMenuList className='relative gap-2 flex-wrap justify-between items-center'>
        <Link 
          locale={locale}
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

        <NavMenuItem locale={locale} href='/info'>Сведения</NavMenuItem>
        <NavMenuItem locale={locale} href='/structure'>Структура</NavMenuItem>
        <NavMenuItem locale={locale} href='/education'>Обучение</NavMenuItem>
        <NavMenuItem 
          locale={locale} 
          href={entranceLinks.link}
          image={links.entrancePage.data?.attributes.navBarConfig?.navBarImage}
          description={links.entrancePage.data?.attributes.navBarConfig?.navBarDescription}
          subLinks={entranceLinks.subLinks}
        >
            {entranceLinks.title}
        </NavMenuItem>
        <NavMenuItem 
          locale={locale} 
          href={dpoLinks.link}
          image={links.dpo.data?.attributes.navBarConfig?.navBarImage}
          description={links.dpo.data?.attributes.navBarConfig?.navBarDescription}
          subLinks={dpoLinks.subLinks}
        >
            {dpoLinks.title}
        </NavMenuItem>
        <NavMenuItem locale={locale} href='/science'>Наука</NavMenuItem>
        <NavMenuItem locale={locale} href='/projects'>Проекты</NavMenuItem>
        <NavMenuItem locale={locale} href='/journals'>Журналы</NavMenuItem>

        <div className='absolute 2xl:-right-20 -right-16 h-full flex items-center'>
          <MoreMenu />
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function NavMenuItem({
  locale,
  href,
  image,
  description,
  subLinks,
  children,
}: {
  locale: string,
  href: string,
  description?: string | null,
  image?: ImageT,
  subLinks?: {
    title: string | null,
    link: string | null,
    linkDescription?: string | null,
  }[],
  children: React.ReactNode,
}) {
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/';
  const isActive = pathname === href;

  if (subLinks && subLinks.length > 0) return (
    <NavigationMenuItem className='!ml-0'>
      <NavigationMenuTrigger icon={false} className='w-fit h-fit p-0'>
        <Link 
          aria-current={isActive ? 'page' : undefined}
          locale={locale}
          href={href}
          // style={{fontWeight: isActive ? 'bold' : 'normal'}}
          className={cn(
            navigationMenuTriggerStyle(),
            "h-fit lg:text-base text-sm 2xl:py-2 md:py-1 2xl:px-6 md:px-3 uppercase"
          )}
        >
          {children}
        </Link>
      </NavigationMenuTrigger>
      <NavigationMenuContent className='flex w-[90%] md:w-full'>
        {image?.data && (
          <div className='relative w-[20%] m-4 mr-0 rounded-xl overflow-hidden'>
            <Image 
              src={image.data.attributes.url}
              alt=''
              width={400}
              height={400}
              className={cn(
                'object-cover w-full h-full',
                description ? "brightness-50 contrast-125" : ""
              )}
            />
            <p className="absolute bottom-0 font-medium text-sm leading-tight text-background p-4">
              {description}
            </p>
          </div>
        )}
        <ul className={cn(
          "grid grid-cols-2 gap-3 p-4 w-[80%] h-fit",
          image?.data ? "w-[80%]" : "w-full"
        )}>
          {subLinks.map((item, index) => (
            (item.title && item.link) && 
              <ListItem
                key={index}
                locale={locale}
                href={item.link}
                title={item.title}
                className={cn(
                  navigationMenuTriggerStyle(),
                  "h-fit w-full lg:text-base text-sm 2xl:py-2 md:py-1 2xl:px-6 md:px-3 rounded-lg flex flex-col items-start"
                )}
              >
                {item.linkDescription}
              </ListItem>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
  else return (
    <NavigationMenuItem className='!ml-0'>
      <Link 
        aria-current={isActive ? 'page' : undefined}
        locale={locale}
        href={href}
        // style={{fontWeight: isActive ? 'bold' : 'normal'}}
        className={cn(
          navigationMenuTriggerStyle(),
          "h-fit lg:text-base text-sm 2xl:py-2 md:py-1 2xl:px-6 md:px-3 uppercase"
        )}
      >
        {children}
      </Link>
    </NavigationMenuItem>
  )
}

function ListItem({
  locale,
  href,
  title,
  children,
  className
}: {
  locale: string,
  href: string,
  title: string,
  children: React.ReactNode,
  className?: string
}) {
  return (
    <li className='flex w-full'>
        <Link
          locale={locale}
          href={href}
          className={cn(
            "",
            className
          )}
        >
          <p className="text-base font-medium">{title}</p>
          <p className="w-full text-left line-clamp-3 text-sm leading-snug font-normal text-muted-foreground">
            {children}
          </p>
        </Link>
    </li>
  )
}