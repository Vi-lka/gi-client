import ImageComp from '@/components/ImageComp'
import { Card, CardContent } from '@/components/ui/card'
import type { GraduateSingleT } from '@/lib/types'
import React from 'react'

export default function GraduatesItem({
    graduate
}: {
    graduate: GraduateSingleT,
}) {
    return (
        <Card key={graduate.id} className='h-full border-none shadow-md rounded-3xl'>
            <CardContent className="w-full h-full flex lg:flex-row flex-col lg:items-center xl:gap-8 gap-6 p-6">
                <ImageComp 
                    src={graduate.attributes.image.data?.attributes.url}
                    alt="Image"
                    fill={false}
                    width={130}
                    height={130}
                    className='object-cover rounded-full aspect-square max-h-32 lg:mx-0 mx-auto'
                />
    
                <div className='flex flex-col flex-1 justify-between gap-6 text-primary xl:text-base text-sm'>
                    <div>
                        <p className='font-bold mb-1'>{graduate.attributes.title}</p>
                        <p>{graduate.attributes.description}</p>
                    </div>
                    <p className='dark:text-muted-foreground'>{graduate.attributes.additionalInfo}</p>
                </div>
            </CardContent>
        </Card>
    )
}
