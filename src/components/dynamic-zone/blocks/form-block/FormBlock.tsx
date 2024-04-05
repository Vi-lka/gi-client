import DynamicReactIcon from '@/components/DynamicReactIcon'
import IconCustom from '@/components/IconCustom'
import ContactForm from '@/components/forms/ContactForm'
import { TypographyH2 } from '@/components/typography'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import type { FormBlockCompT, FormBlockItemT } from '@/lib/types'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function FormBlock({
    data,
    headingBig,
    className,
}: {
    data: FormBlockCompT,
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

            <div className='flex relative min-h-[300px] lg:flex-row flex-col items-center lg:gap-6 gap-12 xl:p-16 lg:p-12 p-8 rounded-3xl overflow-hidden' style={{backgroundColor: data.color ? data.color : "hsl(var(--primary))"}}>
                {data.image.data && (
                    <Image 
                        src={data.image.data.attributes.url}
                        alt=''
                        fill
                        sizes='90vw'
                        className='object-cover z-0'
                    />
                )}
                <ul className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-8 xl:gap-y-14 gap-6 items-center text-background lg:w-4/5 w-full z-10">
                    {data.list.map((item, index) => (
                        <li key={index} className='flex items-center gap-3'>
                            <FormBlockIcon item={item} className='min-w-8' />
                            <p className='flex-1 font-semibold 2xl:text-2xl xl:text-xl text-lg break-words'>
                                {item.title}
                            </p>
                        </li>
                    ))}
                </ul>
                {data.buttonTitle 
                    ? data.buttonLink && data.buttonLink.length > 1
                        ? (
                            <Link href={data.buttonLink} target={data.inNewTab ? "_blank" : "_self"} passHref className='lg:w-1/5 w-full'>
                                <Button className='w-full p-6 uppercase rounded-3xl text-primary bg-background border hover:border-background hover:text-background z-10'>
                                    {data.buttonTitle}
                                </Button>
                            </Link>
                        )
                        : (
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className='lg:w-1/5 w-full p-6 uppercase rounded-3xl text-primary bg-background border hover:border-background hover:text-background z-10'>
                                        {data.buttonTitle}
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className=' !rounded-3xl md:p-8'>
                                    <DialogHeader className='mb-1'>
                                        <DialogTitle>{data.formTitle}</DialogTitle>
                                        <DialogDescription>{data.formDescription}</DialogDescription>
                                    </DialogHeader>
                                    <ContactForm dialog />
                                </DialogContent>
                            </Dialog>
                        )
                    : null
                }
            </div>
        </div>
    )
}


function FormBlockIcon({
    item,
    className
}: {
    item: FormBlockItemT,
    className?: string
}) {
            if (item.iconCustom) return <IconCustom icon={item.iconCustom} className={cn('w-fit h-12 filter-background', className)} />
            else if (item.iconReact) return <DynamicReactIcon icon={item.iconReact} className={cn("w-fit h-12 text-background", className)} />
            else if (item.image.data) return (
                <Image
                    src={item.image.data.attributes.url}
                    alt=''
                    width={48}
                    height={48}
                    className={cn('h-12 aspect-square object-cover', className)}
                />
            )
            else return null
}
