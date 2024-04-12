"use client"

import React from 'react'
import { NavigationMenu, NavigationMenuList } from '../../ui/navigation-menu'
import Image from 'next/image'
import MoreMenu from '../MoreMenu'
import Link from '../../Link'
import { useLocale } from '@/lib/hooks/useLocale'
import type { LinksT, NavBarT } from '@/lib/types'
import getSubLinks from '@/lib/getSubLinks'
import { useDictionary } from '../../providers/DictionaryProvider'
import NavMenuItem from './NavMenuItem'

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

  const dict = useDictionary()

  const locale = useLocale()

  const entranceTitle = links.entrancePage.data 
    ? (links.entrancePage.data.attributes.navBarConfig && links.entrancePage.data.attributes.navBarConfig.navBarTitle)
      ? links.entrancePage.data.attributes.navBarConfig.navBarTitle 
      : links.entrancePage.data.attributes.title 
    : dict.Header.nav.entrance
  const dpoTitle = links.dpo.data 
    ? (links.dpo.data.attributes.navBarConfig && links.dpo.data.attributes.navBarConfig.navBarTitle) 
      ? links.dpo.data.attributes.navBarConfig.navBarTitle 
      : links.dpo.data.attributes.title 
    : dict.Header.nav.dpo

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

        <NavMenuItem locale={locale} href='/info'>{dict.Header.nav.info}</NavMenuItem>
        <NavMenuItem locale={locale} href='/structure'>{dict.Header.nav.structure}</NavMenuItem>
        <NavMenuItem locale={locale} href='/education'>{dict.Header.nav.education}</NavMenuItem>
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
        <NavMenuItem locale={locale} href='/science'>{dict.Header.nav.science}</NavMenuItem>
        <NavMenuItem locale={locale} href='/projects'>{dict.Header.nav.projects}</NavMenuItem>
        <NavMenuItem locale={locale} href='/journals'>{dict.Header.nav.journals}</NavMenuItem>

        <div className='absolute 2xl:-right-20 -right-16 h-full flex items-center'>
          <MoreMenu />
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  )
}