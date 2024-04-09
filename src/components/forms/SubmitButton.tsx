'use client'

import React from 'react'
import { Button } from '../ui/button'
import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SubmitButton({
    disabled,
    className,
    children,
}: {
    disabled?: boolean,
    className?: string,
    children?: React.ReactNode,
}) {

    const { pending } = useFormStatus();

    return (
        <Button 
            type="submit"
            disabled={disabled || pending}
            className={cn('uppercase rounded-3xl', className)}
        >
            {pending ? <Loader2 className="animate-spin" /> : children}
        </Button>
    )
}
