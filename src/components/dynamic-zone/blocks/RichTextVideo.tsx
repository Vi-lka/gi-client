import BlocksRendererStrapi from "@/components/BlocksRendererStrapi";
import CarouselComp from "@/components/CarouselComp";
import { ClientHydration } from "@/components/ClientHydration";
import CarouselLoading from "@/components/loadings/CarouselLoading";
import { TypographyH2 } from "@/components/typography";
import { Card, CardContent } from "@/components/ui/card";
import { CarouselItem } from "@/components/ui/carousel";
import type { TextVideoCompT } from "@/lib/types/components";
import { cn } from "@/lib/utils";
import Video from "./Video";
import EmbededHTML from "./EmbededHTML";
import { Skeleton } from "@/components/ui/skeleton";

export default function RichTextVideo({
    data,
    headingBig,
    className,
}: {
    data: TextVideoCompT,
    headingBig?: boolean,
    className?: string,
}) {
    return (
        <div className={cn("w-full", className)}>
            {data.title && (
                <TypographyH2
                    className={cn(
                        'font-semibold text-primary mb-6 border-none',
                        headingBig ? "text-4xl lg:text-5xl" : ""
                    )}
                >
                    {data.title}
                </TypographyH2>
            )}
            <div className={cn(
                'flex items-stretch', 
                data.items.length > 1 ? "lg:gap-16 gap-6" : "gap-6",
                data.alignVideo === "right" ? "lg:flex-row flex-col-reverse" : "lg:flex-row-reverse flex-col-reverse"
            )}>
                <div className='lg:w-1/2 w-full h-fit'>
                    {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
                    <BlocksRendererStrapi content={data.text} />
                </div>
                {data.items.length > 1 
                    ? (
                        <ClientHydration fallback={<CarouselLoading noTitle className='lg:w-1/2 w-full lg:aspect-[8/6] max-h-96 lg:mb-0 mb-6'/>}>
                            <CarouselComp classNameContainer='lg:w-1/2 w-full' className='lg:-ml-8 -ml-4 items-center'>
                                {data.items.map((item, index) => (
                                    <CarouselItem key={index} className='lg:pl-8 pl-4'>
                                        <Card className='border-none shadow-md bg-transparent rounded-3xl overflow-hidden'>
                                            <CardContent className="relative w-full sm:aspect-video aspect-square p-0">
                                                {item.video.data 
                                                    ? <Video url={item.video.data.attributes.url} />
                                                    : <EmbededHTML elem={item.embed} />
                                                }
                                            </CardContent>
                                        </Card>
                                    </CarouselItem>
                                ))}
                            </CarouselComp>
                        </ClientHydration>
                    )
                    : (
                        <div className='relative lg:w-1/2 w-full lg:h-auto h-fit rounded-3xl overflow-hidden'>
                            <ClientHydration fallback={<Skeleton className='w-full sm:aspect-video aspect-square'/>}>
                                <Card className='border-none shadow-md bg-transparent rounded-3xl overflow-hidden'>
                                    <CardContent className="relative w-full sm:aspect-video aspect-square p-0">
                                        {data.items[0].video.data 
                                            ? <Video url={data.items[0].video.data.attributes.url} />
                                            : <EmbededHTML elem={data.items[0].embed} />
                                        }
                                    </CardContent>
                                </Card>
                            </ClientHydration>
                        </div>
                    )
                }
            </div>
        </div>
    )
}