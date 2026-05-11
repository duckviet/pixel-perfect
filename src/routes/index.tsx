import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Award,
  Users,
  Target,
  ArrowRight,
  Sparkles,
  Trophy,
  CheckCircle2,
} from "lucide-react";
import { GlassCard } from "@/components/common/GlassCard";
import { CRITERIA, CriterionBadge } from "@/components/common/CriterionBadge";
import { ACTIVITIES, LEADERBOARD, STATS } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bản đồ 5 Tốt — Hành trình Sinh viên 5 Tốt ULIS" },
      {
        name: "description",
        content:
          "Một nền tảng. Năm tiêu chí. Vô vàn hoạt động. Bắt đầu hành trình SV5T của bạn ngay hôm nay.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = ACTIVITIES.slice(0, 3);

  return (
    <div className="hero-bg">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 pt-20 pb-24 lg:px-8 lg:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-primary" strokeWidth={1.5} />
              ULIS · VNU · Mùa SV5T 2025–2026
            </span>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] md:text-6xl lg:text-7xl">
              Một <span className="text-gradient italic">bản đồ</span>,
              <br /> năm tiêu chí, <br /> vô vàn hành trình.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Bản đồ 5 Tốt giúp sinh viên ULIS theo dõi tiêu chí, khám phá
              hoạt động phù hợp và lưu trữ minh chứng — tất cả tại một nơi.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--gradient-primary)] px-6 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.02]"
              >
                Đăng ký ngay
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
              <Link
                to="/activities"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-6 py-3 text-sm font-medium backdrop-blur transition-colors hover:bg-background"
              >
                Khám phá hoạt động
              </Link>
            </div>
          </div>

          {/* STATS */}
          <div className="mx-auto mt-20 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">
            <StatCard
              icon={Target}
              label="Hoạt động đang diễn ra"
              value={STATS.totalActivities}
            />
            <StatCard
              icon={Users}
              label="Sinh viên đang tham gia"
              value={STATS.totalParticipants.toLocaleString("vi-VN")}
            />
            <StatCard
              icon={Award}
              label="Đã hoàn thành 5 tiêu chí"
              value={STATS.totalCompleted}
            />
          </div>
        </div>
      </section>

      {/* CRITERIA */}
      <section className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
        <SectionHeader
          eyebrow="Năm tiêu chí"
          title="Cấu trúc danh hiệu Sinh viên 5 Tốt"
          description="Mỗi sinh viên cần đạt cả 5 tiêu chí — từ đạo đức tới hội nhập — ở cấp độ tương ứng để được xét chọn."
        />
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {CRITERIA.map((c, i) => (
            <GlassCard key={c.id} className="group p-6 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]">
              <div
                className="grid h-10 w-10 place-items-center rounded-xl text-sm font-semibold"
                style={{
                  backgroundColor: `color-mix(in oklab, ${c.colorVar} 15%, transparent)`,
                  color: c.colorVar,
                }}
              >
                0{i + 1}
              </div>
              <h3 className="mt-5 text-lg font-semibold">{c.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {c.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* FEATURED ACTIVITIES */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeader
            eyebrow="Đang diễn ra"
            title="Hoạt động nổi bật"
            description="Những hoạt động được nhiều sinh viên ULIS quan tâm tuần này."
            align="left"
          />
          <Link
            to="/activities"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary"
          >
            Xem tất cả
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {featured.map((a) => (
            <Link
              key={a.id}
              to="/activities/$slug"
              params={{ slug: a.slug }}
              className="group block"
            >
              <GlassCard className="overflow-hidden p-0 transition-all group-hover:-translate-y-1 group-hover:shadow-[var(--shadow-glow)]">
                <div
                  className="aspect-[16/10] w-full"
                  style={{ backgroundImage: a.thumbnailGradient }}
                />
                <div className="p-6">
                  <div className="flex flex-wrap gap-1.5">
                    {a.criteria.map((c) => (
                      <CriterionBadge key={c} type={c} />
                    ))}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold leading-tight">
                    {a.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                    {a.shortDescription}
                  </p>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>

      {/* LEADERBOARD */}
      <section className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHeader
              eyebrow="Bảng xếp hạng"
              title="Những ULISer dẫn đầu"
              description="Xếp hạng tính theo số hoạt động đã có minh chứng được duyệt trong học kỳ."
              align="left"
            />
            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-border bg-surface/60 p-5 backdrop-blur">
              <Trophy className="h-9 w-9 text-rose" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-semibold">Cập nhật mỗi 24 giờ</p>
                <p className="text-xs text-muted-foreground">
                  Dựa trên minh chứng đã được cán bộ duyệt
                </p>
              </div>
            </div>
          </div>

          <GlassCard className="overflow-hidden p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/60 bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-6 py-4">#</th>
                  <th className="px-6 py-4">Sinh viên</th>
                  <th className="px-6 py-4">Đơn vị</th>
                  <th className="px-6 py-4 text-right">Hoạt động</th>
                </tr>
              </thead>
              <tbody>
                {LEADERBOARD.map((row) => (
                  <tr
                    key={row.rank}
                    className="border-b border-border/40 last:border-0 transition-colors hover:bg-accent/40"
                  >
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                          row.rank <= 3
                            ? "bg-[var(--gradient-primary)] text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {row.rank}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">{row.name}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {row.unit}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-semibold">
                      {row.count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </GlassCard>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-24 lg:px-8">
        <div className="gradient-shell">
          <div className="relative overflow-hidden p-12 md:p-16">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--gradient-primary)] opacity-20 blur-3xl" />
            <div className="relative max-w-xl">
              <h2 className="font-display text-4xl md:text-5xl">
                Sẵn sàng bắt đầu <span className="text-gradient italic">hành trình</span>?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Tạo tài khoản miễn phí, đồng bộ minh chứng và xem chính xác bạn
                còn cách danh hiệu SV5T bao xa.
              </p>
              <ul className="mt-6 space-y-2 text-sm">
                {[
                  "Theo dõi tiến độ qua ma trận 5 tiêu chí × 4 cấp",
                  "Lưu trữ minh chứng PDF/JPG/PNG an toàn",
                  "Gợi ý hoạt động phù hợp tiêu chí còn thiếu",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" strokeWidth={1.5} />
                    {t}
                  </li>
                ))}
              </ul>
              <Link
                to="/register"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--gradient-primary)] px-6 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)]"
              >
                Tạo tài khoản
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Target;
  label: string;
  value: string | number;
}) {
  return (
    <GlassCard className="p-6">
      <div className="flex items-center gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--gradient-primary)] text-primary-foreground">
          <Icon className="h-5 w-5" strokeWidth={1.5} />
        </div>
        <div>
          <div className="font-display text-3xl">{value}</div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            {label}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 font-display text-4xl md:text-5xl">{title}</h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
