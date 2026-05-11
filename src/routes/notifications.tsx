import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell } from "lucide-react";
import { GlassCard } from "@/components/common/GlassCard";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [{ title: "Thông báo — Bản đồ 5 Tốt" }],
  }),
  component: () => (
    <div className="mx-auto max-w-3xl px-4 py-32 lg:px-8">
      <GlassCard className="p-12 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[var(--gradient-primary)] text-primary-foreground">
          <Bell className="h-6 w-6" strokeWidth={1.5} />
        </div>
        <h1 className="mt-6 font-display text-3xl">Thông báo của bạn</h1>
        <p className="mt-3 text-muted-foreground">
          Đăng nhập để xem các thông báo về hoạt động mới, deadline và gợi ý phù hợp.
        </p>
        <Link
          to="/login"
          className="mt-7 inline-flex rounded-full bg-[var(--gradient-primary)] px-6 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)]"
        >
          Đăng nhập
        </Link>
      </GlassCard>
    </div>
  ),
});
