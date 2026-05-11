import type { CriterionType } from "./criteria";

export type Activity = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  rules: string;
  rewards: string;
  organizer: string;
  contactInfo: string;
  registrationUrl: string;
  startAt: string;
  endAt: string;
  reviewLevel: "TRUONG" | "DHQGHN" | "THANH_PHO" | "TRUNG_UONG";
  criteria: CriterionType[];
  thumbnailGradient: string;
};

export const REVIEW_LEVELS: Record<Activity["reviewLevel"], string> = {
  TRUONG: "Cấp Trường",
  DHQGHN: "Cấp ĐHQGHN",
  THANH_PHO: "Cấp Thành phố",
  TRUNG_UONG: "Cấp Trung ương",
};

export const ACTIVITIES: Activity[] = [
  {
    id: "1",
    slug: "ulis-charity-run-2026",
    title: "ULIS Charity Run 2026",
    shortDescription:
      "Giải chạy gây quỹ thường niên của Trường Đại học Ngoại ngữ.",
    description:
      "ULIS Charity Run 2026 quy tụ hơn 2000 sinh viên, giảng viên và cựu sinh viên cùng chạy bộ vì các em nhỏ vùng cao. Mỗi km chạy được quy đổi thành học bổng và thiết bị học tập.",
    rules:
      "Sinh viên đăng ký theo cá nhân hoặc đội 5 người. Hoàn thành tối thiểu 5km trong vòng 30 ngày qua app chạy được chỉ định.",
    rewards:
      "Top 100 cá nhân và Top 10 đội nhận giấy chứng nhận, áo kỷ niệm và điểm rèn luyện.",
    organizer: "Đoàn Thanh niên Trường ĐHNN – ĐHQGHN",
    contactInfo: "doanthanhnien.ulis@vnu.edu.vn · 024 6666 8888",
    registrationUrl: "https://ulis.vnu.edu.vn/charity-run",
    startAt: "2026-05-20",
    endAt: "2026-06-20",
    reviewLevel: "TRUONG",
    criteria: ["THE_LUC", "TINH_NGUYEN"],
    thumbnailGradient:
      "linear-gradient(135deg, oklch(0.85 0.15 30), oklch(0.75 0.18 350))",
  },
  {
    id: "2",
    slug: "english-debate-championship",
    title: "ULIS English Debate Championship",
    shortDescription:
      "Giải tranh biện tiếng Anh dành cho sinh viên các khoa ngôn ngữ.",
    description:
      "Cuộc thi tranh biện theo thể thức British Parliamentary, kéo dài 4 vòng loại và chung kết. Cơ hội cọ xát với sinh viên các trường ngoại ngữ trên cả nước.",
    rules:
      "Sinh viên đăng ký theo đội 2 người. Vòng loại online, vòng chung kết tổ chức tại Hội trường Vũ Đình Liên.",
    rewards: "Giải Nhất 10.000.000đ và suất tham gia trại hè ngôn ngữ tại Singapore.",
    organizer: "Khoa NN&VH các nước nói tiếng Anh – ULIS",
    contactInfo: "english.debate@ulis.vnu.edu.vn",
    registrationUrl: "https://ulis.vnu.edu.vn/debate",
    startAt: "2026-06-01",
    endAt: "2026-07-15",
    reviewLevel: "DHQGHN",
    criteria: ["HOC_TAP", "HOI_NHAP"],
    thumbnailGradient:
      "linear-gradient(135deg, oklch(0.78 0.18 280), oklch(0.82 0.15 220))",
  },
  {
    id: "3",
    slug: "mua-he-xanh-2026",
    title: "Mùa hè xanh – Tình nguyện vùng cao 2026",
    shortDescription: "Hành trình tình nguyện 2 tuần tại các tỉnh miền núi phía Bắc.",
    description:
      "Đoàn tình nguyện sẽ giảng dạy tiếng Anh, sửa sang trường lớp và tổ chức sân chơi cho các em nhỏ tại Hà Giang, Cao Bằng.",
    rules:
      "Yêu cầu sức khỏe tốt, có kỹ năng giảng dạy hoặc tổ chức hoạt động. Phỏng vấn xét tuyển sau khi đăng ký.",
    rewards: "Giấy chứng nhận của TW Đoàn, điểm rèn luyện loại A, học bổng tiếp sức.",
    organizer: "Hội Sinh viên Trường ĐHNN – ĐHQGHN",
    contactInfo: "hoisv.ulis@vnu.edu.vn",
    registrationUrl: "https://ulis.vnu.edu.vn/mua-he-xanh",
    startAt: "2026-07-10",
    endAt: "2026-07-25",
    reviewLevel: "TRUNG_UONG",
    criteria: ["TINH_NGUYEN", "DAO_DUC"],
    thumbnailGradient:
      "linear-gradient(135deg, oklch(0.82 0.16 145), oklch(0.85 0.13 80))",
  },
  {
    id: "4",
    slug: "research-symposium",
    title: "Hội nghị NCKH Sinh viên ULIS 2026",
    shortDescription: "Diễn đàn công bố nghiên cứu khoa học của sinh viên toàn trường.",
    description:
      "Sinh viên trình bày bài báo nghiên cứu về ngôn ngữ học, văn hóa, giảng dạy và dịch thuật trước hội đồng giảng viên đầu ngành.",
    rules: "Nộp đề cương nghiên cứu trước 30/04. Vòng poster và vòng thuyết trình.",
    rewards: "Giải nhất nhận học bổng nghiên cứu 15 triệu và đăng tạp chí khoa học ULIS.",
    organizer: "Phòng KHCN – ULIS",
    contactInfo: "khcn@ulis.vnu.edu.vn",
    registrationUrl: "https://ulis.vnu.edu.vn/nckh-sv",
    startAt: "2026-04-30",
    endAt: "2026-05-30",
    reviewLevel: "DHQGHN",
    criteria: ["HOC_TAP"],
    thumbnailGradient:
      "linear-gradient(135deg, oklch(0.82 0.13 250), oklch(0.85 0.1 290))",
  },
  {
    id: "5",
    slug: "ulis-cultural-night",
    title: "ULIS Cultural Night – Đêm hội văn hóa các nước",
    shortDescription:
      "Đêm hội trình diễn văn hóa, ẩm thực, ngôn ngữ của 10+ quốc gia.",
    description:
      "Mỗi khoa tổ chức gian hàng văn hóa, biểu diễn nghệ thuật và workshop ngôn ngữ. Sự kiện mở cho công chúng.",
    rules: "Đăng ký theo khoa hoặc CLB. Tham gia tối thiểu 1 ca trực gian hàng.",
    rewards: "Điểm rèn luyện hội nhập và quà lưu niệm văn hóa.",
    organizer: "ULIS Student Union",
    contactInfo: "studentunion@ulis.vnu.edu.vn",
    registrationUrl: "https://ulis.vnu.edu.vn/cultural-night",
    startAt: "2026-11-12",
    endAt: "2026-11-12",
    reviewLevel: "TRUONG",
    criteria: ["HOI_NHAP", "DAO_DUC"],
    thumbnailGradient:
      "linear-gradient(135deg, oklch(0.83 0.15 320), oklch(0.86 0.12 30))",
  },
  {
    id: "6",
    slug: "code-for-good-hackathon",
    title: "Code for Good Hackathon",
    shortDescription:
      "Hackathon 48 giờ giải quyết các bài toán xã hội bằng công nghệ.",
    description:
      "Sinh viên thuộc mọi chuyên ngành tham gia làm sản phẩm số phục vụ giáo dục, y tế, môi trường. Có mentor từ doanh nghiệp.",
    rules: "Đội 3-5 người, ít nhất 1 thành viên có nền tảng kỹ thuật.",
    rewards: "Giải nhất 20 triệu đồng và suất internship tại các công ty đối tác.",
    organizer: "ULIS x VNU-UET",
    contactInfo: "hackathon@vnu.edu.vn",
    registrationUrl: "https://vnu.edu.vn/hackathon",
    startAt: "2026-09-20",
    endAt: "2026-09-22",
    reviewLevel: "DHQGHN",
    criteria: ["HOC_TAP", "TINH_NGUYEN"],
    thumbnailGradient:
      "linear-gradient(135deg, oklch(0.78 0.17 220), oklch(0.82 0.15 170))",
  },
];

export const STATS = {
  totalActivities: 124,
  totalParticipants: 3850,
  totalCompleted: 217,
};

export const LEADERBOARD = [
  { rank: 1, name: "Nguyễn Hà My", unit: "Khoa NN&VH Anh", count: 32 },
  { rank: 2, name: "Trần Quang Huy", unit: "Khoa NN&VH Nhật", count: 29 },
  { rank: 3, name: "Lê Thảo Linh", unit: "Khoa NN&VH Hàn", count: 27 },
  { rank: 4, name: "Phạm Minh Đức", unit: "Khoa SP Tiếng Anh", count: 24 },
  { rank: 5, name: "Đỗ Khánh Vy", unit: "Khoa NN&VH Trung", count: 22 },
  { rank: 6, name: "Bùi Tiến Dũng", unit: "Khoa NN&VH Pháp", count: 21 },
  { rank: 7, name: "Vũ Phương Anh", unit: "Khoa NN&VH Đức", count: 19 },
];

export const CRITERIA_DOCS = [
  {
    level: "Cấp Trường ĐHNN",
    docs: [
      { title: "Quy chế xét chọn Sinh viên 5 Tốt cấp Trường 2025-2026", year: 2026 },
      { title: "Hướng dẫn chấm điểm rèn luyện ULIS", year: 2025 },
      { title: "Mẫu hồ sơ đăng ký SV5T cấp Trường", year: 2025 },
    ],
  },
  {
    level: "Cấp ĐHQGHN",
    docs: [
      { title: "Quy chế Sinh viên 5 Tốt cấp ĐHQGHN", year: 2025 },
      { title: "Tiêu chuẩn xét chọn cấp ĐHQGHN 2026", year: 2026 },
    ],
  },
  {
    level: "Cấp Thành phố / Trung ương",
    docs: [
      { title: "Quy chế SV5T cấp TP Hà Nội", year: 2025 },
      { title: "Tiêu chuẩn SV5T cấp Trung ương – TW Hội Sinh viên VN", year: 2025 },
      { title: "Hướng dẫn nộp hồ sơ cấp TW", year: 2025 },
    ],
  },
];
