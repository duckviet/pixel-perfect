export type CriterionType =
  | "DAO_DUC"
  | "HOC_TAP"
  | "THE_LUC"
  | "TINH_NGUYEN"
  | "HOI_NHAP";

export const CRITERIA: {
  id: CriterionType;
  label: string;
  short: string;
  colorVar: string;
  description: string;
}[] = [
  {
    id: "DAO_DUC",
    label: "Đạo đức tốt",
    short: "Đạo đức",
    colorVar: "var(--criterion-dao-duc)",
    description: "Phẩm chất, lối sống, ý thức công dân và trách nhiệm xã hội.",
  },
  {
    id: "HOC_TAP",
    label: "Học tập tốt",
    short: "Học tập",
    colorVar: "var(--criterion-hoc-tap)",
    description: "Kết quả học tập, nghiên cứu khoa học và thành tích chuyên môn.",
  },
  {
    id: "THE_LUC",
    label: "Thể lực tốt",
    short: "Thể lực",
    colorVar: "var(--criterion-the-luc)",
    description: "Rèn luyện thể chất, tham gia thể thao và hoạt động sức khỏe.",
  },
  {
    id: "TINH_NGUYEN",
    label: "Tình nguyện tốt",
    short: "Tình nguyện",
    colorVar: "var(--criterion-tinh-nguyen)",
    description: "Hoạt động tình nguyện, vì cộng đồng và hỗ trợ xã hội.",
  },
  {
    id: "HOI_NHAP",
    label: "Hội nhập tốt",
    short: "Hội nhập",
    colorVar: "var(--criterion-hoi-nhap)",
    description: "Ngoại ngữ, kỹ năng hội nhập quốc tế và trao đổi văn hóa.",
  },
];

export const getCriterion = (id: CriterionType) =>
  CRITERIA.find((c) => c.id === id)!;
