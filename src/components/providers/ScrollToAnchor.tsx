"use client"

import React, { useEffect } from 'react'

export default function ScrollToAnchor({
    children
}: {
    children: React.ReactNode
}) {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const observer = new ResizeObserver(() => {
                const { hash } = window.location
                const elem = hash.length > 0 && document.querySelector(decodeURI(hash));
                elem && elem.scrollIntoView({ behavior: "smooth" });
            });
    
            window.addEventListener("resize", () => observer.unobserve(document.body));
            observer.observe(document.body);
            return () => observer.unobserve(document.body);
        }
    }, []);

    return <>{children}</>
}
