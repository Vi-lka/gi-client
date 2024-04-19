"use client"

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { cn } from '@/lib/utils'
import SubmitButton from './SubmitButton'
import { InputField } from './InputField'
import type { z } from 'zod'
import { useDictionary } from '../providers/DictionaryProvider'
import { ContactFormT } from '@/lib/types/components'

export default function ContactForm({
    handleAction,
    className,
}: {
    handleAction: (formData: FormData) => void,
    className?: string,
}) {
    const dict = useDictionary()

    const form = useForm<z.infer<typeof ContactFormT>>({
        resolver: zodResolver(ContactFormT),
        defaultValues: {
            username: "",
            email: "",
            phone: ""
        },
        mode: 'onBlur',
    })

    return (
        <Form {...form}>
            <form 
                action={handleAction}
                className={cn("space-y-6", className)}
            >
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <InputField 
                                    placeholder={dict.ContactForm.form.name}
                                    disabled={form.formState.isSubmitting}
                                    className='bg-input rounded-3xl border-border shadow-sm'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <InputField 
                                    placeholder={dict.ContactForm.form.email}
                                    disabled={form.formState.isSubmitting}
                                    className='bg-input rounded-3xl border-border shadow-sm'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <InputField 
                                    placeholder={dict.ContactForm.form.phone}
                                    disabled={form.formState.isSubmitting}
                                    className='bg-input rounded-3xl border-border shadow-sm'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <SubmitButton 
                    disabled={!(form.formState.isDirty && form.formState.isValid) || form.formState.isSubmitting}
                    className='px-8 lg:float-start float-end'
                >
                    {dict.ContactForm.form.send}
                </SubmitButton>
            </form>
        </Form>
    )
}