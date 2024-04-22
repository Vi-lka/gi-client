import CarouselComp from '@/components/CarouselComp'
import { ClientHydration } from '@/components/ClientHydration'
import ImageComp from '@/components/ImageComp'
import { Card, CardContent } from '@/components/ui/card'
import { CarouselItem } from '@/components/ui/carousel'
import { Skeleton } from '@/components/ui/skeleton'
import type { ImagesArrayT } from '@/lib/types/components'
import { calcWidth, cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import React from 'react'

export default function Media({ 
    media,
    className
}: { 
    media: ImagesArrayT,
    className?: string,
}) {

    if (media.data.length > 1) return (
        <div className={cn('relative w-full h-fit', className)}>
            <ClientHydration fallback={<SliderLoading className="max-h-96 aspect-[9/5]" />}>
                <CarouselComp className='lg:-ml-8 -ml-4'>
                    {media.data.map((item, index) => (
                        <CarouselItem key={index} className='lg:pl-8 pl-4'>
                            <Card className='border-none shadow-md bg-transparent rounded-3xl'>
                                <CardContent className="relative w-full max-h-96 aspect-[9/5]">
                                    <ImageComp
                                        src={item.attributes.url}
                                        alt={item.attributes.url}
                                        fill
                                        sizes='100vw'
                                        className='w-full object-cover rounded-3xl'
                                    />
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselComp>
            </ClientHydration>
        </div>
    )

    if (media.data[0]) return (
        <div className={cn('relative w-full h-fit rounded-3xl overflow-hidden', className)}>
            <ClientHydration fallback={<Skeleton className='w-full h-full max-h-96'/>}>
                <ImageComp 
                    src={media.data[0].attributes.url}
                    alt=""
                    fill
                    sizes='100vw'
                    className='!lg:absolute !relative object-cover max-h-96'
                />
            </ClientHydration>
        </div>
    )

    return null
}

function SliderLoading({ className }: { className?: string }) {
    return (
        <div className={cn('w-full relative', className)}>
            <Skeleton className='w-full h-full flex items-center justify-center'>
              <Loader2 className='animate-spin'/>
            </Skeleton>
            <Skeleton className="absolute md:w-8 md:h-8 w-6 h-6 rounded-full md:-left-12 -left-7 top-1/2 -translate-y-1/2" />
            <Skeleton className="absolute md:w-8 md:h-8 w-6 h-6 rounded-full md:-right-12 -right-7 top-1/2 -translate-y-1/2"/>
            <div className="my-4 flex w-16 items-center justify-center gap-1 max-w-full mx-auto">
                {Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton 
                        key={index}
                        className="h-1.5 max-w-32 min-w-1"
                        style={{
                            width: calcWidth({index, current: 1, count: 3}) + "%"
                        }}
                    />
                ))}
            </div>
        </div>
    )
}