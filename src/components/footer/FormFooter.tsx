"use client"

import React, { useEffect } from 'react'
import ContactForm from '../forms/ContactForm'
import { useToast } from '../ui/use-toast';
import { useFormState } from 'react-dom';
import { sendEmail } from '@/app/[locale]/actions';
import { getShortDescription } from '@/lib/utils';
import { usePathname } from '@/navigation';

export default function FormFooter({
    formTitle,
    formDescription,
}: {
    formTitle: string | null,
    formDescription: string | null,
}) {
    const { toast } = useToast();

    const pathname = usePathname();

    const [sendEmailState, sendEmailAction] = useFormState(sendEmail, {
        error: null,
        success: false
    })

    useEffect(() => {
        if (sendEmailState.success) {
            toast({
                title: "Успешно!",
                description: "Email отправлен.",
                className: "font-Din text-background dark:text-foreground bg-lime-600 dark:bg-lime-800 border-none",
            });
        }
        if (sendEmailState.error) {
            toast({
                variant: "destructive",
                title: "Oшибка!",
                description: <p>{getShortDescription(sendEmailState.error, 50)}</p>,
                className: "font-Din",
            });
        }
    }, [sendEmailState.error, sendEmailState.success, toast])

    const handleAction = (formData: FormData) => {
        sendEmailAction({
            place: "Footer",
            path: pathname,
            username: formData.get("username") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
            formTitle: formTitle,
            formDescription: formDescription,
        })
    }

    return (
        <ContactForm handleAction={handleAction} className='w-full' />
    )
}
