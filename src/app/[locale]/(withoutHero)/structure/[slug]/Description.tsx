import BlocksRendererStrapi from '@/components/BlocksRendererStrapi';
import { TypographyH3 } from '@/components/typography';
import { AtSign, Globe, MapPin } from 'lucide-react';
import React from 'react'
import NextLink from "next/link";
import { FiPhone } from 'react-icons/fi';

export default function Description({
  description,
  contacts,
  contactsTitle
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  description: any,
  contacts: {
    url: string | null;
    email: string | null;
    phone: string | null;
    location: string | null;
  } | null,
  contactsTitle: string
}) {
  return (
    <div className='flex lg:flex-row flex-col gap-6'>
      {description && (
        <div className='lg:w-1/2 w-full'>
          {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
          <BlocksRendererStrapi content={description} />
        </div>
      )}
      {contacts && (
        <div className='lg:w-1/2 w-full h-fit flex flex-col justify-center bg-primary dark:bg-accent text-background dark:text-foreground sm:px-12 px-8 sm:py-10 py-8 rounded-3xl'>
          <TypographyH3 className='text-background dark:text-foreground mb-6'>
            {contactsTitle}
          </TypographyH3>
          <ul className='flex flex-col gap-3 justify-center'>
            {contacts.url && (
              <li className='flex items-center gap-2 font-medium'>
                <Globe className='w-auto h-5 ' />
                <NextLink 
                  href={contacts.url}
                  target='__blank'
                  className='flex-1 hover:underline underline-offset-2'
                >
                  {new URL(contacts.url).hostname}
                </NextLink>
              </li>
            )}
            {contacts.email && (
              <li className='flex items-center gap-2 font-medium'>
                <AtSign className='w-auto h-5 ' />
                <NextLink 
                  href={`mailto:${contacts.phone}`} 
                  className='flex-1 hover:underline underline-offset-2'
                >
                  {contacts.email}
                </NextLink>
              </li>
            )}
            {contacts.phone && (
              <li className='flex items-center gap-2 font-medium'>
                <FiPhone className='w-auto h-5 ' />
                <NextLink 
                  href={`tel:${contacts.phone}`} 
                  className='flex-1 hover:underline underline-offset-2'
                >
                  {contacts.phone}
                </NextLink>
              </li>
            )}
            {contacts.location && (
              <li className='flex items-center gap-2 font-medium'>
                <MapPin className='w-auto h-5 ' />
                <NextLink 
                  href={`https://maps.yandex.ru/?text=${contacts.location}`} 
                  target='__blank'
                  className='flex-1 hover:underline underline-offset-2'
                >
                  {contacts.location}
                </NextLink>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
