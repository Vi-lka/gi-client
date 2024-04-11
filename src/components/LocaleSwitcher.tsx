"use client"

import * as React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function LocaleSwitcher({
    className,
}: {
    className?: string,
}) {
    const pathname = usePathname();

    const localeCurrent = pathname.split("/")[1];
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className={cn("text-primary text-base uppercase sm:text-sm rounded-xl z-[100]", className)}>
                    {localeCurrent === "ru" ? "ру" : localeCurrent}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-fit rounded-2xl min-w-[50px] z-[100]">
                {/* {locales.map((locale, index) => (
                    <Link
                        key={index}
                        href="/" 
                        locale={locale}
                        className="flex justify-center last:mt-1 w-full aspect-square"
                        scroll={false}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <DropdownMenuItem className={cn(
                            "font-Din w-full justify-center cursor-pointer sm:text-sm text-base uppercase font-normal rounded-xl",
                            locale === localeCurrent ? "bg-primary text-background" : "",
                        )}>
                            {locale === "ru" ? "ру" : locale}
                        </DropdownMenuItem>
                    </Link>
                ))} */}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}