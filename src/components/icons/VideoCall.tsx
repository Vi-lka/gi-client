import { cn } from '@/lib/utils'
import React from 'react'

export default function VideoCall({
    className,
}: {
    className?: string,
}) {
    return (
        <svg 
            className={cn('w-fit h-20', className)}
            viewBox="0 0 100 100" 
            fill="none"
            xmlns="http://www.w3.org/2000/svg" 
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <rect opacity="0.7" width="100" height="100" fill="url(#patternVideoCall)"/>
            <defs>
                <pattern id="patternVideoCall" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlinkHref="#image0_473_9620" transform="scale(0.00195312)"/>
                </pattern>
                <image id="image0_473_9620" width="512" height="512" xlinkHref="data:image/png;base64,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"/>
            </defs>
        </svg>
    )
}