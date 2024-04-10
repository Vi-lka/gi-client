import { Button } from '@/components/ui/button'
import { SquareArrowOutUpRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

export default function NotFound() {
    return (
        <html lang="ru">
            <body>
                <div className="mx-auto my-10 flex flex-col items-center justify-center gap-10 text-center min-h-[90vh]">
                    <div className="flex flex-col items-center gap-4 text-center">
                        {/* <SearchX size={36} /> */}

                        {/* <h2 className="font-Cera text-3xl font-bold uppercase">
                            Не найдено
                        </h2> */}

                        <p className="text-xl font-semibold">
                            Этот раздел сайта все еще в разработке.
                        </p>

                        <p className="text-lg">
                            Возможно, вы сможете найти нужный вам материал на <Link href="/just-wait" className='text-primary font-bold hover:underline'>временной странице</Link>.
                        </p>
                    </div>

                    <Link href="/just-wait">
                        <Button className="w-full max-w-[240px] p-6 uppercase rounded-3xl">
                            Временная страница
                            <SquareArrowOutUpRight className="ml-1" size={18} />
                        </Button>
                    </Link>

                    <p className='text-lg'>
                        Приносим извинения за неудобства!
                    </p>

                    {/* <Button
                        className="w-full max-w-[240px] p-6 uppercase rounded-3xl"
                        onClick={() => router.back()}
                    >
                        Вернуться
                        <Undo2 className="ml-1" size={18} />
                    </Button> */}
                </div>
                {/* <Error statusCode={404} /> */}
            </body>
        </html>
    )
}
