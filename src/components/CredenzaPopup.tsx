import React from 'react'
import { Credenza, CredenzaBody, CredenzaContent, CredenzaDescription, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from './ui/credenza'

export default function CredenzaPopup({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children
}: {
  open?: boolean,
  onOpenChange?: ((open: boolean) => void),
  trigger: React.ReactNode,
  title: string,
  description?: string,
  children: React.ReactNode,
}) {
  return (
    <Credenza noBodyStyles open={open} onOpenChange={onOpenChange}>
      <CredenzaTrigger asChild>
        {trigger}
      </CredenzaTrigger>
      <CredenzaContent className='sm:rounded-3xl rounded-3xl md:p-8'>
        <CredenzaHeader className='mb-1'>
          <CredenzaTitle>{title}</CredenzaTitle>
          <CredenzaDescription className='whitespace-pre-wrap'>
            {description}
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          {children}
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  )
}
