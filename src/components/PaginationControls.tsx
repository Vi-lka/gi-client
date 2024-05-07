"use client"

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronsLeft,
    ChevronsRight,
    Ellipsis,
    Loader2,
  } from "lucide-react";
import { cn } from '@/lib/utils'
import { Button } from './ui/button';
import { Input } from './ui/input';
import Link from './Link';
import { usePathname } from '@/lib/hooks/usePathname';
import { useLocale } from '@/lib/hooks/useLocale';

export default function PaginationControls({ 
  length,
  defaultPageSize,
  scrollToId,
  pageParam = "page",
  perParam = "per",
  showMore = true,
}: { 
  length: number,
  defaultPageSize: number,
  scrollToId?: string,
  pageParam?: string,
  perParam?: string,
  showMore?: boolean,
}) {
  const [isPendingMore, startTransitionMore] = React.useTransition()
  const [isPendingPage, startTransitionPage] = React.useTransition()

  const locale = useLocale()
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const searchPage = searchParams.get(pageParam)
  const searchPer = searchParams.get(perParam)

  const page = searchPage ?? '1'
  const per = searchPer ?? defaultPageSize

  const [pageInput, setPageInput] = React.useState(page)

  React.useEffect(()=>{
    if ((typeof window !== "undefined") && (typeof document !== "undefined") && searchPage && scrollToId) {
      const element = document.getElementById(scrollToId);
      if (element) {
        const position = element.getBoundingClientRect();
        window?.scrollTo(position.left, position.top + window.scrollY - 200)
      }
    }
}, [searchPage, scrollToId]);

  React.useEffect(() => {
    setPageInput(page)
  }, [page])

  const max_page = Math.ceil(length / Number(per))
  
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {

    if (Number(event.target.value) > max_page) {

      setPageInput(max_page.toString())
    
    } else if (!event.target.value) {

      setPageInput(event.target.value)

    } else if (Number(event.target.value) < 1) {
      
      setPageInput('1')
    
    } else setPageInput(event.target.value)
  }

  const handlePageParams = React.useCallback(
    (value: string) => {
      const params = new URLSearchParams(window.location.search);
      if (value.length > 0) {
        params.set(pageParam, value);
        startTransitionPage(() => {
          router.push(`/${locale}${pathname}?${params.toString()}`, { scroll: false });
        });
      } else {
        params.delete(pageParam);
      }
    },
    [locale, pageParam, pathname, router],
  );

  const handlePageSizeParams = React.useCallback(
    (value: string) => {
      const params = new URLSearchParams(window.location.search);
      if (value.length > 0) {
        params.set(perParam, value);
        startTransitionMore(() => {
          router.push(`/${locale}${pathname}?${params.toString()}`, { scroll: false });
        });
      } else {
        params.delete(perParam);
      }
    },
    [locale, pathname, perParam, router],
  );

  return (
    <div className='flex lg:gap-0 gap-6 lg:items-start items-center lg:flex-row flex-col lg:justify-end relative'>
      {(showMore && (Number(page) === 1 )) ? (
        <Button
          variant="outline"
          className={cn(
            "px-6 py-4 text-sm uppercase lg:absolute lg:left-1/2 lg:-translate-x-1/2 rounded-3xl border-primary",
            (Number(page) >= max_page) ? "hidden" : "flex"
          )}
          disabled={isPendingPage || isPendingMore}
          onClick={() => handlePageSizeParams((Number(per) + defaultPageSize).toString())}
        >
          <span className="sr-only">Показать ещё</span>
          {isPendingMore ? <Loader2 className='w-4 h-4 animate-spin' /> : <Ellipsis className='w-5 h-5' />}
        </Button>
      ) : null}

        <div 
            className='flex items-center lg:flex-row lg:gap-4 gap-2' 
            style={{ display: Number(per) >= length ? 'none' : 'flex'}}
        >

            <div className='lg:flex hidden items-center text-sm'>
                {isPendingPage ? 
                  <Loader2 className='h-6 w-6 animate-spin' />
                  : 
                  (
                    <>
                      Страница
                      <Input 
                        className={cn(
                          "w-16 mx-2 py-0 text-sm font-normal border-primary rounded-3xl",
                          max_page < 9 ? "w-14" : max_page > 99 ? "w-20" : "w-16",
                        )}
                        type="number" 
                        value={pageInput} 
                        onChange={handleChangeInput}
                        onKeyDownCapture={event => {
                          if (event.key === 'Enter') {
                            handlePageParams(pageInput)
                          }
                        }}
                        onBlurCapture={() => handlePageParams(pageInput)}
                      />
                      из {max_page}
                    </>
                  )}
            </div>

            <div className="flex items-center space-x-1">
                {/* FIRST */}
                <Button
                  variant="outline"
                  className="h-8 w-8 my-0.5 p-0 border-primary rounded-3xl"
                  disabled={(Number(page) <= 1) || isPendingPage || isPendingMore}
                  onClick={() => handlePageParams('1')}
                >
                  {/* For SEO */}
                  <Link locale={locale} href={`${pathname}/?${pageParam}=1&${perParam}=${per}`} className="hidden">Перейти на первую страницу</Link>
                  <span className="sr-only">Перейти на первую страницу</span>
                  <ChevronsLeft className="h-4 w-4" />
                </Button>

                {/* PREVIOUS */}
                <Button
                  variant="outline"
                  className="h-8 w-8 my-0.5 p-0 border-primary rounded-3xl"
                  disabled={(Number(page) <= 1) || isPendingPage || isPendingMore}
                  onClick={() => handlePageParams((Number(page) - 1).toString())}
                >
                  {/* For SEO */}
                  <Link locale={locale} href={`${pathname}/?${pageParam}=${Number(page) - 1}&${perParam}=${per}`} className="hidden">Перейти на предыдущую страницу</Link>
                  <span className="sr-only">Перейти на предыдущую страницу</span>
                  <ChevronLeftIcon className="h-4 w-4" />
                </Button>

                {/* NEXT */}
                <Button
                  variant="outline"
                  className="h-8 w-8 my-0.5 p-0 border-primary rounded-3xl"
                  disabled={(Number(page) >= max_page) || isPendingPage || isPendingMore}
                  onClick={() => handlePageParams((Number(page) + 1).toString())}
                >
                  {/* For SEO */}
                  <Link locale={locale} href={`${pathname}/?${pageParam}=${Number(page) + 1}&${perParam}=${per}`} className='hidden'>Перейти на следующую страницу</Link>
                  <span className="sr-only">Перейти на следующую страницу</span>
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>

                {/* LAST */}
                <Button
                  variant="outline"
                  className="h-8 w-8 my-0.5 p-0 border-primary rounded-3xl"
                  disabled={(Number(page) >= max_page) || isPendingPage || isPendingMore}
                  onClick={() => handlePageParams(max_page.toString())}
                >
                  {/* For SEO */}
                  <Link locale={locale} href={`${pathname}/?${pageParam}=${max_page}&${perParam}=${per}`} className='hidden'>Перейти на последнюю страницу</Link>
                  <span className="sr-only">Перейти на последнюю страницу</span>
                  <ChevronsRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    </div>
  )
}
