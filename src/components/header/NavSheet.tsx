"use client"

import React from 'react'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '../ui/sheet'
import { NavigationMenu, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '../ui/navigation-menu'
import { ScrollArea } from '../ui/scroll-area'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { TbMenuDeep } from "react-icons/tb";

export default function NavSheet({
  className
}: {
  className?: string
}) {

  return (
    <Sheet>
      <SheetTrigger>
        <TbMenuDeep className={cn("h-[2.5rem] w-[2.5rem]", className)} />
      </SheetTrigger>

      <SheetContent>
        <NavigationMenu orientation="vertical" className="mx-auto">
          <NavigationMenuList className="flex flex-col items-center">
            <ScrollArea className="font-Raleway mt-[2vh] h-[90vh] w-full p-1">
              <SheetMenuItem url='/info'>Сведения</SheetMenuItem>
              <SheetMenuItem url='/structure'>Структура</SheetMenuItem>
              <SheetMenuItem url='/education'>Обучение</SheetMenuItem>
              <SheetMenuItem url='/entrance'>Поступление</SheetMenuItem>
              <SheetMenuItem url='/dpo'>Курсы ДПО</SheetMenuItem>
              <SheetMenuItem url='/science'>Наука</SheetMenuItem>
              <SheetMenuItem url='/projects'>Проекты</SheetMenuItem>
              <SheetMenuItem url='/journals'>Журналы</SheetMenuItem>
            </ScrollArea>
          </NavigationMenuList>
        </NavigationMenu>
      </SheetContent>
    </Sheet>
  )
}


function SheetMenuItem({
  children,
  url,
  blank = false,
}: {
  children: React.ReactNode,
  url: string,
  blank?: boolean,
}) {
const pathName = usePathname();

// Remove query parameters
const pathWithoutQuery = pathName.split("?")[0];

// Ex:"/my/nested/path" --> ["my", "nested", "path"]
const pathNestedRoutes = pathWithoutQuery
  .split("/")
  .filter((v) => v.length > 0);

// Remove locale
const pathCurrentPage = (pathNestedRoutes[pathNestedRoutes.length - 1] === undefined) ? "/" : pathNestedRoutes[pathNestedRoutes.length - 1];

  return (
    <div className="mb-1 mt-3 flex w-full gap-1 py-2">
      <ul className="flex flex-col justify-center w-full">
          <li>
            <Link href={url} legacyBehavior passHref>
              <NavigationMenuLink
                active={('/' + pathCurrentPage) === url}
                className={cn(
                  navigationMenuTriggerStyle(),
                  "w-full h-fit"
                )}
                target={blank ? "_blank" : "_self"}
              >
                <SheetClose className="px-3 py-2 text-base text-left w-full h-full uppercase">
                    {children}
                </SheetClose>
              </NavigationMenuLink>
            </Link>
          </li>
      </ul>
    </div>
  );
}
