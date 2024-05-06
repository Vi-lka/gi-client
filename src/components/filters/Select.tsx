"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Check,
  ChevronDown,
  Filter,
  Loader2,
  SearchX,
  X,
  XCircle,
} from "lucide-react";
import { cn, resetPaginationts } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { useDictionary } from "../providers/DictionaryProvider";

export type Item = {
  value: string;
  label: string;
};

export function Select({
  isMulti,
  values,
  param,
  placeholder,
  deleteParam,
  badges = false,
  icon = false,
  side = "bottom",
  align = "start",
  className,
}: {
  isMulti: boolean;
  values: Array<Item> | null;
  param: string;
  placeholder: string;
  deleteParam?: string;
  badges?: boolean;
  icon?: boolean;
  side?: "bottom" | "top" | "right" | "left";
  align?: "end" | "center" | "start";
  className?: string;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [items, setItems] = React.useState<Array<Item> | null>([]);
  const [openCombobox, setOpenCombobox] = React.useState(false);
  const [inputSearch, setInputSearch] = React.useState<string>("");
  const [isPendingSearch, startTransitionSearch] = React.useTransition();
  const [isPendingRouter, startTransitionRouter] = React.useTransition();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const dict = useDictionary()

  const currentParams = searchParams.get(param) ?? undefined;

  React.useEffect(() => {
    setItems(values);
  }, [values]);

  let selectedValues = [] as Item[];
  values?.forEach((option) => {
    if (currentParams?.split("_or_").includes(option.value.toString())) {
      selectedValues = [...selectedValues, option];
    }
  });

  function handleSearch(input: string) {
    startTransitionSearch(() => {
      setInputSearch(input);
    });
  }

  const clearItems = () => {
    handleSelectedParams([]);
    inputRef.current?.blur();
    handleSearch("");
  };

  const toggleItem = (item: Item) => {
    let newValues = [] as Item[];

    // includes() doesn't work with object, so we do this:
    const contains = selectedValues.some((elem) => elem.value === item.value);

    if (isMulti) {
      contains
        ? (newValues = selectedValues.filter(
            (elem) => elem.value !== item.value,
          ))
        : (newValues = [...selectedValues, item]);

      handleSelectedParams(newValues);
    } else {
      contains
        ? (newValues = selectedValues.filter(
            (elem) => elem.value !== item.value,
          ))
        : (newValues = [item]);

      handleSelectedParams(newValues);
    }
    setOpenCombobox(false);
  };

  const onComboboxOpenChange = (value: boolean) => {
    inputRef.current?.blur(); // HACK: otherwise, would scroll automatically to the bottom of page
    setOpenCombobox(value);
  };

  const handleSelectedParams = React.useCallback(
    (newValues: Array<Item>) => {
      const params = new URLSearchParams(window.location.search);

      let values = [] as string[];

      // reset pagination(page) to prevent zero results
      resetPaginationts(params);

      if (newValues.length > 0) {
        newValues.forEach((option) => {
          values = [...values, option.value.toString()];
        });

        params.set(param, values.join("_or_"));
      } else {
        params.delete(param);
      }

      if (!!deleteParam) params.delete(deleteParam);

      startTransitionRouter(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [param, deleteParam, pathname, router],
  );

  function TriggerButton() {
    return (
      <>
        <div className="flex w-[85%] items-center gap-2">
          {isPendingRouter ? (
            <Loader2 className="animate-spin" />
          ) : (
            <span className="truncate font-normal lg:text-base">
              {selectedValues.length === 0 && placeholder}
              {selectedValues.length === 1 && selectedValues[0].label}
              {selectedValues.length === 2 && selectedValues[0].label + ", " + selectedValues[1].label}
              {selectedValues.length === 3 && selectedValues[0].label + ", " + selectedValues[1].label + ", " + selectedValues[2].label}
              {selectedValues.length >= 4 && `${selectedValues.length} Выбрано`}
            </span>
          )}
        </div>
        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </>
    );
  }

  function TriggerIcon() {
    return (
      <>
        {isPendingRouter ? (
          <Loader2 className="w-12 animate-spin" />
        ) : (
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <div className="flex p-2">
                  <Filter />
                  <span className="text-sm">
                    {selectedValues.length > 0 && `${selectedValues.length}`}
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="bg-accent text-foreground font-OpenSans cursor-help font-normal"
              >
                <p>{placeholder}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </>
    );
  }

  return (
    <div className={cn("relative max-w-[280px] popper-fit", className)}>
      <Popover open={openCombobox} onOpenChange={onComboboxOpenChange}>
        <div className="flex items-center gap-1">
          <PopoverTrigger asChild>
            <Button
              variant={icon ? "ghost" : "outline"}
              role="combobox"
              aria-expanded={openCombobox}
              className={cn(
                "flex-1 text-muted-foreground hover:text-background relative justify-between border-border h-10 rounded-3xl",
                selectedValues.length > 0 ? "w-[90%]" : "w-full",
                icon && "p-0",
              )}
            >
              {icon ? <TriggerIcon /> : <TriggerButton />}
            </Button>
          </PopoverTrigger>

          {selectedValues.length > 0 ? (
            <span
              className="text-muted-foreground hover:text-foreground flex cursor-pointer flex-col items-center text-[11px] underline transition-all hover:scale-125 md:text-xs"
              onClick={clearItems}
            >
              <X className="h-5 w-5" />
            </span>
          ) : null}
        </div>
        <PopoverContent
          className={cn(
            "font-Din p-0 w-full max-w-[41rem] rounded-2xl", 
            icon ? "md:min-w-[400px]" : ""
          )}
          side={side}
          align={align}
          inPortal={false}
        >
          <Command loop className="rounded-2xl">
            <div className="relative">
              <CommandInput
                ref={inputRef}
                className={cn(
                  "w-5/6 rounded-2xl",
                  isPendingSearch ? "cursor-wait" : "cursor-text",
                )}
                placeholder={dict.Inputs.search}
                value={inputSearch}
                onValueChange={(input) => handleSearch(input)}
              />
              {isPendingSearch ? (
                <div className="absolute right-2 top-[10px]">
                  <Loader2 className="animate-spin" />
                </div>
              ) : inputSearch.length > 0 ? (
                <X
                  className="absolute right-3 top-[14px] z-50 h-4 w-4 cursor-pointer opacity-50 transition-all hover:scale-125 hover:opacity-100"
                  onClick={() => handleSearch("")}
                />
              ) : null}
            </div>
            <CommandList>
              <CommandEmpty>
                <div className="flex flex-col items-center gap-1 text-center">
                  <SearchX size={20} />
                  <h2 className="font-Cera text-sm font-medium">
                    {dict.NotFound.title}
                  </h2>
                </div>
              </CommandEmpty>
              <CommandGroup>
                <ScrollArea type="always" classNameViewport="max-h-[220px] py-0.5">
                  {items?.map((item, index) => {
                    // includes() doesn't work with object, so we do this:
                    const isActive = selectedValues.some(
                      (elem) => elem.value === item.value,
                    );
                    return (
                      <CommandItem
                        key={index}
                        value={item.label}
                        className={cn(
                          "rounded-xl",
                          isPendingRouter || isPendingSearch
                            ? "cursor-wait opacity-30"
                            : "cursor-pointer opacity-100",
                        )}
                        onSelect={() => toggleItem(item)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            isActive ? "opacity-100" : "opacity-0",
                          )}
                        />
                        <div className="flex-1">
                          {item.label}
                        </div>
                        <div
                          className="h-4 w-4 rounded-full"
                        />
                      </CommandItem>
                    );
                  })}
                </ScrollArea>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {badges ? (
        <ScrollArea type="always" classNameViewport="max-h-[105px] mt-3">
          {selectedValues.length > 1
            ? selectedValues.map((item, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="relative mb-2 mr-2 py-1 pl-2 pr-7 text-[10px]"
                >
                  {item.label}{" "}
                  <XCircle
                    className="absolute right-[1px] h-5 w-5 cursor-pointer"
                    onClick={() => toggleItem(item)}
                  />
                </Badge>
              ))
            : null}
        </ScrollArea>
      ) : null}
    </div>
  );
}
