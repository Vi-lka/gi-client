import Breadcrumbs from '@/components/Breadcrumbs'
import { TypographyH1 } from '@/components/typography'
import Link from 'next/link'
import React from 'react'
import EntranceTabs from './EntranceTabs'

export default function EntrancePage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {

    const anchors = [
        {
            title: "Направления",
            link: "#courses"
        },
        {
            title: "Об институте",
            link: "#about"
        },
        {
            title: "Выпускники",
            link: "#graduates"
        },
        {
            title: "Дополнительная информация",
            link: "#additional-info"
        },
        {
            title: "Контакты",
            link: "#contacts"
        },
    ]

    return (
        <div className='w-full'>
            <Breadcrumbs />

            <TypographyH1 className='font-semibold text-primary my-6'>
                Поступление
            </TypographyH1>

            <div className='flex flex-wrap gap-y-3 lg:gap-x-6 gap-x-3 mt-6'>
                {anchors.map((anchor) => (
                    <Link 
                        key={anchor.link} 
                        href={anchor.link}
                        className="h-fit text-sm 2xl:py-2 py-1 2xl:px-6 md:px-3 group inline-flex w-max items-center justify-center rounded-full bg-card text-primary px-4 font-semibold transition-colors hover:bg-primary hover:text-background focus:bg-primary focus:text-background focus:outline-none"
                    >
                        {anchor.title}
                    </Link>
                ))}
            </div>

            <section id="courses" className='pt-28'>
                <EntranceTabs searchParams={searchParams} />
            </section>
        </div>
    )
}
