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