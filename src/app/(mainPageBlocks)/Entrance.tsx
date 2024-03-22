import CarouselComp from '@/components/CarouselComp'
import { TypographyH1 } from '@/components/typography'
import React from 'react'

export default function Entrance() {

    const data = [
        {
            id: 0,
            image: "/preview/1.jpg",
            mainCode: "09.03.03",
            mainName: "Прикладная информатика",
            subCode: "09.03.03.35",
            subName: "Прикладная информатика в искусстве и интерактивных медиа",
        },
        {
            id: 1,
            image: "/preview/2.jpg",
            mainCode: "42.03.01",
            mainName: "Реклама и связи с общественностью",
            subCode: "42.03.01.31",
            subName: "Рекламный маркетинг",
        },
        {
            id: 2,
            image: "/preview/3.jpg",
            mainCode: "46.03.01",
            mainName: "История",
            subCode: "46.03.01.30",
            subName: "История",
        },
        {
            id: 3,
            image: "/preview/4.jpg",
            mainCode: "46.03.02",
            mainName: "Документоведение и архивоведение",
            subCode: "46.03.02.30",
            subName: "Документоведение и архивоведение",
        },
        {
            id: 4,
            image: "/preview/5.jpg",
            mainCode: "47.03.01",
            mainName: "Философия",
            subCode: "47.03.01.30",
            subName: "Философия",
        },
    ]

    return (
        <section className='w-full'>
            <TypographyH1 className='font-semibold text-primary mb-4 px-2'>
                Поступай в Гуманитарный!
            </TypographyH1>
            <CarouselComp data={data} hrefTo='entrance' />
        </section>
    )
}
