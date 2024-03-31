"use client"

import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const formSchema = z.object({
    username: z.string().min(2, {
      message: "Введите не менее 2х символов",
    }),
    email: z.string().email({ message: "Не верно введен email" }),
    phone: z.string().regex(phoneRegex, 'Не верно введен номер телефона'),
  })

export default function ContactForm({
    className,
}: {
    className?: string
}) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            phone: "",
        },
        mode: 'onBlur',
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <Form {...form}>
            <form 
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onSubmit={form.handleSubmit(onSubmit)} 
                className={cn("space-y-6", className)}
            >
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input 
                                    placeholder="ФИО"
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
                                <Input 
                                    placeholder="E-mail"
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
                                <Input 
                                    placeholder="Телефон"
                                    disabled={form.formState.isSubmitting}
                                    className='bg-input rounded-3xl border-border shadow-sm'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button 
                    type="submit"
                    disabled={!(form.formState.isDirty && form.formState.isValid) || form.formState.isSubmitting}
                    className='px-8 uppercase rounded-3xl lg:float-start float-end'
                >
                    Отправить
                </Button>
            </form>
        </Form>
    )
}
