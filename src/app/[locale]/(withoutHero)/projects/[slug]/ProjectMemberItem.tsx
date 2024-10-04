import { ClientHydration } from '@/components/ClientHydration'
import ImageComp from '@/components/ImageComp'
import Link from '@/components/Link'
import MoreButton from '@/components/MoreButton'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { ProjectMember } from '@/lib/types/pages'
import { ChevronRight } from 'lucide-react'
import React from 'react'

export default function ProjectMemberItem({
    locale,
    data,
}: {
    locale: string,
    data: ProjectMember,
}) {
    if (data.member.data === null) return null

    return (
      <Card className='h-full group/card border-transparent dark:border-border/20 dark:hover:border-border hover:shadow-lg shadow-md rounded-3xl transition duration-300'>
        <CardContent className="relative w-full h-full flex lg:flex-row flex-col lg:items-center xl:gap-8 gap-6 xl:px-8 p-6 overflow-hidden">
          <ClientHydration fallback={<Skeleton className='rounded-full aspect-square w-32 lg:mx-0 mx-auto'/>}>
            <Link locale={locale} href={`/structure/employees/${data.member.data.attributes.slug}`} target='__blank'>
                <ImageComp 
                    src={data.member.data.attributes.image.data?.attributes.url}
                    alt="Image"
                    fill={false}
                    width={128}
                    height={128}
                    className='object-cover rounded-full aspect-square max-h-32 lg:mx-0 mx-auto'
                />
            </Link>
          </ClientHydration>

            <div className='h-full flex flex-col flex-1 lg:justify-center gap-4 text-primary'>
              <div className='lg:mt-auto lg:pt-3'>
                <Link locale={locale} href={`/structure/employees/${data.member.data.attributes.slug}`} className='w-fit' target='__blank'>
                  <h4 className='text-lg font-bold line-clamp-5 md:translate-y-1.5 group-hover/card:translate-y-0 transition duration-300 transform-gpu'>
                    {data.member.data.attributes.title}
                  </h4>
                </Link>
              </div>   
              {data.description && (
                <p className='text-sm text-foreground dark:text-muted-foreground lg:line-clamp-3 line-clamp-5 whitespace-pre-wrap'>
                  {data.description}
                </p>
              )}
              <div className='w-full flex mt-auto'>
                <MoreButton 
                  href={`/structure/employees/${data.member.data.attributes.slug}`}
                  target='__blank'
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
