"use client"

import { Skeleton } from '@/components/ui/skeleton'
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
                <Skeleton className="mx-auto w-full aspect-video flex items-center justify-center">
                    <Loader2 className="mx-auto animate-spin" />
                </Skeleton>
            ) : null}

            <div className={cn(
                "w-full sm:aspect-video aspect-square border bg-muted/20 sm:border-transparent border-border rounded-3xl overflow-hidden", 
                classNameVideo,
                loading ? "hidden" : "block"
            )}>
                <Suspense fallback={
                    <Skeleton className="mx-auto w-full aspect-video flex items-center justify-center">
                        <Loader2 className="mx-auto animate-spin" />
                    </Skeleton>
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
