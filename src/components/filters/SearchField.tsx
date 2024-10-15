"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Loader2, Search, X } from "lucide-react";
import { Button } from "../ui/button";
import { InputSearch } from "../ui/input-search";
import { cn, resetPaginationts } from "@/lib/utils";

export default function SearchField({ 
  placeholder, 
  param,
  defaultValue,
  debouncedDelay = 300,
  className
}: { 
  placeholder: string, 
  param: string,
  defaultValue?: string,
  debouncedDelay?: number,
  className?: string
}) {
  const [inputValue, setInputValue] = React.useState<string>(defaultValue ?? "");
  const [debouncedValue, setDebouncedValue] = React.useState<string>("");
  const [mounted, setMounted] = React.useState<boolean>(false);

  const [focus, setFocus] = React.useState<boolean>(false);

  const inputRef = React.createRef<HTMLInputElement>();

  const router = useRouter();
  const pathname = usePathname();

  const [isPending, startTransition] = React.useTransition();

  const handleSearchParams = React.useCallback((inputValue: string) => {
      const params = new URLSearchParams(window.location.search);

      // reset pagination(page) to prevent zero results
      resetPaginationts(params);

      if (inputValue.length > 0) {
        params.set(param, inputValue);
      } else {
        params.delete(param);
      }

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [param, pathname, router],
  );

  // Set Focus
  if (inputValue.length > 0) inputRef.current?.focus();

  // EFFECT: Set Initial Params
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get(param) ?? "";
    setInputValue(searchQuery);
  }, [param]);

  // EFFECT: Set Mounted
  React.useEffect(() => {
    if (debouncedValue.length > 0 && !mounted) {
      setMounted(true);
    }
  }, [debouncedValue, mounted]);

  // EFFECT: Debounce Input Value
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, debouncedDelay);

    return () => {
      clearTimeout(timer);
    };
  }, [debouncedDelay, inputValue]);

  // EFFECT: Search Params
  React.useEffect(() => {
    if (mounted) handleSearchParams(debouncedValue);
  }, [debouncedValue, handleSearchParams, mounted]);

  return (
    <div className="relative">
      <InputSearch
        ref={inputRef}
        value={inputValue}
        onChange={(e) => {
          // if (!isPending) setInputValue(e.target.value);
          setInputValue(e.target.value);
        }}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        placeholder={placeholder}
        className={cn(
          "transition-all",
          focus ? "ring-ring w-full ring-1 ring-offset-0" : "w-full",
          className
        )}
      >
        <Search className="h-4 w-4" />
      </InputSearch>

      {isPending ? (
        <div className="absolute right-2 top-2">
          <Loader2 className="animate-spin" />
        </div>
      ) : null}

      {!isPending && (inputValue.length > 0) ? (
        <Button
          variant="ghost"
          className="absolute right-2 top-2 h-fit w-fit p-0 hover:bg-primary hover:text-background rounded-3xl"
          onClick={() => {
            setDebouncedValue("");
            setInputValue("");
          }}
        >
          <X />
        </Button>
      ) : null}
    </div>
  );
}
