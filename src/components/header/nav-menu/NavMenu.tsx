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
  const educationTitle = getLinkTitle(links.educationPage.data?.attributes, dict.Header.nav.education)
  const projectsTitle = getLinkTitle(links.projectsPage.data?.attributes, dict.Header.nav.projects)
  const journalsTitle = getLinkTitle(links.journalsPage.data?.attributes, dict.Header.nav.journals)
  

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
  const educationLinks = getSubLinks({
    title: educationTitle,
    href: "/education",
    image: links.educationPage.data?.attributes.navBarConfig?.navBarImage,
    description: links.educationPage.data?.attributes.navBarConfig?.navBarDescription,
    navBarData: navBar?.education?.subLinks,
    linksData: links.educationPage.data?.attributes.content
  })
  const projectsLinks = getSubLinks({
    title: projectsTitle,
    href: "/projects",
    image: links.projectsPage.data?.attributes.navBarConfig?.navBarImage,
    description: links.projectsPage.data?.attributes.navBarConfig?.navBarDescription,
    navBarData: navBar?.projects?.subLinks,
    linksData: links.projectsPage.data?.attributes.content
  })
  const journalsLinks = getSubLinks({
    title: journalsTitle,
    href: "/journals",
    image: links.journalsPage.data?.attributes.navBarConfig?.navBarImage,
    description: links.journalsPage.data?.attributes.navBarConfig?.navBarDescription,
    navBarData: navBar?.journals?.subLinks,
    linksData: links.journalsPage.data?.attributes.content
  })


  return (
    <NavigationMenu side={side} delayDuration={100} className={className}>
      <NavigationMenuList className='relative gap-2 flex-wrap justify-between items-center'>
        <NavMenuItem data={infoLinks} />
        <NavMenuItem data={structureLinks}/>
        <NavMenuItem data={educationLinks} />
        <NavMenuItem data={entranceLinks} />
        <NavMenuItem data={dpoLinks} />
        <NavMenuItem data={{title: dict.Header.nav.science, href: '/science'}} />
        <NavMenuItem data={projectsLinks} />
        <NavMenuItem data={journalsLinks} />
      </NavigationMenuList>
    </NavigationMenu>
  )
}