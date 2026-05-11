import { Heart, BookOpen, Dumbbell, HandHeart, Globe, CircleCheck as CheckCircle2 } from "lucide-react";
import type { CriterionType } from "@/lib/criteria";

const CRITERION_ICONS: Record<CriterionType, typeof Heart> = {
  DAO_DUC: Heart,
  HOC_TAP: BookOpen,
  THE_LUC: Dumbbell,
  TINH_NGUYEN: HandHeart,
  HOI_NHAP: Globe,
};

export function ActivityThumbnail({
  gradient,
  criteria,
  registered,
}: {
  gradient: string;
  criteria: CriterionType[];
  registered?: boolean;
}) {
  const primaryCriterion = criteria[0];
  const Icon = primaryCriterion ? CRITERION_ICONS[primaryCriterion] : null;

  return (
    <div
      className="relative aspect-[16/10] w-full overflow-hidden"
      style={{ backgroundImage: gradient }}
    >
      {Icon && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon
            className="h-16 w-16 text-white/25"
            strokeWidth={1}
          />
        </div>
      )}
      {registered && (
        <div className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/90 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
          <CheckCircle2 className="h-3 w-3" strokeWidth={2} />
          Đã đăng ký
        </div>
      )}
    </div>
  );
}
