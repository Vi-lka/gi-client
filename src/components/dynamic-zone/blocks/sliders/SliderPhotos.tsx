import CarouselComp from '@/components/CarouselComp'
import { ClientHydration } from '@/components/ClientHydration'
import ImageComp from '@/components/ImageComp'
import CarouselLoading from '@/components/loadings/CarouselLoading'
import { TypographyH2 } from '@/components/typography'
import { Card, CardContent } from '@/components/ui/card'
import { CarouselItem } from '@/components/ui/carousel'
import type { SliderPhotosCompT } from '@/lib/types'
import { cn } from '@/lib/utils'
import React from 'react'

export default function SliderPhotos({
    data,
    headingBig,
    className
}: {
    data: SliderPhotosCompT,
    headingBig?: boolean,
    className?: string
}) {
    return (
        <div className={cn("w-full", className)}>
            {data.title && (
                <TypographyH2 
                    className={cn(
                        'font-semibold text-primary mb-6 border-none',
                        headingBig ? "text-4xl lg:text-5xl" : ""
                    )}
                >
                    {data.title}
                </TypographyH2>
            )}
            <ClientHydration fallback={<CarouselLoading className='w-full h-full sm:aspect-[2/1] aspect-square'/>}>
                <CarouselComp className='lg:-ml-8 -ml-4'>
                    {data.photos.data.map((item, index) => (
                        <CarouselItem key={index} className='lg:pl-8 pl-4'>
                            <Card className='border-none shadow-md bg-transparent rounded-3xl'>
                                <CardContent className="relative w-full sm:aspect-[2/1] aspect-square">
                                        <ImageComp
                                            src={item.attributes.url}
                                            alt={item.attributes.url}
                                            fill
                                            sizes='100vw'
                                            className='w-full object-contain rounded-3xl'
                                        />
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselComp>
            </ClientHydration>
        </div>
    )
}
