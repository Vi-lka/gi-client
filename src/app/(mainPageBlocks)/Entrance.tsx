import CarouselComp from '@/components/CarouselComp'
import { TypographyH1 } from '@/components/typography'
import React from 'react'
import Image from "next/image"
import Link from 'next/link';
import { CarouselItem } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
            <CarouselComp className='lg:-ml-8 -ml-4'>
                {data.map(item => (
                    <CarouselItem key={item.id} className='lg:basis-1/3 sm:basis-1/2 lg:pl-8 pl-4'>
                        <Card className='h-full border-none shadow-md rounded-3xl'>
                            <CardContent className="w-full h-full flex flex-col xl:gap-8 gap-6 md:justify-normal justify-between p-3">
                                <Image 
                                    src={item.image}
                                    alt="Image"
                                    width={400}
                                    height={140}
                                    className='w-full object-cover rounded-2xl aspect-[2/1]'
                                />

                                <div className='flex flex-col justify-between gap-3 xl:px-8 px-5 text-primary xl:text-base text-sm'>
                                    <div>
                                        <p>{item.mainCode}</p>
                                        <p>{item.mainName}</p>
                                    </div>
                                    <div>
                                        <p>{item.subCode}</p>
                                        <p className='font-bold'>{item.subName}</p>
                                    </div>
                                </div>

                                <Link href={`/entrance/${item.id}`} className='w-fit mx-auto mb-3 md:mt-auto'>
                                    <Button className='uppercase font-medium px-10 py-5 rounded-full'>
                                        Подробнее
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselComp>
        </section>
    )
}
