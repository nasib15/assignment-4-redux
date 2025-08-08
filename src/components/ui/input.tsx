import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground/60 selection:bg-primary selection:text-primary-foreground bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-border/50 flex h-11 w-full min-w-0 rounded-xl border-2 px-4 py-3 text-base shadow-md transition-all duration-300 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus:border-primary focus:shadow-lg focus:bg-white dark:focus:bg-slate-800 hover:border-border/70 hover:shadow-md",
          "aria-invalid:border-destructive aria-invalid:shadow-red-100",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
