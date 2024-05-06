"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

type InputSearchProps = React.InputHTMLAttributes<HTMLInputElement>;

const InputSearch = React.forwardRef<HTMLInputElement, InputSearchProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        className={cn(
          "border-border ring-offset-background hover:ring-ring flex h-10 w-full items-center rounded-3xl border px-3 py-2 text-sm hover:ring-1 ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
      >
        {children}
        <input
          type="search"
          className="placeholder:text-muted-foreground ml-2 flex h-full w-full rounded-3xl bg-transparent p-3 lg:text-base text-sm outline-none disabled:cursor-not-allowed"
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
InputSearch.displayName = "InputSearch";

export { InputSearch };
