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
        <Card key={"edu-program" + item.id} className='min-w-0 shrink-0 grow-0 h-full group/card border-transparent dark:border-border/20 dark:hover:border-border hover:shadow-lg shadow-md rounded-3xl transition duration-300'>
            <CardContent className="w-full h-full flex flex-col xl:gap-8 gap-6 md:justify-normal justify-between p-3">
                <ClientHydration fallback={<Skeleton className='w-full rounded-2xl aspect-[2/1]'/>}>
                    <Link 
                        locale={locale} 
                        href={`/admission/${item.attributes.slug}`} 
                        className='relative w-full aspect-[2/1] rounded-2xl overflow-hidden'
                    >
                        <ImageComp
                            src={item.attributes.image.data?.attributes.url}
                            alt={item.attributes.title}
                            fill
                            sizes='(max-width: 1024px) 50vw, (max-width: 640px) 100vw, 33vw'
                            className='object-cover'
                        />
                    </Link>
                </ClientHydration>

                <div className='flex flex-col justify-between gap-3 xl:px-8 px-5 text-primary text-base md:translate-y-1.5 group-hover/card:translate-y-0 transition duration-300 transform-gpu'>
                    <div className='dark:text-muted-foreground'>
                        <p>{item.attributes.mainCode}</p>
                        <p>{item.attributes.mainName}</p>
                    </div>
                    <div>
                        <p>{item.attributes.code}</p>
                        <Link locale={locale} href={`/admission/${item.attributes.slug}`} className='w-fit'>
                            <p className='font-bold'>{item.attributes.title}</p>
                        </Link>
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
