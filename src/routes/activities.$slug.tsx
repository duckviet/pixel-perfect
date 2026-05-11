import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar, ExternalLink, Mail, Trophy, ScrollText, Building2, Upload, CircleCheck as CheckCircle2 } from "lucide-react";
import { GlassCard } from "@/components/common/GlassCard";
import { CriterionBadge } from "@/components/common/CriterionBadge";
import { ActivityThumbnail } from "@/components/common/ActivityThumbnail";
import { useRegisteredActivities } from "@/hooks/use-registered-activities";
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

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 lg:px-8 lg:py-16">
      <Link
        to="/activities"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
        Tất cả hoạt động
      </Link>

      {/* Hero */}
      <div className="mt-6 gradient-shell">
        <div className="overflow-hidden p-0">
          <ActivityThumbnail
            gradient={a.thumbnailGradient}
            criteria={a.criteria}
            registered={registered}
          />
          <div className="p-8 md:p-12">
            <div className="flex flex-wrap items-center gap-2">
              {a.criteria.map((c) => (
                <CriterionBadge key={c} type={c} />
              ))}
              <span className="rounded-full border border-border px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                {REVIEW_LEVELS[a.reviewLevel]}
              </span>
            </div>
            <h1 className="mt-5 font-display text-4xl leading-tight md:text-5xl">
              {a.title}
            </h1>
            <p className="mt-4 max-w-3xl text-base text-muted-foreground md:text-lg">
              {a.shortDescription}
            </p>

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
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mt-10 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6">
          <Section icon={ScrollText} title="Mô tả">
            <p className="leading-relaxed text-muted-foreground">{a.description}</p>
          </Section>
          <Section icon={ScrollText} title="Thể lệ">
            <p className="leading-relaxed text-muted-foreground">{a.rules}</p>
          </Section>
          <Section icon={Trophy} title="Cơ cấu giải thưởng">
            <p className="leading-relaxed text-muted-foreground">{a.rewards}</p>
          </Section>
        </div>

        <aside className="space-y-4">
          <GlassCard className="p-6">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Thông tin
            </h4>
            <dl className="mt-4 space-y-4 text-sm">
              <InfoRow icon={Calendar} label="Thời gian">
                {new Date(a.startAt).toLocaleDateString("vi-VN")} —{" "}
                {new Date(a.endAt).toLocaleDateString("vi-VN")}
              </InfoRow>
              <InfoRow icon={Building2} label="Đơn vị tổ chức">
                {a.organizer}
              </InfoRow>
              <InfoRow icon={Mail} label="Liên hệ">
                {a.contactInfo}
              </InfoRow>
            </dl>
          </GlassCard>

          <GlassCard className="p-6">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Tiêu chí áp dụng
            </h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {a.criteria.map((c) => (
                <CriterionBadge key={c} type={c} />
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Hoàn thành hoạt động này có thể được tính cho{" "}
              {a.criteria.length === 1 ? "tiêu chí" : `${a.criteria.length} tiêu chí`}{" "}
              ở {REVIEW_LEVELS[a.reviewLevel]}.
            </p>
          </GlassCard>
        </aside>
      </div>
    </div>
  );
}

function Section({
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
