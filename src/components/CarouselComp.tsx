"use client"

import React from 'react'
import type { CarouselApi} from './ui/carousel';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Card, CardContent } from './ui/card'
import { cn } from '@/lib/utils';

export default function CarouselComp() {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)
   
    React.useEffect(() => {
        if (!api) {
            return
        }
   
        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)
   
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    function calcWidth({index, current, count}: {index: number, current: number, count: number}) {
        const per = (100 / count) / count
        let perCount = 0

        if (index === (current - 1)) {
            Array.from({ length: count }).forEach((_, i) => {
                perCount = perCount + Math.abs(index - i)
            })

            return per * count + per * perCount
        } else {
            perCount = Math.abs((current - 1) - index)

            return per * count - per * perCount
        }
    }

    return (
        <div>
            <Carousel 
                setApi={setApi} 
                opts={{ skipSnaps: true }} 
                className="w-full"
            >
                <CarouselContent className='lg:-ml-8 -ml-4'>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <CarouselItem key={index} className='lg:basis-1/3 sm:basis-1/2 lg:pl-8 pl-4'>
                            <Card className=' aspect-[47/50] border-none shadow-md'>
                                <CardContent className="flex w-full h-full items-center justify-center p-6">
                                    <span className="text-4xl font-semibold">{index + 1}</span>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious variant="ghost" className='md:scale-150 hover:bg-primary disabled:opacity-0 transition-all' />
                <CarouselNext variant="ghost" className='md:scale-150 hover:bg-primary disabled:opacity-0 transition-all' />
            </Carousel>
            <div 
                className="my-4 flex items-center justify-center gap-1 max-w-full mx-auto"
                style={{ width: window.innerWidth > 1024 ? `${2 * count}%` : `${5 * count}%` }}
            >
                {Array.from({ length: count }).map((_, index) => (
                    <div 
                        key={index}
                        className={cn(
                            "transition-all duration-500 h-1 max-w-32 min-w-1 rounded-full cursor-pointer",
                            (index + 1) === current 
                                ? "bg-primary"
                                : " bg-primary/30"
                        )}
                        style={{
                            width: calcWidth({index, current, count}) + "%"
                        }}
                        onClick={() => api?.scrollTo(index)}
                    />
                ))}
            </div>
        </div>
    )
}
