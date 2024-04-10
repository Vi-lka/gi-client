'use client'
 
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { getShortDescription } from '@/lib/utils'
import { CircleAlert, Repeat, Undo2 } from 'lucide-react'
import { useEffect } from 'react'
import * as Sentry from "@sentry/nextjs";
import { ToastAction } from '@/components/ui/toast'
import { useRouter } from 'next/router'
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {

    const { toast } = useToast();
    const router = useRouter();

    useEffect(() => {
        Sentry.captureException(error);

        console.log("GlobalError: ", error.message);
    
        toast({
          variant: "destructive",
          title: "Error!",
          description: (
            <p>
              {getShortDescription(error.message)}
            </p>
          ),
          className: "font-Raleway",
          action: (
            <ToastAction
              className="px-2 py-6 text-sm"
              altText={"Undo"}
              onClick={() => reset()}
            >
              <Repeat className="h-8 w-8" />
            </ToastAction>
          ),
        });
    }, [error, reset, toast])
 
    return (
      <html>
        <body className='font-Din relative flex flex-col justify-between min-h-screen bg-background'>
          <div className="mx-auto my-10 flex flex-col items-center gap-10 text-center">
              <div className="flex flex-col items-center gap-4 text-center">
                  <CircleAlert size={36} />

                  <h2 className="font-Cera text-3xl font-bold uppercase">
                      Error
                  </h2>
                      
                  <p className="text-sm font-normal">
                      {getShortDescription(error.message)}
                  </p>
              </div>
                      
              <Button
                  className="w-full max-w-[240px] p-6 uppercase hover:bg-background hover:text-primary rounded-3xl"
                  onClick={() => router.back()}
              >
                  <Undo2 className="ml-1" size={18} />
              </Button>
          </div>
        </body>
      </html>
    )
}