import { ClientHydration } from '@/components/ClientHydration'
import ImageComp from '@/components/ImageComp'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { GraduateSingleT } from '@/lib/types/entities'
import React from 'react'

export default function GraduatesItem({
    graduate
}: {
    graduate: GraduateSingleT,
}) {
    return (
        <Card key={"graduate" + graduate.id} className='h-full group/card border-transparent dark:border-border/20 shadow-md rounded-3xl transition duration-300'>
            <CardContent className="w-full h-full flex lg:flex-row flex-col lg:items-center xl:gap-8 gap-6 p-6">
                <ClientHydration fallback={<Skeleton className='rounded-full aspect-square w-32 lg:mx-0 mx-auto'/>}>
                    <ImageComp 
                        src={graduate.attributes.image.data?.attributes.url}
                        alt="Image"
                        fill={false}
                        width={130}
                        height={130}
                        className='object-cover rounded-full aspect-square max-h-32 lg:mx-0 mx-auto'
                    />
                </ClientHydration>
    
                <div className='flex flex-col flex-1 justify-between gap-6 text-primary xl:text-base text-sm'>
                    <div>
                        <p className='font-bold mb-2'>{graduate.attributes.title}</p>
                        <p className='whitespace-pre-wrap'>{graduate.attributes.description}</p>
                    </div>
                    <p className='dark:text-muted-foreground whitespace-pre-wrap'>{graduate.attributes.additionalInfo}</p>
                </div>
            </CardContent>
        </Card>
    )
}
