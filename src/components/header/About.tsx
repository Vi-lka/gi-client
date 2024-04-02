"use client"

import React from 'react';
import Image from "next/image";
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import Link from 'next/link';

export default function About({
    selectedItem
}: {
    selectedItem: number
}) {

    const list = [
        {
            icon: "/icons/1.svg",
            title: "ЭФФЕКТИВНОЕ ОБУЧЕНИЕ",
            text: `
                Реализация сетевых форм обучения, направленных
                на международную и российскую академическую
                и научную мобильность обучающихся института. 
                Развитие систем электронного обучения и открытых массовых онлайн-курсов.
            `
        },
        {
            icon: "/icons/3.svg",
            title: "НАУЧНАЯ ДЕЯТЕЛЬНОСТЬ",
            text: `
                Фундаментальные исследования Енисейской Сибири 
                в области археологии, дендхронологии, истории, 
                культурной и исторической антропологии, когнитивистики. 
                Фундаментальные исследования Енисейской Сибири.
            `
        },
        {
            icon: "/icons/2.svg",
            title: "ПРОФЕССИОНАЛИЗМ ВЫПУСКНИКОВ",
            text: `
                Подготовка высококвалифицированных кадров, 
                ориентированная на конкретные потребности рынка труда
                и включающая прохождение специализированных практик. 
                Профессиональное сообщество отмечает высокое качество наших выпускников. 
                Развитие дополнительного образования и программ профессиональной переподготовки.
            `
        },
        {
            icon: "/icons/4.svg",
            title: "ЛИЧНОСТНЫЙ РОСТ",
            text: `
                Развитие студенческих клубов, сообществ и поддержка инициативы обучающихся. 
                Мы предоставляем широкий спектр возможностей для творческой реализации. 
                В Гуманитарном институте мы создаем условия для гармоничного профессионального и личностного развития.
            `
        },
    ];

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
                    'object-cover w-full h-full transition-all z-30',
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
                    className='flex gap-6 items-center lg:ml-16 xl:mt-4'
                >
                    <Image
                        src="/sfu-logo.svg"
                        alt="SFU"
                        width={154}
                        height={62}
                        className='object-contain xl:w-[154px] md:w-24 w-20'
                    />
                    <Image
                        src="/hi-logo-full.svg"
                        alt="HI"
                        width={154}
                        height={62}
                        className='object-contain xl:w-[154px] md:w-24 w-20'
                    />
                </motion.div>

                <div className="">
                    <motion.ul 
                        animate={selectedItem === 1 ? "open" : "closed"}
                        variants={containerVariants}
                        className='grid lg:grid-cols-2 grid-cols-1 sm:gap-x-[5vh] xl:gap-y-6 gap-y-4 gap-3'
                    >
                        {list.map((item, index) => (
                            <motion.li 
                                key={index} 
                                variants={itemVariants}
                                className='flex gap-4 xl:items-start items-center'
                            >
                                <Image
                                    src={item.icon}
                                    alt="icon"
                                    width={64}
                                    height={64}
                                    className='object-contain lg:w-14 sm:w-10 w-8'
                                />
                                <div className=''>
                                    <h3 className='uppercase font-bold 2xl:text-lg lg:text-sm text-xs'>
                                        {item.title}
                                    </h3>
                                    <p className='2xl:text-base xl:text-sm text-xs lg:block hidden'>
                                        {item.text}
                                    </p>
                                </div>
                            </motion.li> 
                        ))}
                    </motion.ul>

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
                        <Link href="/structure">
                            <Button 
                                variant="outline" 
                                className='uppercase rounded-full font-medium lg:text-sm text-xs lg:py-4 px-8 py-3 mt-[5vh] lg:ml-16'
                            >
                                Структура
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
