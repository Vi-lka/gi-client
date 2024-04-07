"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import React from 'react'

export default function Menu({
    selectedItem
}: {
    selectedItem: number
}) {

    const links = [
        {
            mainTitle: "Сведения",
            mainLink: "/info",
            subLinks: [
                { title: "Новости", link: "/info/news" },
                { title: "Документы", link: "/info/docs" },
                { title: "Программа развития ГИ", link: "/info/development-program" },
            ]
        },
        {
            mainTitle: "Структура института",
            mainLink: "/structure",
            subLinks: [
                { title: "Кафедры", link: "/structure/departments" },
                { title: "Научные подразделения", link: "/structure/scientific-departments" },
                { title: "Учебно-организационный отдел", link: "/structure/edu-org-department" },
                { title: "Дирекция", link: "/structure/directorate" },
                { title: "Сотрудники", link: "/structure/staff" },
            ]
        },
        {
            mainTitle: "Обучение",
            mainLink: "/education",
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
        {
            mainTitle: "Поступление",
            mainLink: "/entrance",
            subLinks: [
                { title: "Направления бакалавриата", link: "/entrance/bachelor" },
                { title: "Направления магистратуры", link: "/entrance/magistracy" },
                { title: "Направления аспирантуры", link: "/entrance/postgraduate" },
                { title: "Об институте", link: "/entrance/about" },
                { title: "Выпускники", link: "/entrance/graduates" },
                { title: "Дополнительная информация", link: "/entrance/additional-info" },
                { title: "Контакты", link: "/entrance/contacts" },
            ]
        },
        {
            mainTitle: "Курсы Дополнительного Профессионального Образования",
            mainLink: "/dpo",
        },
        {
            mainTitle: "Наука",
            mainLink: "/science",
            subLinks: [
                { title: "Научные показатели", link: "/science/indicators" },
                { title: "Исследовательские коллективы", link: "/science/research-teams" },
                { title: "Журналы", link: "/science/journals" },
                { title: "Конференции", link: "/science/conferences" },
            ]
        },
        {
            mainTitle: "Проекты",
            mainLink: "/projects",
            secondTitle: "Журналы",
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
                className='relative w-full h-full flex flex-col lg:gap-4 sm:gap-8 gap-6 justify-center xl:pl-[10vw] xl:pr-16 pl-14 pr-6 2xl:py-12 py-6 z-50'
            >
                {links.map((item, index) => (
                    <motion.div 
                        key={index}
                        variants={mainItemVariants}
                        className='w-fit'
                    >
                        <div className='flex flex-wrap sm:gap-8 gap-6 items-center'>
                            <Link href={item.mainLink} className='link-underline py-1 pr-3 font-Cera font-bold uppercase xl:text-2xl lg:text-xl sm:text-base text-sm hover:text-apricot transition-all duration-300'>
                                {item.mainTitle}
                            </Link>
                            {item.secondLink && item.secondTitle 
                                ? (
                                <Link href={item.secondLink} className='link-underline py-1 pr-3 font-Cera font-bold uppercase xl:text-2xl lg:text-xl sm:text-base text-sm hover:text-apricot transition-all duration-300'>
                                    {item.secondTitle}
                                </Link>
                                )
                                : null
                            }
                        </div>
                        <div className='flex flex-wrap gap-x-6 gap-y-[2px] mt-0.5'>
                            {item.subLinks?.map((subItem, index) => (
                                <Link
                                    key={index}
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
