import * as React from "react";
import { cn } from "@/lib/utils";

export interface FieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

const Field = React.forwardRef<HTMLInputElement, FieldProps>(
  ({ className, label, error, helperText, id: providedId, ...props }, ref) => {
    const generatedId = React.useId();
    const id = providedId || generatedId;

    return (
      <div className="flex flex-col gap-2 w-full">
        <label 
          htmlFor={id}
          className="font-mono text-[11px] font-medium tracking-[0.06em] uppercase text-ink"
        >
          {label}
        </label>
        <input
          id={id}
          className={cn(
            "w-full border-[1.5px] border-ink bg-cream-2 px-4 py-[14px] font-mono text-[13px] text-ink placeholder:text-ink-4 focus:border-orange focus:outline-none transition-colors disabled:opacity-50",
            error && "border-error",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <span className="font-mono text-[11px] text-error">
            {error}
          </span>
        )}
        {!error && helperText && (
          <span className="font-mono text-[11px] text-ink-3">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);
Field.displayName = "Field";

export { Field };
