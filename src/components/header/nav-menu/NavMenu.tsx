"use client"

import React from 'react'
import { NavigationMenu, NavigationMenuList } from '../../ui/navigation-menu'
import getSubLinks, { getLinkTitle } from '@/lib/getSubLinks'
import { useDictionary } from '../../providers/DictionaryProvider'
import NavMenuItem from './NavMenuItem'
import type { LinksT, NavBarT } from '@/lib/types/additional'

export default function NavMenu({
  navBar,
  links,
  side,
  className
}: {
  navBar: NavBarT | null,
  links: LinksT,
  side?: "top" | "bottom",
  className?: string
}) {

  const dict = useDictionary()

  const entranceTitle = getLinkTitle(links.entrancePage.data?.attributes, dict.Header.nav.admission)
  const dpoTitle = getLinkTitle(links.dpo.data?.attributes, dict.Header.nav.dpo)
  const structureTitle = getLinkTitle(links.structure.data?.attributes, dict.Header.nav.structure)
  const infoTitle = getLinkTitle(links.info.data?.attributes, dict.Header.nav.info)
  

  const entranceLinks = getSubLinks({
      title: entranceTitle,
      href: "/admission",
      image: links.entrancePage.data?.attributes.navBarConfig?.navBarImage,
      description: links.entrancePage.data?.attributes.navBarConfig?.navBarDescription,
      navBarData: navBar?.admission?.subLinks,
      linksData: links.entrancePage.data?.attributes.content
  })
  const dpoLinks = getSubLinks({
      title: dpoTitle,
      href: "/dpo",
      image: links.dpo.data?.attributes.navBarConfig?.navBarImage,
      description: links.dpo.data?.attributes.navBarConfig?.navBarDescription,
      navBarData: navBar?.dpo?.subLinks,
      linksData: links.dpo.data?.attributes.content
  })
  const structureLinks = getSubLinks({
    title: structureTitle,
    href: "/structure",
    image: links.structure.data?.attributes.navBarConfig?.navBarImage,
    description: links.structure.data?.attributes.navBarConfig?.navBarDescription,
    navBarData: navBar?.structure?.subLinks,
    linksData: links.structure.data?.attributes.content
  })
  const infoLinks = getSubLinks({
    title: infoTitle,
    href: "/info",
    image: links.info.data?.attributes.navBarConfig?.navBarImage,
    description: links.info.data?.attributes.navBarConfig?.navBarDescription,
    navBarData: navBar?.info?.subLinks,
    linksData: links.info.data?.attributes.content
  })

  return (
    <NavigationMenu side={side} delayDuration={100} className={className}>
      <NavigationMenuList className='relative gap-2 flex-wrap justify-between items-center'>
        <NavMenuItem data={infoLinks} />
        <NavMenuItem data={structureLinks}/>
        <NavMenuItem data={{title: dict.Header.nav.education, href: '/education'}} />
        <NavMenuItem data={entranceLinks} />
        <NavMenuItem data={dpoLinks} />
        <NavMenuItem data={{title: dict.Header.nav.science, href: '/science'}} />
        <NavMenuItem data={{title: dict.Header.nav.projects, href: '/projects'}} />
        <NavMenuItem data={{title: dict.Header.nav.journals, href: '/journals'}} />
      </NavigationMenuList>
    </NavigationMenu>
  )
}