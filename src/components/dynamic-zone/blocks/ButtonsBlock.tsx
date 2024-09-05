import DynamicReactIcon from '@/components/DynamicReactIcon'
import { TypographyH2 } from '@/components/typography'
import { Button } from '@/components/ui/button'
import type { ButtonsBlockCompT } from '@/lib/types/components'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

export default function ButtonsBlock({
    data,
    headingBig,
    className,
}: {
    data: ButtonsBlockCompT,
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

            <ul className={cn(
                'flex flex-wrap gap-4 w-full',
                data.alignButtons === "left" && "justify-start",
                data.alignButtons === "right" && "justify-end",
                data.alignButtons === "center" && "justify-center",
                data.alignButtons === "between" && "justify-between",
                data.alignButtons === "around" && "justify-around",
                data.alignButtons === "evenly" && "justify-evenly",
            )}>
                {data.items.map((item, indx) => (
                    <li key={indx} className=''>
                        <Link href={item.link} target='__blank' className='w-fit sm:ml-auto sm:mr-0 ml-auto mr-auto'>
                            <Button className='flex items-center justify-center gap-1.5 font-medium px-10 py-5 rounded-3xl'>
                                {item.icon && (
                                    <DynamicReactIcon icon={item.icon} className="w-auto h-6" />
                                )}
                                <p className='flex-1'>{item.title}</p>
                            </Button>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
