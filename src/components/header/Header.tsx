import React from 'react'
import HeaderClient from './HeaderClient'
import { headers } from 'next/headers';
import ErrorHandler from '../errors/ErrorHandler';
import { getLinks, getNavBar } from '@/lib/queries/additional';

export default async function Header() {

  const headersList = headers();
  const header_locale = headersList.get('x-locale') || "";

  const [ 
    navBarResult,
    linksResult 
  ] = await Promise.allSettled([
    getNavBar(header_locale),
    getLinks(header_locale) 
  ]);
  if (linksResult.status === "rejected") return (
    <ErrorHandler 
      error={linksResult.reason as unknown} 
      place="Links"
      notFound={false}
    />
  )

  return (
    <HeaderClient navBar={navBarResult.status !== "rejected" ? navBarResult.value : null} links={linksResult.value} />
  )
}
