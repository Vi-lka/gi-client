import { ClientHydration } from '@/components/ClientHydration'
import { BentoGrid, BentoGridItem } from '@/components/ui/aceternity/bento-grid'
import { Skeleton } from '@/components/ui/skeleton'
import type { DepartmentSingleT, DepartmentsT } from '@/lib/types/entities'
import { calcEach, cn, getShortText } from '@/lib/utils'
import { AtSign, ChevronRight, CircleUser, Globe, MapPin } from 'lucide-react'
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
                const hasImage = Boolean(item.attributes.image.data?.attributes.url)
                
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
                        className={cn(
                            isEach ? "lg:col-span-2" : "",
                            hasImage ? "p-4" : "p-8"
                        )}
                    >
                        <Link locale={locale} href={`/structure/${item.attributes.slug}`} className='w-fit'>
                            <h4 className='font-bold md:text-lg text-base mr-2 lg:line-clamp-3 line-clamp-5'>
                                {getShortText(item.attributes.title, 12)}
                            </h4>
                        </Link>
                        <Description item={item} hasImage={hasImage} />
                    </BentoGridItem>
                )
            })}
        </BentoGrid>
    )
}

function Description({ 
    item,
    hasImage,
}: { 
    item: DepartmentSingleT,
    hasImage: boolean
}) {
    if (!(item.attributes.contacts || item.attributes.head.data)) return null

    return (
        <ul className={cn(
            'flex mr-2',
            hasImage 
            ? "flex-wrap gap-x-2 gap-y-1 text-xs text-muted-foreground mt-2" 
            : "flex-col gap-3 text-sm mt-8"
        )}>
        {item.attributes.head.data && (
            <li className={cn('flex items-center font-medium', hasImage ? 'gap-1' : 'gap-2')}>
                <CircleUser className={cn('w-auto', hasImage ? 'h-3' : 'h-4' )} />
                <span className='flex-1'>
                    {item.attributes.head.data.attributes.title}
                </span>
            </li>
        )}
        {item.attributes.contacts?.url && (
            <li className={cn('flex items-center font-medium', hasImage ? 'gap-1' : 'gap-2')}>
                <Globe className={cn('w-auto', hasImage ? 'h-3' : 'h-4' )} />
                <span className='flex-1'>
                    {new URL(item.attributes.contacts.url).hostname}
                </span>
            </li>
        )}
        {item.attributes.contacts?.email && (
            <li className={cn('flex items-center font-medium', hasImage ? 'gap-1' : 'gap-2')}>
                <AtSign className={cn('w-auto', hasImage ? 'h-3' : 'h-4' )} />
                <span className='flex-1'>
                    {item.attributes.contacts.email}
                </span>
            </li>
        )}
        {item.attributes.contacts?.phone && (
            <li className={cn('flex items-center font-medium', hasImage ? 'gap-1' : 'gap-2')}>
                <FiPhone className={cn('w-auto', hasImage ? 'h-3' : 'h-4' )} />
                <span className='flex-1'>
                    {item.attributes.contacts.phone}
                </span>
            </li>
        )}
        {item.attributes.contacts?.location && (
            <li className={cn('flex items-center font-medium', hasImage ? 'gap-1' : 'gap-2')}>
                <MapPin className={cn('w-auto', hasImage ? 'h-3' : 'h-4' )} />
                <span className='flex-1'>
                    {item.attributes.contacts.location}
                </span>
            </li>
        )}
    </ul>
    )
}