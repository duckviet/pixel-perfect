import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function GlassCard({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("glass-card", className)} {...props} />;
}

export function GradientShellCard({
  className,
  children,
  innerClassName,
}: {
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("gradient-shell", className)}>
      <div className={cn("p-10", innerClassName)}>{children}</div>
    </div>
  );
}
