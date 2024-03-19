"use client"

import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { cn } from '@/lib/utils';

export default function HorizontalAccordion() {

    const [selectedItem, setSelectedItem] = useState(0);

    const variantsItems = {
        open: { flexGrow: 1 },
        closed: { flexGrow: 0 },
    }


    function MainLogo() {

        const ROTATION_RANGE = 20;
        const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

        const ref = useRef<HTMLDivElement>(null);

        const x = useMotionValue(0);
        const y = useMotionValue(0);

        const xSpring = useSpring(x);
        const ySpring = useSpring(y);

        const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

        const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            if (!ref.current) return [0, 0];
        
            const rect = ref.current.getBoundingClientRect()
        
            const width = rect.width;
            const height = rect.height;
        
            const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
            const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;
        
            const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
            const rY = mouseX / width - HALF_ROTATION_RANGE;
        
            x.set(rX);
            y.set(rY);
        };

        const handleMouseLeave = () => {
            x.set(0);
            y.set(0);
        };

        // const x = useMotionValue(500)
        // const y = useMotionValue(500)
        
        // const rotateX = useTransform(y, [0, 1000], [10, -15])
        // const rotateY = useTransform(x, [0, 1000], [-10, 10])

        // function handleMouse(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        //     x.set(event.pageX);
        //     y.set(event.pageY);
        // }

        // function handleOut() {
        //     x.set(500);
        //     y.set(500);
        // }

        return (
            <div
                className={cn(
                    'absolute w-full h-full top-0 flex justify-center transition-all duration-300',
                    selectedItem === 0 ? "h-full drop-shadow-2xl" : "h-1/6 drop-shadow"
                )}
            >
                <motion.div 
                    ref={ref}
                    className='relative h-full max-w-[25rem] w-2/5' 
                    style={{
                      transformStyle: "preserve-3d",
                      transform,
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    <Image
                        src="/hi-logo.svg"
                        alt="HI"
                        fill
                        sizes='100vw'
                        quality={100}
                        className='object-contain drop-shadow-sm'
                        style={{
                            transform: selectedItem === 0 ? "translateZ(50px)" : "translateZ(10px)",
                            transformStyle: "preserve-3d",
                          }}
                    />
                    <Image
                        src="/hi-logo.svg"
                        alt="HI"
                        fill
                        sizes='100vw'
                        quality={100}
                        className='object-contain brightness-50 opacity-60'
                        style={{
                            transform: selectedItem === 0 ? "translateZ(10px)" : "translateZ(1px)",
                          }}
                    />
                </motion.div>
            </div>
            // <div className='absolute w-full h-full'>
            //     <div className='relative w-full h-full z-10'>
            //         <Image
            //             src="/hero-image.jpeg"
            //             alt=""
            //             fill
            //             sizes='100vw'
            //             quality={100}
            //             className='rounded-md object-cover'
            //         />
            //     </div>
            // </div>
        )
    }

    const items = [
        {
            id: 0,
            title: "Главная",
            color: "hsl(var(--apricot))",
            children: <MainLogo />
        },
        {
            id: 1,
            title: "Об институте",
            color: "hsl(var(--accent))",
        },
        {
            id: 2,
            title: "Меню",
            color: "hsl(var(--primary))",
        },
    ]

    return (
        <div className='flex gap-6 h-[85vh] transition-all' style={{height: "85dvh"}}>
            {items.map(item => {
                return (
                <motion.div 
                    key={item.id} 
                    animate={selectedItem === item.id ? "open" : "closed"}
                    variants={variantsItems}
                    style={{ 
                        flexGrow: item.id === 0 ? 1 : 0,
                        backgroundColor: item.color,
                    }}
                    className='relative flex w-fit items-center rounded-lg text-background overflow-hidden cursor-pointer'
                    onClick={() => setSelectedItem(item.id)}
                >
                    <h1 
                        className='font-Cera font-bold uppercase min-h-[250px] text-3xl p-3 z-20 rotate-180' 
                        style={{textOrientation: "mixed", writingMode: "vertical-lr"}}
                    >
                        {item.title}
                    </h1>
                    {item.children}
                </motion.div>
            )}
            )}
        </div>
    )
}
