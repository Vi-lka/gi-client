import { ClientHydration } from '@/components/ClientHydration'
import ImageComp from '@/components/ImageComp'
import Link from '@/components/Link'
import MoreButton from '@/components/MoreButton'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { EmployeeSingleT } from '@/lib/types/entities'
import { getShortText } from '@/lib/utils'
import { AtSign, ChevronRight, MapPin } from 'lucide-react'
import NextLink from 'next/link'
import React from 'react'
import { FiPhone } from 'react-icons/fi'

export default function EmployeesItem({
    locale,
    employee,
}: {
    locale: string,
    employee: EmployeeSingleT,
}) {

    const post = employee.attributes.meta?.post
    const degreeShort = employee.attributes.meta?.degreeShort ? employee.attributes.meta.degreeShort : ""
    const rankShort = employee.attributes.meta?.rankShort ? employee.attributes.meta.rankShort : ""

    const degree_rank_between = employee.attributes.meta && degreeShort.length > 0 && rankShort.length > 0 ? ", " : ""
    const degree_rank = employee.attributes.meta
        ? degreeShort + degree_rank_between +  rankShort
        : null

    const post_between = post && (degreeShort.length > 0 || rankShort.length > 0) ? ", " : ""

    const phone = employee.attributes.phone
    const email = employee.attributes.email
    const location = employee.attributes.location

    return (
        <Card key={"employee" + employee.id} className='h-full group/card border-transparent dark:border-border/20 dark:hover:border-border hover:shadow-lg shadow-md rounded-3xl transition duration-300'>
            <CardContent className="relative w-full h-full flex lg:flex-row flex-col lg:items-center xl:gap-8 gap-6 p-6 lg:pb-6 pb-14 overflow-hidden">
                <ClientHydration fallback={<Skeleton className='rounded-full aspect-square w-32 lg:mx-0 mx-auto'/>}>
                    <Link locale={locale} href={`/structure/employees/${employee.attributes.slug}`}>
                        <ImageComp 
                            src={employee.attributes.image.data?.attributes.url}
                            alt="Image"
                            fill={false}
                            width={128}
                            height={128}
                            className='object-cover rounded-full aspect-square max-h-32 lg:mx-0 mx-auto'
                        />
                    </Link>
                </ClientHydration>
    
                <div className='flex flex-col flex-1 lg:justify-between gap-4 text-primary'>
                    <div>
                        <Link locale={locale} href={`/structure/employees/${employee.attributes.slug}`} className='w-fit'>
                            <h4 className='text-lg font-bold line-clamp-5 md:translate-y-1.5 group-hover/card:translate-y-0 transition duration-300 transform-gpu'>
                                {employee.attributes.title}
                            </h4>
                        </Link>
                        {employee.attributes.meta && (
                            <p className='font-normal text-sm mt-2 md:translate-y-1 group-hover/card:translate-y-0 transition duration-300 transform-gpu'>
                                {post}<span className='font-normal'>{post_between} {degree_rank}</span>
                            </p>
                        )}
                    </div>

                    {employee.attributes.description && (
                        <p className='text-sm text-foreground dark:text-muted-foreground lg:line-clamp-3 line-clamp-5'>
                            {getShortText(employee.attributes.description)}
                        </p>
                    )}

                    {(employee.attributes.showContacts && (phone || email || location)) && (
                        <ul className='flex flex-col gap-2 xl:text-sm text-xs'>
                            {phone && (
                                <li className='flex items-center gap-2'>
                                    <FiPhone className='w-4 h-4' />
                                    <NextLink 
                                        href={`tel:${phone}`} 
                                        className='flex-1 hover:underline underline-offset-2 group-hover/card:translate-x-0.5 transition transform-gpu duration-300'
                                    >
                                        {phone}
                                    </NextLink>
                                </li>
                            )}
                            {email && (
                                <li className='flex items-center gap-2'>
                                    <AtSign className='w-4 h-4' />
                                    <NextLink 
                                        href={`mailto:${email}`} 
                                        className='flex-1 hover:underline underline-offset-2 group-hover/card:translate-x-0.5 transition transform-gpu duration-300'
                                    >
                                        {email}
                                    </NextLink>
                                </li>
                            )}
                            {location && (
                                <li className='flex items-center gap-2'>
                                    <MapPin className='w-4 h-4' />
                                    <NextLink 
                                        href={`https://maps.yandex.ru/?text=${location}`} 
                                        target='__blank'
                                        className='flex-1 hover:underline underline-offset-2 group-hover/card:translate-x-0.5 transition transform-gpu duration-300'
                                    >
                                      {location}
                                    </NextLink>
                                </li>
                            )}
                        </ul>
                    )}
                    {employee.attributes.showHashtags && (
                        <ul className='inline-flex flex-wrap gap-2'>
                            {employee.attributes.hashtags.data.map(hashtag => (
                                <li key={hashtag.attributes.slug} className='text-sm'>
                                    <Badge className='hover:bg-transparent hover:text-primary dark:bg-accent dark:text-primary dark:hover:bg-transparent border border-border cursor-pointer transition-all'>
                                        #{hashtag.attributes.title}
                                    </Badge>
                                </li>
                            ))}
                        </ul>
                    )}
                    <div className='absolute lg:hidden block bottom-4 left-1/2 transform -translate-x-1/2'>
                        <MoreButton 
                            href={`/structure/employees/${employee.attributes.slug}`}
                            variant="link"
                            className='h-6 p-0 text-xs'
                        >
                            <ChevronRight size={20} />
                        </MoreButton>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
