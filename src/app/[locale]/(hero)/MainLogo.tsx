import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/aceternity/3d-card";
import type { CSSProperties } from "react";

export function HiLogoSvg({
    style,
    className
}: {
    style?: CSSProperties,
    className?: string
}) {
    return (
        <svg 
            width="100%" 
            viewBox="0 0 459 687" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            style={style}
        >
            <path d="M382.464 152.683C424.605 152.683 458.787 118.529 458.787 76.3676C458.787 34.2064 424.629 0.0759703 382.464 0.0759703C340.323 0.0759703 306.141 34.2306 306.141 76.3676C306.141 118.505 340.323 152.683 382.464 152.683Z" fill="#F5EDE2"/>
            <path d="M404.744 194.167C398.987 192.039 391.681 190.853 382.488 190.853C354.136 190.853 337.227 202.053 324.671 217.437C322.107 220.412 319.785 223.605 317.705 226.967C295.473 260.517 285.071 305.291 229.867 305.291C187.726 305.291 153.544 271.136 153.544 228.975V76.3676C153.544 34.2306 119.386 0.0517578 77.2208 0.0517578C35.0799 0.0517578 0.922119 34.2064 0.922119 76.3676V610.506C0.922119 652.643 35.0799 686.822 77.2208 686.822C119.362 686.822 153.544 652.667 153.544 610.506V496.044C153.544 453.907 187.702 419.728 229.867 419.728C272.008 419.728 306.19 453.883 306.19 496.044V610.506C306.19 652.643 340.347 686.822 382.512 686.822C424.653 686.822 458.811 652.667 458.811 610.506V268.403H458.739C458.739 267.968 458.811 267.556 458.811 267.121C458.787 232.749 436.023 203.674 404.744 194.167Z" fill="#F5EDE2"/>
        </svg>
    )
}

export default function MainLogo({
    selectedItem
}: {
    selectedItem: number
}) {
    return (
        <CardContainer 
            variant="follow"
            threshold={34}
            perspective="3000px"
            containerClassName="absolute w-full h-full top-0 flex justify-center py-0 transition-all duration-500 ease-in-out"
            className="w-full h-full"
            style={{height: selectedItem === 0 ? "100%" : "16%"}}
        >
            <CardBody className="relative max-w-[25rem] w-2/5 h-full transition-all duration-500 ease-in-out">
              <CardItem 
                translateZ="-10" 
                className="w-full h-full z-20"
                style={{ transform: "translateZ(0px)" }}
            >
                <HiLogoSvg 
                    className="w-full h-full object-contain drop-shadow dark:[&>path]:fill-foreground z-20"
                    style={{ 
                        transform: "translateZ(0px)",
                        transformStyle: "preserve-3d",
                    }}
                />
              </CardItem>
              <CardItem 
                translateZ="-40"
                className="absolute top-0 w-full h-full z-10"
                style={{
                    transform: "translateZ(-2px)"
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
                        transform: "translateZ(-2px)",
                        transformStyle: "preserve-3d",
                    }}
                />
              </CardItem>
            </CardBody>
        </CardContainer>
    )
}