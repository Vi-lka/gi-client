import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-3xl bg-primary/15 dark:bg-primary/10", className)}
      {...props}
    />
  )
}

export { Skeleton }
