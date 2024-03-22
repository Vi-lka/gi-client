"use client"

import React from 'react'
import type { CarouselApi} from './ui/carousel';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Card, CardContent } from './ui/card'
import { cn } from '@/lib/utils';
import Image from "next/image"
import Link from 'next/link';
import { Button } from './ui/button';

export default function CarouselComp({
    hrefTo,
    data
}: {
    hrefTo: string,
    data: {
        id: number;
        image: string;
        mainCode: string;
        mainName: string;
        subCode: string;
        subName: string;
    }[]
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
                opts={{ skipSnaps: typeof window !== "undefined" && window.innerWidth < 640 ? false : true }} 
                className="w-full"
            >
                <CarouselContent className='lg:-ml-8 -ml-4'>
                    {data.map(item => (
                        <CarouselItem key={item.id} className='lg:basis-1/3 sm:basis-1/2 lg:pl-8 pl-4'>
                            <Card className='h-full border-none shadow-md rounded-2xl'>
                                <CardContent className="w-full h-full flex flex-col xl:gap-8 gap-6 md:justify-normal justify-between p-3">
                                    <Image 
                                        src={item.image}
                                        alt="Image"
                                        width={400}
                                        height={140}
                                        className='w-full object-cover rounded-xl h-[30%]'
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


                                    <Link href={`/${hrefTo}/${item.id}`} className='w-fit mx-auto mb-3 md:mt-auto'>
                                        <Button className='uppercase font-medium px-10 py-5 rounded-full hover:bg-background hover:text-accent'>
                                            Подробнее
                                        </Button>
                                    </Link>
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
        </div>
    )
}
