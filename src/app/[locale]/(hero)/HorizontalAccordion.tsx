"use client"

import React, { useState } from 'react';
import { motion } from "framer-motion";
import MainLogo from './MainLogo';
import About from './About';
import Menu from './Menu';
import { cn } from '@/lib/utils';
import type { HeroAboutT, LinksT, NavBarT } from '@/lib/types';
import { useDictionary } from '@/components/providers/DictionaryProvider';

type Props = {
    aboutData: HeroAboutT | null,
    menuData: {
        navBar: NavBarT | null,
        links: LinksT
    }
}

export default function HorizontalAccordion({ 
    aboutData, 
    menuData 
}: Props) {
    const dict = useDictionary()

    const [selectedItem, setSelectedItem] = useState(0);

    const variantsItems = {
        open: { flexGrow: 1 },
        closed: { flexGrow: 0 },
    }

    const items = [
        {
            id: 0,
            title: dict.Hero.tabs.main,
            color: "bg-apricot",
            children: <MainLogo selectedItem={selectedItem} />
        },
        {
            id: 1,
            title: dict.Hero.tabs.about,
            color: "bg-accent dark:bg-secondary",
            children: aboutData ? <About data={aboutData} selectedItem={selectedItem} /> : null
        },
        {
            id: 2,
            title: dict.Hero.tabs.menu,
            color: "bg-primary",
            children: <Menu data={{ navBar: menuData.navBar, links: menuData.links }} selectedItem={selectedItem} />
        },
    ]

    return (
        <div className='w-full left-0 flex flex-wrap lg:gap-6 gap-1 min-h-[85vh] transition-all'>
            {items.map(item => {
                return (
                <motion.div 
                    key={item.id} 
                    animate={selectedItem === item.id ? "open" : "closed"}
                    variants={variantsItems}
                    style={{
                        cursor: item.id === selectedItem ? "auto" : "pointer",
                    }}
                    className={cn(
                        'relative flex w-fit items-center rounded-2xl text-background overflow-hidden cursor-pointer shadow-inner',
                        selectedItem === item.id ? "w-fit" : "xl:w-[60px] lg:w-[56px] sm:w-[52px] w-[44px]", // firefox width
                        item.id === 0 ? "flex-grow" : "flex-grow-0",
                        item.color
                    )}
                    onClick={() => setSelectedItem(item.id)}
                >
                    <h1 
                        className={cn(
                            'font-Cera font-bold uppercase min-h-[250px] xl:text-3xl lg:text-2xl md:text-xl text-lg sm:p-3 p-2 z-20 rotate-180',
                            item.id === 1 ? "dark:text-foreground" : "dark:text-background"
                        )} 
                        style={{textOrientation: "mixed", writingMode: "vertical-lr", opacity: item.id === 0 ? 0 : 1}}
                    >
                        {item.title}
                    </h1>
                    {item.children}
                </motion.div>
            )}
            )}
        </div>
    )
}
