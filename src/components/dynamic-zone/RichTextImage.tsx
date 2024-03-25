import React from 'react'
import { cn } from '@/lib/utils'
import BlocksRendererStrapi from '../BlocksRendererStrapi'
import { TypographyH2 } from '../typography'
import type { AlignEnum } from '@/lib/types'
import CarouselComp from '../CarouselComp'
import { CarouselItem } from '../ui/carousel'
import ImageComp from '../ImageComp'

export default function RichText({
    title,
    text,
    alignImages,
    images,
    className,
}: {
    title: string | null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    text: any,
    alignImages: AlignEnum,
    images: {
        data: {
            attributes: {
                url: string;
            };
        }[];
    }
    className?: string,
}) {
    return (
        <div className={cn("w-full", className)}>
            {title && (
                <TypographyH2 className='font-semibold text-primary mb-6 border-none'>
                    {title}
                </TypographyH2>
            )}
            <div className={cn(
                'flex', 
                images.data.length > 1 ? "items-center xl:gap-16 gap-6" : "items-stretch gap-6",
                alignImages === "right" ? "xl:flex-row flex-col-reverse" : "xl:flex-row-reverse flex-col-reverse"
            )}>
                <div className='xl:w-1/2 w-full'>
                    {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
                    <BlocksRendererStrapi content={text} />
                </div>
                {images.data.length > 1 
                    ? (
                        <CarouselComp classNameContainer='xl:w-1/2 w-full' className='xl:-ml-8 -ml-4 items-center'>
                            {images.data.map((image, index) => (
                                <CarouselItem key={index} className='h-fit xl:pl-8 pl-4 flex items-center'>
                                    <div className='relative w-full h-fit'>
                                        <ImageComp 
                                            src={image.attributes.url}
                                            alt=""
                                            fill
                                            sizes='(max-width: 1024px) 100vw, 50vw'
                                            className='!xl:absolute !relative object-contain rounded-3xl overflow-hidden !h-fit'
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselComp>
                    )
                    : (
                        <div className='relative xl:w-1/2 w-full xl:h-auto h-fit rounded-3xl overflow-hidden'>
                            <ImageComp 
                                src={images.data[0].attributes.url}
                                alt=""
                                fill
                                sizes='(max-width: 1024px) 100vw, 50vw'
                                className='!xl:absolute !relative object-cover'
                            />
                        </div>
                    )
                }
            </div>
        </div>
    )
}