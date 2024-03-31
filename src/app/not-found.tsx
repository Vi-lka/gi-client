"use client"

import { Button } from '@/components/ui/button'
import { Undo2 } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function NotFound() {

    const router = useRouter()

    return (
        <div className="mx-auto my-10 flex flex-col items-center justify-center gap-10 text-center min-h-[60vh]">
            <div className="flex flex-col items-center gap-4 text-center">
                {/* <SearchX size={36} /> */}

                <h2 className="font-Cera text-3xl font-bold uppercase">
                    Не найдено
                </h2>

                <p className="text-sm font-normal">
                    {/* {additionalInfo} */}
                </p>
            </div>

            <Button
                className="w-full max-w-[240px] p-6 uppercase rounded-3xl"
                onClick={() => router.back()}
            >
                Вернуться
                <Undo2 className="ml-1" size={18} />
            </Button>
        </div>
    )
}
