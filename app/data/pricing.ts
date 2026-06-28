export type Plan = {
  id: string;
  label: string;
  name: string;
  audience: string;
  price: number;
  duration: string;
  meta: string;
  features: string[];
  featured?: boolean;
  costBasis: number;
  targetMargin: number;
};

export const plans: Plan[] = [
  {
    id: "discovery",
    label: "Khởi động",
    name: "STEM Discovery",
    audience: "Thử nhiều hướng trước khi chọn lộ trình.",
    price: 1490000,
    duration: "8 tuần",
    meta: "5 mini-projects • readiness snapshot • parent report",
    features: ["Khám phá cả 5 nhóm STEM", "Báo cáo điểm mạnh và hướng phát triển", "Buổi định hướng cùng người hướng dẫn"],
    costBasis: 1270000,
    targetMargin: 0.15,
  },
  {
    id: "builder",
    label: "Phù hợp nhất",
    name: "STEM Builder",
    audience: "Tạo sản phẩm thật và xây nền tư duy nghề nghiệp.",
    price: 3490000,
    duration: "16 tuần",
    meta: "2 major projects • mentor feedback • verified portfolio",
    features: ["Chọn 2 lộ trình chuyên sâu", "Phản hồi dự án theo rubric kỹ năng", "Portfolio song ngữ và readiness trend", "Hai phiên coaching nhóm nhỏ"],
    featured: true,
    costBasis: 2940000,
    targetMargin: 0.15,
  },
  {
    id: "career-lab",
    label: "Chuyên sâu",
    name: "Innovation Career Lab",
    audience: "Một năm xây bằng chứng năng lực và định hướng nghề.",
    price: 6900000,
    duration: "12 tháng",
    meta: "4 capstones • career simulations • annual readiness report",
    features: ["Bốn dự án lớn gắn vấn đề thực tế", "Mô phỏng vai trò nghề nghiệp theo quý", "Mentor review và hồ sơ readiness cuối năm"],
    costBasis: 5860000,
    targetMargin: 0.15,
  },
];

export const formatVnd = (price: number) => new Intl.NumberFormat("vi-VN").format(price);
