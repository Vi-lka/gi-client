"use client"

import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AnimatePresence, motion } from 'framer-motion';

type Props = (HasDefaultValue | NoDefaultValue);
  
type HasDefaultValue = {
    defaultValue: string,
    tabs: {
        value: string,
        title: string,
        content: React.ReactNode,
        count?: undefined
    }[],
};
  
type NoDefaultValue = {
    defaultValue?: undefined
    tabs: {
        value: string,
        title: string,
        content: React.ReactNode,
        count: number
    }[],
};

export default function TabsComp(props: Props) {
    const maxCount = props.tabs.reduce((acc, tab) => {
        if (tab.count && tab.count > acc) {
            return tab.count
        }
        return acc
    }, 0)

    let defaultValue: string

    if (maxCount === 0) {
        defaultValue = props.defaultValue ? props.defaultValue : props.tabs[0].value
    } else {
        defaultValue = props.tabs.filter(tab => tab.count === maxCount)[0].value
    }

    const defaultTab = props.tabs.find(tab => tab.value === defaultValue)
    const switchStartTab = (props.tabs[0].count === 0) || (props.tabs[0].count === undefined)

    const [selectedTab, setSelectedTab] = useState((switchStartTab && defaultTab) ? defaultTab : props.tabs[0]);

    useEffect(() => {
      setSelectedTab((switchStartTab && defaultTab) ? defaultTab : props.tabs[0])
    }, [defaultTab, props.tabs, switchStartTab])

    return (
        <Tabs 
            defaultValue={defaultValue}
            value={selectedTab.value}
            className="w-full"
        >
            <TabsList className='w-full flex-wrap h-fit sm:justify-around justify-center gap-y-1 bg-primary/10 rounded-3xl'>
                {props.tabs.map((tab) => (
                    <TabsTrigger 
                        key={tab.value} 
                        value={tab.value} 
                        style={{ display: tab.count === 0 ? "none" : "inline-flex"}}
                        className='relative z-20 py-2 lg:px-6 font-medium 2xl:text-lg lg:text-base text-sm rounded-3xl text-foreground/80 hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none'
                        onClick={() => setSelectedTab(tab)}
                    >
                        {selectedTab.value === tab.value && (
                            <motion.span
                                layoutId="bubble"
                                className="absolute inset-0 z-[-1] bg-background shadow rounded-3xl"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        {tab.title} <sup className='ml-0.5 text-muted-foreground'>{tab.count}</sup>
                    </TabsTrigger>
                ))}
            </TabsList>
            <AnimatePresence mode="wait">
                {/* {props.tabs.map((tab) => ( */}
                    <motion.div
                        key={selectedTab ? selectedTab.value : "empty"}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 10, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {selectedTab 
                            ? (
                                <TabsContent 
                                    value={selectedTab.value} 
                                    className='mt-6'
                                    forceMount
                                >
                                    {selectedTab.content}
                                </TabsContent>
                            )
                            : "🗿"
                        }
                    </motion.div>
                {/* ))} */}
            </AnimatePresence>
        </Tabs>
    )
}
