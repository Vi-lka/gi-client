import { ClientHydration } from '@/components/ClientHydration'
import { BentoGrid, BentoGridItem } from '@/components/ui/aceternity/bento-grid'
import { Skeleton } from '@/components/ui/skeleton'
import type { DepartmentSingleT, DepartmentsT } from '@/lib/types/entities'
import { calcEach, cn, getShortText } from '@/lib/utils'
import { AtSign, ChevronRight, Globe, MapPin } from 'lucide-react'
import React from 'react'
import { FiPhone } from 'react-icons/fi'
import BentoImage from './BentoImage'
import MoreButton from '@/components/MoreButton'
import Link from '@/components/Link'

export default function DepartmentsBento({
    locale,
    departments,
}: {
    locale: string,
    departments: DepartmentsT,
}) {
    return (
        <BentoGrid className="mx-auto">
            {departments.data.map((item, i) => {
                const isEach = calcEach(i, 3, 3)
                
                return (
                    <BentoGridItem
                        key={"department-bento" + item.id}
                        header={
                            <ClientHydration fallback={<Skeleton className={cn('w-full min-h-24 rounded-2xl', isEach ? "aspect-[4/1]" : "aspect-[2/1]")}/>}>
                                <BentoImage 
                                    href={`/structure/${item.attributes.slug}`} 
                                    src={item.attributes.image.data?.attributes.url}
                                    alt={item.attributes.title}
                                    className={isEach ? "aspect-[4/1]" : "aspect-[2/1]"}
                                />
                            </ClientHydration>
                        }
                        footer={
                            <div className='w-full flex-auto flex flex-col gap-6 justify-end'>
                                <MoreButton 
                                    href={`/structure/${item.attributes.slug}`}
                                    variant="link"
                                    className='h-6 p-0 text-xs'
                                >
                                    <ChevronRight size={20} />
                                </MoreButton>
                            </div>
                        }
                        className={isEach ? "lg:col-span-2" : ""}
                    >
                        <Link locale={locale} href={`/structure/${item.attributes.slug}`} className='w-fit'>
                            <h4 className='font-bold md:text-lg text-base mb-2 mr-2 lg:line-clamp-3 line-clamp-5'>
                                {getShortText(item.attributes.title, 12)}
                            </h4>
                        </Link>
                        <Description item={item} />
                    </BentoGridItem>
                )
            })}
        </BentoGrid>
    )
}

function Description({ item }: { item: DepartmentSingleT }) {
    if (!item.attributes.contacts) return null

    return (
        <ul className='flex flex-wrap gap-x-2 gap-y-1 mr-2 text-xs text-muted-foreground'>
        {item.attributes.contacts.url && (
            <li className='flex items-center gap-1 font-medium'>
                <Globe className='w-auto h-3' />
                <span className='flex-1'>
                    {new URL(item.attributes.contacts.url).hostname}
                </span>
            </li>
        )}
        {item.attributes.contacts.email && (
            <li className='flex items-center gap-1 font-medium'>
                <AtSign className='w-auto h-3' />
                <span className='flex-1'>
                    {item.attributes.contacts.email}
                </span>
            </li>
        )}
        {item.attributes.contacts.phone && (
            <li className='flex items-center gap-1 font-medium'>
                <FiPhone className='w-auto h-3' />
                <span className='flex-1'>
                    {item.attributes.contacts.phone}
                </span>
            </li>
        )}
        {item.attributes.contacts.location && (
            <li className='flex items-center gap-1 font-medium'>
                <MapPin className='w-auto h-3' />
                <span className='flex-1'>
                    {item.attributes.contacts.location}
                </span>
            </li>
        )}
    </ul>
    )
}