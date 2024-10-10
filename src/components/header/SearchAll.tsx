"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDictionary } from "../providers/DictionaryProvider";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { InputSearchAll } from "./InputSearchAll";
import { useLocale } from "@/lib/hooks/useLocale";
import { cn, resetPaginationts } from "@/lib/utils";

export default function SearchAll({
  className
}: {
  className?: string
}) {
  const dict = useDictionary()
  
  const locale = useLocale()

  const [isPending, startTransition] = React.useTransition();

  const router = useRouter();

  const SearchFormSchema = z.object({
    query: z
      .string({
        required_error: "searchMin",
      })
      .min(2, {
        message: "searchMin",
      }),
  });

  const form = useForm<z.infer<typeof SearchFormSchema>>({
    resolver: zodResolver(SearchFormSchema),
    defaultValues: { query: "" },
    mode: "onSubmit"
  });

  function onSubmit(data: z.infer<typeof SearchFormSchema>) {
    handleSearchParams(data.query);
  }

  const handleSearchParams = React.useCallback(
    (inputValue: string) => {
      // reset params
      const params = new URLSearchParams();
      resetPaginationts(params);

      if (inputValue.length > 0) {
        params.set("search_all", inputValue);
        startTransition(() => {
          router.push(`/${locale}/search?${params.toString()}`);
        });
      } else {
        params.delete("search");
      }
    },
    [locale, router],
  );

  if (isPending) return (
    <div className='w-10 h-10 flex justify-center items-center'>
      <Loader2 className="animate-spin w-7 h-7"/>
    </div>
  );

  return (
    <Form {...form}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-fit">
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem className="text-center space-y-0 relative">
              <FormMessage className="max-w-[calc(var(--radix-dropdown-menu-content-available-width)-10px)] sm:text-sm text-xs" />
              <FormControl>
                <InputSearchAll
                  autoFocus
                  className={cn(
                    "max-w-[calc(var(--radix-dropdown-menu-content-available-width)-10px)] rounded-xl pl-1 pr-0",
                    className
                  )}
                  placeholder={dict.Inputs.search}
                  {...field}
                >
                </InputSearchAll>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
