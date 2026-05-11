import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

const NAV = [
  { to: "/", label: "Trang chủ", exact: true },
  { to: "/criteria", label: "Tiêu chí" },
  { to: "/activities", label: "Hoạt động" },
  { to: "/notifications", label: "Thông báo" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]">
            <Sparkles className="h-4 w-4" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-lg">Bản đồ 5 Tốt</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
              ULIS · VNU
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.exact ?? false }}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground data-[status=active]:bg-accent data-[status=active]:text-accent-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="hidden rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:block"
          >
            Đăng nhập
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center justify-center rounded-full bg-[var(--gradient-primary)] px-4 py-2 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.02]"
          >
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </header>
  );
}
