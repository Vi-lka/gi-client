import BlocksRendererStrapi from '@/components/BlocksRendererStrapi'
import { ClientHydration } from '@/components/ClientHydration'
import DynamicReactIcon from '@/components/DynamicReactIcon'
import ImageComp from '@/components/ImageComp'
import { TypographyH2 } from '@/components/typography'
import { BentoGrid, BentoGridItem } from '@/components/ui/aceternity/bento-grid'
import { Skeleton } from '@/components/ui/skeleton'
import type { BentoGridCompT } from '@/lib/types/components'
import { calcBento, cn, getShortText } from '@/lib/utils'
import React from 'react'

export default function BentoGridBlock({
    data,
    headingBig,
    className,
}: {
    data: BentoGridCompT,
    headingBig?: boolean,
    className?: string,
})  {
    return (
        <div className={cn("w-full", className)}>
            {data.title && (
                <TypographyH2 
                    className={cn(
                        'font-semibold text-primary mb-8 border-none',
                        headingBig ? "text-4xl lg:text-5xl" : ""
                    )}
                >
                    {data.title}
                </TypographyH2>
            )}

            <BentoGrid className='lg:auto-rows-auto'>
                {data.items.map((item, index) => {
                    const isEach = calcBento(index, data.items.length)
                    const hasImage = Boolean(item.image.data?.attributes.url)

                    return (
                        <BentoGridItem
                            key={"bento-grid-item-" + index}
                            header={
                                hasImage ? (
                                    <ClientHydration fallback={<Skeleton className={cn('w-full min-h-24 rounded-2xl', isEach ? "aspect-[4/1]" : "aspect-[2/1]")}/>}>
                                        <BentoImage 
                                            src={item.image.data?.attributes.url}
                                            alt={item.title}
                                            className={isEach ? "aspect-[4/1]" : "aspect-[2/1]"}
                                        />
                                    </ClientHydration>
                                )
                                : null
                            }
                            icon={
                                item.iconReact 
                                ? <DynamicReactIcon icon={item.iconReact} className="w-auto h-8 text-apricot mb-2" />
                                : null
                            }
                            className={cn(
                                "lg:min-h-60 bg-primary dark:bg-card text-background dark:text-foreground",
                                isEach ? "lg:col-span-2" : "",
                                hasImage ? "p-4" : "p-8"
                            )}
                        >
                            <h4 className='font-bold md:text-lg text-base mr-4 lg:line-clamp-3 line-clamp-5'>
                                {getShortText(item.title, 12)}
                            </h4>
                            <div className='flex items-end'>
                                <article className="prose prose-p:!my-0 prose-p:text-sm text-background dark:text-muted-foreground prose-headings:text-background">
                                    {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
                                    <BlocksRendererStrapi content={item.textDescription} />
                                </article>
                            </div>
                        </BentoGridItem>
                    )
                })}
            </BentoGrid>
        </div>
    )
}

function BentoImage({
    src,
    alt,
    className,
}: {
    src: string | undefined,
    alt: string,
    className?:string,
}) {

    if (!src) return null
    
    return (
        <div className={cn(
            'relative w-full min-h-24 rounded-2xl overflow-hidden',
            className
        )}>
            <ImageComp
                src={src}
                alt={alt}
                fill
                sizes='(max-width: 1024px) 100vw, 70vw'
                className='object-cover'
            />
        </div>
    )
}