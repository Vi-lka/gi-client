"use client"

import React from 'react'
import type { CarouselApi } from './ui/carousel';
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from './ui/carousel'
import { calcWidth, cn } from '@/lib/utils';

export default function CarouselComp({
    children,
    className,
    classNameContainer
}: {
    children: React.ReactNode,
    className?: string
    classNameContainer?: string
}) {
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

    return (
        <div className={classNameContainer}>
            <Carousel 
                setApi={setApi} 
                opts={{ skipSnaps: typeof window !== "undefined" && window.innerWidth < 640 ? false : true }} 
                className="w-full"
            >
                <CarouselContent className={className}>
                    {children}
                </CarouselContent>
                <CarouselPrevious variant="ghost" className='md:scale-150 hover:bg-primary dark:hover:text-background disabled:opacity-0 transition-all' />
                <CarouselNext variant="ghost" className='md:scale-150 hover:bg-primary dark:hover:text-background disabled:opacity-0 transition-all' />
            </Carousel>
            {count > 1 && (
                <div 
                    className="my-4 flex items-center justify-center gap-1 max-w-full mx-auto"
                    style={{ width: typeof window !== "undefined" && window.innerWidth > 1024 ? `${2 * count}%` : `${5 * count}%` }}
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
            )}
        </div>
    )
}
