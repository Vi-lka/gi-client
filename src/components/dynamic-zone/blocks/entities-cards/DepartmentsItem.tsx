import { ClientHydration } from '@/components/ClientHydration'
import ImageComp from '@/components/ImageComp'
import Link from '@/components/Link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { DepartmentSingleT } from '@/lib/types/entities'
import { getShortText } from '@/lib/utils'
import React from 'react'

export default function DepartmentsItem({
    locale,
    item,
    dict
}: {
    locale: string
    item: DepartmentSingleT,
    dict: Dictionary,
}) {
    return (
        <Card key={"department" + item.id} className='min-w-0 h-full border-none shadow-md rounded-3xl'>
            <CardContent className="w-full h-full flex lg:flex-row flex-col xl:gap-8 gap-6 justify-between p-3">
                <ClientHydration fallback={<Skeleton className='lg:w-[45%] w-full rounded-2xl lg:aspect-[5/3] aspect-[3/1]'/>}>
                    <Link 
                        locale={locale} 
                        href={`/structure/departments/${item.attributes.slug}`} 
                        className='relative lg:w-[45%] w-full lg:aspect-[5/3] aspect-[3/1] rounded-2xl overflow-hidden hover:ring-2 dark:hover:ring-1 ring-ring ring-offset-1 ring-offset-card transition-all duration-300'
                    >
                        <ImageComp
                            src={item.attributes.image.data?.attributes.url}
                            alt={item.attributes.title}
                            fill
                            sizes='(max-width: 1024px) 100vw, 20vw'
                            className='object-cover'
                        />
                    </Link>
                </ClientHydration>
                
                <div className='flex-1 lg:w-[55%] w-full flex flex-col gap-6 justify-between text-primary'>
                    <h4 className='xl:text-xl lg:text-lg sm:text-xl text-lg font-bold line-clamp-5'>
                        {getShortText(item.attributes.title, 12)}
                    </h4>

                    <div className='w-full flex flex-col gap-6 justify-end'>
                        <Link locale={locale} href={`/structure/departments/${item.attributes.slug}`} className='w-fit sm:ml-auto sm:mr-0 ml-auto mr-auto'>
                            <Button className='uppercase font-medium px-10 py-5 rounded-3xl'>
                                {dict.Buttons.more}
                            </Button>
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card> 
    )
}
