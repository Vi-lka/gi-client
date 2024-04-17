import { ClientHydration } from '@/components/ClientHydration'
import ImageComp from '@/components/ImageComp'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { EmployeeSingleT } from '@/lib/types'
import { cn } from '@/lib/utils'
import React from 'react'

export default function EmployeesItem({
    employee,
}: {
    employee: EmployeeSingleT,
}) {
    return (
        <Card key={"employee" + employee.id} className='h-full border-none shadow-md rounded-3xl'>
            <CardContent className="w-full h-full flex lg:flex-row flex-col lg:items-center xl:gap-8 gap-6 p-6">
                <ClientHydration fallback={<Skeleton className='rounded-full aspect-square max-h-32 lg:mx-0 mx-auto'/>}>
                    <ImageComp 
                        src={employee.attributes.image.data?.attributes.url}
                        alt="Image"
                        fill={false}
                        width={130}
                        height={130}
                        className='object-cover rounded-full aspect-square max-h-32 lg:mx-0 mx-auto'
                    />
                </ClientHydration>
    
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
    )
}
