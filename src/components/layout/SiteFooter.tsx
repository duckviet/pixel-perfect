import { Mail, Facebook, Users } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border/60 bg-surface/60 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-3 lg:px-8">
        <div>
          <div className="font-display text-2xl text-gradient">Bản đồ 5 Tốt</div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Nền tảng đồng hành cùng sinh viên ULIS trên hành trình hoàn thành
            danh hiệu Sinh viên 5 Tốt – một bản đồ, một mục tiêu, năm tiêu chí.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Liên hệ
          </h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-primary" strokeWidth={1.5} />
              sinhvien5tot.ulis@gmail.com
            </li>
            <li className="flex items-center gap-2.5">
              <Facebook className="h-4 w-4 text-primary" strokeWidth={1.5} />
              fb.com/sv5tot.ulis
            </li>
            <li className="flex items-center gap-2.5">
              <Users className="h-4 w-4 text-primary" strokeWidth={1.5} />
              Cộng đồng SV5T ULIS
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Đơn vị
          </h4>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Đoàn TN – Hội SV Trường Đại học Ngoại ngữ, Đại học Quốc gia Hà Nội.
            Số 2 Phạm Văn Đồng, Cầu Giấy, Hà Nội.
          </p>
        </div>
      </div>
      <div className="border-t border-border/60 py-5">
        <p className="text-center text-xs text-muted-foreground">
          © 2026 Bản đồ 5 Tốt — ULIS, VNU. Made with care for ULISers.
        </p>
      </div>
    </footer>
  );
}
