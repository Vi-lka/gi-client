"use client"

import Link from '@/components/Link'
import LocaleSwitcher from '@/components/LocaleSwitcher'
import { useDictionary } from '@/components/providers/DictionaryProvider'
import getSubLinks from '@/lib/getSubLinks'
import { useLocale } from '@/lib/hooks/useLocale'
import type { LinksT, NavBarT } from '@/lib/types'
import { motion } from 'framer-motion'
import React from 'react'

export default function Menu({
    data,
    selectedItem
}: {
    data: {
        navBar: NavBarT | null,
        links: LinksT
    },
    selectedItem: number
}) {
    const dict = useDictionary()

    const locale = useLocale()

    const entranceTitle = data.links.entrancePage.data ? data.links.entrancePage.data.attributes.title : dict.Header.nav.admission
    const dpoTitle = data.links.dpo.data ? data.links.dpo.data.attributes.title : dict.Header.nav.dpo

    const entranceLinks = getSubLinks({
        title: entranceTitle,
        link: "/admission",
        navBarData: data.navBar?.admission?.subLinks,
        linksData: data.links.entrancePage.data?.attributes.content
    })
    const dpoLinks = getSubLinks({
        title: dpoTitle,
        link: "/dpo",
        navBarData: data.navBar?.dpo?.subLinks,
        linksData: data.links.dpo.data?.attributes.content
    })

    const links = [
        {
            title: dict.Header.nav.info,
            link: "/info",
            subLinks: [
                { title: "Новости", link: "/info/news" },
                { title: "Документы", link: "/info/docs" },
                { title: "Программа развития ГИ", link: "/info/development-program" },
            ]
        },
        {
            title: dict.Header.nav.structure,
            link: "/structure",
            subLinks: [
                { title: "Кафедры", link: "/structure/departments" },
                { title: "Научные подразделения", link: "/structure/scientific-departments" },
                { title: "Учебно-организационный отдел", link: "/structure/edu-org-department" },
                { title: "Дирекция", link: "/structure/directorate" },
                { title: "Сотрудники", link: "/structure/staff" },
            ]
        },
        {
            title: dict.Header.nav.education,
            link: "/education",
            subLinks: [
                { title: "Календарный график", link: "/education/schedule" },
                { title: "Стипендии и премии", link: "/education/scholarships-awards" },
                { title: "Бланки заявлений", link: "/education/application-forms" },
                { title: "Форма запроса документов", link: "/education/document-request" },
                { title: "Образовательные программы", link: "/education/programs" },
                { title: "Расписание переноса занятий", link: "/education/postponement" },
                { title: "Правовые документы", link: "/education/law" },
            ]
        },
        entranceLinks,
        dpoLinks,
        {
            title: dict.Header.nav.science,
            link: "/science",
            subLinks: [
                { title: "Научные показатели", link: "/science/indicators" },
                { title: "Исследовательские коллективы", link: "/science/research-teams" },
                { title: "Журналы", link: "/science/journals" },
                { title: "Конференции", link: "/science/conferences" },
            ]
        },
        {
            title: dict.Header.nav.projects,
            link: "/projects",
            subLinks: [],
            secondTitle: dict.Header.nav.journals,
            secondLink: "/journals",
        },
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
                className='relative w-full h-full flex flex-col lg:gap-4 sm:gap-8 gap-3 justify-center xl:pl-[10vw] xl:pr-16 pl-14 pr-6 2xl:py-12 py-6 z-50'
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
                            <Link locale={locale} href={item.link} className='link-underline py-1 pr-3 font-Cera font-bold uppercase xl:text-2xl lg:text-xl sm:text-base text-sm hover:text-apricot transition-all duration-300'>
                                {item.title}
                            </Link>
                            {item.secondLink && item.secondTitle 
                                ? (
                                <Link locale={locale} href={item.secondLink} className='link-underline py-1 pr-3 font-Cera font-bold uppercase xl:text-2xl lg:text-xl sm:text-base text-sm hover:text-apricot transition-all duration-300'>
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