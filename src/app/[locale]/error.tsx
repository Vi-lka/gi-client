'use client'
 
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { getShortText } from '@/lib/utils'
import { CircleAlert, Repeat, Undo2 } from 'lucide-react'
import { useEffect } from 'react'
import * as Sentry from "@sentry/nextjs";
import { ToastAction } from '@/components/ui/toast'
import { useRouter } from 'next/navigation'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void,
}) {

    const { toast } = useToast();
    const router = useRouter();

    useEffect(() => {
        Sentry.captureException(error);

        console.log("Error: ", error.message);
    
        toast({
          variant: "destructive",
          title: "Ошибка! Что-то пошло не так:",
          description: (
            <p>
              {getShortText(error.message)}
            </p>
          ),
          className: "font-Raleway",
          action: (
            <ToastAction
              className="px-2 py-6 text-sm"
              altText={"Попробовать снова"}
              onClick={() => reset()}
            >
              <Repeat className="h-8 w-8" />
            </ToastAction>
          ),
        });
    }, [error, reset, toast])
 
    return (
        <div className='font-Din relative flex flex-col justify-center min-h-screen bg-background'>
          <div className="mx-auto my-10 flex flex-col items-center gap-10 text-center">
              <div className="flex flex-col items-center gap-4 text-center">
                  <CircleAlert size={36} />

                  <h2 className="font-Cera text-3xl font-bold uppercase">
                      Ошибка
                  </h2>
                      
                  <p className="text-sm font-normal">
                      {getShortText(error.message)}
                  </p>
              </div>
                      
              <Button
                  className="w-full max-w-[240px] p-6 uppercase hover:bg-background hover:text-primary rounded-3xl"
                  onClick={() => router.back()}
              >
                  Вернуться
                  <Undo2 className="ml-1" size={18} />
              </Button>
          </div>
        </div>
    )
}