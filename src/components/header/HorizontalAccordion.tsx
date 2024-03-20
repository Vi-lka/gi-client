"use client"

import React, { useState } from 'react';
import { motion } from "framer-motion";
import MainLogo from './MainLogo';
import About from './About';

export default function HorizontalAccordion() {

    const [selectedItem, setSelectedItem] = useState(0);

    const variantsItems = {
        open: { flexGrow: 1 },
        closed: { flexGrow: 0 },
    }

    const items = [
        {
            id: 0,
            title: "Главная",
            color: "hsl(var(--apricot))",
            children: <MainLogo selectedItem={selectedItem} />
        },
        {
            id: 1,
            title: "Об институте",
            color: "hsl(var(--accent))",
            children: <About selectedItem={selectedItem} />
        },
        {
            id: 2,
            title: "Меню",
            color: "hsl(var(--primary))",
        },
    ]

    return (
        <div className='flex flex-wrap lg:gap-6 gap-1 min-h-[85vh] transition-all' style={{minHeight: "85dvh"}}>
            {items.map(item => {
                return (
                <motion.div 
                    key={item.id} 
                    animate={selectedItem === item.id ? "open" : "closed"}
                    variants={variantsItems}
                    style={{ 
                        flexGrow: item.id === 0 ? 1 : 0,
                        backgroundColor: item.color,
                        cursor: item.id === selectedItem ? "auto" : "pointer",
                    }}
                    className='relative flex w-fit items-center rounded-lg text-background overflow-hidden cursor-pointer'
                    onClick={() => setSelectedItem(item.id)}
                >
                    <h1 
                        className='font-Cera font-bold uppercase min-h-[250px] xl:text-3xl lg:text-2xl md:text-xl text-lg sm:p-3 p-2 z-20 rotate-180' 
                        style={{textOrientation: "mixed", writingMode: "vertical-lr"}}
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
