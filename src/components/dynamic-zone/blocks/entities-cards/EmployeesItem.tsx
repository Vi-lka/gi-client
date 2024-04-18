import { ClientHydration } from '@/components/ClientHydration'
import ImageComp from '@/components/ImageComp'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { EmployeeSingleT } from '@/lib/types'
import { AtSign, MapPin } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { FiPhone } from 'react-icons/fi'

export default function EmployeesItem({
    employee,
}: {
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
        <Card key={"employee" + employee.id} className='h-full border-none shadow-md rounded-3xl'>
            <CardContent className="w-full h-full flex lg:flex-row flex-col lg:items-center xl:gap-8 gap-6 p-6">
                <ClientHydration fallback={<Skeleton className='rounded-full aspect-square w-32 lg:mx-0 mx-auto'/>}>
                    <ImageComp 
                        src={employee.attributes.image.data?.attributes.url}
                        alt="Image"
                        fill={false}
                        width={128}
                        height={128}
                        className='object-cover rounded-full aspect-square max-h-32 lg:mx-0 mx-auto'
                    />
                </ClientHydration>
    
                <div className='flex flex-col flex-1 lg:justify-between gap-4 text-primary'>
                    <div>
                        <p className='font-bold text-lg'>{employee.attributes.title}</p>
                        {employee.attributes.meta && (
                            <p className='font-semibold text-sm mt-2'>
                                {post}<span className='font-normal'>{post_between} {degree_rank}</span>
                            </p>
                        )}
                    </div>
                    <p className='text-sm text-foreground dark:text-muted-foreground'>{employee.attributes.description}</p>
                    {(employee.attributes.showContacts && (phone || email || location)) && (
                        <ul className='flex flex-col gap-2 xl:text-sm text-xs'>
                            {phone && (
                                <li className='flex items-center gap-3'>
                                    <FiPhone className='w-4 h-4' />
                                    <Link href={`tel:${phone}`} className='flex-1 hover:underline underline-offset-2'>
                                        {phone}
                                    </Link>
                                </li>
                            )}
                            {email && (
                                <li className='flex items-center gap-3'>
                                    <AtSign className='w-4 h-4' />
                                    <Link href={`mailto:${email}`} className='flex-1 hover:underline underline-offset-2'>
                                        {email}
                                    </Link>
                                </li>
                            )}
                            {location && (
                                <li className='flex items-center gap-3'>
                                    <MapPin className='w-4 h-4' />
                                    <Link 
                                        href={`https://maps.yandex.ru/?text=${location}`} 
                                        target='__blank'
                                        className='flex-1 hover:underline underline-offset-2'
                                    >
                                      {location}
                                    </Link>
                                </li>
                            )}
                        </ul>
                    )}
                    {employee.attributes.showHashtags && (
                        <ul className='inline-flex flex-wrap gap-2'>
                            {employee.attributes.hashtags.data.map(hashtag => (
                                <li key={hashtag.attributes.slug} className='text-sm'>
                                    <Badge className='hover:bg-transparent hover:text-accent dark:bg-accent dark:text-primary dark:hover:bg-primary dark:hover:text-accent border border-border cursor-pointer transition-all'>
                                        #{hashtag.attributes.title}
                                    </Badge>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
