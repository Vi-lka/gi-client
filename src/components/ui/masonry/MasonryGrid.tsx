"use client"

import { cn } from '@/lib/utils';
import React from 'react'
import Masonry from 'react-masonry-css';
import "./masonry.css";

export default function MasonryGrid({
    breakpointCols,
    className,
    columnClassName,
    children
}: {
    breakpointCols?: number | {
        [key: number]: number;
        default: number;
    } | {
        [key: number]: number;
    }
    className?: string;
    columnClassName?: string;
    children: React.ReactNode;
}) {
    return (
        <Masonry
          breakpointCols={breakpointCols}
          className={cn("my-masonry-grid", className)}
          columnClassName={cn("my-masonry-grid_column", columnClassName)}
        >
            {children}
        </Masonry>
    )
}
