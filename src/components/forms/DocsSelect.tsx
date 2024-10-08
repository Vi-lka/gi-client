import { useLocale } from '@/lib/hooks/useLocale'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import useSWR from 'swr'
import { Skeleton } from '../ui/skeleton'
import ErrorToast from '../errors/ErrorToast'
import { cn } from '@/lib/utils'
import ComboboxField from '../ui/combobox-field'


type DocsSelectData = {
  docs: {
    data: {
      attributes: {
        items: {
          title: string,
          description: string | null
        }[]
      }
    }
  }
}

export default function DocsSelect({
    name,
    defaultValue,
    disabled,
    placeholder,
    className
  }: {
    name: string,
    defaultValue: string,
    disabled: boolean,
    placeholder: string,
    className?: string
  }) {
  
    const locale = useLocale();
  
    const form = useFormContext();
  
    const { data, error, isLoading } = useSWR<DocsSelectData, Error>(
      `query DocsSelect {
        docs(locale: "${locale}") {
          data {
            attributes {
              items {
                title
                description
              }
            }
          }
        }
      }`
    );
  
    if (isLoading) return <Skeleton className='rounded-3xl border-border shadow-sm h-9 w-full'/>
    if (error) {
      return <ErrorToast error={error.message} place="Docs" returnNull />;
    }
    if (!data || !data.docs.data || (data.docs.data.attributes.items.length === 0)) {
      return null;
    }
  
    const dataForField = data.docs.data.attributes.items.map(item => {
      return {value: item.title, label: item.title, description: item.description}
    })
  
    return (
      <>
          <ComboboxField
            data={dataForField}
            disabled={disabled}
            defaultValue={defaultValue}
            placeholder={placeholder}
            className={cn('bg-input rounded-3xl border-border shadow-sm', className)}
            onBlur={() => void form.trigger(name)}
            onSelect={(value) => form.setValue(name, value, {shouldDirty: true, shouldTouch: true, shouldValidate: true})}
          />
      </>
    )
  }
