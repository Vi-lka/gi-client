"use client"

import { sendEmail } from '@/app/[locale]/actions';
import ContactForm from '@/components/forms/ContactForm';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { cn, getShortDescription } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useFormState } from 'react-dom';

type Props = {
    buttonTitle: string | null,
    buttonLink: string | null,
    inNewTab: boolean | null,
    listLength: number,
    formTitle: string | null,
    formDescription: string | null,
}

export default function ButtonForm({
    buttonTitle,
    buttonLink,
    inNewTab,
    listLength,
    formTitle,
    formDescription,
}: Props) {
    const dict = useDictionary()

    const [open, setOpen] = useState(false);

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
            setOpen(false)
        }
        if (sendEmailState.error) {
            toast({
                variant: "destructive",
                title: dict.ContactForm.sendMessage.error,
                description: <p>{getShortDescription(sendEmailState.error, 50)}</p>,
                className: "font-Din",
            });
            setOpen(false)
        }
    }, [sendEmailState.error, sendEmailState.success, toast, dict.ContactForm.sendMessage])

    const handleAction = (formData: FormData) => {
        sendEmailAction({
            place: "FormBlock",
            path: pathname,
            username: formData.get("username") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
            formTitle: formTitle,
            formDescription: formDescription,
        })
    }

    if (!buttonTitle) return null;

    if (buttonLink && buttonLink.length > 1) return (
        <Link 
            href={buttonLink} 
            target={inNewTab ? "_blank" : "_self"} 
            passHref 
            className={cn(
                'w-full z-10',
                listLength === 4 ? "lg:w-1/4" : "lg:w-1/5"
            )}
        >
            <Button className='w-full p-6 uppercase rounded-3xl text-primary bg-background border hover:border-background hover:text-background dark:text-background dark:bg-primary dark:hover:text-primary dark:hover:bg-transparent dark:hover:border-primary'>
                {buttonTitle}
            </Button>
        </Link>
    )
    else return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className={cn(
                    'w-full p-6 uppercase rounded-3xl text-primary bg-background border hover:border-background hover:text-background z-10',
                    "dark:text-background dark:bg-primary dark:hover:text-primary dark:hover:bg-transparent dark:hover:border-primary",
                    listLength === 4 ? "lg:w-1/4" : "lg:w-1/5 "
                )}>
                    {buttonTitle}
                </Button>
            </DialogTrigger>
            <DialogContent className='!rounded-3xl md:p-8'>
                <DialogHeader className='mb-1'>
                    <DialogTitle>{formTitle}</DialogTitle>
                    <DialogDescription>{formDescription}</DialogDescription>
                </DialogHeader>
                <ContactForm handleAction={handleAction} />
            </DialogContent>
        </Dialog>
    )
}
