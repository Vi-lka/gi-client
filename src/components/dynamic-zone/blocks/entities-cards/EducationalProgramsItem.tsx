import { ClientHydration } from '@/components/ClientHydration'
import ImageComp from '@/components/ImageComp'
import Link from '@/components/Link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { EducationalProgramSingleT } from '@/lib/types/entities'
import React from 'react'

export default function EducationalProgramsItem({
    locale,
    item,
    buttonTitle
}: {
    locale: string
    item: EducationalProgramSingleT,
    buttonTitle: string,
}) {
    return (
        <Card key={"edu-program" + item.id} className='min-w-0 shrink-0 grow-0 h-full border-none shadow-md rounded-3xl'>
            <CardContent className="w-full h-full flex flex-col xl:gap-8 gap-6 md:justify-normal justify-between p-3">
                <ClientHydration fallback={<Skeleton className='w-full rounded-2xl aspect-[2/1]'/>}>
                    <ImageComp
                        src={item.attributes.image.data?.attributes.url}
                        alt={item.attributes.title}
                        fill={false}
                        width={400}
                        height={150}
                        className='w-full object-cover rounded-2xl aspect-[2/1]'
                    />
                </ClientHydration>

                <div className='flex flex-col justify-between gap-3 xl:px-8 px-5 text-primary text-base'>
                    <div className='dark:text-muted-foreground'>
                        <p>{item.attributes.mainCode}</p>
                        <p>{item.attributes.mainName}</p>
                    </div>
                    <div>
                        <p>{item.attributes.code}</p>
                        <p className='font-bold'>{item.attributes.title}</p>
                    </div>
                </div>

                <Link locale={locale} href={`/admission/${item.attributes.slug}`} className='w-fit mx-auto mb-3 md:mt-auto'>
                    <Button className='uppercase font-medium px-10 py-5 rounded-3xl'>
                        {buttonTitle}
                    </Button>
                </Link>
            </CardContent>
        </Card>
    ) 
}
