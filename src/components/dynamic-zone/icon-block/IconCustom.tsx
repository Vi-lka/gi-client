import Authentication from '@/components/icons/Authentication';
import Budget from '@/components/icons/Budget'
import Businessman from '@/components/icons/Businessman';
import Certificate from '@/components/icons/Certificate';
import Deadline from '@/components/icons/Deadline';
import Graph from '@/components/icons/Graph';
import ManDesktop from '@/components/icons/ManDesktop';
import Presentation from '@/components/icons/Presentation';
import VideoCall from '@/components/icons/VideoCall';
import type { CustomIconEnum } from '@/lib/types';
import React from 'react'

export default function IconCustom({
    icon,
    className,
}: {
    icon: CustomIconEnum,
    className?: string,
}) {

    const ENUM_ICONS: { [key in CustomIconEnum]: React.JSX.Element } = {
        "video_call": <VideoCall key='video_call' className={className} />,
        "presentation": <Presentation key='presentation' className={className} />,
        "man_desktop": <ManDesktop key='man_desktop' className={className} />,
        "businessman": <Businessman key='businessman' className={className} />,
        "certificate": <Certificate key='certificate' className={className} />,
        "budget": <Budget key='budget' className={className} />,
        "deadline": <Deadline key='deadline' className={className} />,
        "authentication": <Authentication key='authentication' className={className} />,
        "graph": <Graph key='graph' className={className} />,
    };

    return (
        <>{ENUM_ICONS[icon]}</>
    )
}
