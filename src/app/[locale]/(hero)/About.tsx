"use client"

import React from 'react';
import Image from "next/image";
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import DynamicReactIcon from '@/components/DynamicReactIcon';
import type { HeroAboutT } from '@/lib/types/additional';

export default function About({
    data,
    selectedItem
}: {
    data: HeroAboutT,
    selectedItem: number
}) {
    const containerVariants = {
        open: { 
            opacity: 1,
            transition: { 
                type: "spring",
                delay: 0.2,
                duration: 0.5,
                staggerChildren: 0.05
            }
        },
        closed: { 
            opacity: 0,
            transition: {
                type: "spring", 
                duration: 0.3,
            }
        },
    }
      
    const itemVariants = {
        open: { 
            y: 0,
            transition: { 
                type: "tween", 
                damping: 20, 
                stiffness: 50,
                duration: 0.3
            }
        },
        closed: { 
            y: 1000,
            transition: {
                type: "tween", 
                damping: 20, 
                stiffness: 50,
                duration: 0.3
            }
        },
    }


    return (
        <div className='absolute w-full h-full top-0'>
            <Image
                src="/about-bg.png"
                alt="Background"
                fill
                sizes='90vw'
                className={cn(
                    'object-cover w-full h-full transition-all z-30 dark:grayscale',
                    selectedItem === 1 ? "opacity-100" : "opacity-0"
                )}
            />

            <div className='relative w-full h-full flex flex-col gap-6 xl:justify-between justify-around xl:pl-20 xl:pr-16 pl-10 pr-6 2xl:py-12 py-6 z-50'>
                <motion.div 
                    animate={selectedItem === 1 ? "open" : "closed"}
                    variants={{
                        open: { opacity: 1, transition: { type: "spring", duration: 0.3 } },
                        closed: { opacity: 0, transition: { type: "spring", duration: 0.3 } },
                    }}
                    className='flex flex-wrap gap-6 items-center lg:ml-16 xl:mt-4'
                >
                    {data.icons.data.map((item, index) => (
                        <Image
                            key={index}
                            src={item.attributes.url}
                            alt=""
                            width={154}
                            height={62}
                            className='object-contain xl:w-[154px] md:w-24 w-20 dark:grayscale'
                        />
                    ))}
                </motion.div>

                <div className="">
                    <motion.ul 
                        animate={selectedItem === 1 ? "open" : "closed"}
                        variants={containerVariants}
                        className='grid lg:grid-cols-2 grid-cols-1 sm:gap-x-[5vh] xl:gap-y-6 gap-y-4 gap-3'
                    >
                        {data.items.map((item, index) => (
                            <motion.li 
                                key={index} 
                                variants={itemVariants}
                                className='flex gap-4 xl:items-start items-center'
                            >
                                {item.iconReact && (
                                    <DynamicReactIcon icon={item.iconReact} className="lg:w-14 sm:w-10 w-8 h-auto text-background" />
                                )}
                                <div className='flex-1 dark:text-foreground'>
                                    <h3 className='uppercase font-bold 2xl:text-lg lg:text-sm text-xs'>
                                        {item.title}
                                    </h3>
                                    <p className='2xl:text-base xl:text-sm text-xs lg:block hidden'>
                                        {item.description}
                                    </p>
                                </div>
                            </motion.li> 
                        ))}
                    </motion.ul>

                    {(data.link && data.linkTitle) && (
                        <motion.div
                            animate={selectedItem === 1 ? "open" : "closed"}
                            variants={{
                                open: { 
                                    y: 0,
                                    transition: { 
                                        type: "tween", 
                                        damping: 20, 
                                        stiffness: 50,
                                        duration: 0.3,
                                        delay: 0.2
                                    }
                                },
                                closed: { 
                                    y: 1000,
                                    transition: {
                                        type: "tween", 
                                        damping: 20, 
                                        stiffness: 50,
                                        duration: 0.3
                                    }
                                },
                            }}
                        >
                            <Link href={data.link}>
                                <Button 
                                    variant="outline" 
                                    className='uppercase rounded-full font-medium lg:text-sm text-xs lg:py-4 px-8 py-3 mt-[5vh] lg:ml-16 hover:bg-transparent dark:bg-primary dark:text-background dark:hover:text-primary dark:hover:bg-transparent dark:hover:border-primary'
                                >
                                    {data.linkTitle}
                                </Button>
                            </Link>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    )
}