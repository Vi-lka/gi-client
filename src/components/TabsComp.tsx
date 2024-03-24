import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

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

    return (
        <Tabs defaultValue={defaultValue} className="">
            <TabsList>
                {props.tabs.map((tab) => (
                    <TabsTrigger 
                        key={tab.value} 
                        value={tab.value} 
                        style={{ display: tab.count === 0 ? "none" : "inline-flex"}}
                    >
                        {tab.title} <sup>{tab.count}</sup>
                    </TabsTrigger>
                ))}
            </TabsList>
            {props.tabs.map((tab) => (
                <TabsContent key={tab.value} value={tab.value}>
                    {tab.content}
                </TabsContent>
            ))}
        </Tabs>
    )
}
