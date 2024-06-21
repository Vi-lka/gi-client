import CarouselComp from '@/components/CarouselComp'
import { ClientHydration } from '@/components/ClientHydration'
import CarouselLoading from '@/components/loadings/CarouselLoading'
import { TypographyH2 } from '@/components/typography'
import { Card, CardContent } from '@/components/ui/card'
import { CarouselItem } from '@/components/ui/carousel'
import type { SliderVideoCompT } from '@/lib/types/components'
import { cn } from '@/lib/utils'
import React from 'react'
import Video from '../Video'
import EmbededHTML from '../EmbededHTML'

export default function SliderVideo({
    data,
    headingBig,
    className
}: {
    data: SliderVideoCompT,
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
        <ClientHydration fallback={<CarouselLoading noTitle className='w-full h-full aspect-video'/>}>
            {data.items.length > 1 
                ? (
                    <CarouselComp className='lg:-ml-8 -ml-4'>
                        {data.items.map((item, index) => (
                            <CarouselItem key={index} className='lg:pl-8 pl-4'>
                                <Card className='border-none shadow-md bg-transparent rounded-3xl overflow-hidden'>
                                    <CardContent className="relative w-full aspect-video p-0">
                                        {item.video.data 
                                            ? <Video url={item.video.data.attributes.url} />
                                            : <EmbededHTML elem={item.embed} />
                                        }
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselComp>
                )
                : (
                    <Card className='border-none shadow-md bg-transparent rounded-3xl overflow-hidden'>
                        <CardContent className="relative w-full aspect-video p-0">
                            {data.items[0].video.data 
                                ? <Video url={data.items[0].video.data.attributes.url} />
                                : <EmbededHTML elem={data.items[0].embed} />
                            }
                        </CardContent>
                    </Card>
                )
            }
        </ClientHydration>
    </div>
  )
}
