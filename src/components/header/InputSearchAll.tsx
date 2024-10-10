import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputSearchAll = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, children, ...props }, ref) => (
    <div
      className={cn(
        "border-input flex h-10 w-full items-center rounded-md border px-3 py-2 text-sm transition-all disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    >
      <Search className="sm:h-4 sm:w-4 h-3 w-3 flex-none" />
      <input
        type="search"
        className="placeholder:text-muted-foreground ml-0 flex h-full w-full rounded-md bg-transparent p-2 pl-1 pr-0 text-sm outline-none placeholder:text-sm placeholder:uppercase disabled:cursor-not-allowed sm:ml-1 sm:pl-2"
        ref={ref}
        {...props} 
      />
      {children}
    </div>
  ),
);
InputSearchAll.displayName = "InputSearchAll";

export { InputSearchAll };
