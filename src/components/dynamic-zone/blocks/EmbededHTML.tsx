"use client"

import { cn } from '@/lib/utils'
import React from 'react'

export default function EmbededHTML({ 
  elem,
  className,
  classNameEmbeded,
}: { 
  elem: string | null,
  className?: string,
  classNameEmbeded?: string
}) {
    const [embededHTML, setEmbededHTML] = React.useState<string>("")

    React.useEffect(() => {
        setEmbededHTML(elem ?? "")
    }, [elem])

    if (!elem || (elem?.length < 9)) return null // 9 is minimum iframe code size

    return (
      <div className={cn("w-full", className)}>
        <div className={cn(
          "embeded-html flex w-full sm:aspect-video aspect-square overflow-hidden",
          classNameEmbeded
        )} dangerouslySetInnerHTML={{__html: embededHTML}}></div>
      </div>
    )
}