import BlocksRendererStrapi from '@/components/BlocksRendererStrapi'
import { TypographyH2, TypographyH4 } from '@/components/typography'
import { Button } from '@/components/ui/button'
import type { TextGridCompT } from '@/lib/types/components'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

export default function RichTextGrid({
    data,
    headingBig,
    className,
}: {
    data: TextGridCompT,
    headingBig?: boolean,
    className?: string,
}) {
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
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                {data.items.map((item, index) => (
                    <div key={index}>
                        {item.title && (
                            <TypographyH4 className='font-medium text-foreground uppercase mb-3'>
                                {item.title}
                            </TypographyH4>
                        )}
                        <article className="prose prose-p:!my-0 prose-p:text-sm dark:text-muted-foreground prose-headings:text-foreground">
                            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
                            <BlocksRendererStrapi content={item.text} />
                        </article>
                    </div>
                ))}
            </div>
            {(data.buttonLink && data.buttonTitle) && (
                <div className='w-full text-center mt-8 mb-2'>
                <Link href={data.buttonLink} target={'__blank'}>
                    <Button className="w-fit h-fit sm:py-3 py-2 sm:px-12 px-6 uppercase rounded-3xl whitespace-normal">
                        {data.buttonTitle}
                    </Button>
                </Link>
                </div>
            )}
        </div>
    )
}