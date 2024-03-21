"use client"

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function MainLogo({
    selectedItem
}: {
    selectedItem: number
}) {

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

    const variantsLogo = {
        open: { 
            height: "100%",
            transition: {
                type: "tween", damping: 1000, stiffness: 100, duration: 0.3
            }
        },
        closed: { 
            height: "16%",
            transition: {
                type: "tween", damping: 20, stiffness: 50, duration: 0.35
            }
        },
    }

    return (
        <motion.div
            animate={selectedItem === 0 ? "open" : "closed"}
            variants={variantsLogo}
            className='absolute w-full h-full top-0 flex justify-center'
        >
            <Link href="/" className="max-w-[25rem] w-2/5 h-full">
                <motion.div 
                    ref={ref}
                    className='relative w-full h-full'
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
            </Link>
        </motion.div>
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