import { createFileRoute, Link } from "@tanstack/react-router";
import { GlassCard } from "@/components/common/GlassCard";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Đăng nhập — Bản đồ 5 Tốt" }] }),
  component: () => (
    <div className="mx-auto max-w-md px-4 py-24 lg:px-8">
      <GlassCard className="p-10 text-center">
        <h1 className="font-display text-3xl">Đăng nhập</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Tính năng đăng nhập sẽ được kích hoạt ở giai đoạn tiếp theo của dự án.
        </p>
        <Link to="/" className="mt-6 inline-block text-sm text-primary">
          ← Về trang chủ
        </Link>
      </GlassCard>
    </div>
  ),
});
