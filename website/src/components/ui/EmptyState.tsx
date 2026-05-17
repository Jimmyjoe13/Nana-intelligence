import * as React from "react";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

function EmptyState({ title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-20 px-6 gap-6",
        className
      )}
    >
      <div className="flex flex-col gap-3">
        <h2 className="font-display text-[28px] md:text-[36px] font-medium leading-tight text-ink">
          {title}
        </h2>
        <p className="font-sans text-[16px] text-ink-3 max-w-[400px]">
          {description}
        </p>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export { EmptyState };
