import ImageComp from '@/components/ImageComp'
import Link from '@/components/Link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CarouselItem } from '@/components/ui/carousel'
import type { EducationalProgramSingleT } from '@/lib/types'
import React from 'react'

export default function EducationalProgramsItem({
    locale,
    item
}: {
    locale: string
    item: EducationalProgramSingleT
}) {
    return (
        <CarouselItem key={item.id} className='lg:basis-1/3 sm:basis-1/2 lg:pl-8 pl-4'>
            <Card className='h-full border-none shadow-md rounded-3xl'>
                <CardContent className="w-full h-full flex flex-col xl:gap-8 gap-6 md:justify-normal justify-between p-3">
                    <ImageComp
                        src={item.attributes.image.data?.attributes.url}
                        alt={item.attributes.title}
                        fill={false}
                        width={400}
                        height={150}
                        className='w-full object-cover rounded-2xl aspect-[2/1]'
                    />

                    <div className='flex flex-col justify-between gap-3 xl:px-8 px-5 text-primary text-base'>
                        <div>
                            <p>{item.attributes.mainCode}</p>
                            <p>{item.attributes.mainName}</p>
                        </div>
                        <div>
                            <p>{item.attributes.code}</p>
                            <p className='font-bold'>{item.attributes.title}</p>
                        </div>
                    </div>

                    <Link locale={locale} href={`/entrance/${item.attributes.slug}`} className='w-fit mx-auto mb-3 md:mt-auto'>
                        <Button className='uppercase font-medium px-10 py-5 rounded-3xl'>
                            Подробнее
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </CarouselItem>
    ) 
}
