"use client"

import React, { createContext, useContext, useState } from 'react'
import { useDictionary } from '@/components/providers/DictionaryProvider';
import HeroItem from './HeroItem';
import MainLogo from '../MainLogo';

const AccordionContext = createContext(0);

export function useAccordion() {
  const selectedItem = useContext(AccordionContext)
  return selectedItem
}

export default function Hero({
  about,
  menu
}: {
  about: React.ReactNode;
  menu: React.ReactNode;
}) {
  
  const dict = useDictionary()

  const [selectedItem, setSelectedItem] = useState(0);

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
      children: about
    },
    {
      id: 2,
      title: dict.Hero.tabs.menu,
      color: "bg-primary",
      children: menu
    },
  ]

  return (
    <section id="top" className='relative 2xl:max-w-[2000px] xl:max-w-[1400px] lg:max-w-[1280px] md:max-w-[1024px] sm:max-w-[768px] w-11/12 mx-auto mt-6 z-50'>
      <div className='w-full left-0 flex flex-wrap lg:gap-6 gap-1 min-h-[80vh] transition-all' style={{minHeight: "80vh"}}>
        <AccordionContext.Provider value={selectedItem}>
          {items.map(item => (
            <HeroItem 
              key={item.id} 
              opened={selectedItem === item.id} 
              onClick={() => setSelectedItem(item.id)} 
              {...item}
            />
          ))}
        </AccordionContext.Provider>
      </div>
    </section>
  )
}
