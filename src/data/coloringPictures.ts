export interface PaletteColor {
  name: string;
  hex: string;
}

export const KAWAII_COLOR_PALETTE: PaletteColor[] = [
  { name: "Đỏ nơ Kitty & Dâu", hex: "#EF3E36" },
  { name: "Hồng đậm váy Kitty", hex: "#F45B84" },
  { name: "Hồng mũ My Melody", hex: "#F783AC" },
  { name: "Hồng phấn má xinh", hex: "#FFB8D1" },
  { name: "Cam quả quýt", hex: "#FF9F1C" },
  { name: "Vàng ngôi sao", hex: "#FFE066" },
  { name: "Vàng kem Pompompurin", hex: "#FFF099" },
  { name: "Nâu kem lông Capybara", hex: "#D89A5B" },
  { name: "Nâu đậm mõm & mũ", hex: "#7A4928" },
  { name: "Kem da Kiki & Lala", hex: "#FFE5CC" },
  { name: "Xanh cỏ non", hex: "#A7D976" },
  { name: "Xanh lá cây", hex: "#52B756" },
  { name: "Xanh lá đậm", hex: "#2B8A3E" },
  { name: "Xanh ngọc suối nóng", hex: "#7FD1AE" },
  { name: "Xanh da trời mây", hex: "#A2D8FF" },
  { name: "Xanh biển mắt Cinnamoroll", hex: "#1C7ED6" },
  { name: "Tím hoa Tulip", hex: "#C084FC" },
  { name: "Xám đen mũ Kuromi", hex: "#3B3840" },
  { name: "Xám đá cuội", hex: "#8E949E" },
  { name: "Trắng tẩy màu", hex: "#FFFFFF" },
];

export type ColoringGroupId =
  | "all"
  | "sanrio"
  | "capybara"
  | "garden"
  | "sanrio-solo";

export interface ColoringPicture {
  id: string;
  name: string;
  group: Exclude<ColoringGroupId, "all">;
  url: string;
  refUrl?: string;
  suggestedHexes: string[];
}

export const COLORING_PICTURES: ColoringPicture[] = [
  // 1. NHÓM BẠN SANRIO CÓ MẪU MÀU ĐỐI CHIẾU (6 tranh)
  {
    id: "sanrio-pair-1",
    name: "Hello Kitty & Hoa Hồng",
    group: "sanrio",
    url: "/assets/coloring/sanrio-pair-1-line.webp",
    refUrl: "/assets/coloring/sanrio-pair-1-ref.webp",
    suggestedHexes: ["#EF3E36", "#F45B84", "#F783AC", "#FFE066", "#52B756", "#A7D976"],
  },
  {
    id: "sanrio-pair-2",
    name: "My Melody & Quả Dâu Tây",
    group: "sanrio",
    url: "/assets/coloring/sanrio-pair-2-line.webp",
    refUrl: "/assets/coloring/sanrio-pair-2-ref.webp",
    suggestedHexes: ["#F45B84", "#FFB8D1", "#EF3E36", "#FFE066", "#52B756", "#A7D976"],
  },
  {
    id: "sanrio-pair-3",
    name: "Cinnamoroll & Mây Sao",
    group: "sanrio",
    url: "/assets/coloring/sanrio-pair-3-line.webp",
    refUrl: "/assets/coloring/sanrio-pair-3-ref.webp",
    suggestedHexes: ["#A2D8FF", "#1C7ED6", "#FFB8D1", "#FFE066", "#A7D976", "#52B756"],
  },
  {
    id: "sanrio-pair-4",
    name: "Kuromi & Kẹo Ngọt",
    group: "sanrio",
    url: "/assets/coloring/sanrio-pair-4-line.webp",
    refUrl: "/assets/coloring/sanrio-pair-4-ref.webp",
    suggestedHexes: ["#3B3840", "#F783AC", "#FFB8D1", "#FFE066", "#C084FC"],
  },
  {
    id: "sanrio-pair-5",
    name: "Pompompurin & Bánh Pudding",
    group: "sanrio",
    url: "/assets/coloring/sanrio-pair-5-line.webp",
    refUrl: "/assets/coloring/sanrio-pair-5-ref.webp",
    suggestedHexes: ["#FFF099", "#7A4928", "#EF3E36", "#FFB8D1", "#D89A5B"],
  },
  {
    id: "sanrio-pair-6",
    name: "Ếch Xanh Keroppi & Hoa Sen",
    group: "sanrio",
    url: "/assets/coloring/sanrio-pair-6-line.webp",
    refUrl: "/assets/coloring/sanrio-pair-6-ref.webp",
    suggestedHexes: ["#A7D976", "#52B756", "#EF3E36", "#F783AC", "#FFB8D1", "#FFE066"],
  },

  // 2. NHÓM BẠN CAPYBARA ĐÁNG YÊU CÓ MẪU MÀU (6 tranh)
  {
    id: "capy-pair-1",
    name: "Capybara Ngắm Hoa Cúc",
    group: "capybara",
    url: "/assets/coloring/capy-pair-1-line.webp",
    refUrl: "/assets/coloring/capy-pair-1-ref.webp",
    suggestedHexes: ["#D89A5B", "#7A4928", "#FFB8D1", "#FF9F1C", "#52B756", "#A7D976", "#A2D8FF"],
  },
  {
    id: "capy-pair-2",
    name: "Capybara Ôm Quả Dâu Tây",
    group: "capybara",
    url: "/assets/coloring/capy-pair-2-line.webp",
    refUrl: "/assets/coloring/capy-pair-2-ref.webp",
    suggestedHexes: ["#D89A5B", "#7A4928", "#EF3E36", "#52B756", "#A7D976", "#FFB8D1"],
  },
  {
    id: "capy-pair-3",
    name: "Capybara Tắm Suối Nước Nóng",
    group: "capybara",
    url: "/assets/coloring/capy-pair-3-line.webp",
    refUrl: "/assets/coloring/capy-pair-3-ref.webp",
    suggestedHexes: ["#D89A5B", "#7A4928", "#FF9F1C", "#7FD1AE", "#8E949E", "#52B756", "#A2D8FF"],
  },
  {
    id: "capy-pair-4",
    name: "Capybara & Chim Nhỏ Trên Lưng",
    group: "capybara",
    url: "/assets/coloring/capy-pair-4-line.webp",
    refUrl: "/assets/coloring/capy-pair-4-ref.webp",
    suggestedHexes: ["#D89A5B", "#7A4928", "#FFE066", "#FF9F1C", "#A7D976", "#52B756", "#A2D8FF"],
  },
  {
    id: "capy-pair-5",
    name: "Capybara Ăn Dưa Hấu Ngày Nắng",
    group: "capybara",
    url: "/assets/coloring/capy-pair-5-line.webp",
    refUrl: "/assets/coloring/capy-pair-5-ref.webp",
    suggestedHexes: ["#D89A5B", "#7A4928", "#EF3E36", "#2B8A3E", "#FFE066", "#52B756", "#A2D8FF"],
  },
  {
    id: "capy-pair-6",
    name: "Capybara Vẫy Tay Dưới Trời Sao",
    group: "capybara",
    url: "/assets/coloring/capy-pair-6-line.webp",
    refUrl: "/assets/coloring/capy-pair-6-ref.webp",
    suggestedHexes: ["#D89A5B", "#7A4928", "#FFE066", "#A2D8FF", "#A7D976", "#FFB8D1"],
  },

  // 3. NHÓM KHU VƯỜN HOA KAWAII & TRANH LỚN (3 tranh)
  {
    id: "garden-2",
    name: "Khu Vườn Hoa Tulip Sanrio",
    group: "garden",
    url: "/assets/coloring/garden-2-line.webp",
    refUrl: "/assets/coloring/garden-2-ref.webp",
    suggestedHexes: ["#F783AC", "#FFF099", "#3B3840", "#A2D8FF", "#FFE066", "#52B756", "#EF3E36"],
  },
  {
    id: "garden-1",
    name: "Vườn Hoa Kawaii & Đôi Sao Nhỏ",
    group: "garden",
    url: "/assets/coloring/garden-1-line.webp",
    refUrl: "/assets/coloring/garden-1-ref.webp",
    suggestedHexes: ["#A2D8FF", "#F783AC", "#FFF099", "#3B3840", "#C084FC", "#FFE066", "#52B756"],
  },
  {
    id: "sanrio-sheet-6",
    name: "Đại Gia Đình 6 Bạn Sanrio",
    group: "garden",
    url: "/assets/coloring/sanrio-sheet-6-line.webp",
    refUrl: "/assets/coloring/garden-1-ref.webp",
    suggestedHexes: ["#EF3E36", "#F783AC", "#3B3840", "#A2D8FF", "#FFF099", "#FFE066"],
  },

  // 4. NHÓM NÉT TO ĐƠN GIẢN (6 nhân vật cắt rời từ bảng Sanrio)
  {
    id: "sanrio-solo-1",
    name: "Hello Kitty Ôm Trái Tim",
    group: "sanrio-solo",
    url: "/assets/coloring/sanrio-solo-1-line.webp",
    refUrl: "/assets/coloring/sanrio-pair-1-ref.webp",
    suggestedHexes: ["#EF3E36", "#F45B84", "#FFB8D1", "#FFE066"],
  },
  {
    id: "sanrio-solo-2",
    name: "My Melody Ôm Hoa Xinh",
    group: "sanrio-solo",
    url: "/assets/coloring/sanrio-solo-2-line.webp",
    refUrl: "/assets/coloring/sanrio-pair-2-ref.webp",
    suggestedHexes: ["#F783AC", "#FFB8D1", "#FFE066", "#EF3E36"],
  },
  {
    id: "sanrio-solo-3",
    name: "Kuromi Ngôi Sao Nhỏ",
    group: "sanrio-solo",
    url: "/assets/coloring/sanrio-solo-3-line.webp",
    refUrl: "/assets/coloring/sanrio-pair-4-ref.webp",
    suggestedHexes: ["#3B3840", "#F783AC", "#FFE066", "#C084FC"],
  },
  {
    id: "sanrio-solo-4",
    name: "Cinnamoroll Ôm Ngôi Sao",
    group: "sanrio-solo",
    url: "/assets/coloring/sanrio-solo-4-line.webp",
    refUrl: "/assets/coloring/sanrio-pair-3-ref.webp",
    suggestedHexes: ["#FFE066", "#A2D8FF", "#FFB8D1", "#1C7ED6"],
  },
  {
    id: "sanrio-solo-5",
    name: "Pompompurin Ôm Tim Hồng",
    group: "sanrio-solo",
    url: "/assets/coloring/sanrio-solo-5-line.webp",
    refUrl: "/assets/coloring/sanrio-pair-5-ref.webp",
    suggestedHexes: ["#FFF099", "#7A4928", "#EF3E36", "#FFB8D1"],
  },
  {
    id: "sanrio-solo-6",
    name: "Đôi Sao Nhỏ Kiki & Lala",
    group: "sanrio-solo",
    url: "/assets/coloring/sanrio-solo-6-line.webp",
    refUrl: "/assets/coloring/garden-1-ref.webp",
    suggestedHexes: ["#A2D8FF", "#F783AC", "#FFE066", "#FFE5CC"],
  },
];

export const GROUP_TABS: Array<{ id: ColoringGroupId; label: string; count: number }> = [
  { id: "all", label: "🌟 Tất cả", count: COLORING_PICTURES.length },
  {
    id: "sanrio",
    label: "🎀 Bạn Sanrio",
    count: COLORING_PICTURES.filter((p) => p.group === "sanrio").length,
  },
  {
    id: "capybara",
    label: "🐹 Bạn Capybara",
    count: COLORING_PICTURES.filter((p) => p.group === "capybara").length,
  },
  {
    id: "garden",
    label: "🌸 Vườn Hoa Lớn",
    count: COLORING_PICTURES.filter((p) => p.group === "garden").length,
  },
  {
    id: "sanrio-solo",
    label: "✨ Nét To Đơn Giản",
    count: COLORING_PICTURES.filter((p) => p.group === "sanrio-solo").length,
  },
];
