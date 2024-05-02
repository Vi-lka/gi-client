import Link from '@/components/Link';
import Header from '@/components/header/Header';
import { Button } from '@/components/ui/button'
import { getDictionary } from '@/lib/getDictionary';
import { SquareArrowOutUpRight } from 'lucide-react';
import { headers } from 'next/headers';
// import { Undo2 } from 'lucide-react'
import React from 'react'

export default async function NotFound() {

    const headersList = headers();
    const header_locale = headersList.get('x-locale') || "";

    const dict = await getDictionary(header_locale)

    return (
        <>
            <Header />
            <div className="mx-auto my-10 flex flex-col items-center justify-center gap-10 text-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-4 text-center">
                    {/* <SearchX size={36} /> */}

                    {/* <h2 className="font-Cera text-3xl font-bold uppercase">
                        Не найдено
                    </h2> */}

                    <p className="text-xl font-semibold">
                        {dict.JustWaitPage.title}
                    </p>

                    <p className="text-lg">
                        {dict.JustWaitPage.description} <Link locale={header_locale} href="/just-wait" className='text-primary font-bold hover:underline underline-offset-2 hover:underline-offset-4 transition-all'>{dict.JustWaitPage.descriptionLink}</Link>.
                    </p>
                </div>

                <Link locale={header_locale} href={`/just-wait`}>
                    <Button className="w-full max-w-[240px] p-6 uppercase rounded-3xl">
                        {dict.JustWaitPage.temporaryPage}
                        <SquareArrowOutUpRight className="ml-1" size={18} />
                    </Button>
                </Link>

                <p className='text-lg'>
                    {dict.JustWaitPage.sorry}
                </p>

                {/* <Button
                    className="w-full max-w-[240px] p-6 uppercase rounded-3xl"
                    onClick={() => router.back()}
                >
                    Вернуться
                    <Undo2 className="ml-1" size={18} />
                </Button> */}
            </div>
        </>
    )
}
