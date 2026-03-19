import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div className={cn("rounded-lg border border-border bg-background p-6 shadow-sm", className)}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: CardProps) {
  return (
    <div className={cn("mb-4", className)}>{children}</div>
  );
}

export function CardTitle({ className, children }: CardProps) {
  return (
    <h3 className={cn("font-semibold text-lg", className)}>{children}</h3>
  );
}

export function CardContent({ className, children }: CardProps) {
  return (
    <div className={cn("", className)}>{children}</div>
  );
}
