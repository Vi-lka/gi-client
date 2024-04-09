import { cn } from '@/lib/utils'
import React from 'react'
import { Input } from '../ui/input'
import { useFormStatus } from 'react-dom';

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputField = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, disabled, ...props }, ref) => {
    const { pending } = useFormStatus();

    return (
        <Input 
            ref={ref}
            type={type}
            disabled={disabled || pending}
            className={cn('bg-input rounded-3xl border-border shadow-sm', className)}
            {...props}
        />
    )
  }
)
InputField.displayName = "InputField"

export { InputField }
