import { ClientHydration } from '@/components/ClientHydration'
import ImageComp from '@/components/ImageComp'
import Link from '@/components/Link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { NewSingleT } from '@/lib/types/entities'
import { formatDate } from '@/lib/utils'
import { CalendarDays, Clock3 } from 'lucide-react'
import React from 'react'

export default function NewsItem({
    locale,
    item,
    buttonTitle
}: {
    locale: string
    item: NewSingleT,
    buttonTitle: string,
}) {
    const publishedAt = item.attributes.publishedAt
    publishedAt.setTime(publishedAt.getTime() + (7*60*60*1000)) // Kras time

    return (
        <Card key={"new" + item.id} className='min-w-0 shrink-0 grow-0 h-full group/card border-transparent dark:border-border/20 dark:hover:border-border hover:shadow-lg shadow-md rounded-3xl transition duration-300'>
            <CardContent className="w-full h-full flex flex-col xl:gap-8 gap-6 md:justify-normal justify-between p-3">
                <ClientHydration fallback={<Skeleton className='w-full rounded-2xl aspect-[2/1]'/>}>
                    <Link 
                        locale={locale} 
                        href={`/info/news/${item.attributes.slug}`} 
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

                <div className='flex flex-col justify-between gap-3 xl:px-8 px-5 text-primary text-base'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2 dark:text-muted-foreground font-medium'>
                            <CalendarDays className='w-auto h-5' />
                            <p>{formatDate(publishedAt, locale)}</p>
                        </div>

                        <div className='flex items-center gap-1 dark:text-muted-foreground font-medium'>
                            <Clock3 className='w-auto h-5' />
                            <p>{publishedAt.getHours() + ":" + publishedAt.getMinutes()}</p>
                        </div>
                    </div>
                    <div className='md:translate-y-1.5 group-hover/card:translate-y-0 transition duration-300 transform-gpu'>
                        <Link locale={locale} href={`/info/news/${item.attributes.slug}`} className='w-fit'>
                            <p className='font-bold'>{item.attributes.title}</p>
                        </Link>
                    </div>
                </div>

                <Link locale={locale} href={`/info/news/${item.attributes.slug}`} className='w-fit mx-auto mb-3 md:mt-auto'>
                    <Button className='uppercase font-medium px-10 py-5 rounded-3xl'>
                        {buttonTitle}
                    </Button>
                </Link>
            </CardContent>
        </Card>
    ) 
}
