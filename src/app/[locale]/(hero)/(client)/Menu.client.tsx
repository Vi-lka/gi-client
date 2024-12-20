"use client"

import Link from '@/components/Link'
import LocaleSwitcher from '@/components/LocaleSwitcher'
import { useDictionary } from '@/components/providers/DictionaryProvider'
import getSubLinks from '@/lib/getSubLinks'
import { useLocale } from '@/lib/hooks/useLocale'
import type { LinksT, NavBarT } from '@/lib/types/additional'
import { motion } from 'framer-motion'
import React from 'react'
import { useAccordion } from './Hero'
import { cn } from '@/lib/utils'

export default function MenuClient({
    data
}: {
    data: {
        navBar: NavBarT | null,
        links: LinksT
    }
}) {
    const selectedItem = useAccordion()

    const dict = useDictionary()

    const locale = useLocale()

    const entranceTitle = data.links.entrancePage.data ? data.links.entrancePage.data.attributes.title : dict.Header.nav.admission
    const dpoTitle = data.links.dpo.data ? data.links.dpo.data.attributes.title : dict.Header.nav.dpo
    const structureTitle = data.links.structure.data ? data.links.structure.data.attributes.title : dict.Header.nav.structure
    const infoTitle = data.links.info.data ? data.links.info.data.attributes.title : dict.Header.nav.info
    const educationTitle = data.links.educationPage.data ? data.links.educationPage.data.attributes.title : dict.Header.nav.education
    // const scienceTitle = data.links.
    const projectsTitle = data.links.projectsPage.data ? data.links.projectsPage.data.attributes.title : dict.Header.nav.projects

    const entranceLinks = getSubLinks({
        title: entranceTitle,
        href: "/admission",
        navBarData: data.navBar?.admission?.subLinks,
        linksData: data.links.entrancePage.data?.attributes.content
    })
    const dpoLinks = getSubLinks({
        title: dpoTitle,
        href: "/dpo",
        navBarData: data.navBar?.dpo?.subLinks,
        linksData: data.links.dpo.data?.attributes.content
    })
    const structureLinks = getSubLinks({
        title: structureTitle,
        href: "/structure",
        navBarData: data.navBar?.structure?.subLinks,
        linksData: data.links.structure.data?.attributes.content
    })
    const infoLinks = getSubLinks({
        title: infoTitle,
        href: "/info",
        navBarData: data.navBar?.info?.subLinks,
        linksData: data.links.info.data?.attributes.content
    })
    const educationLinks = getSubLinks({
        title: educationTitle,
        href: "/education",
        navBarData: data.navBar?.education?.subLinks,
        linksData: data.links.educationPage.data?.attributes.content
    })
    const projectsLinks = getSubLinks({
        title: projectsTitle,
        href: "/projects",
        navBarData: data.navBar?.projects?.subLinks,
        linksData: data.links.projectsPage.data?.attributes.content

    })

    const links = [
        infoLinks,
        structureLinks,
        educationLinks,
        entranceLinks,
        dpoLinks,
        {
            title: dict.Header.nav.science,
            href: "/science",
            // subLinks: [
            //     { title: "Научные показатели", link: "/science/indicators" },
            //     { title: "Исследовательские коллективы", link: "/science/research-teams" },
            //     { title: "Журналы", link: "/science/journals" },
            //     { title: "Конференции", link: "/science/conferences" },
            // ]
        },
        projectsLinks
    ]

    const containerVariants = {
        open: { 
            opacity: 1,
            transition: { 
                type: "spring",
                delay: 0.2,
                duration: 0.5,
                staggerChildren: 0.05
            }
        },
        closed: { 
            opacity: 0,
            transition: {
                type: "spring", 
                duration: 0.3,
            }
        },
    }

    const mainItemVariants = {
        open: { 
            x: 0,
            transition: { 
                type: "tween", 
                damping: 20, 
                stiffness: 50,
                duration: 0.3,
            }
        },
        closed: { 
            x: 2000,
            transition: {
                type: "tween", 
                damping: 20, 
                stiffness: 50,
                duration: 0.2
            }
        },
    }

    return (
        <div className='absolute w-full h-full top-0'>
            <motion.div 
                animate={selectedItem === 2 ? "open" : "closed"}
                variants={containerVariants}
                className={cn(
                    'relative w-full h-full flex flex-col lg:gap-4 sm:gap-8 gap-3 justify-center xl:pr-16 pr-6 2xl:py-12 py-6 z-50',
                    // fix snap on load
                    selectedItem === 2 ? "pl-14" : "pl-20",
                    "xl:pl-[10vw] transition-all duration-300"
                )}
            >
                <div className='absolute lg:top-6 top-3 lg:right-6 right-3 z-[100]'>
                    <LocaleSwitcher className="lg:w-12 sm:w-11 w-9 sm:text-lg px-0 sm:py-5 py-4 text-background hover:bg-background focus:bg-background hover:text-primary focus:text-primary" />
                </div>
                {links.map((item, index) => (
                    <motion.div 
                        key={index}
                        variants={mainItemVariants}
                        className='w-fit'
                    >
                        <div className='flex flex-wrap sm:gap-8 gap-6 items-center'>
                            <Link locale={locale} href={item.href} className='link-underline py-1 pr-3 font-Cera font-bold uppercase xl:text-2xl lg:text-xl sm:text-base text-sm hover:text-apricot transition-all duration-300'>
                                {item.title}
                            </Link>
                            {item.secondHref && item.secondTitle 
                                ? (
                                <Link locale={locale} href={item.secondHref} className='link-underline py-1 pr-3 font-Cera font-bold uppercase xl:text-2xl lg:text-xl sm:text-base text-sm hover:text-apricot transition-all duration-300'>
                                    {item.secondTitle}
                                </Link>
                                )
                                : null
                            }
                        </div>
                        <div className='flex flex-wrap gap-x-6 gap-y-[2px] mt-0.5'>
                            {item.subLinks?.map((subItem, index) => (
                                (subItem.link && subItem.title) &&
                                <Link
                                    key={index}
                                    locale={locale}
                                    href={subItem.link}
                                    className='p-1 pl-0 text-sm lg:block hidden hover:text-apricot transition-all duration-300'
                                >
                                    {subItem.title}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}