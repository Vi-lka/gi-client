import React from 'react'
import NextLink from 'next/link';
import type { LinkProps } from 'next/link';
import type { ComponentProps } from 'react';
import type { UrlObject } from 'url';

type Href = ComponentProps<typeof NextLink>['href'];
type NormalizedLinkProps = LinkProps & {
  locale: string,
  target?:  React.HTMLAttributeAnchorTarget,
  children?: React.ReactNode,
  className?: string,
}

export function isLocalHref(href: Href) {
  if (typeof href === 'object') {
    return href.host == null && href.hostname == null;
  } else {
    const hasProtocol = /^[a-z]+:/i.test(href);
    return !hasProtocol;
  }
}

export function prefixPathname(locale: string, pathname: string) {
  let localizedHref = '/' + locale;
  
  // Avoid trailing slashes
  if (/^\/(\?.*)?$/.test(pathname)) {
    pathname = pathname.slice(1);
  }
  
  localizedHref += pathname;
  
  return localizedHref;
}

export function prefixHref(
  href: UrlObject | string,
  locale: string
): UrlObject | string;
export function prefixHref(href: UrlObject | string, locale: string) {
  let prefixedHref;
  if (typeof href === 'string') {
    prefixedHref = prefixPathname(locale, href);
  } else {
    prefixedHref = {...href};
    if (href.pathname) {
      prefixedHref.pathname = prefixPathname(locale, href.pathname);
    }
  }

  return prefixedHref;
}

export default function Link({href, locale, ...props}: NormalizedLinkProps) {

  const normalizedHref = (isLocalHref(href) && locale) ? prefixHref(href, locale) : href

  return (
    <NextLink locale={locale} href={normalizedHref} {...props}/>
  )
}
