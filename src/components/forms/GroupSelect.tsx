"use client"

import React from 'react';
import useSWR from 'swr';
import { Skeleton } from '@/components/ui/skeleton';
import ErrorToast from '@/components/errors/ErrorToast';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { useLocale } from '@/lib/hooks/useLocale';
import ComboboxField from '../ui/combobox-field';

type GroupSelectData = {
    groups: {
    data: {
      id: string,
      attributes: {
        title: string
      }
    }[]
  }
}

export default function GroupSelect({
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

  const { data, error, isLoading } = useSWR<GroupSelectData, Error>(
    `query GroupsSelect {
      groups(locale: "${locale}") {
        data {
          id
          attributes {
            title
          }
        }
      }
    }`
  );

  if (isLoading) return <Skeleton className='rounded-3xl border-border shadow-sm h-9 w-full'/>
  if (error) {
    return <ErrorToast error={error.message} place="Groups" returnNull />;
  }
  if (!data || !data.groups.data || (data.groups.data.length === 0)) {
    return null;
  }

  const dataForField = data.groups.data.map(item => {
    return {value: item.attributes.title, label: item.attributes.title}
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