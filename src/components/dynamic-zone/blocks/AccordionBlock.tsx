import BlocksRendererStrapi from '@/components/BlocksRendererStrapi'
import { TypographyH2 } from '@/components/typography'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import type { AccordionCompT } from '@/lib/types'
import { cn } from '@/lib/utils'
import React from 'react'

export default function AccordionBlock({
    data,
    headingBig,
    className,
}: {
    data: AccordionCompT,
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

            <Accordion defaultValue={["item-0"]} type="multiple" className="w-full">
                {data.items.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="lg:w-2/3 md:w-4/5 w-full">
                        <AccordionTrigger className="w-full flex-row-reverse justify-end gap-3 text-left font-semibold lg:text-lg text-base">
                            {item.title}
                        </AccordionTrigger>
                        <AccordionContent className="mx-9">
                            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
                            <BlocksRendererStrapi content={item.text} />
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}
