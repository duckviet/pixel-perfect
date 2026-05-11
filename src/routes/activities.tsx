import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Calendar, MapPin } from "lucide-react";
import { useMemo, useState } from "react";
import { GlassCard } from "@/components/common/GlassCard";
import { CriterionBadge } from "@/components/common/CriterionBadge";
import { CRITERIA, type CriterionType } from "@/lib/criteria";
import { ACTIVITIES, REVIEW_LEVELS } from "@/lib/mock-data";
import { SectionHeader } from "./index";

export const Route = createFileRoute("/activities")({
  head: () => ({
    meta: [
      { title: "Hoạt động — Bản đồ 5 Tốt" },
      {
        name: "description",
        content:
          "Khám phá các hoạt động phù hợp với 5 tiêu chí Sinh viên 5 Tốt: học tập, đạo đức, thể lực, tình nguyện, hội nhập.",
      },
    ],
  }),
  component: ActivitiesPage,
});

function ActivitiesPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<CriterionType | "ALL">("ALL");

  const filtered = useMemo(() => {
    return ACTIVITIES.filter((a) => {
      const matchQ =
        !query ||
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.shortDescription.toLowerCase().includes(query.toLowerCase());
      const matchC = filter === "ALL" || a.criteria.includes(filter);
      return matchQ && matchC;
    });
  }, [query, filter]);

  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 pt-16 pb-10 lg:px-8">
        <SectionHeader
          eyebrow="Khám phá"
          title="Hoạt động phù hợp với bạn"
          description="Tìm kiếm và lọc hoạt động theo từng tiêu chí. Mỗi hoạt động dẫn đến link đăng ký chính thức của đơn vị tổ chức."
        />
      </section>

      <section className="mx-auto max-w-7xl px-4 lg:px-8">
        <GlassCard className="flex flex-col gap-4 p-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm hoạt động theo tên..."
              className="h-11 w-full rounded-full border border-border bg-background pl-11 pr-4 text-sm outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            <FilterChip active={filter === "ALL"} onClick={() => setFilter("ALL")}>
              Tất cả
            </FilterChip>
            {CRITERIA.map((c) => (
              <FilterChip
                key={c.id}
                active={filter === c.id}
                onClick={() => setFilter(c.id)}
              >
                {c.short}
              </FilterChip>
            ))}
          </div>
        </GlassCard>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 pb-24 lg:px-8">
        {filtered.length === 0 ? (
          <GlassCard className="p-16 text-center">
            <p className="text-sm text-muted-foreground">
              Không có hoạt động nào khớp với tìm kiếm của bạn.
            </p>
          </GlassCard>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((a) => (
              <Link
                key={a.id}
                to="/activities/$slug"
                params={{ slug: a.slug }}
                className="group block"
              >
                <GlassCard className="h-full overflow-hidden p-0 transition-all group-hover:-translate-y-1 group-hover:shadow-[var(--shadow-glow)]">
                  <div
                    className="aspect-[16/10] w-full"
                    style={{ backgroundImage: a.thumbnailGradient }}
                  />
                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {a.criteria.map((c) => (
                        <CriterionBadge key={c} type={c} />
                      ))}
                      <span className="ml-auto text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                        {REVIEW_LEVELS[a.reviewLevel]}
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold leading-tight">
                      {a.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {a.shortDescription}
                    </p>
                    <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" strokeWidth={1.5} />
                        {new Date(a.startAt).toLocaleDateString("vi-VN")}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} />
                        {a.organizer.split("–")[0].trim()}
                      </span>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
        active
          ? "bg-[var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]"
          : "bg-background text-muted-foreground hover:bg-accent hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
