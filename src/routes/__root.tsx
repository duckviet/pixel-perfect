import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Không tìm thấy trang</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Trang bạn đang tìm không tồn tại hoặc đã được di chuyển.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-[var(--gradient-primary)] px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)]"
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl">Trang này không tải được</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Đã có lỗi xảy ra. Bạn có thể thử lại hoặc quay lại trang chủ.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-[var(--gradient-primary)] px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Thử lại
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-border bg-background px-4 py-2 text-sm font-medium"
          >
            Về trang chủ
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "bd5t" },
      {
        name: "description",
        content:
          "Nền tảng đồng hành cùng sinh viên ULIS theo dõi tiêu chí, hoạt động và tiến độ Sinh viên 5 Tốt.",
      },
      { property: "og:title", content: "bd5t" },
      {
        property: "og:description",
        content:
          "Một bản đồ, năm tiêu chí: tra cứu hoạt động, lưu minh chứng, theo dõi tiến độ SV5T.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "bd5t" },
      { name: "description", content: "Pixel Perfect is a web application that precisely replicates visual designs using a React-based framework." },
      { property: "og:description", content: "Pixel Perfect is a web application that precisely replicates visual designs using a React-based framework." },
      { name: "twitter:description", content: "Pixel Perfect is a web application that precisely replicates visual designs using a React-based framework." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b6421115-fe3e-4816-b310-7a91392c0631/id-preview-38fd208e--af8b158d-1890-4409-9333-5f48f16da430.lovable.app-1778524556142.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b6421115-fe3e-4816-b310-7a91392c0631/id-preview-38fd208e--af8b158d-1890-4409-9333-5f48f16da430.lovable.app-1778524556142.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
