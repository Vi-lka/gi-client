"use client"

import Image from "next/image";
import HiLogoSvg from "./HiLogoSvg";
import { CardBody, CardContainer, CardItem } from "@/components/ui/aceternity/3d-card";

export default function MainLogo({
    selectedItem
}: {
    selectedItem: number
}) {

    return (
        <CardContainer 
            variant="follow"
            threshold={30}
            containerClassName="absolute w-full h-full top-0 flex justify-center py-0 transition-all duration-500 ease-in-out"
            className="w-full h-full"
            style={{height: selectedItem === 0 ? "100%" : "16%"}}
        >
            <CardBody className="relative group/card max-w-[25rem] w-2/5 h-full transition-all duration-500 ease-in-out">
              <CardItem 
                translateZ="40" 
                className="w-full h-full z-20"
                style={{
                    transform: selectedItem === 0 ? "translateZ(15px)" : "translateZ(8px)",
                    transformStyle: "preserve-3d",
                }}
            >
                <HiLogoSvg 
                    className="w-full h-full object-contain drop-shadow-sm dark:[&>path]:fill-foreground brightness-[.95] z-20"
                    style={{
                        transform: selectedItem === 0 ? "translateZ(15px)" : "translateZ(8px)",
                        transformStyle: "preserve-3d",
                    }}
                />
              </CardItem>
              <CardItem 
                translateZ="20" 
                className="absolute top-0 w-full h-full z-10"
                style={{
                    transform: selectedItem === 0 ? "translateZ(4px)" : "translateZ(1px)",
                    transformStyle: "preserve-3d",
                }}
              >
                <Image
                    src="/hi-logo.svg"
                    alt="HI"
                    fill
                    sizes='100vw'
                    priority
                    quality={100}
                    className='object-contain brightness-50 opacity-60 dark:brightness-0 z-10'
                    style={{
                        transform: selectedItem === 0 ? "translateZ(4px)" : "translateZ(1px)",
                        transformStyle: "preserve-3d",
                    }}
                />
              </CardItem>
            </CardBody>
        </CardContainer>
    )
}