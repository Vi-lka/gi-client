'use client'
 
import { Button } from '@/components/ui/button'
import { getShortText } from '@/lib/utils'
import { CircleAlert, Repeat } from 'lucide-react'
import { useEffect } from 'react'
import * as Sentry from "@sentry/nextjs";
import HawkCatcher from '@hawk.so/javascript';
 
export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {

  useEffect(() => {
    const hawk = new HawkCatcher(process.env.HAWK_TOKEN as string);
    hawk.send(error);
    
    Sentry.captureException(error);

    console.error("GlobalError: ", error.message);
  }, [error])
 
  return (
    <html lang='ru'>
      <body className='font-Din relative flex flex-col justify-between min-h-screen bg-background'>
        <div className="mx-auto my-10 flex flex-col items-center gap-10 text-center">
          <div className="flex flex-col items-center gap-4 text-center">
            <CircleAlert size={36} />
            <h2 className="font-Cera text-3xl font-bold uppercase">
              Error
            </h2>
            <p className="text-sm font-normal">
              {getShortText(error.message)}
            </p>
          </div>

          <Button
            className="w-full max-w-[240px] p-6 uppercase hover:bg-background hover:text-primary rounded-3xl"
            onClick={() => reset()}
          >
            <Repeat className="ml-1" size={18} />
          </Button>
        </div>
      </body>
    </html>
  )
}