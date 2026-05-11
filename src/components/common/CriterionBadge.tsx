import { CRITERIA, type CriterionType, getCriterion } from "@/lib/criteria";
import { cn } from "@/lib/utils";

export function CriterionBadge({
  type,
  className,
}: {
  type: CriterionType;
  className?: string;
}) {
  const c = getCriterion(type);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        className,
      )}
      style={{
        backgroundColor: `color-mix(in oklab, ${c.colorVar} 12%, transparent)`,
        color: c.colorVar,
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: c.colorVar }}
      />
      {c.short}
    </span>
  );
}

export { CRITERIA };
