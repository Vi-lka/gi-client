import { cn } from "@/lib/utils";

export function TypographyH1({ className, children }: { className?: string, children?: React.ReactNode }) {
    return (
        <h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", className)}>
            {children}
        </h1>
    )
}

export function TypographyH2({ className, children }: { className?: string, children?: React.ReactNode }) {
    return (
        <h2 className={cn("scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0", className)}>
           {children}
        </h2>
    )
}

export function TypographyH3({ className, children }: { className?: string, children?: React.ReactNode }) {
    return (
        <h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)}>
            {children}
        </h3>
    )
}

export function TypographyH4({ className, children }: { className?: string, children?: React.ReactNode }) {
    return (
        <h4 className={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)}>
            {children}
        </h4>
    )
}

export function TypographyP({ className, children }: { className?: string, children?: React.ReactNode }) {
    return (
        <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}>
            {children}
        </p>
    )
}

export function TypographyBlockquote({ className, children }: { className?: string, children?: React.ReactNode }) {
    return (
        <blockquote className={cn("mt-6 border-l-2 pl-6 italic", className)}>
            {children}
        </blockquote>
    )
}

export function TypographyList({ className, children }: { className?: string, children?: React.ReactNode }) {
    return (
        <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}>
            {children}
        </ul>
    )
}

export function TypographyLead({ className, children }: { className?: string, children?: React.ReactNode }) {
    return (
        <p className={cn("text-xl text-muted-foreground", className)}>
            {children}
        </p>
    )
}