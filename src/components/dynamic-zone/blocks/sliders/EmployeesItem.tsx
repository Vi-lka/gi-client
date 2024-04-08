import ImageComp from '@/components/ImageComp'
import { Card, CardContent } from '@/components/ui/card'
import { CarouselItem } from '@/components/ui/carousel'
import type { EmployeeSingleT } from '@/lib/types'
import { cn } from '@/lib/utils'
import React from 'react'

export default function EmployeesItem({
    arr
}: {
    arr: EmployeeSingleT[]
}) {
    return (
        <CarouselItem className='md:basis-1/2 lg:pl-8 pl-4 grid lg:grid-rows-3 sm:grid-rows-2 grid-rows-1 gap-8'>
            {arr.map(employee => (
                <Card key={"employee" + employee.id} className='h-full border-none shadow-md rounded-3xl'>
                    <CardContent className="w-full h-full flex lg:flex-row flex-col lg:items-center xl:gap-8 gap-6 p-6">
                        <ImageComp 
                            src={employee.attributes.image.data?.attributes.url}
                            alt="Image"
                            fill={false}
                            width={130}
                            height={130}
                            className='object-cover rounded-full aspect-square max-h-32 lg:mx-0 mx-auto'
                        />
            
                        <div className='flex flex-col flex-1 justify-between gap-4 text-primary xl:text-base text-sm'>
                            <div>
                                <p className='font-bold mb-1'>{employee.attributes.title}</p>
                                <p className='font-semibold xl:text-sm text-xs'>{employee.attributes.post}</p>
                            </div>
                            <p>{employee.attributes.description}</p>
                            <div className='inline-flex flex-wrap'>
                                {employee.attributes.hashtags.data.map((hashtag, index) => (
                                    <p key={hashtag.attributes.slug}>
                                        <span className="text-accent cursor-pointer hover:underline transition-all">
                                            #{hashtag.attributes.title}
                                        </span>
                                        <span className={cn(index === employee.attributes.hashtags.data.length - 1 ? "hidden" : "")}>
                                            ,&nbsp;
                                        </span>
                                    </p>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </CarouselItem>
    )
}
