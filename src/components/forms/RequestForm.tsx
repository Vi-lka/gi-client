"use client"

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { cn, getShortText } from '@/lib/utils'
import SubmitButton from './SubmitButton'
import { InputField } from './InputField'
import type { z } from 'zod'
import { useDictionary } from '../providers/DictionaryProvider'
import { DocRequestFormT } from '@/lib/types/components'
import GroupSelect from './GroupSelect'
import DocsSelect from './DocsSelect'
import { Checkbox } from '../ui/checkbox'
import EmailSelectInput from './EmailSelectInput'
import { useToast } from '../ui/use-toast'
import { usePathname } from 'next/navigation'
import { useFormState } from 'react-dom'
import { sendRequest } from '@/app/[locale]/actions'

export default function RequestForm({
    className,
}: {
    className?: string,
}) {
    const dict = useDictionary()

    const { toast } = useToast();

    const pathname = usePathname();

    const [sendEmailState, sendEmailAction] = useFormState(sendRequest, {
        error: null,
        success: false
    })

    React.useEffect(() => {
        if (sendEmailState.success) {
            toast({
                title: dict.ContactForm.sendMessage.success.title,
                description: dict.ContactForm.sendMessage.success.description,
                className: "font-Din text-background dark:text-foreground bg-lime-600 dark:bg-lime-800 border-none",
            });
        }
        if (sendEmailState.error) {
            toast({
                variant: "destructive",
                title: dict.ContactForm.sendMessage.error,
                description: <p>{getShortText(sendEmailState.error, 50)}</p>,
                className: "font-Din",
            });
        }
    }, [sendEmailState.error, sendEmailState.success, toast, dict.ContactForm.sendMessage])

    const form = useForm<z.infer<typeof DocRequestFormT>>({
        resolver: zodResolver(DocRequestFormT),
        defaultValues: {
            name: "",
            lastname: "",
            noPatronymic: false,
            patronymic: "",
            group: "",
            email: "",
            emailStud: "@sfu-kras.ru",
            phone: "",
            request: "",
        },
        mode: 'onChange',
    })

    const handleAction = () => {
        const values = form.getValues()
        sendEmailAction({
            to: "mmazaeva@sfu-kras.ru",
            path: pathname,
            name: values.name,
            lastname: values.lastname,
            noPatronymic: values.noPatronymic,
            patronymic: values.noPatronymic ? "" : values.patronymic,
            group: values.group,
            email: values.email,
            emailStud: values.emailStud,
            phone: values.phone,
            request: values.request,
        })
    }

    return (
        <Form {...form}>
            <form 
                action={handleAction}
                className={cn("space-y-6", className)}
            >
                <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <InputField 
                                    placeholder={dict.ContactForm.form.lastname}
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
                    name="name"
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
                <div className='flex flex-col items-end gap-2'>
                    <FormField
                        control={form.control}
                        name="patronymic"
                        render={({ field }) => (
                            <FormItem className='flex-1 w-full'>
                                <FormControl>
                                    <InputField 
                                        placeholder={dict.ContactForm.form.patronymic}
                                        disabled={form.formState.isSubmitting || form.getValues("noPatronymic")}
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
                        name="noPatronymic"
                        render={({ field }) => (
                            <FormItem className="flex flex-row justify-center items-center space-x-1 space-y-0">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        disabled={form.formState.isSubmitting}
                                        onCheckedChange={field.onChange}
                                        onClick={() => form.resetField("patronymic")}
                                    />
                                </FormControl>
                                <FormLabel className='text-xs leading-none'>
                                    {dict.ContactForm.form.noPatronymic}
                                </FormLabel>
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="group"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <GroupSelect 
                                    name="group"
                                    defaultValue={field.value}
                                    placeholder={dict.ContactForm.form.group}
                                    disabled={form.formState.isSubmitting}
                                    className='bg-input rounded-3xl border-border shadow-sm'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='flex sm:flex-row flex-col gap-2'>
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem className='sm:w-1/3'>
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
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className='sm:w-2/3'>
                                <FormControl>
                                    <EmailSelectInput 
                                        placeholder={dict.ContactForm.form.email}
                                        disabled={form.formState.isSubmitting}
                                        field={field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="request"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <DocsSelect
                                    name="request"
                                    defaultValue={field.value}
                                    placeholder={dict.ContactForm.form.request}
                                    disabled={form.formState.isSubmitting}
                                    className='bg-input rounded-3xl border-border shadow-sm'
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
