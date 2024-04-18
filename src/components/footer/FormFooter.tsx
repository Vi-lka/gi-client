"use client"

import React, { useEffect } from 'react'
import ContactForm from '../forms/ContactForm'
import { useToast } from '../ui/use-toast';
import { useFormState } from 'react-dom';
import { sendEmail } from '@/app/[locale]/actions';
import { getShortText } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useDictionary } from '../providers/DictionaryProvider';

type Props = {
    formTitle: string | null,
    formDescription: string | null,
}

export default function FormFooter({
    formTitle,
    formDescription,
}: Props) {
    const dict = useDictionary()

    const { toast } = useToast();

    const pathname = usePathname();

    const [sendEmailState, sendEmailAction] = useFormState(sendEmail, {
        error: null,
        success: false
    })

    useEffect(() => {
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
