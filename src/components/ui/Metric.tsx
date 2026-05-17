import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const metricValueVariants = cva(
  "font-display font-medium leading-none tracking-[-0.02em]",
  {
    variants: {
      size: {
        sm: "text-[36px]",
        md: "text-[64px]",
        lg: "text-[72px]",
        xl: "text-[96px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface MetricProps extends VariantProps<typeof metricValueVariants> {
  label: string;
  value: string | number;
  suffix?: string;
  prefix?: string;
  trend?: string;
  trendVariant?: "positive" | "negative" | "neutral";
  className?: string;
}

function Metric({
  label,
  value,
  suffix,
  prefix,
  trend,
  trendVariant = "neutral",
  size,
  className,
}: MetricProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <span className="font-mono text-[11px] font-medium tracking-[0.06em] uppercase text-ink-3">
        {label}
      </span>
      <div className={cn(metricValueVariants({ size }), "text-ink")}>
        {prefix && <span className="text-orange">{prefix}</span>}
        {value}
        {suffix && <span className="text-orange">{suffix}</span>}
      </div>
      {trend && (
        <span
          className={cn(
            "font-mono text-[11px] font-medium tracking-[0.06em]",
            trendVariant === "positive" && "text-orange",
            trendVariant === "negative" && "text-error",
            trendVariant === "neutral" && "text-ink-3"
          )}
        >
          {trend}
        </span>
      )}
    </div>
  );
}

export { Metric };
