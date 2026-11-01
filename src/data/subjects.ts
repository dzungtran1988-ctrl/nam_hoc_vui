import type { SubjectId } from "../types";

export const subjects: {
  id: SubjectId;
  lessonId: string;
  name: string;
  teacher: string;
  image: string;
  stageBg1: string;
  stageBg2: string;
  colorTheme: string;
  title: string;
  tagline: string;
  description: string;
  skill: string;
  time: string;
  icon: string;
}[] = [
  {
    id: "reading",
    lessonId: "reading-001",
    name: "Học Đọc",
    teacher: "Hello Kitty",
    image: "card-pastel-reading.webp",
    stageBg1: "stage-reading-no-kitty.webp",
    stageBg2: "stage-reading-no-kitty.webp",
    colorTheme: "#F49DB6",
    title: "Đến lớp thật vui",
    tagline: "Đọc thơ 2 câu to rõ",
    description: "Cùng Kitty đọc 2 câu thơ ngắn về trường lớp, bạn bè.",
    skill: "Đọc thơ & hiểu nghĩa",
    time: "3 phút",
    icon: "📖",
  },
  {
    id: "math",
    lessonId: "math-001",
    name: "Học Toán",
    teacher: "My Melody",
    image: "card-pastel-math.webp",
    stageBg1: "stage-math-1.webp",
    stageBg2: "stage-math-2.webp",
    colorTheme: "#F6C867",
    title: "Bài toán vui nhộn",
    tagline: "Cộng trừ trong phạm vi 10",
    description: "My Melody đố vui phép cộng trừ qua táo đỏ và bóng bay.",
    skill: "Phép tính trong 10",
    time: "3 phút",
    icon: "🧮",
  },
  {
    id: "english",
    lessonId: "english-001",
    name: "Tiếng Anh",
    teacher: "Kuromi",
    image: "card-pastel-english.webp",
    stageBg1: "stage-english-1.webp",
    stageBg2: "stage-english-2.webp",
    colorTheme: "#C49BF2",
    title: "English Time!",
    tagline: "Từ vựng & câu chào ngắn",
    description: "Chào Kuromi bằng tiếng Anh và làm quen các từ vựng đáng yêu.",
    skill: "Nghe & Chọn từ",
    time: "3 phút",
    icon: "🔤",
  },
  {
    id: "music",
    lessonId: "music-001",
    name: "Âm Nhạc",
    teacher: "Cinnamoroll",
    image: "card-pastel-music.webp",
    stageBg1: "stage-music-1.webp",
    stageBg2: "stage-music-2.webp",
    colorTheme: "#89C9F8",
    title: "La la la cùng hát",
    tagline: "Hát 2 câu & gõ đàn sắc màu",
    description: "Hát từng 2 câu ngắn và gõ phím đàn Xylophone cùng Cinnamoroll.",
    skill: "Nhịp điệu & Đàn gỗ",
    time: "3 phút",
    icon: "🎹",
  },
  {
    id: "coloring",
    lessonId: "color-001",
    name: "Mỹ Thuật",
    teacher: "Pompompurin",
    image: "card-pastel-coloring.webp",
    stageBg1: "stage-coloring-1.webp",
    stageBg2: "stage-coloring-1.webp",
    colorTheme: "#8CD7A6",
    title: "Vườn Hoa & Tranh Tô Màu",
    tagline: "Có mẫu màu gợi ý & Xuất ảnh",
    description: "Cùng Pompompurin tô màu các bạn Sanrio, Capybara và Khu Vườn Hoa Kawaii!",
    skill: "Mỹ thuật sáng tạo",
    time: "5 phút",
    icon: "🎨",
  },
  {
    id: "storybook",
    lessonId: "story-001",
    name: "Giải Trí",
    teacher: "Little Twin Stars",
    image: "card-pastel-storybook.webp",
    stageBg1: "story-frame-read-1.webp",
    stageBg2: "story-frame-read-2.webp",
    colorTheme: "#F6A6C8",
    title: "Góc Đọc Truyện Đêm Sao",
    tagline: "Kể chuyện cùng Little Twin Stars",
    description: "Cùng Little Twin Stars và các bạn lật từng trang sách tranh 3D có lời thoại!",
    skill: "Đọc sách lật trang",
    time: "4 phút",
    icon: "📚",
  },
  {
    id: "minigame",
    lessonId: "minigame-001",
    name: "Thể Dục",
    teacher: "Pochacco",
    image: "card-pastel-minigame.webp",
    stageBg1: "stage-minigame-1.jpg",
    stageBg2: "stage-minigame-1.jpg",
    colorTheme: "#88D49E",
    title: "Pochacco Bảo!",
    tagline: "Phản xạ & Vận động vui",
    description: "Cùng Pochacco lắng nghe hiệu lệnh và tập phản xạ vận động vui nhộn!",
    skill: "Lắng nghe & Vận động",
    time: "3 phút",
    icon: "⚽",
  },
  {
    id: "lifeskills",
    lessonId: "lifeskills-001",
    name: "Kỹ Năng Sống",
    teacher: "Doraemon & Capybara",
    image: "card-pastel-lifeskills.webp",
    stageBg1: "scene-lobby-pastel.webp",
    stageBg2: "scene-lobby-pastel.webp",
    colorTheme: "#88C2F4",
    title: "Đầu Bếp Nhí & Bé Tự Lập",
    tagline: "Nấu món ngon & Thói quen tốt",
    description: "Cùng Nấm, Doraemon, Capybara và My Melody vào bếp nấu món ngon và rèn thói quen tự lập mỗi ngày!",
    skill: "Nấu ăn & Tự lập",
    time: "4 phút",
    icon: "🍳",
  },
];

export const getSubject = (id: SubjectId) =>
  subjects.find((subject) => subject.id === id) ?? subjects[0];
