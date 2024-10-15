import { cn } from '@/lib/utils';
import React from 'react'

const escapeRegExp = (str = '') => (
    str.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1')
);

export default function HighlightText({
    text, 
    highlight,
    className
}: {
    text: string | null,
    highlight: string,
    className?: string
}) {
    if (!text) return null
    if (!highlight) return <span className={cn("", className)}>{text}</span>
    const regex = new RegExp(`(${escapeRegExp(highlight)})`, 'i')
    const parts = text.split(regex)

    const indxOfMark = parts.map((part, indx) => {
        if (regex.test(part)) return indx
    }).filter(item => typeof item === "number")[0]

    const truncated = parts.map((part, indx) => {
        const partArr = part.split(" ")

        if (partArr.length > 10) {
            if (indx < indxOfMark) {
                partArr.splice(0, partArr.length - 10)
                partArr.unshift("...")
            }
            if (indx > indxOfMark) {
                partArr.splice(9, partArr.length - 1)
                partArr.push("...")
            }
        }

        return partArr.join(" ")
    })

    return (
        <span className={cn("block", className)}>
            {truncated.filter(part => part).map((part, i) => (
                regex.test(part) 
                    ? <mark key={i} className='bg-accent text-accent-foreground rounded-sm p-0.5'>{part}</mark> 
                    : <span key={i}>{part}</span>
            ))}
        </span>
    )
}
