"use client"

import React from 'react'
import { NavigationMenu, NavigationMenuList } from '../../ui/navigation-menu'
import { useLocale } from '@/lib/hooks/useLocale'
import type { LinksT, NavBarT } from '@/lib/types'
import getSubLinks, { getLinkTitle } from '@/lib/getSubLinks'
import { useDictionary } from '../../providers/DictionaryProvider'
import NavMenuItem from './NavMenuItem'

export default function NavMenu({
  navBar,
  links,
  className
}: {
  navBar: NavBarT | null,
  links: LinksT,
  className?: string
}) {

  const dict = useDictionary()

  const locale = useLocale()

  const entranceTitle = getLinkTitle(links.entrancePage.data?.attributes, dict.Header.nav.admission)
  const dpoTitle = getLinkTitle(links.dpo.data?.attributes, dict.Header.nav.dpo)

  const entranceLinks = getSubLinks({
      title: entranceTitle,
      link: "/admission",
      navBarData: navBar?.admission?.subLinks,
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
      </NavigationMenuList>
    </NavigationMenu>
  )
}