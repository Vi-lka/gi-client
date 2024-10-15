import React from 'react'
import HighlightText from './HighlightText'
import { Separator } from '@/components/ui/separator'
import Link from '@/components/Link'
import { ChevronRight } from 'lucide-react'

export function FindedElement({
  locale,
  text,
  href,
  searchTerm,
  count,
  separator
}: {
  locale: string,
  text: (string | null)[],
  href: string,
  searchTerm: string,
  count: number,
  separator?: boolean
}) {
  return (
    <div className='space-y-4'>
      {text.map((item, indx) => {
        if ((text.length > 1) || (count > 1)) {
          if (indx+1 !== text.length) return (
            <TextLink key={indx} locale={locale} href={href} text={item} searchTerm={searchTerm} separator />
          ) 
          else return (
            <TextLink key={indx} locale={locale} href={href} text={item} searchTerm={searchTerm} />
          )
        } else return (
          <TextLink key={indx} locale={locale} text={item} searchTerm={searchTerm} />
        )
      })}
      {separator && <Separator />}
    </div>
  )
}

function TextLink({
  locale,
  href,
  text,
  searchTerm,
  separator
}: {
  locale: string,
  href?: string,
  text: string | null,
  searchTerm: string,
  separator?: boolean,
}) {

  if (!href) return (
    <span className='block space-y-4'>
        <HighlightText text={text} highlight={searchTerm} className='block'/>
      {separator && <Separator />}
    </span>
  )

  return (
    <span className='block group/element space-y-4'>
      <Link locale={locale} href={href} className='relative flex overflow-hidden'>
        <ChevronRight size={25} className='absolute -left-7 group-hover/element:translate-x-4 transition duration-200 transform-gpu' />
        <HighlightText text={text} highlight={searchTerm} className='block group-hover/element:translate-x-2 transition duration-300 transform-gpu' />
      </Link>
      {separator && <Separator />}
    </span>
  )
}
