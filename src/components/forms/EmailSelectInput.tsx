import React from 'react'
import { InputField } from './InputField'
import { useFormContext } from 'react-hook-form';
import type { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { cn } from '@/lib/utils';

export default function EmailSelectInput<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
    field,
    placeholder,
    disabled
}: {
    field: ControllerRenderProps<TFieldValues, TName>;
    placeholder: string;
    disabled: boolean;
}) {

    const form = useFormContext();

    return (
        <div className={cn(
            'flex items-center justify-between gap-0.5 bg-input rounded-3xl border border-border shadow-sm',
            disabled && "cursor-not-allowed opacity-50"
        )}>
            <InputField 
                placeholder={placeholder}
                disabled={disabled}
                className='!border-none focus:!border-none hover:!border-none focus:!ring-0 pr-0 rounded-3xl rounded-r-none text-end'
                {...field}
            />
            <Select disabled={disabled} defaultValue='@sfu-kras.ru' onValueChange={(value) => form.setValue("emailStud", value)}>
                <SelectTrigger className="bg-input rounded-3xl rounded-l-none !border-none focus:!border-none hover:!border-none focus:!ring-0 flex-1 pl-0">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent className='rounded-2xl'>
                    <SelectGroup>
                        <SelectItem className='rounded-xl cursor-pointer focus:bg-primary focus:text-primary-foreground' value="@sfu-kras.ru">@sfu-kras.ru</SelectItem>
                        <SelectItem className='rounded-xl cursor-pointer focus:bg-primary focus:text-primary-foreground' value="@stud.sfu-kras.ru">@stud.sfu-kras.ru</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}
