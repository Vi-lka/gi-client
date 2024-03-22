import CarouselComp from '@/components/CarouselComp'
import { TypographyH1 } from '@/components/typography'
import React from 'react'

export default function Entrance() {
    return (
        <section className='w-full'>
            <TypographyH1 className='font-semibold text-primary mb-8 px-2'>
                Поступай в Гуманитарный!
            </TypographyH1>
            <CarouselComp />
        </section>
    )
}
