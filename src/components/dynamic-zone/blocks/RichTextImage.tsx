import React from 'react'
import { cn } from '@/lib/utils'
import { TypographyH2 } from '@/components/typography'
import BlocksRendererStrapi from '@/components/BlocksRendererStrapi'
import CarouselComp from '@/components/CarouselComp'
import { CarouselItem } from '@/components/ui/carousel'
import ImageComp from '@/components/ImageComp'
import { ClientHydration } from '@/components/ClientHydration'
import { Skeleton } from '@/components/ui/skeleton'
import CarouselLoading from '@/components/loadings/CarouselLoading'
import type { TextImagesCompT } from '@/lib/types/components'

export default function RichTextImage({
    data,
    headingBig,
    className,
}: {
    data: TextImagesCompT,
    headingBig?: boolean,
    className?: string,
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
            <div className={cn(
                'flex items-stretch', 
                data.images.data.length > 1 ? "lg:gap-16 gap-6" : "gap-6",
                data.alignImages === "right" ? "lg:flex-row flex-col-reverse" : "lg:flex-row-reverse flex-col-reverse"
            )}>
                <div className='lg:w-1/2 w-full h-fit'>
                    {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
                    <BlocksRendererStrapi content={data.text} />
                </div>
                {data.images.data.length > 1 
                    ? (
                        <ClientHydration fallback={
                            <div className="lg:w-1/2 w-full">
                                <CarouselLoading noTitle className='w-full lg:aspect-[8/6] max-h-96 lg:mb-0 mb-6'/>
                            </div>
                        }>
                            <CarouselComp classNameContainer='lg:w-1/2 w-full' className='lg:-ml-8 -ml-4 items-center'>
                                {data.images.data.map((image, index) => (
                                    <CarouselItem key={index} className='h-fit lg:pl-8 pl-4 flex items-center'>
                                        <div className='relative w-full h-fit'>
                                                <ImageComp 
                                                    src={image.attributes.url}
                                                    alt=""
                                                    fill
                                                    sizes='(max-width: 1024px) 100vw, 50vw'
                                                    className='!lg:absolute !relative object-contain rounded-3xl overflow-hidden !h-fit'
                                                />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselComp>
                        </ClientHydration>
                    )
                    : (
                        <div className='relative lg:w-1/2 w-full lg:h-auto h-fit rounded-3xl overflow-hidden'>
                            <ClientHydration fallback={<Skeleton className='w-full h-full lg:max-h-none max-h-96'/>}>
                                <ImageComp 
                                    src={data.images.data[0].attributes.url}
                                    alt=""
                                    fill
                                    sizes='(max-width: 1280px) 100vw, 50vw'
                                    className='!lg:absolute !relative object-cover lg:max-h-none max-h-96'
                                />
                            </ClientHydration>
                        </div>
                    )
                }
            </div>
        </div>
    )
}