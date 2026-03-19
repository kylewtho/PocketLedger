import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("rounded-xl border border-border bg-background p-6 shadow-sm", className)}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export const CardHeader = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children }, ref) => {
    return (
      <div ref={ref} className={cn("mb-4 space-y-1.5", className)}>
        {children}
      </div>
    );
  }
);

CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardProps>(
  ({ className, children }, ref) => {
    return (
      <h3 ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)}>
        {children}
      </h3>
    );
  }
);

CardTitle.displayName = "CardTitle";

export const CardContent = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children }, ref) => {
    return (
      <div ref={ref} className={cn(className)}>
        {children}
      </div>
    );
  }
);

CardContent.displayName = "CardContent";
