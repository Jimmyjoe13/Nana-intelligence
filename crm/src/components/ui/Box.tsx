import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const boxVariants = cva(
  "border-[1.5px] border-ink rounded-none p-6 transition-colors",
  {
    variants: {
      variant: {
        default: "bg-cream text-ink",
        soft: "bg-cream-2 text-ink",
        ink: "bg-ink text-cream",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BoxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof boxVariants> {}

function Box({ className, variant, ...props }: BoxProps) {
  return (
    <div className={cn(boxVariants({ variant, className }))} {...props} />
  );
}

export { Box, boxVariants };
