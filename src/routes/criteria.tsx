import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Download, Eye, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/common/GlassCard";
import { CRITERIA_DOCS } from "@/lib/mock-data";
import { SectionHeader } from "./index";

const LEVEL_MAP: Record<string, string> = {
  "Cấp Trường ĐHNN": "TRUONG",
  "Cấp ĐHQGHN": "DHQGHN",
  "Cấp Thành phố / Trung ương": "THANH_PHO",
};

export const Route = createFileRoute("/criteria")({
  head: () => ({
    meta: [
      { title: "Tiêu chí — Bản đồ 5 Tốt" },
      {
        name: "description",
        content:
          "Thư viện tài liệu PDF hướng dẫn và quy chế xét chọn danh hiệu Sinh viên 5 Tốt theo từng cấp.",
      },
    ],
  }),
  component: CriteriaPage,
});

function CriteriaPage() {
  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 pt-16 pb-12 lg:px-8">
        <SectionHeader
          eyebrow="Tài liệu chính thức"
          title="Tiêu chí Sinh viên 5 Tốt"
          description="Tổng hợp quy chế, tiêu chuẩn và mẫu hồ sơ xét chọn danh hiệu SV5T do nhà trường, ĐHQGHN và Trung ương ban hành."
        />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 lg:px-8 space-y-12">
        {CRITERIA_DOCS.map((group) => {
          const levelParam = LEVEL_MAP[group.level];
          return (
            <div key={group.level}>
              <div className="mb-5 flex items-baseline gap-3">
                <h3 className="font-display text-2xl">{group.level}</h3>
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  {group.docs.length} tài liệu
                </span>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {group.docs.map((doc) => (
                  <GlassCard key={doc.title} className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-rose/10 text-rose">
                        <FileText className="h-5 w-5" strokeWidth={1.5} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-semibold leading-snug">{doc.title}</h4>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Phiên bản {doc.year} · PDF
                        </p>
                        <div className="mt-4 flex gap-2">
                          <button className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground transition-colors hover:bg-accent/70">
                            <Eye className="h-3.5 w-3.5" strokeWidth={1.5} />
                            Xem
                          </button>
                          <button className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent">
                            <Download className="h-3.5 w-3.5" strokeWidth={1.5} />
                            Tải về
                          </button>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
              {levelParam && (
                <Link
                  to="/activities"
                  search={{ level: levelParam }}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  Xem hoạt động {group.level.toLowerCase()}
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </Link>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}
