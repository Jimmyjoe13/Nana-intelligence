"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn, trackEvent } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-mono text-[12px] font-medium tracking-[0.08em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange disabled:pointer-events-none disabled:opacity-50 border-[1.5px] rounded-none",
  {
    variants: {
      variant: {
        primary: "bg-orange text-ink border-ink hover:bg-ink hover:text-cream",
        ghost: "bg-transparent text-ink border-ink hover:bg-ink hover:text-cream",
        ink: "bg-ink text-cream border-ink hover:bg-orange hover:text-ink",
      },
      size: {
        sm: "px-3 py-1.5",
        md: "px-[22px] py-[14px]",
        lg: "px-8 py-4 text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  icon?: React.ReactNode;
  trackLabel?: string;
  sectionId?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, icon, children, trackLabel, sectionId, onClick, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (trackLabel) {
        trackEvent("cta_click", {
          cta_text: trackLabel,
          section_id: sectionId || "unknown"
        });
      }
      if (onClick) onClick(e);
    };

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        onClick={handleClick}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            {children}
            {icon && <span className="flex-shrink-0">{icon}</span>}
          </>
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
