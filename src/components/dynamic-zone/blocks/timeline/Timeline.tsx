import BlocksRendererStrapi from '@/components/BlocksRendererStrapi'
import { TypographyH2, TypographyH3 } from '@/components/typography'
import type { TimelineCompT } from '@/lib/types'
import { cn } from '@/lib/utils'
import React from 'react'
import "./timeline.css";

export default function Timeline({
    data,
    headingBig,
    className,
}: {
    data: TimelineCompT,
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

            {data.subTitle && (
                <TypographyH3 className='uppercase text-foreground font-medium lg:text-[22px] text-xl mb-6 text-center mx-auto'>
                    {data.subTitle}
                </TypographyH3>
            )}

            <ul className='timeline'>
                {data.line.map((item, index) => (
                    <li key={index} data-custom-attribute={index + 1}>
                        <div>
                            {item.title && (
                                <h4 className="whitespace-pre-wrap relative md:top-[-3px] top-[-2px] w-full font-semibold lg:text-lg text-base px-6 py-2 mb-3 text-background bg-primary rounded-3xl">
                                    {item.title}
                                </h4>
                            )}
                            <article 
                                className={cn(
                                    "prose prose-p:!my-0 prose-p:text-sm prose-headings:text-foreground",
                                    item.title ? "px-6" : ""
                                )}
                            >
                                {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
                                <BlocksRendererStrapi content={item.text} />
                            </article>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}