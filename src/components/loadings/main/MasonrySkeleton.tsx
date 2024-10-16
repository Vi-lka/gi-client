import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import React from "react";

export default function MasonrySkeleton({
    className
}: {
    className?: string
}) {
  return (
    <div className={cn("mx-auto w-full min-[768px]:columns-2 columns-1 gap-6", className)}>
      <Skeleton className="rounded-3xl aspect-video w-full" />
      <Skeleton className="rounded-3xl mt-6 aspect-square w-full" />
      <Skeleton className="rounded-3xl mt-6 aspect-square w-full" />
      <Skeleton className="rounded-3xl mt-6 aspect-video w-full" />
      <Skeleton className="rounded-3xl mt-6 aspect-square w-full" />
      <Skeleton className="rounded-3xl mt-6 aspect-video w-full" />

      <Skeleton className="rounded-3xl mt-6 aspect-square w-full" />
      <Skeleton className="rounded-3xl mt-6 aspect-square w-full" />
      <Skeleton className="rounded-3xl mt-6 aspect-video w-full" />
      <Skeleton className="rounded-3xl mt-6 aspect-square w-full" />
      <Skeleton className="rounded-3xl mt-6 aspect-video w-full" />
      <Skeleton className="rounded-3xl mt-6 aspect-square w-full" />

      <Skeleton className="rounded-3xl mt-6 aspect-square w-full" />
      <Skeleton className="rounded-3xl mt-6 aspect-video w-full" />
      <Skeleton className="rounded-3xl mt-6 aspect-square w-full" />
      <Skeleton className="rounded-3xl mt-6 aspect-square w-full" />
      <Skeleton className="rounded-3xl mt-6 aspect-video w-full" />
      <Skeleton className="rounded-3xl mt-6 aspect-square w-full" />
    </div>
  );
}
