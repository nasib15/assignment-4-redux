import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      data-slot="textarea"
      className={cn(
        "border-border/50 placeholder:text-muted-foreground/60 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm flex field-sizing-content min-h-20 w-full rounded-xl border-2 px-4 py-3 text-base shadow-md transition-all duration-300 outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-y",
        "focus:border-primary focus:shadow-lg focus:bg-white dark:focus:bg-slate-800 hover:border-border/70 hover:shadow-md",
        "aria-invalid:border-destructive aria-invalid:shadow-red-100",
        className
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
