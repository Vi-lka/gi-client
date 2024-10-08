import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import React from 'react'
import { useFormStatus } from 'react-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';
import { CircleHelp } from 'lucide-react';

type ComboboxFieldProps = {
  data: {
    value: string,
    label: string,
    description?: string | null
  }[],
  disabled: boolean | undefined,
  defaultValue: string,
  placeholder?: React.ReactNode,
  className?: string,
  onSelect: (value: string) => void,
  onBlur?: React.FocusEventHandler<HTMLButtonElement>
}

export default function ComboboxField({
  data, 
  disabled,
  defaultValue,
  placeholder,
  className, 
  onSelect,
  onBlur,
}: ComboboxFieldProps) {
  const { pending } = useFormStatus();
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(defaultValue)
 
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild  disabled={disabled || pending} onBlur={onBlur}>
        <Button
          disabled={disabled || pending}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-full px-3 justify-between bg-input rounded-lg border-border shadow-sm font-normal', className)}
        >
          {value
            ? <p className='truncate min-w-0'>{data.find((item) => item.value === value)?.label}</p>
            : <span className='text-muted-foreground'>{placeholder}</span>
          }
          <CaretSortIcon className="ml-2 h-4 w-4 opacity-50 flex-none" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] rounded-2xl">
        <Command className='rounded-2xl'>
          <CommandInput placeholder="Поиск..." disabled={disabled || pending} />
          <CommandList>
            <CommandEmpty>Не найдено</CommandEmpty>
            <CommandGroup className='py-1 px-[3px]'>
              {data.map((item, indx) => (
                <ComboboxItem 
                    key={indx} 
                    item={item} 
                    value={value}
                    disabled={disabled || pending}
                    onSelect={() => {
                        setValue(item.value === value ? "" : item.value)
                        setOpen(false)
                        onSelect(item.value === value ? "" : item.value)
                    }}
                />
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

function ComboboxItem({
    item,
    disabled,
    value,
    onSelect
}: {
    item: {
        value: string;
        label: string;
        description?: string | null;
    },
    disabled: boolean,
    value: string,
    onSelect: ((value: string) => void) | undefined
}) {
    const triggerRef = React.useRef(null);

    if (item.description) return(
        <CommandItem
          disabled={disabled}
          value={item.value}
          onSelect={onSelect}
          className='rounded-xl'
        >
          <CheckIcon
            className={cn(
              "mr-2 h-4 w-4 flex-none",
              value === item.value ? "opacity-100" : "opacity-0"
            )}
          />
          <span className='w-full'>{item.label}</span>
          <TooltipProvider delayDuration={150}>
            <Tooltip>
              <TooltipTrigger 
                className='flex-1 cursor-help'
                ref={triggerRef}
                onClick={(event) => {
                  event.stopPropagation()
                  event.preventDefault()
                }}
              >
                <CircleHelp className='w-4 h-4' />
              </TooltipTrigger>
              <TooltipContent 
                side='top'
                sideOffset={10}
                className='w-full max-w-[--radix-popover-trigger-width] max-h-[--radix-tooltip-content-available-height]'
                onPointerDownOutside={(event) => {
                  if (event.target === triggerRef.current) event.preventDefault();
                }}
              >
                <p>{item.description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CommandItem>
    ) 
    else return (
        <CommandItem
          disabled={disabled}
          value={item.value}
          onSelect={onSelect}
          className='rounded-xl'
        >
          <CheckIcon
            className={cn(
              "mr-2 h-4 w-4 flex-none",
              value === item.value ? "opacity-100" : "opacity-0"
            )}
          />
          {item.label}
        </CommandItem>
    )
}
