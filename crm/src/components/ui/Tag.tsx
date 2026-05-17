import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tagVariants = cva(
  "inline-flex items-center gap-1.5 whitespace-nowrap px-[10px] py-[5px] font-mono text-[11px] font-medium tracking-[0.06em] uppercase border-[1.5px] rounded-pill transition-colors",
  {
    variants: {
      variant: {
        outline: "bg-transparent text-ink border-ink",
        solid: "bg-ink text-cream border-ink",
        orange: "bg-orange text-ink border-ink",
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  }
);

export interface TagProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagVariants> {
  dot?: boolean;
}

function Tag({ className, variant, dot, children, ...props }: TagProps) {
  return (
    <div className={cn(tagVariants({ variant, className }))} {...props}>
      {dot && (
        <span className="h-1.5 w-1.5 rounded-full bg-orange animate-pulse" />
      )}
      {children}
    </div>
  );
}

export { Tag, tagVariants };
