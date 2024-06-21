"use client"

import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import React, { Suspense } from 'react'
import ReactPlayer from 'react-player/lazy'

export default function Video({
    url,
    className,
    classNameVideo
}: {
    url: string
    className?: string,
    classNameVideo?: string
}) {
    const [loading, setLoading] = React.useState(true)

    return (
        <div className={cn("w-full", className)}>
            {loading ? (
                <div className="mx-auto w-full">
                    <Loader2 className="mx-auto h-12 w-12 animate-spin" />
                </div>
            ) : null}

            <div className={cn(
                "w-full aspect-video overflow-hidden", 
                classNameVideo,
                loading ? "hidden" : "block"
            )}>
                <Suspense fallback={
                    <div className="mx-auto w-full">
                        <Loader2 className="mx-auto h-12 w-12 animate-spin" />
                    </div>
                }>
                    <ReactPlayer
                        width={'100%'}
                        height={'100%'}
                        url={url}
                        controls
                        playsinline
                        stopOnUnmount={true}
                        loop={false}
                        preload={'auto'}
                        onReady={() => {
                            setLoading(false)
                        }}
                    />
                </Suspense>
            </div>
        </div>
    )
}
