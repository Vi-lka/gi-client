import { Card, CardContent } from '@/components/ui/card'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ImageComp from '@/components/ImageComp'

export default function EntranceGrid({
    data,
}: {
    data: {
        id: string;
        attributes: {
            type: "bachelor" | "magistracy" | "postgraduate";
            code: string | null;
            slug: string;
            title: string;
            mainName: string | null;
            mainCode: string | null;
            image: {
                data: {
                    attributes: {
                        url: string;
                    };
                } | null;
            };
        };
    }[]
}) {
    
    return (
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 auto-rows-fr lg:gap-8 gap-6">
            {data.map(item => (
                <Card key={item.id} className='flex border-none shadow-md rounded-3xl'>
                    <CardContent className="w-full h-full flex flex-col xl:gap-8 gap-6 md:justify-normal justify-between p-3">
                        <ImageComp
                            src={item.attributes.image.data?.attributes.url}
                            alt={item.attributes.title}
                            fill={false}
                            width={400}
                            height={140}
                            className='w-full object-cover rounded-2xl h-[30%]'
                        />
    
                        <div className='flex flex-col justify-between gap-3 xl:px-8 px-5 text-primary text-base'>
                            <div>
                                <p>{item.attributes.mainCode}</p>
                                <p>{item.attributes.mainName}</p>
                            </div>
                            <div>
                                <p>{item.attributes.code}</p>
                                <p className='font-bold'>{item.attributes.title}</p>
                            </div>
                        </div>
    
                        <Link href={`/entrance/${item.attributes.slug}`} className='w-fit mx-auto mb-3 md:mt-auto'>
                            <Button className='uppercase font-medium px-10 py-5 rounded-full hover:bg-background hover:text-primary'>
                                Подробнее
                            </Button>
                        </Link>
                    </CardContent>
                </Card> 
            ))}
        </div>
    )
}
