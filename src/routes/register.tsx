import { createFileRoute, Link } from "@tanstack/react-router";
import { GlassCard } from "@/components/common/GlassCard";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Đăng ký — Bản đồ 5 Tốt" }] }),
  component: () => (
    <div className="mx-auto max-w-md px-4 py-24 lg:px-8">
      <GlassCard className="p-10 text-center">
        <h1 className="font-display text-3xl">Đăng ký tài khoản</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Form đăng ký sẽ được kích hoạt khi backend xác thực được tích hợp.
        </p>
        <Link to="/" className="mt-6 inline-block text-sm text-primary">
          ← Về trang chủ
        </Link>
      </GlassCard>
    </div>
  ),
});
