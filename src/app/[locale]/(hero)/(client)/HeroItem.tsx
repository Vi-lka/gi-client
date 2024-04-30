"use client"

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import React from 'react'

export default function HeroItem(props: {
  id: number;
  title: string;
  color: string;
  opened: boolean;
  onClick: () => void;
  children: React.ReactNode| null;
}) {

  const variantsItems = {
    open: { flexGrow: 1 },
    closed: { flexGrow: 0 },
  }

  return (
    <motion.div 
      key={props.id} 
      animate={props.opened ? "open" : "closed"}
      variants={variantsItems}
      style={{
          cursor: props.opened ? "auto" : "pointer",
      }}
      className={cn(
        'relative flex w-fit items-center rounded-2xl text-background overflow-hidden cursor-pointer shadow-inner',
        props.opened ? "w-fit" : "xl:w-[60px] lg:w-[56px] sm:w-[52px] w-[44px]", // firefox width
        props.id === 0 ? "flex-grow" : "flex-grow-0",
        props.color
      )}
      onClick={props.onClick}
    >
      <h1 
        className={cn(
          'font-Cera font-bold uppercase min-h-[250px] xl:text-3xl lg:text-2xl md:text-xl text-lg sm:p-3 p-2 z-20 rotate-180',
          props.id === 1 ? "dark:text-foreground" : "dark:text-background"
        )} 
        style={{textOrientation: "mixed", writingMode: "vertical-lr", opacity: props.id === 0 ? 0 : 1}}
      >
        {props.title}
      </h1>
      {props.children}
    </motion.div>
  )
}
