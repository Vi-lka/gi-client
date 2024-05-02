import React from 'react'
import { FiPhone } from 'react-icons/fi'
import NextLink from "next/link"
import { AtSign, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TypographyH3 } from '@/components/typography'

export default function Contacts({
    phone,
    email,
    location,
    contactsTitle,
    className
}: {
    phone: string | null,
    email: string | null,
    location: string | null,
    contactsTitle: string;
    className?: string,
}) {

    if (!(phone || email || location)) return null

    return (
        <div className='w-fit h-fit flex flex-col justify-center bg-primary dark:bg-accent text-background dark:text-foreground sm:px-12 px-8 sm:py-8 py-6 rounded-3xl'>
            <TypographyH3 className='text-background dark:text-foreground mb-4'>
              {contactsTitle}
            </TypographyH3>
            <ul className={cn(
                'w-fit flex flex-col gap-3 justify-center lg:text-base text-sm font-medium',
                className
            )}>
                {phone && (
                    <li className='flex items-center gap-2'>
                        <FiPhone className='w-5 h-5' />
                        <NextLink 
                            href={`tel:${phone}`} 
                            className='flex-1 hover:underline underline-offset-2 hover:underline-offset-4 transition-all'
                        >
                            {phone}
                        </NextLink>
                    </li>
                )}
                {email && (
                    <li className='flex items-center gap-2'>
                        <AtSign className='w-5 h-5' />
                        <NextLink 
                            href={`mailto:${email}`} 
                            className='flex-1 hover:underline underline-offset-2 hover:underline-offset-4 transition-all'
                        >
                            {email}
                        </NextLink>
                    </li>
                )}
                {location && (
                    <li className='flex items-center gap-2'>
                        <MapPin className='w-5 h-5' />
                        <NextLink 
                            href={`https://maps.yandex.ru/?text=${location}`} 
                            target='__blank'
                            className='flex-1 hover:underline underline-offset-2 hover:underline-offset-4 transition-all'
                        >
                          {location}
                        </NextLink>
                    </li>
                )}
            </ul>
        </div>
    )
}
