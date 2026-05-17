import React from "react";
import { cn } from "@/lib/utils";

export interface PageHeaderProps {
  kicker: string;
  title: string;
  emphasis?: string;
  description?: string;
  actions?: React.ReactNode[];
  className?: string;
}

export function PageHeader({
  kicker,
  title,
  emphasis,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-10 w-full", className)}>
      <div className="flex flex-col gap-3">
        <span className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-orange">
          {kicker}
        </span>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-4">
            <h1 className="font-display text-[44px] md:text-[56px] font-medium leading-[0.95] tracking-[-0.025em] text-ink">
              {title}{" "}
              {emphasis && (
                <span className="italic text-orange font-normal">{emphasis}</span>
              )}
            </h1>
            {description && (
              <p className="font-sans text-[16px] leading-normal text-ink-3 max-w-[600px]">
                {description}
              </p>
            )}
          </div>
          {actions && actions.length > 0 && (
            <div className="flex items-center gap-4">
              {actions.map((action, index) => (
                <React.Fragment key={index}>{action}</React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="h-[1.5px] w-full bg-ink" />
    </div>
  );
}
