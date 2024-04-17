"use client"

import Link from "@/components/Link";
import { NavigationMenuContent, NavigationMenuItem, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import type { ImageT } from "@/lib/types";
import { useSelectedLayoutSegment } from "next/navigation";
import ImageComp from "@/components/ImageComp";

export default function NavMenuItem({
  locale,
  href,
  image,
  description,
  subLinks,
  children,
}: {
  locale: string,
  href: string,
  description?: string | null,
  image?: ImageT,
  subLinks?: {
    title: string | null,
    link: string | null,
    linkDescription?: string | null,
  }[],
  children: React.ReactNode,
}) {
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/';
  const isActive = pathname === href;

  if (subLinks && subLinks.length > 0) return (
    <NavigationMenuItem className='!ml-0'>
      <NavigationMenuTrigger icon={false} className='w-fit h-fit p-0'>
        <Link 
          aria-current={isActive ? 'page' : undefined}
          locale={locale}
          href={href}
          // style={{fontWeight: isActive ? 'bold' : 'normal'}}
          className={cn(
            navigationMenuTriggerStyle(),
            "h-fit lg:text-base text-sm 2xl:py-2 md:py-1 2xl:px-6 md:px-3 uppercase dark:border dark:border-solid dark:border-border"
          )}
        >
          {children}
        </Link>
      </NavigationMenuTrigger>
      <NavigationMenuContent className='flex w-[90%] md:w-full'>
        {image?.data && (
          <div className='relative w-[20%] m-4 mr-0 rounded-xl overflow-hidden'>
            <ImageComp 
              src={image.data.attributes.url}
              alt=''
              fill={false}
              width={400}
              height={400}
              className={cn(
                'object-cover w-full h-full dark:brightness-75',
                description ? "brightness-50 contrast-125" : "",
              )}
            />
            <p className="absolute bottom-0 font-medium text-sm leading-tight text-background dark:text-foreground p-4">
              {description}
            </p>
          </div>
        )}
        <ul className={cn(
          "grid grid-cols-2 gap-3 p-4 w-[80%] h-fit",
          image?.data ? "w-[80%]" : "w-full"
        )}>
          {subLinks.map((item, index) => (
            (item.title && item.link) && 
              <ListItem
                key={index}
                locale={locale}
                href={item.link}
                title={item.title}
                className={cn(
                  navigationMenuTriggerStyle(),
                  "h-fit w-full lg:text-base text-sm 2xl:py-2 md:py-1 2xl:px-6 md:px-3 rounded-lg flex flex-col items-start"
                )}
              >
                {item.linkDescription}
              </ListItem>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
  else return (
    <NavigationMenuItem className='!ml-0'>
      <Link 
        aria-current={isActive ? 'page' : undefined}
        locale={locale}
        href={href}
        // style={{fontWeight: isActive ? 'bold' : 'normal'}}
        className={cn(
          navigationMenuTriggerStyle(),
          "h-fit lg:text-base text-sm 2xl:py-2 md:py-1 2xl:px-6 md:px-3 uppercase dark:border dark:border-solid dark:border-border"
        )}
      >
        {children}
      </Link>
    </NavigationMenuItem>
  )
}

function ListItem({
  locale,
  href,
  title,
  children,
  className
}: {
  locale: string,
  href: string,
  title: string,
  children: React.ReactNode,
  className?: string
}) {
  return (
    <li className='flex w-full'>
      <Link
        locale={locale}
        href={href}
        className={cn(
          "group",
          className
        )}
      >
        <p className="text-base font-medium">{title}</p>
        <p className="w-full text-left line-clamp-3 text-sm leading-snug font-normal text-muted-foreground group-hover:text-background">
          {children}
        </p>
      </Link>
    </li>
  )
}