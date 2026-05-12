import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  Mail,
  Trophy,
  ScrollText,
  Building2,
  Upload,
  Clock,
  Users,
  MapPin,
  CircleCheck as CheckCircle2,
  ArrowRight,
  Share2,
  Flag,
} from "lucide-react";
import { useMemo } from "react";
import { GlassCard } from "@/components/common/GlassCard";
import { CriterionBadge } from "@/components/common/CriterionBadge";
import { ActivityThumbnail } from "@/components/common/ActivityThumbnail";
import { useRegisteredActivities } from "@/hooks/use-registered-activities";
import { getCriterion } from "@/lib/criteria";
import { ACTIVITIES, REVIEW_LEVELS, type Activity } from "@/lib/mock-data";

export const Route = createFileRoute("/activities/$slug")({
  loader: ({ params }): Activity => {
    const activity = ACTIVITIES.find((a) => a.slug === params.slug);
    if (!activity) throw notFound();
    return activity;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Bản đồ 5 Tốt` },
          { name: "description", content: loaderData.shortDescription },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.shortDescription },
        ]
      : [{ title: "Hoạt động — Bản đồ 5 Tốt" }],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-32 text-center">
      <h1 className="font-display text-4xl">Không tìm thấy hoạt động</h1>
      <Link to="/activities" className="mt-6 inline-block text-primary">
        ← Quay lại danh sách
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-2xl px-4 py-32 text-center">
      <h1 className="font-display text-3xl">Có lỗi xảy ra</h1>
      <p className="mt-2 text-muted-foreground">{error.message}</p>
    </div>
  ),
  component: ActivityDetailPage,
});

function ActivityDetailPage() {
  const a = Route.useLoaderData() as Activity;
  const { isRegistered, register } = useRegisteredActivities();
  const registered = isRegistered(a.slug);

  const related = useMemo(
    () =>
      ACTIVITIES.filter(
        (other) =>
          other.id !== a.id &&
          other.criteria.some((c) => a.criteria.includes(c)),
      ).slice(0, 3),
    [a],
  );

  const status = getActivityStatus(a);
  const daysLeft = getDaysLeft(a);

  return (
    <div>
      {/* Back nav */}
      <div className="mx-auto max-w-6xl px-4 pt-10 lg:px-8">
        <Link
          to="/activities"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          Tất cả hoạt động
        </Link>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-6 lg:px-8">
        <div className="gradient-shell">
          <div className="overflow-hidden p-0">
            <ActivityThumbnail
              gradient={a.thumbnailGradient}
              criteria={a.criteria}
              registered={registered}
            />
            <div className="p-8 md:p-12">
              {/* Tags row */}
              <div className="flex flex-wrap items-center gap-2">
                {a.criteria.map((c) => (
                  <CriterionBadge key={c} type={c} />
                ))}
                <span className="rounded-full border border-border px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  {REVIEW_LEVELS[a.reviewLevel]}
                </span>
                <StatusBadge status={status} />
              </div>

              {/* Title */}
              <h1 className="mt-5 font-display text-4xl leading-tight md:text-5xl">
                {a.title}
              </h1>
              <p className="mt-4 max-w-3xl text-base text-muted-foreground md:text-lg">
                {a.shortDescription}
              </p>

              {/* Quick info pills */}
              <div className="mt-6 flex flex-wrap gap-3">
                <InfoPill icon={Calendar} label={`${formatDate(a.startAt)} — ${formatDate(a.endAt)}`} />
                <InfoPill icon={Building2} label={a.organizer.split("–")[0].trim()} />
                {daysLeft !== null && (
                  <InfoPill
                    icon={Clock}
                    label={daysLeft > 0 ? `Còn ${daysLeft} ngày` : "Đã hết hạn"}
                    accent={daysLeft <= 7 && daysLeft > 0}
                  />
                )}
              </div>

              {/* CTA row */}
              <div className="mt-8 flex flex-wrap gap-3">
                {registered ? (
                  <button
                    disabled
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-glow)]"
                  >
                    <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
                    Đã đăng ký
                  </button>
                ) : (
                  <button
                    onClick={() => register(a.slug)}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-glow)] transition-all hover:bg-primary/90 hover:scale-[1.02]"
                  >
                    Tham gia ngay
                    <ExternalLink className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                )}
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium transition-colors hover:bg-accent"
                >
                  <Upload className="h-4 w-4" strokeWidth={1.5} />
                  Nộp minh chứng
                </Link>
                <button className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-3 text-sm font-medium transition-colors hover:bg-accent">
                  <Share2 className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Body: two-column layout */}
      <section className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          {/* Main content */}
          <div className="space-y-6">
            <DetailSection icon={ScrollText} title="Mô tả chi tiết">
              <p className="leading-relaxed text-muted-foreground">{a.description}</p>
            </DetailSection>
            <DetailSection icon={Flag} title="Thể lệ & Quy định">
              <p className="leading-relaxed text-muted-foreground">{a.rules}</p>
            </DetailSection>
            <DetailSection icon={Trophy} title="Cơ cấu giải thưởng">
              <p className="leading-relaxed text-muted-foreground">{a.rewards}</p>
            </DetailSection>

            {/* Timeline */}
            <DetailSection icon={Clock} title="Tiến trình thời gian">
              <div className="relative pl-6">
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
                <TimelineItem
                  label="Mở đăng ký"
                  date={a.startAt}
                  active={status === "OPEN" || status === "ENDED"}
                />
                <TimelineItem
                  label="Đóng đăng ký"
                  date={a.endAt}
                  active={status === "ENDED"}
                />
                <TimelineItem
                  label="Công bố kết quả"
                  date={addDays(a.endAt, 7)}
                  active={false}
                />
              </div>
            </DetailSection>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Contact card */}
            <GlassCard className="p-6">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Thông tin liên hệ
              </h4>
              <dl className="mt-4 space-y-4 text-sm">
                <InfoRow icon={Calendar} label="Thời gian">
                  {formatDate(a.startAt)} — {formatDate(a.endAt)}
                </InfoRow>
                <InfoRow icon={Building2} label="Đơn vị tổ chức">
                  {a.organizer}
                </InfoRow>
                <InfoRow icon={Mail} label="Liên hệ">
                  {a.contactInfo}
                </InfoRow>
              </dl>
            </GlassCard>

            {/* Criteria card */}
            <GlassCard className="p-6">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Tiêu chí áp dụng
              </h4>
              <div className="mt-4 space-y-3">
                {a.criteria.map((c) => {
                  const criterion = getCriterion(c);
                  return (
                    <div key={c} className="flex items-center gap-3">
                      <div
                        className="h-2.5 w-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: criterion.colorVar }}
                      />
                      <div>
                        <p className="text-sm font-medium">{criterion.label}</p>
                        <p className="text-xs text-muted-foreground">
                          {criterion.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Hoàn thành hoạt động này được tính cho{" "}
                {a.criteria.length === 1 ? "1 tiêu chí" : `${a.criteria.length} tiêu chí`}{" "}
                ở {REVIEW_LEVELS[a.reviewLevel]}.
              </p>
            </GlassCard>

            {/* Quick actions card */}
            <GlassCard className="p-6">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Hành động nhanh
              </h4>
              <div className="mt-4 space-y-2">
                {registered ? (
                  <button
                    disabled
                    className="flex w-full items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
                  >
                    <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
                    Bạn đã đăng ký hoạt động này
                  </button>
                ) : (
                  <button
                    onClick={() => register(a.slug)}
                    className="flex w-full items-center gap-2 rounded-xl bg-primary/10 px-4 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
                  >
                    <ExternalLink className="h-4 w-4" strokeWidth={1.5} />
                    Đăng ký tham gia
                  </button>
                )}
                <Link
                  to="/login"
                  className="flex w-full items-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/70"
                >
                  <Upload className="h-4 w-4" strokeWidth={1.5} />
                  Nộp minh chứng
                </Link>
              </div>
            </GlassCard>
          </aside>
        </div>
      </section>

      {/* Related activities */}
      {related.length > 0 && (
        <section className="section-alt">
          <div className="mx-auto max-w-6xl px-4 py-16 lg:px-8">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  Liên quan
                </span>
                <h2 className="mt-3 font-display text-3xl md:text-4xl">
                  Hoạt động cùng tiêu chí
                </h2>
              </div>
              <Link
                to="/activities"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary"
              >
                Xem tất cả
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to="/activities/$slug"
                  params={{ slug: r.slug }}
                  className="group block"
                >
                  <GlassCard className="overflow-hidden p-0 transition-all group-hover:-translate-y-1 group-hover:shadow-[var(--shadow-glow)]">
                    <ActivityThumbnail
                      gradient={r.thumbnailGradient}
                      criteria={r.criteria}
                      registered={isRegistered(r.slug)}
                    />
                    <div className="p-5">
                      <div className="flex flex-wrap gap-1.5">
                        {r.criteria.map((c) => (
                          <CriterionBadge key={c} type={c} />
                        ))}
                      </div>
                      <h3 className="mt-3 text-base font-semibold leading-tight">
                        {r.title}
                      </h3>
                      <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                        {r.shortDescription}
                      </p>
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

/* ── Sub-components ─────────────────────────────────────── */

function DetailSection({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof ScrollText;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <GlassCard className="p-7">
      <div className="flex items-center gap-2.5">
        <Icon className="h-4 w-4 text-primary" strokeWidth={1.5} />
        <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          {title}
        </h3>
      </div>
      <div className="mt-4">{children}</div>
    </GlassCard>
  );
}

function InfoRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Calendar;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={1.5} />
      <div>
        <dt className="text-xs uppercase tracking-wider text-muted-foreground">
          {label}
        </dt>
        <dd className="mt-0.5 leading-relaxed">{children}</dd>
      </div>
    </div>
  );
}

function InfoPill({
  icon: Icon,
  label,
  accent,
}: {
  icon: typeof Calendar;
  label: string;
  accent?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${
        accent
          ? "bg-rose/10 text-rose"
          : "bg-muted text-muted-foreground"
      }`}
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
      {label}
    </span>
  );
}

function StatusBadge({ status }: { status: "OPEN" | "UPCOMING" | "ENDED" }) {
  const config = {
    OPEN: { label: "Đang mở", className: "bg-emerald-500/15 text-emerald-700" },
    UPCOMING: { label: "Sắp diễn ra", className: "bg-amber-500/15 text-amber-700" },
    ENDED: { label: "Đã kết thúc", className: "bg-muted text-muted-foreground" },
  };
  const { label, className } = config[status];
  return (
    <span className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest ${className}`}>
      {label}
    </span>
  );
}

function TimelineItem({
  label,
  date,
  active,
}: {
  label: string;
  date: string;
  active: boolean;
}) {
  return (
    <div className="relative pb-6 last:pb-0">
      <div
        className={`absolute left-[-17px] top-1.5 h-3 w-3 rounded-full border-2 ${
          active
            ? "border-primary bg-primary"
            : "border-border bg-background"
        }`}
      />
      <p className="text-sm font-medium">{label}</p>
      <p className="text-xs text-muted-foreground">{formatDate(date)}</p>
    </div>
  );
}

/* ── Helpers ─────────────────────────────────────────────── */

function getActivityStatus(a: Activity): "OPEN" | "UPCOMING" | "ENDED" {
  const now = new Date();
  const start = new Date(a.startAt);
  const end = new Date(a.endAt);
  if (now < start) return "UPCOMING";
  if (now > end) return "ENDED";
  return "OPEN";
}

function getDaysLeft(a: Activity): number | null {
  const now = new Date();
  const end = new Date(a.endAt);
  const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return diff >= 0 ? diff : null;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}
