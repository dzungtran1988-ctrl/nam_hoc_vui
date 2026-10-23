export interface StoryDialogueLine {
  speaker: string;
  text: string;
}

export interface StoryPage {
  pageNumber: number;
  title: string;
  image: string;
  video?: string;
  lines: string[];
  dialogue: string;
  speaker: string;
  dialogues?: StoryDialogueLine[];
}

export interface StoryQuestion {
  id: string;
  question: string;
  options: [string, string, string];
  answer: string;
  hint: string;
  pageRef: number;
}

export interface StoryBookItem {
  id: string;
  title: string;
  subtitle: string;
  cover: string;
  badge: string;
  pages: StoryPage[];
  questions: StoryQuestion[];
}

export const STORY_BOOKS: StoryBookItem[] = [
  {
    id: "nam-frozen-elsa",
    title: "Nấm Đến Vương Quốc Frozen Cùng Elsa",
    subtitle: "9 trang tranh 3D · Phiêu lưu xứ sở băng giá kỳ diệu cùng Elsa & Olaf!",
    cover: "/assets/stories/frozen/page-3.png",
    badge: "❄️ Mới Nhất (9 Trang)",
    pages: [
      {
        pageNumber: 1,
        title: "Trang 1: Đêm Hội Trăng Rằm",
        image: "/assets/stories/frozen/page-1.png",
        lines: [
          "Lớp Nấm vui đón Trung Thu.",
          "Tranh chị Elsa bỗng phát sáng!",
        ],
        dialogue: "Oa! Tranh chị Elsa tỏa sáng kìa Kitty!",
        speaker: "Bé Nấm",
        dialogues: [
          {
            speaker: "Bé Nấm",
            text: "Oa! Tranh chị Elsa tỏa sáng kìa!",
          },
          {
            speaker: "Hello Kitty",
            text: "Bông tuyết bay quanh đèn ông sao đẹp quá!",
          },
        ],
      },
      {
        pageNumber: 2,
        title: "Trang 2: Cánh cổng băng tuyết",
        image: "/assets/stories/frozen/page-2.png",
        lines: [
          "Cổng cầu vồng mở ra giữa lớp.",
          "Chị Elsa vẫy tay mời Nấm vào.",
        ],
        dialogue: "Chào Nấm và Kitty! Cùng đi thăm xứ Băng nhé!",
        speaker: "Nữ Hoàng Elsa",
        dialogues: [
          {
            speaker: "Nữ Hoàng Elsa",
            text: "Chào Nấm! Cùng chị đến xứ Băng Giá nhé!",
          },
          {
            speaker: "Bé Nấm & Kitty",
            text: "Dạ vâng ạ! Chúng em sẵn sàng rồi!",
          },
        ],
      },
      {
        pageNumber: 3,
        title: "Trang 3: Lâu đài băng pha lê",
        image: "/assets/stories/frozen/page-3.png",
        lines: [
          "Nấm bước qua cánh cổng phép thuật.",
          "Lâu đài băng tỏa sáng lung linh!",
        ],
        dialogue: "Chào mừng hai em đến lâu đài băng!",
        speaker: "Nữ Hoàng Elsa",
        dialogues: [
          {
            speaker: "Nữ Hoàng Elsa",
            text: "Chào mừng hai em đến lâu đài băng!",
          },
          {
            speaker: "Bé Nấm",
            text: "Cầu thang băng trong suốt đẹp quá chị ơi!",
          },
        ],
      },
      {
        pageNumber: 4,
        title: "Trang 4: Hoa Sen Băng Pha Lê",
        image: "/assets/stories/frozen/page-4.png",
        lines: [
          "Giữa vườn băng có bông hoa sáng.",
          "Đàn thỏ tuyết trắng vây quanh Nấm.",
        ],
        dialogue: "Bông hoa băng đẹp quá, thỏ tuyết thích mê!",
        speaker: "Bé Nấm",
        dialogues: [
          {
            speaker: "Bé Nấm",
            text: "Bông hoa băng đẹp quá, thỏ tuyết thích mê!",
          },
          {
            speaker: "Hello Kitty",
            text: "Các bạn thỏ trắng đang làm quen với Nấm đấy!",
          },
        ],
      },
      {
        pageNumber: 5,
        title: "Trang 5: Gặp người tuyết Olaf",
        image: "/assets/stories/frozen/page-5.png",
        lines: [
          "Chị Elsa xoay tay tạo bông tuyết.",
          "Bạn người tuyết Olaf nhảy múa đón Nấm.",
        ],
        dialogue: "Chào Nấm! Tớ là Olaf thích ôm ấm áp!",
        speaker: "Người Tuyết Olaf",
        dialogues: [
          {
            speaker: "Người Tuyết Olaf",
            text: "Chào Nấm! Tớ là Olaf thích ôm ấm áp!",
          },
          {
            speaker: "Bé Nấm",
            text: "Chào bạn Olaf mũi cà rốt đáng yêu!",
          },
        ],
      },
      {
        pageNumber: 6,
        title: "Trang 6: Thám hiểm hang đá tối",
        image: "/assets/stories/frozen/page-6.png",
        lines: [
          "Trong hang tối có bóng đá hiện ra.",
          "Nấm dũng cảm giơ cao chiếc đèn vàng.",
        ],
        dialogue: "Đừng sợ Kitty! Đèn lồng của tớ sáng lắm!",
        speaker: "Bé Nấm & Elsa",
        dialogues: [
          {
            speaker: "Bé Nấm",
            text: "Đừng sợ Kitty! Đèn lồng của tớ sáng lắm!",
          },
          {
            speaker: "Nữ Hoàng Elsa",
            text: "Nấm dũng cảm quá! Chị bật khiên băng bảo vệ nhé!",
          },
        ],
      },
      {
        pageNumber: 7,
        title: "Trang 7: Ngôi Sao Vàng tỏa sáng",
        image: "/assets/stories/frozen/page-7.png",
        lines: [
          "Nấm giơ cao Ngôi Sao Vàng rực rỡ.",
          "Ánh sáng vàng xua tan hết bóng tối!",
        ],
        dialogue: "Ngôi Sao Vàng tỏa sáng! Bóng tối lùi bước!",
        speaker: "Bé Nấm Dũng Cảm",
        dialogues: [
          {
            speaker: "Bé Nấm Dũng Cảm",
            text: "Ngôi Sao Vàng tỏa sáng! Bóng tối lùi bước!",
          },
          {
            speaker: "Nữ Hoàng Elsa",
            text: "Tuyệt lắm Nấm ơi! Phép màu chiến thắng rồi!",
          },
        ],
      },
      {
        pageNumber: 8,
        title: "Trang 8: Đêm hội pháo hoa",
        image: "/assets/stories/frozen/page-8.png",
        lines: [
          "Bầu trời lâu đài rực sáng pháo hoa.",
          "Nấm cùng Elsa và Olaf nhảy múa vui.",
        ],
        dialogue: "Hoan hô hiệp sĩ Nấm! Mở hội pháo hoa thôi!",
        speaker: "Elsa, Olaf & Kitty",
        dialogues: [
          {
            speaker: "Người Tuyết Olaf",
            text: "Hoan hô hiệp sĩ Nấm! Mở hội pháo hoa thôi!",
          },
          {
            speaker: "Bé Nấm & Kitty",
            text: "Yeahhh! Ngắm pháo hoa cùng chị Elsa vui quá!",
          },
        ],
      },
      {
        pageNumber: 9,
        title: "Trang 9: Cái ôm ấm áp",
        image: "/assets/stories/frozen/page-9.png",
        lines: [
          "Nấm ôm ngôi sao vàng trong tay.",
          "Chị Elsa và Olaf ôm Nấm thật ấm.",
        ],
        dialogue: "Cảm ơn Nấm dũng cảm! Hẹn gặp lại em nhé!",
        speaker: "Nữ Hoàng Elsa & Olaf",
        dialogues: [
          {
            speaker: "Nữ Hoàng Elsa",
            text: "Cảm ơn Nấm dũng cảm! Hẹn gặp lại em nhé!",
          },
          {
            speaker: "Bé Nấm",
            text: "Em tạm biệt chị Elsa và bạn Olaf nhé!",
          },
        ],
      },
    ],
    questions: [
      {
        id: "frozen-q1",
        question: "Ở đầu truyện, Nấm và Hello Kitty gặp chị Elsa hiện ra từ đâu?",
        options: [
          "Từ bức vẽ phát sáng trên bảng lớp học Đêm Hội Trăng Rằm",
          "Từ trong tivi ở phòng khách",
          "Từ dưới đáy biển sâu",
        ],
        answer: "Từ bức vẽ phát sáng trên bảng lớp học Đêm Hội Trăng Rằm",
        hint: "Nấm nhìn lại Trang 1 xem bảng lớp 3B trang trí Đêm Hội Trăng Rằm có hình ai phát sáng nhé!",
        pageRef: 1,
      },
      {
        id: "frozen-q2",
        question: "Ở Vương quốc Băng Giá, người bạn nào có mũi cà rốt, quàng khăn xanh vui vẻ đón Nấm?",
        options: [
          "Bạn người tuyết Olaf đáng yêu",
          "Chú cá heo xanh",
          "Bạn gấu trúc ham ăn",
        ],
        answer: "Bạn người tuyết Olaf đáng yêu",
        hint: "Ở Trang 5 có một bạn người tuyết trắng tròn quàng khăn len màu xanh đang vẫy tay cười tươi đấy!",
        pageRef: 5,
      },
      {
        id: "frozen-q3",
        question: "Trong hang đá tối, Nấm đã dùng vật gì tỏa ánh sáng vàng cùng chị Elsa đánh tan bóng tối?",
        options: [
          "Ngôi Sao Vàng phát sáng rực rỡ",
          "Cây kem ốc quế vani",
          "Chiếc ván lướt sóng màu cam",
        ],
        answer: "Ngôi Sao Vàng phát sáng rực rỡ",
        hint: "Ở Trang 7, trên tay Nấm có một Ngôi Sao Vàng phóng ra tia sáng rực rỡ kìa!",
        pageRef: 7,
      },
    ],
  },
  {
    id: "nam-doraemon-may",
    title: "Nấm & Doraemon Ở Vương Quốc Mây",
    subtitle: "6 cảnh phim động + tranh 3D · Phiêu lưu trên tầng mây kỳ diệu!",
    cover: "/assets/stories/doraemon/page-1.png",
    badge: "🎬 Có Clip Động (6 Cảnh)",
    pages: [
      {
        pageNumber: 1,
        title: "Trang 1: Cánh Cửa Thần Kỳ",
        image: "/assets/stories/doraemon/page-1.png",
        video: "/assets/stories/doraemon/clip-1.mp4",
        lines: [
          "Nấm mở Cánh Cửa Thần Kỳ màu hồng.",
          "Lâu đài trắng bay trên mây đẹp quá!",
        ],
        dialogue: "Oa! Lâu đài bay trên mây đẹp quá!",
        speaker: "Bé Nấm & Doraemon",
      },
      {
        pageNumber: 2,
        title: "Trang 2: Chong Chóng Tre bay cao",
        image: "/assets/stories/doraemon/page-2.png",
        video: "/assets/stories/doraemon/clip-2.mp4",
        lines: [
          "Nấm đội Chong Chóng Tre trên đầu.",
          "Hai bạn nắm tay bay vút lên mây.",
        ],
        dialogue: "Chong chóng tre quay vù vù vui quá!",
        speaker: "Bé Nấm",
      },
      {
        pageNumber: 3,
        title: "Trang 3: Chơi cùng Thỏ Mây",
        image: "/assets/stories/doraemon/page-3.png",
        video: "/assets/stories/doraemon/clip-3.mp4",
        lines: [
          "Đám mây hồng êm như kẹo bông.",
          "Đàn thỏ mây vẫy tay đón Nấm.",
        ],
        dialogue: "Mây hồng êm quá, thỏ mây dễ thương ghê!",
        speaker: "Doraemon",
      },
      {
        pageNumber: 4,
        title: "Trang 4: Thuyền trưởng Nấm lái tàu",
        image: "/assets/stories/doraemon/page-4.png",
        video: "/assets/stories/doraemon/clip-4.mp4",
        lines: [
          "Nấm cầm bánh lái con tàu bay.",
          "Tàu lướt qua thác nước cầu vồng.",
        ],
        dialogue: "Thuyền trưởng Nấm giữ vững tay lái nhé!",
        speaker: "Doraemon",
      },
      {
        pageNumber: 5,
        title: "Trang 5: Ôm thỏ bông phát sáng",
        image: "/assets/stories/doraemon/page-5.png",
        video: "/assets/stories/doraemon/clip-5.mp4",
        lines: [
          "Nấm và Doraemon ngồi nghỉ trên mây.",
          "Chú thỏ bông tỏa sáng thật ấm áp.",
        ],
        dialogue: "Lông bạn thỏ mây vừa mềm vừa ấm!",
        speaker: "Bé Nấm",
      },
      {
        pageNumber: 6,
        title: "Trang 6: Hoàng hôn trên biển mây",
        image: "/assets/stories/doraemon/page-6.png",
        video: "/assets/stories/doraemon/clip-6.mp4",
        lines: [
          "Mặt trời lặn nhuộm vàng cả biển mây.",
          "Nấm khoác vai Doraemon ngắm hoàng hôn.",
        ],
        dialogue: "Cảm ơn Doraemon! Mai mình đi chơi tiếp nhé!",
        speaker: "Bé Nấm & Doraemon",
      },
    ],
    questions: [
      {
        id: "doraemon-q1",
        question: "Nấm và Doraemon đã bước qua bảo bối gì để tới Vương Quốc Mây?",
        options: [
          "Cánh Cửa Thần Kỳ màu hồng",
          "Chiếc xe cảnh sát tí hon",
          "Chiếc thuyền buồm gỗ",
        ],
        answer: "Cánh Cửa Thần Kỳ màu hồng",
        hint: "Ở Trang 1, hai bạn bước qua một cánh cửa màu hồng kỳ diệu đấy!",
        pageRef: 1,
      },
      {
        id: "doraemon-q2",
        question: "Bảo bối nào gắn trên đầu giúp Nấm và Doraemon bay vút giữa trời xanh?",
        options: [
          "Chong Chóng Tre",
          "Kính lặn biển",
          "Cần câu cá",
        ],
        answer: "Chong Chóng Tre",
        hint: "Ở Trang 2, trên đầu Nấm và Doraemon có chiếc chong chóng quay vù vù kìa!",
        pageRef: 2,
      },
      {
        id: "doraemon-q3",
        question: "Ở Trang 4, thuyền trưởng Nấm đã lái phương tiện gì vượt qua thác nước mây?",
        options: [
          "Con tàu hơi nước bay trên mây",
          "Xe đua Go-Kart",
          "Ván lướt sóng",
        ],
        answer: "Con tàu hơi nước bay trên mây",
        hint: "Nấm nhìn Trang 4 xem Nấm đang cầm bánh lái của con tàu gì nhé!",
        pageRef: 4,
      },
    ],
  },
  {
    id: "nam-di-hoc",
    title: "Hành Trình Nấm Đi Học",
    subtitle: "8 trang tranh 3D · Một ngày đến trường ngập tràn niềm vui!",
    cover: "/assets/stories/school/page-3.png",
    badge: "🎒 Cập Nhật Mới (8 Trang)",
    pages: [
      {
        pageNumber: 1,
        title: "Trang 1: Chào mèo con, Nấm đi học!",
        image: "/assets/stories/school/page-1.png",
        lines: [
          "Sáng sớm, Nấm đeo ba lô nhỏ xinh.",
          "Nấm vẫy tay chào mèo con đi học.",
        ],
        dialogue: "Tạm biệt mèo con! Chiều về tớ chơi nhé!",
        speaker: "Bé Nấm",
      },
      {
        pageNumber: 2,
        title: "Trang 2: Đi học cùng Hello Kitty",
        image: "/assets/stories/school/page-2.png",
        lines: [
          "Con đường đến trường nở đầy hoa tươi.",
          "Nấm nắm tay Kitty bước vào cổng trường.",
        ],
        dialogue: "Trời nắng đẹp quá, mình đi học thật vui!",
        speaker: "Hello Kitty",
      },
      {
        pageNumber: 3,
        title: "Trang 3: Gặp các bạn ở sân trường",
        image: "/assets/stories/school/page-3.png",
        lines: [
          "Tới sân trường, Nấm vẫy chào các bạn.",
          "Ai cũng cười tươi đón Nấm vào lớp.",
        ],
        dialogue: "Chào Nấm! Chúng tớ đợi Nấm cùng vào lớp đây!",
        speaker: "Các Bạn Sanrio",
      },
      {
        pageNumber: 4,
        title: "Trang 4: Giờ đọc sách vui vẻ",
        image: "/assets/stories/school/page-4.png",
        lines: [
          "Giờ đọc sách, Nấm chỉ tay vào trang truyện.",
          "Nấm đọc to cho Kitty và các bạn nghe.",
        ],
        dialogue: "Các bạn nhìn ngôi nhà trong sách đẹp chưa!",
        speaker: "Bé Nấm",
      },
      {
        pageNumber: 5,
        title: "Trang 5: Chia sẻ bút sáp màu",
        image: "/assets/stories/school/page-5.png",
        lines: [
          "Giờ vẽ tranh, Nấm mở hộp bút màu.",
          "Nấm chia bút cho các bạn cùng tô.",
        ],
        dialogue: "Cảm ơn Nấm tốt bụng cho tụi mình mượn bút nhé!",
        speaker: "My Melody & Cinnamoroll",
      },
      {
        pageNumber: 6,
        title: "Trang 6: Tập thể dục ngoài sân",
        image: "/assets/stories/school/page-6.png",
        lines: [
          "Ngoài sân cỏ, Nấm giơ cao hai tay.",
          "Nấm tập thể dục khỏe mạnh cùng Pochacco.",
        ],
        dialogue: "Một, hai, ba, bốn! Vươn vai cao khỏe mạnh nào!",
        speaker: "Pochacco & Nấm",
      },
      {
        pageNumber: 7,
        title: "Trang 7: Tiệc ăn xế vui nhộn",
        image: "/assets/stories/school/page-7.png",
        lines: [
          "Giờ ăn xế có bánh kem dâu và sữa.",
          "Cả nhóm giơ tay chụp ảnh thật tươi!",
        ],
        dialogue: "Một, hai, ba... Kim chi! Bánh kem ngon quá!",
        speaker: "Bé Nấm & Các Bạn",
      },
      {
        pageNumber: 8,
        title: "Trang 8: Ngôi Sao Bé Ngoan",
        image: "/assets/stories/school/page-8.png",
        lines: [
          "Giờ tan học, cô giáo khen Nấm ngoan.",
          "Cô tặng Nấm huy hiệu Ngôi Sao Vàng!",
        ],
        dialogue: "Hôm nay Nấm học rất giỏi! Cô thưởng Bé Ngoan nhé!",
        speaker: "Cô Giáo",
      },
    ],
    questions: [
      {
        id: "school-q1",
        question: "Buổi sáng trước khi đi học, Nấm đeo ba lô và vẫy tay chào ai ở hiên nhà?",
        options: [
          "Bạn mèo cam ngoan ngoãn",
          "Bạn rùa biển",
          "Chú khủng long xanh",
        ],
        answer: "Bạn mèo cam ngoan ngoãn",
        hint: "Ở Trang 1 có một bạn mèo lông màu cam ngồi ở hiên nhà vẫy tay chào Nấm đấy!",
        pageRef: 1,
      },
      {
        id: "school-q2",
        question: "Trong giờ Mỹ Thuật ở Trang 5, Nấm đã chia sẻ đồ dùng gì cho các bạn cùng tô vẽ?",
        options: [
          "Hộp bút sáp đủ màu",
          "Quả bóng đá",
          "Chiếc cần câu cá",
        ],
        answer: "Hộp bút sáp đủ màu",
        hint: "Ở Trang 5, Nấm mở hộp bút sáp nhiều màu sắc cho My Melody và Cinnamoroll mượn đấy!",
        pageRef: 5,
      },
      {
        id: "school-q3",
        question: "Cuối ngày học chăm ngoan và biết chia sẻ, cô giáo đã thưởng gì cho Nấm?",
        options: [
          "Huy hiệu Ngôi Sao & Hoa Bé Ngoan",
          "Một chiếc thuyền buồm",
          "Một cây kem ốc quế",
        ],
        answer: "Huy hiệu Ngôi Sao & Hoa Bé Ngoan",
        hint: "Ở Trang 8, cô giáo cài lên áo Nấm chiếc huy hiệu Bé Ngoan lấp lánh!",
        pageRef: 8,
      },
    ],
  },
  {
    id: "nam-moana-bien",
    title: "Nấm Khám Phá Biển Cùng Moana",
    subtitle: "7 trang tranh 3D · Hải trình vượt đại dương nhiệm màu!",
    cover: "/assets/stories/moana/page-2.jpg",
    badge: "🌊 Đại Dương (7 Trang)",
    pages: [
      {
        pageNumber: 1,
        title: "Trang 1: Cuộc gặp gỡ trên đảo nhiệt đới",
        image: "/assets/stories/moana/page-1.jpg",
        lines: [
          "Trên bãi cát trắng rợp bóng dừa xanh, Nấm đeo ba lô hào hứng",
          "làm quen với chị Moana và chú rùa biển nhỏ bên chiếc thuyền buồm.",
        ],
        dialogue: "Chào Nấm dũng cảm! Em đã sẵn sàng cùng chị căng buồm ra khơi chưa?",
        speaker: "Moana",
      },
      {
        pageNumber: 2,
        title: "Trang 2: Căng buồm vượt sóng đại dương",
        image: "/assets/stories/moana/page-2.jpg",
        lines: [
          "Chiếc thuyền gỗ lướt băng băng trên làn nước biển xanh biếc,",
          "Nấm chỉ tay theo cánh chim hải âu bay về phía hòn đảo xa.",
        ],
        dialogue: "Gió biển mát quá chị Moana ơi! Nhìn chú chim hải âu dẫn đường kìa!",
        speaker: "Bé Nấm",
      },
      {
        pageNumber: 3,
        title: "Trang 3: Cần thủ nhí câu cá tài ba",
        image: "/assets/stories/moana/page-3.jpg",
        lines: [
          "Giữa biển khơi, Nấm khéo léo kéo cần câu và bắt được một chú cá lớn",
          "vảy xanh vàng lấp lánh khiến Moana và rùa con vỗ tay reo hò!",
        ],
        dialogue: "Giỏi quá Nấm ơi! Chú cá to và lấp lánh như ngọc biển vậy!",
        speaker: "Moana & Rùa Nhỏ",
      },
      {
        pageNumber: 4,
        title: "Trang 4: Lặn biển ngắm san hô & Cá Nhám Voi",
        image: "/assets/stories/moana/page-4.jpg",
        lines: [
          "Đeo kính lặn trong veo, Nấm và Moana bơi giữa rạn san hô rực rỡ",
          "và vẫy chào người bạn Cá Nhám Voi khổng lồ hiền lành đốm trắng.",
        ],
        dialogue: "Chào bạn Cá Nhám Voi khổng lồ nhé! Dưới đáy biển đẹp như cổ tích!",
        speaker: "Bé Nấm",
      },
      {
        pageNumber: 5,
        title: "Trang 5: Vũ điệu cá heo phát sáng đêm trăng",
        image: "/assets/stories/moana/page-5.jpg",
        lines: [
          "Màn đêm buông xuống, mặt biển bỗng bừng sáng ánh lam huyền ảo",
          "khi đàn cá heo thần kỳ tung mình nhảy múa quanh mũi thuyền.",
        ],
        dialogue: "Oa! Những chú cá heo phát sáng đang nhảy múa chào tụi mình kìa!",
        speaker: "Moana & Nấm",
      },
      {
        pageNumber: 6,
        title: "Trang 6: Quần đảo thác nước thần tiên",
        image: "/assets/stories/moana/page-6.jpg",
        lines: [
          "Sáng hôm sau, thuyền cập bến một hòn đảo kỳ vĩ",
          "với những ngọn núi xanh lơ lửng trên mây và thác nước đổ trắng xóa.",
        ],
        dialogue: "Chúng mình đã tìm thấy Hòn Đảo Thần Tiên giữa đại dương rồi!",
        speaker: "Bé Nấm",
      },
      {
        pageNumber: 7,
        title: "Trang 7: Ngắm sao băng bên bờ biển ấm áp",
        image: "/assets/stories/moana/page-7.jpg",
        lines: [
          "Đêm khuya thanh bình, Nấm, Moana và rùa nhỏ nằm bên ánh đèn bão,",
          "cùng ngước nhìn dải ngân hà lấp lánh và ngôi sao băng vụt qua.",
        ],
        dialogue: "Có sao băng kìa Moana ơi! Mình cùng ước những điều thật đẹp nhé!",
        speaker: "Bé Nấm & Moana",
      },
    ],
    questions: [
      {
        id: "moana-q1",
        question: "Khi ngồi trên thuyền giữa biển khơi ở Trang 3, Nấm đã câu được con gì?",
        options: [
          "Một chú cá lớn vảy xanh vàng lấp lánh",
          "Một chiếc giày cũ",
          "Một quả dứa vàng",
        ],
        answer: "Một chú cá lớn vảy xanh vàng lấp lánh",
        hint: "Ở Trang 3, cần câu của Nấm kéo lên một chú cá to lấp lánh đấy!",
        pageRef: 3,
      },
      {
        id: "moana-q2",
        question: "Khi đeo kính lặn xuống đáy biển ở Trang 4, Nấm và Moana vẫy chào người bạn khổng lồ nào?",
        options: [
          "Bạn Cá Nhám Voi hiền lành đốm trắng",
          "Bạn Gấu Trúc",
          "Bạn Thỏ Tuyết",
        ],
        answer: "Bạn Cá Nhám Voi hiền lành đốm trắng",
        hint: "Ở Trang 4 có một chú cá rất to có nhiều đốm trắng trên lưng đang bơi cạnh Nấm kìa!",
        pageRef: 4,
      },
      {
        id: "moana-q3",
        question: "Đêm khuya nằm bên bờ biển ở Trang 7, Nấm và Moana đã ngước nhìn thấy gì trên bầu trời?",
        options: [
          "Dải ngân hà lấp lánh và ngôi sao băng",
          "Đèn giao thông màu xanh",
          "Tòa lâu đài băng",
        ],
        answer: "Dải ngân hà lấp lánh và ngôi sao băng",
        hint: "Ở Trang 7, có một ngôi sao băng vụt sáng trên bầu trời đêm đầy sao đấy!",
        pageRef: 7,
      },
    ],
  },
  {
    id: "nam-hawaii-stitch",
    title: "Nấm Ở Hawaii Với Lilo & Stitch",
    subtitle: "6 trang tranh 3D · Kỳ nghỉ hè sôi động trên bãi biển Hawaii!",
    cover: "/assets/stories/hawaii/page-4.jpg",
    badge: "🌺 Mùa Hè (6 Trang)",
    pages: [
      {
        pageNumber: 1,
        title: "Trang 1: Xin chào mùa hè Hawaii!",
        image: "/assets/stories/hawaii/page-1.jpg",
        lines: [
          "Dưới hàng dừa xanh và nắng vàng rực rỡ của bãi biển Hawaii,",
          "Nấm vẫy tay chào hai người bạn mới là cô bé Lilo và chú Stitch xanh!",
        ],
        dialogue: "Aloha! Chào mừng Nấm đến với bãi biển Hawaii đầy nắng và gió nhé!",
        speaker: "Lilo & Stitch",
      },
      {
        pageNumber: 2,
        title: "Trang 2: Xây lâu đài cát khổng lồ",
        image: "/assets/stories/hawaii/page-2.jpg",
        lines: [
          "Trải tấm thảm sắc màu trên cát mịn, Nấm và Lilo cầm xẻng nhỏ",
          "cùng đắp một tòa lâu đài cát cao vút cắm cờ đỏ, còn Stitch đứng canh gác.",
        ],
        dialogue: "Lâu đài cát của chúng mình có nhiều tháp cao đẹp chưa này Stitch ơi!",
        speaker: "Bé Nấm",
      },
      {
        pageNumber: 3,
        title: "Trang 3: Trò đùa kem ốc quế tinh nghịch",
        image: "/assets/stories/hawaii/page-3.jpg",
        lines: [
          "Trời nóng bức, cả nhóm đi ăn kem vani mát lạnh. Bất ngờ Stitch tinh nghịch",
          "úp ngược cây kem lên đầu Nấm làm Lilo ôm bụng cười nắc nẻ!",
        ],
        dialogue: "Á à! Bạn Stitch nghịch ngợm biến cây kem thành chiếc mũ trên đầu tớ rồi!",
        speaker: "Bé Nấm & Lilo",
      },
      {
        pageNumber: 4,
        title: "Trang 4: Lướt sóng dưới cầu vồng rực rỡ",
        image: "/assets/stories/hawaii/page-4.jpg",
        lines: [
          "Trên chiếc ván lướt sóng màu cam, Nấm đứng giữa Lilo và Stitch",
          "cùng cưỡi lên ngọn sóng biếc dưới vòm cầu vồng bảy sắc lung linh!",
        ],
        dialogue: "Yahoooo! Lướt trên ngọn sóng biển cùng Lilo và Stitch ngầu quá đi!",
        speaker: "Bé Nấm",
      },
      {
        pageNumber: 5,
        title: "Trang 5: Bữa tiệc trái cây miền nhiệt đới",
        image: "/assets/stories/hawaii/page-5.jpg",
        lines: [
          "Dưới bóng mát rặng dừa, Nấm thưởng thức miếng dưa hấu đỏ ngọt lịm,",
          "Lilo uống nước dừa tươi còn Stitch ôm khư khư quả dứa vàng ươm.",
        ],
        dialogue: "Dưa hấu và nước dừa mát lạnh ở biển Hawaii ngon số một luôn!",
        speaker: "Bé Nấm & Lilo",
      },
      {
        pageNumber: 6,
        title: "Trang 6: Cái ôm Ohana dưới ánh hoàng hôn",
        image: "/assets/stories/hawaii/page-6.jpg",
        lines: [
          "Mặt trời đỏ rực từ từ lặn xuống mặt biển, Lilo ôm chặt Nấm",
          "cùng Stitch vẫy tay hẹn ngày gặp lại trong tình bạn gia đình Ohana.",
        ],
        dialogue: "Ohana nghĩa là gia đình! Tụi mình sẽ nhớ Nấm nhiều lắm đấy!",
        speaker: "Lilo & Stitch",
      },
    ],
    questions: [
      {
        id: "hawaii-q1",
        question: "Ở bãi biển Hawaii (Trang 2), Nấm và Lilo đã cầm xẻng nhỏ cùng xây gì trên cát?",
        options: [
          "Một tòa lâu đài cát cao vút cắm cờ đỏ",
          "Một ngôi nhà tuyết",
          "Một chiếc xe cảnh sát",
        ],
        answer: "Một tòa lâu đài cát cao vút cắm cờ đỏ",
        hint: "Nhìn Trang 2 xem tòa lâu đài bằng cát có lá cờ màu đỏ trên đỉnh kìa!",
        pageRef: 2,
      },
      {
        id: "hawaii-q2",
        question: "Ở Trang 3, bạn Stitch tinh nghịch đã làm trò đùa gì khiến Lilo cười nắc nẻ?",
        options: [
          "Úp ngược cây kem ốc quế lên đầu Nấm",
          "Giấu chiếc cặp sách của Nấm",
          "Bắn súng nước xà phòng",
        ],
        answer: "Úp ngược cây kem ốc quế lên đầu Nấm",
        hint: "Ở Trang 3, cây kem vani biến thành chiếc mũ trên đầu Nấm rồi!",
        pageRef: 3,
      },
      {
        id: "hawaii-q3",
        question: "Lời nhắn 'Ohana' ấm áp của Lilo và Stitch ở Trang 6 có nghĩa là gì?",
        options: [
          "Ohana nghĩa là Gia đình",
          "Ohana nghĩa là Kem ốc quế",
          "Ohana nghĩa là Đua xe",
        ],
        answer: "Ohana nghĩa là Gia đình",
        hint: "Lilo đã ôm chặt Nấm ở Trang 6 và nói: Ohana nghĩa là gia đình đấy!",
        pageRef: 6,
      },
    ],
  },
  {
    id: "nam-va-minion",
    title: "Nấm Và Biệt Đội Minion",
    subtitle: "6 trang tranh 3D · Một ngày đại náo cười nghiêng ngả!",
    cover: "/assets/stories/minion/page-1.jpg",
    badge: "🍌 Vui Nhộn (6 Trang)",
    pages: [
      {
        pageNumber: 1,
        title: "Trang 1: Biệt đội Minion ùa vào phòng chơi",
        image: "/assets/stories/minion/page-1.jpg",
        lines: [
          "Nấm vừa mở cánh cửa phòng đồ chơi, cả đàn Minion vàng ươm",
          "đã reo hò ùa ra chào đón, một bạn nhỏ còn leo tót lên vai Nấm!",
        ],
        dialogue: "Bello Nấm! Hôm nay biệt đội Minion sẽ chơi hết mình cùng Nấm nhé!",
        speaker: "Biệt Đội Minion",
      },
      {
        pageNumber: 2,
        title: "Trang 2: Đầu bếp nhí & Cơn mưa bột mì",
        image: "/assets/stories/minion/page-2.jpg",
        lines: [
          "Nấm cầm muỗng gỗ trộn bột làm bánh cupcake kem, các bạn Minion",
          "hào hứng phụ giúp khiến bột mì bay trắng xóa lấm lem khắp mặt!",
        ],
        dialogue: "Haha! Mặt bạn Minion nào cũng dính đầy bột trắng như ông già Noel rồi!",
        speaker: "Bé Nấm",
      },
      {
        pageNumber: 3,
        title: "Trang 3: Cuộc rượt đuổi bạn Chuối Vàng",
        image: "/assets/stories/minion/page-3.jpg",
        lines: [
          "Một đồ chơi hình quả Chuối Vàng biết đi lon ton chạy quanh phòng,",
          "đàn Minion mắt sáng rỡ chạy đuổi theo làm Nấm ôm bụng cười tít mắt!",
        ],
        dialogue: "Banana! Banana! Đợi tụi tớ với bạn Chuối Vàng dễ thương ơi!",
        speaker: "Các Bạn Minion",
      },
      {
        pageNumber: 4,
        title: "Trang 4: Giải đua xe Go-Kart siêu tốc",
        image: "/assets/stories/minion/page-4.jpg",
        lines: [
          "Đèn giao thông bật sáng màu xanh! Trọng tài Nấm phất cao lá cờ caro",
          "ra hiệu cho đoàn xe đua tí hon của các tay đua Minion phóng vút đi!",
        ],
        dialogue: "Đèn xanh bật rồi! Các tay đua Minion xuất phát về đích thôi nào!",
        speaker: "Trọng Tài Nấm",
      },
      {
        pageNumber: 5,
        title: "Trang 5: Đại chiến bong bóng xà phòng",
        image: "/assets/stories/minion/page-5.jpg",
        lines: [
          "Sau khi làm bánh và đua xe lấm lem, Nấm đưa cả đội vào phòng tắm,",
          "dùng súng nước xà phòng tạo nên cơn mưa bong bóng thơm phức!",
        ],
        dialogue: "Tắm bọt xà phòng mát lạnh để sạch hết bột bánh trên người nhé!",
        speaker: "Bé Nấm",
      },
      {
        pageNumber: 6,
        title: "Trang 6: Lau khô đầu & Giấc ngủ trưa ngoan",
        image: "/assets/stories/minion/page-6.jpg",
        lines: [
          "Tắm xong thơm tho, các bạn Minion thấm mệt nằm lăn ra gối ngáp dài.",
          "Anh cả Nấm ân cần lấy khăn bông mềm lau khô đầu cho từng bạn ngủ ngoan.",
        ],
        dialogue: "Các em Minion ngoan ngủ trưa thật ngon nhé, chiều dậy mình lại chơi tiếp!",
        speaker: "Bé Nấm",
      },
    ],
    questions: [
      {
        id: "minion-q1",
        question: "Khi Nấm và các bạn Minion làm bánh ở Trang 2, chuyện gì hài hước đã xảy ra?",
        options: [
          "Bột mì bay trắng xóa lấm lem khắp mặt",
          "Trời đổ mưa tuyết",
          "Cúp điện tối om",
        ],
        answer: "Bột mì bay trắng xóa lấm lem khắp mặt",
        hint: "Ở Trang 2, mặt bạn Minion nào cũng dính đầy bột bánh trắng xóa như ông già Noel!",
        pageRef: 2,
      },
      {
        id: "minion-q2",
        question: "Đàn Minion mắt sáng rỡ đã hào hứng chạy đuổi theo món đồ chơi hình quả gì?",
        options: [
          "Quả Chuối Vàng biết đi (Banana)",
          "Quả Dưa Hấu Đỏ",
          "Quả Táo Xanh",
        ],
        answer: "Quả Chuối Vàng biết đi (Banana)",
        hint: "Các bạn Minion mê nhất quả Chuối Vàng Banana ở Trang 3 đấy!",
        pageRef: 3,
      },
      {
        id: "minion-q3",
        question: "Sau khi tắm bọt xà phòng sạch sẽ ở Trang 6, anh cả Nấm đã làm việc tốt gì cho các em Minion?",
        options: [
          "Lấy khăn bông mềm lau khô đầu cho các em ngủ ngoan",
          "Rủ các em đi đá bóng ngoài sân",
          "Mở nhạc thật to",
        ],
        answer: "Lấy khăn bông mềm lau khô đầu cho các em ngủ ngoan",
        hint: "Ở Trang 6, Nấm ân cần cầm khăn bông lau tóc cho các bạn Minion ngủ trưa!",
        pageRef: 6,
      },
    ],
  },
  {
    id: "nam-di-concert",
    title: "Nấm Đi Concert Anh Trai",
    subtitle: "9 trang tranh 3D · Đêm nhạc rực rỡ cùng thần tượng!",
    cover: "/assets/stories/concert/page-4.png",
    badge: "🎤 Đêm Nhạc (9 Trang)",
    pages: [
      {
        pageNumber: 1,
        title: "Trang 1: Chuẩn bị đi xem Concert",
        image: "/assets/stories/concert/page-1.png",
        lines: [
          "Ở nhà, Nấm hào hứng xếp vé xem ca nhạc, mũ đen ngầu",
          "và cây gậy phát sáng vào ba lô cùng bạn Pompompurin.",
        ],
        dialogue: "Tối nay mình được đi xem các Anh Tài biểu diễn rồi, háo hức quá!",
        speaker: "Bé Nấm",
      },
      {
        pageNumber: 2,
        title: "Trang 2: Chuyến xe niềm vui",
        image: "/assets/stories/concert/page-2.png",
        lines: [
          "Trên xe buýt tiến về sân vận động, Nấm cùng Pompompurin,",
          "Hello Kitty và Cinnamoroll giơ cao gậy sáng hò reo rộn rã.",
        ],
        dialogue: "Sân vận động ở ngay phía trước kìa các bạn ơi!",
        speaker: "Nấm & Kitty",
      },
      {
        pageNumber: 3,
        title: "Trang 3: Trước cổng sân vận động",
        image: "/assets/stories/concert/page-3.png",
        lines: [
          "Cả nhóm đứng trầm trồ trước cổng sân vận động khổng lồ",
          "rực rỡ ánh đèn của đêm nhạc Anh Trai Vượt Ngàn Chông Gai.",
        ],
        dialogue: "Oa! Sân khấu lớn và đông khán giả quá đi thôi!",
        speaker: "Cinnamoroll",
      },
      {
        pageNumber: 4,
        title: "Trang 4: Biển ánh sáng đỏ rực",
        image: "/assets/stories/concert/page-4.png",
        lines: [
          "Trên khán đài sôi động, Nấm đeo băng đô, tay cầm cờ",
          "và gậy phát sáng cổ vũ nhiệt tình cùng các bạn nhỏ.",
        ],
        dialogue: "Các Anh Tài cố lên! Chúng em yêu các Anh Tài!",
        speaker: "Bé Nấm & Các Bạn",
      },
      {
        pageNumber: 5,
        title: "Trang 5: Sân khấu bùng nổ",
        image: "/assets/stories/concert/page-5.png",
        lines: [
          "Pháo sáng rực trời! Các Anh Tài nắm tay nhau trên sân khấu",
          "hát vang những giai điệu hào hùng giữa biển người cổ vũ.",
        ],
        dialogue: "Bài hát hay quá, mình cùng vẫy lightstick theo nhịp nhạc nào!",
        speaker: "Pompompurin",
      },
      {
        pageNumber: 6,
        title: "Trang 6: Khoảnh khắc thần tượng vẫy chào",
        image: "/assets/stories/concert/page-6.png",
        lines: [
          "Trên màn hình lớn, anh ca sĩ mỉm cười thật tươi",
          "và vẫy tay hướng micro về phía Nấm khiến Nấm reo lên vui sướng!",
        ],
        dialogue: "Anh ấy đang nhìn và vẫy tay chào tụi mình kìa Nấm ơi!",
        speaker: "Hello Kitty",
      },
      {
        pageNumber: 7,
        title: "Trang 7: Kỷ niệm đêm nhạc đáng nhớ",
        image: "/assets/stories/concert/page-7.png",
        lines: [
          "Đêm nhạc khép lại, Nấm ôm tấm poster kỷ niệm trên tay,",
          "vui vẻ sánh bước cùng các bạn dưới ánh đèn lung linh.",
        ],
        dialogue: "Hôm nay thật là một buổi tối tuyệt vời nhất!",
        speaker: "Bé Nấm",
      },
      {
        pageNumber: 8,
        title: "Trang 8: Ngắm ảnh trước giờ ngủ",
        image: "/assets/stories/concert/page-8.png",
        lines: [
          "Về đến căn phòng ấm áp, Nấm ôm bạn Pompompurin trên giường",
          "cùng Kitty và Cinnamoroll ngắm lại những bức ảnh vừa chụp.",
        ],
        dialogue: "Tấm ảnh nào của chúng mình chụp ở concert cũng đẹp lung linh!",
        speaker: "Pompompurin",
      },
      {
        pageNumber: 9,
        title: "Trang 9: Cuốn sổ lưu niệm rực rỡ",
        image: "/assets/stories/concert/page-9.png",
        lines: [
          "Nấm cẩn thận dán những bức ảnh kỷ niệm vào cuốn sổ nhỏ,",
          "vẽ thêm trái tim và ngôi sao để lưu giữ ký ức đẹp mãi mãi!",
        ],
        dialogue: "Mình sẽ giữ cuốn sổ kỷ niệm concert này thật cẩn thận nhé!",
        speaker: "Bé Nấm",
      },
    ],
    questions: [
      {
        id: "concert-q1",
        question: "Ở Trang 1, Nấm đã chuẩn bị những gì bỏ vào ba lô để đi xem đêm nhạc Concert?",
        options: [
          "Vé xem ca nhạc, mũ ngầu và cây gậy phát sáng",
          "Cần câu cá và kính lặn",
          "Chổi quét nhà và bình tưới cây",
        ],
        answer: "Vé xem ca nhạc, mũ ngầu và cây gậy phát sáng",
        hint: "Ở Trang 1, trên giường có tấm vé, chiếc mũ đen và cây lightstick phát sáng đấy!",
        pageRef: 1,
      },
      {
        id: "concert-q2",
        question: "Trên sân khấu lớn ở Trang 6, ai đã mỉm cười thật tươi và vẫy tay chào Nấm?",
        options: [
          "Anh ca sĩ thần tượng trên sân khấu",
          "Thám tử cáo Nick",
          "Chú rùa biển",
        ],
        answer: "Anh ca sĩ thần tượng trên sân khấu",
        hint: "Ở Trang 6, anh ca sĩ cầm micro mỉm cười vẫy tay về phía khán đài của Nấm kìa!",
        pageRef: 6,
      },
      {
        id: "concert-q3",
        question: "Sau đêm nhạc đáng nhớ, Nấm đã làm gì ở Trang 9 để lưu giữ kỷ niệm?",
        options: [
          "Dán ảnh vào cuốn sổ lưu niệm và vẽ thêm trái tim, ngôi sao",
          "Đắp lâu đài cát trên biển",
          "Đua xe Go-Kart",
        ],
        answer: "Dán ảnh vào cuốn sổ lưu niệm và vẽ thêm trái tim, ngôi sao",
        hint: "Ở Trang 9, Nấm cẩn thận dán những bức ảnh chụp ở concert vào cuốn sổ nhỏ!",
        pageRef: 9,
      },
    ],
  },
  {
    id: "nam-o-zootopia",
    title: "Nấm Ở Zootopia Cùng Nick & Judy",
    subtitle: "6 trang tranh 3D · Phiêu lưu bắt kẻ trộm bánh Donut!",
    cover: "/assets/stories/zootopia/page-1.png",
    badge: "🦊 Phiêu Lưu (6 Trang)",
    pages: [
      {
        pageNumber: 1,
        title: "Trang 1: Chào mừng đến Zootopia",
        image: "/assets/stories/zootopia/page-1.png",
        video: "/assets/stories/zootopia/clip-1.mp4",
        lines: [
          "Tại quảng trường đài phun nước rực nắng của thành phố Zootopia,",
          "Nấm vui vẻ đập tay làm quen với cảnh sát thỏ Judy và cáo Nick.",
        ],
        dialogue: "Chào mừng cảnh sát nhí Nấm gia nhập đội tuần tra Zootopia nhé!",
        speaker: "Thỏ Judy & Cáo Nick",
      },
      {
        pageNumber: 2,
        title: "Trang 2: Lái xe tuần tra thành phố",
        image: "/assets/stories/zootopia/page-2.png",
        lines: [
          "Nấm đội kính tròn ngồi cầm vô lăng chiếc xe cảnh sát tí hon,",
          "cùng Nick và Judy đi tuần tra khắp các con phố nhộn nhịp.",
        ],
        dialogue: "Bíp bíp! Đội tuần tra nhí xuất phát giữ bình yên cho thành phố!",
        speaker: "Bé Nấm",
      },
      {
        pageNumber: 3,
        title: "Trang 3: Vụ án hộp bánh Donut",
        image: "/assets/stories/zootopia/page-3.png",
        lines: [
          "Trước tiệm bánh ngọt, một hộp bánh bị rơi! Thám tử Nick cầm kính lúp soi,",
          "còn Nấm tinh mắt chỉ tay về phía chú gấu trúc đang ôm bánh chạy trốn!",
        ],
        dialogue: "Anh Nick, chị Judy ơi! Chú gấu trúc kia đang bê hộp bánh chạy kìa!",
        speaker: "Bé Nấm",
      },
      {
        pageNumber: 4,
        title: "Trang 4: Cuộc rượt đuổi vui nhộn",
        image: "/assets/stories/zootopia/page-4.png",
        lines: [
          "Nấm cùng Nick và Judy tức tốc chạy đuổi theo chú gấu trúc tinh nghịch",
          "giữa những chiếc bánh Donut dâu hồng lăn tròn trên phố.",
        ],
        dialogue: "Đứng lại nào bạn gấu trúc ham ăn ơi, trả bánh cho tiệm thôi!",
        speaker: "Cảnh Sát Judy",
      },
      {
        pageNumber: 5,
        title: "Trang 5: Bữa tiệc bánh Donut ngọt ngào",
        image: "/assets/stories/zootopia/page-5.png",
        lines: [
          "Hoàn thành xuất sắc nhiệm vụ, bác chủ tiệm mời Nấm, Nick và Judy",
          "thưởng thức một bàn đầy bánh Donut phủ kem và nước cam mát lạnh!",
        ],
        dialogue: "Bánh Donut socola và dâu tây ở Zootopia ngon tuyệt vời luôn!",
        speaker: "Thám Tử Cáo Nick",
      },
      {
        pageNumber: 6,
        title: "Trang 6: Bức ảnh kỷ niệm Cảnh Sát Nhí",
        image: "/assets/stories/zootopia/page-6.png",
        lines: [
          "Trước cổng Sở Cảnh Sát Zootopia, Nấm giơ tay chữ V rạng rỡ",
          "chụp bức ảnh selfie kỷ niệm thật ngầu cùng hai người bạn Nick và Judy!",
        ],
        dialogue: "Một, hai, ba... Cười tươi lên nào! Hẹn gặp lại Zootopia nhé!",
        speaker: "Nấm, Nick & Judy",
      },
    ],
    questions: [
      {
        id: "zootopia-q1",
        question: "Tại thành phố Zootopia, Nấm đã gia nhập đội tuần tra cùng hai người bạn cảnh sát nào?",
        options: [
          "Cảnh sát thỏ Judy và thám tử cáo Nick",
          "Lilo và Stitch",
          "Doraemon và Nobita",
        ],
        answer: "Cảnh sát thỏ Judy và thám tử cáo Nick",
        hint: "Ở Trang 1, Nấm đập tay làm quen với chị thỏ Judy và anh cáo Nick đấy!",
        pageRef: 1,
      },
      {
        id: "zootopia-q2",
        question: "Trước tiệm bánh ngọt ở Trang 3, Nấm tinh mắt phát hiện ai đang bê hộp bánh Donut chạy trốn?",
        options: [
          "Chú gấu trúc tinh nghịch ham ăn",
          "Chú cá voi xanh",
          "Bạn người tuyết Olaf",
        ],
        answer: "Chú gấu trúc tinh nghịch ham ăn",
        hint: "Ở Trang 3, Nấm chỉ tay về phía một chú gấu trúc đen trắng đang ôm hộp bánh kìa!",
        pageRef: 3,
      },
      {
        id: "zootopia-q3",
        question: "Sau khi lấy lại bánh giúp tiệm, bác chủ tiệm đã mời Nấm, Nick và Judy ăn món gì?",
        options: [
          "Bánh Donut phủ kem ngọt ngào và nước cam mát lạnh",
          "Mì Ý sốt cà chua",
          "Dưa hấu đỏ",
        ],
        answer: "Bánh Donut phủ kem ngọt ngào và nước cam mát lạnh",
        hint: "Ở Trang 5, trên bàn có thật nhiều bánh vòng Donut phủ kem socola và dâu hồng đấy!",
        pageRef: 5,
      },
    ],
  },
  {
    id: "nam-lam-viec-nha",
    title: "Nấm Làm Việc Nhà & Trà Sữa",
    subtitle: "9 trang tranh 3D · Cùng các bạn dọn nhà thật vui!",
    cover: "/assets/stories/chores/page-9.png",
    badge: "🧋 Việc Tốt (9 Trang)",
    pages: [
      {
        pageNumber: 1,
        title: "Trang 1: Đội biệt kích dọn nhà",
        image: "/assets/stories/chores/page-1.png",
        lines: [
          "Cuối tuần nắng đẹp, Nấm cùng Hello Kitty, My Melody và Cinnamoroll",
          "hào hứng giơ tay bắt đầu ngày tổng vệ sinh nhà cửa!",
        ],
        dialogue: "Yeah! Hôm nay chúng mình cùng giúp mẹ dọn nhà thật sạch nhé!",
        speaker: "Bé Nấm & Các Bạn",
      },
      {
        pageNumber: 2,
        title: "Trang 2: Rửa bát sạch bong",
        image: "/assets/stories/chores/page-2.png",
        lines: [
          "Trong gian bếp nhỏ, Nấm bê chồng đĩa trắng giúp Hello Kitty",
          "và bạn cún vàng Pompompurin rửa bát đĩa sáng bóng.",
        ],
        dialogue: "Bọt xà phòng thơm phức! Đĩa nào cũng sạch bong kin kít luôn!",
        speaker: "Kitty & Pompompurin",
      },
      {
        pageNumber: 3,
        title: "Trang 3: Quét nhà sạch sẽ",
        image: "/assets/stories/chores/page-3.png",
        lines: [
          "Ngoài phòng khách, Nấm cầm chổi quét sàn gỗ cùng My Melody,",
          "còn bạn Cinnamoroll nhanh nhẹn cầm xẻng hót sạch bụi.",
        ],
        dialogue: "Quét bên trái, quét bên phải, sàn nhà sạch bóng rồi Nấm ơi!",
        speaker: "My Melody",
      },
      {
        pageNumber: 4,
        title: "Trang 4: Gấp quần áo gọn gàng",
        image: "/assets/stories/chores/page-4.png",
        lines: [
          "Đến giờ gấp quần áo, Nấm cùng Pompompurin và My Melody",
          "tỉ mỉ vuốt phẳng và xếp từng chồng áo thật ngay ngắn.",
        ],
        dialogue: "Tớ gấp được chiếc áo kẻ sọc vuông vắn chưa này Nấm ơi!",
        speaker: "Pompompurin",
      },
      {
        pageNumber: 5,
        title: "Trang 5: Thu dọn đồ chơi",
        image: "/assets/stories/chores/page-5.png",
        lines: [
          "Ở góc phòng, Nấm cùng Cinnamoroll và Kitty nhặt xe ô tô,",
          "khối gỗ và gấu bông cất gọn gàng vào chiếc thùng hình gấu.",
        ],
        dialogue: "Đồ chơi ngoan nhé, vào hộp nằm nghỉ để phòng gọn gàng nào!",
        speaker: "Bé Nấm & Cinnamoroll",
      },
      {
        pageNumber: 6,
        title: "Trang 6: Tưới cây xanh mát",
        image: "/assets/stories/chores/page-6.png",
        lines: [
          "Bên khung cửa sổ ngập nắng, Nấm cầm bình tưới nước",
          "cho những chậu cây xanh mát cùng bạn Pompompurin.",
        ],
        dialogue: "Uống nước mát đi cây ơi để mau lớn và nở hoa đẹp nhé!",
        speaker: "Bé Nấm",
      },
      {
        pageNumber: 7,
        title: "Trang 7: Ngôi nhà sạch tinh tươm",
        image: "/assets/stories/chores/page-7.png",
        lines: [
          "Chỉ một loáng, cả ngôi nhà đã sạch bong và thơm tho!",
          "Nấm cùng các bạn reo hò vui sướng sau khi hoàn thành nhiệm vụ.",
        ],
        dialogue: "Hoan hô! Chúng mình làm việc nhóm giỏi quá đi thôi!",
        speaker: "Cả Nhóm Bạn",
      },
      {
        pageNumber: 8,
        title: "Trang 8: Mẹ khen ngợi & thưởng quà",
        image: "/assets/stories/chores/page-8.png",
        lines: [
          "Mẹ về nhà nhìn thấy nhà cửa gọn gàng liền mỉm cười hạnh phúc,",
          "xoa đầu khen Nấm ngoan và tặng cả nhóm những ly trà sữa!",
        ],
        dialogue: "Con của mẹ và các bạn giỏi lắm! Mẹ thưởng trà sữa trân châu nhé!",
        speaker: "Mẹ Của Nấm",
      },
      {
        pageNumber: 9,
        title: "Trang 9: Tiệc trà sữa ngọt ngào",
        image: "/assets/stories/chores/page-9.png",
        lines: [
          "Nấm cùng Kitty, Pompompurin, My Melody và Cinnamoroll",
          "quây quần bên bàn thưởng thức trà sữa trân châu thật vui vẻ!",
        ],
        dialogue: "Trà sữa mẹ thưởng sau khi làm việc nhà ngon tuyệt cú mèo luôn!",
        speaker: "Bé Nấm & Các Bạn",
      },
    ],
    questions: [
      {
        id: "chores-q1",
        question: "Trong gian bếp ở Trang 2, Nấm đã cùng Hello Kitty và Pompompurin làm công việc gì?",
        options: [
          "Rửa bát đĩa sạch bong sáng bóng",
          "Câu cá trên biển",
          "Đua xe Go-Kart",
        ],
        answer: "Rửa bát đĩa sạch bong sáng bóng",
        hint: "Ở Trang 2, Nấm bê chồng đĩa trắng giúp các bạn rửa bát với bọt xà phòng thơm phức!",
        pageRef: 2,
      },
      {
        id: "chores-q2",
        question: "Ở Trang 5, sau khi chơi xong, Nấm và các bạn đã cất gọn đồ chơi vào đâu?",
        options: [
          "Cất gọn gàng vào chiếc thùng hình gấu",
          "Để nguyên dưới sàn nhà",
          "Mang ra bãi biển",
        ],
        answer: "Cất gọn gàng vào chiếc thùng hình gấu",
        hint: "Ở Trang 5, xe ô tô và khối gỗ được xếp ngay ngắn vào chiếc hộp hình gấu đáng yêu!",
        pageRef: 5,
      },
      {
        id: "chores-q3",
        question: "Khi mẹ về thấy nhà cửa sạch tinh tươm, mẹ đã khen ngợi và thưởng món gì cho cả nhóm?",
        options: [
          "Những ly trà sữa trân châu ngọt ngào",
          "Bánh Pizza hải sản",
          "Cây kem ốc quế",
        ],
        answer: "Những ly trà sữa trân châu ngọt ngào",
        hint: "Ở Trang 8 và Trang 9, mẹ thưởng cho Nấm và các bạn những ly trà sữa trân châu ngon tuyệt!",
        pageRef: 8,
      },
    ],
  },
];

const EXTRA_SECOND_DIALOGUES: Record<string, Record<number, StoryDialogueLine>> = {
  "nam-doraemon-may": {
    1: {
      speaker: "Doraemon",
      text: "Chào mừng Nấm đến với Vương Quốc Trên Mây bằng bảo bối Cánh Cửa Thần Kỳ nhé!",
    },
    2: {
      speaker: "Doraemon",
      text: "Nấm nắm chặt tay tớ nhé, mình bay qua tầng mây cầu vồng kia nào!",
    },
    3: {
      speaker: "Bé Nấm",
      text: "Chào các bạn thỏ mây trắng muốt! Cùng trượt cầu vồng với tụi tớ nhé!",
    },
    4: {
      speaker: "Bé Nấm",
      text: "Rõ rồi Doraemon! Con tàu hơi nước chuẩn bị lướt qua thác mây đây!",
    },
    5: {
      speaker: "Doraemon",
      text: "Các bạn thỏ mây quý Nấm lắm đấy, cứ quấn quýt bên Nấm mãi thôi!",
    },
    6: {
      speaker: "Doraemon",
      text: "Nhất định rồi Nấm ơi! Bất cứ khi nào Nấm ngoan, mình lại mở Cánh Cửa Thần Kỳ đi chơi tiếp!",
    },
  },
  "nam-di-hoc": {
    1: {
      speaker: "Mèo Cam Nhỏ",
      text: "Meo meo! Chúc Nấm đi học thật vui và ngoan ngoãn nhé!",
    },
    2: {
      speaker: "Bé Nấm",
      text: "Đúng rồi Kitty ơi! Mình đi nhanh vào trường gặp các bạn nào!",
    },
    3: {
      speaker: "Bé Nấm",
      text: "Chào tất cả các bạn! Mình cùng nắm tay nhau vào lớp học nhé!",
    },
    4: {
      speaker: "Hello Kitty & My Melody",
      text: "Nấm kể chuyện hay quá! Tụi mình thích nghe Nấm đọc sách lắm!",
    },
    5: {
      speaker: "Bé Nấm",
      text: "Có gì đâu nè! Chia sẻ đồ dùng học tập cùng các bạn vui gấp đôi mà!",
    },
    6: {
      speaker: "Pompompurin",
      text: "Tập thể dục buổi sáng cùng Nấm giúp tụi mình cao lớn và khỏe mạnh!",
    },
    7: {
      speaker: "Hello Kitty",
      text: "Bánh kem dâu ngọt lịm luôn! Cười thật tươi chụp ảnh kỷ niệm nhé!",
    },
    8: {
      speaker: "Bé Nấm",
      text: "Con cảm ơn cô giáo ạ! Con hứa ngày nào đi học cũng chăm ngoan!",
    },
  },
  "nam-moana-bien": {
    1: {
      speaker: "Bé Nấm",
      text: "Em sẵn sàng rồi chị Moana ơi! Chào bạn rùa biển dễ thương nhé!",
    },
    2: {
      speaker: "Moana",
      text: "Biển xanh đang vẫy gọi chúng mình kìa, tiến thẳng về phía trước thôi!",
    },
    3: {
      speaker: "Bé Nấm",
      text: "Oa, chú cá nặng quá! Nhờ chị Moana cổ vũ nên em mới kéo lên được đấy!",
    },
    4: {
      speaker: "Moana",
      text: "Bạn Cá Nhám Voi đang mỉm cười vẫy vây chào Nấm kìa!",
    },
    5: {
      speaker: "Bé Nấm",
      text: "Những chú cá heo phát sáng nhảy cao như những ngôi sao biển biết bay vậy!",
    },
    6: {
      speaker: "Moana",
      text: "Thác nước từ trên núi mây đổ xuống đẹp tuyệt vời đúng không Nấm?",
    },
    7: {
      speaker: "Moana",
      text: "Chị ước cho Nấm luôn khỏe mạnh, dũng cảm và học thật giỏi nhé!",
    },
  },
  "nam-hawaii-stitch": {
    1: {
      speaker: "Bé Nấm",
      text: "Aloha Lilo và Stitch! Bãi biển Hawaii đẹp và mát quá đi!",
    },
    2: {
      speaker: "Stitch",
      text: "Gâu gâu! Stitch sẽ đứng canh gác bảo vệ lâu đài cát của Nấm!",
    },
    3: {
      speaker: "Stitch",
      text: "Hihi! Chiếc mũ kem vani mát lạnh hợp với Nấm lắm đấy!",
    },
    4: {
      speaker: "Lilo",
      text: "Nấm giữ thăng bằng trên ván lướt sóng siêu như vận động viên Hawaii luôn!",
    },
    5: {
      speaker: "Stitch",
      text: "Măm măm! Quả dứa vàng ngọt lịm, Stitch thích ăn dứa cùng Nấm nhất!",
    },
    6: {
      speaker: "Bé Nấm",
      text: "Tớ cũng yêu gia đình Ohana lắm! Mùa hè sau tớ lại đến thăm hai bạn nhé!",
    },
  },
  "nam-va-minion": {
    1: {
      speaker: "Bé Nấm",
      text: "Chào các bạn Minion tinh nghịch! Hôm nay mình làm bánh và đua xe nhé!",
    },
    2: {
      speaker: "Minion Bob",
      text: "Hehe, bột bánh thơm quá Nấm ơi! Tụi tớ biến thành người tuyết bột mì rồi!",
    },
    3: {
      speaker: "Bé Nấm",
      text: "Haha, các bạn Minion chạy từ từ thôi kẻo ngã nhé!",
    },
    4: {
      speaker: "Các Tay Đua Minion",
      text: "Brừm brừm! Xe đua số 1 và số 2 tăng tốc theo hiệu lệnh của Trọng tài Nấm!",
    },
    5: {
      speaker: "Biệt Đội Minion",
      text: "Oa! Nhiều bong bóng xà phòng bảy màu bay khắp phòng thích quá!",
    },
    6: {
      speaker: "Minion Nhỏ",
      text: "Khò khò... Cảm ơn anh Nấm dịu dàng, tụi em ngủ ngoan đây ạ...",
    },
  },
  "nam-di-concert": {
    1: {
      speaker: "Pompompurin",
      text: "Đừng quên mang theo cây gậy phát sáng ngôi sao để cổ vũ nhé Nấm ơi!",
    },
    2: {
      speaker: "Hello Kitty",
      text: "Xe buýt sắp tới nơi rồi, tụi mình cùng hát vang trên xe nào!",
    },
    3: {
      speaker: "Bé Nấm",
      text: "Nhìn những tấm biển đèn LED của các Anh Tài sáng rực cả bầu trời kìa!",
    },
    4: {
      speaker: "My Melody & Kitty",
      text: "Biển ánh sáng đỏ rực đẹp như hàng ngàn ngôi sao vậy Nấm nhỉ!",
    },
    5: {
      speaker: "Bé Nấm",
      text: "Pháo hoa bùng nổ trên sân khấu hoành tráng quá các bạn ơi!",
    },
    6: {
      speaker: "Bé Nấm",
      text: "Oa! Em chào anh ca sĩ ạ! Anh hát hay tuyệt vời luôn!",
    },
    7: {
      speaker: "Cinnamoroll",
      text: "Tấm poster kỷ niệm đẹp quá, về nhà mình treo ở góc học tập nhé!",
    },
    8: {
      speaker: "Bé Nấm",
      text: "Nhìn lại ảnh chụp trên sân khấu mà mình vẫn còn vui lâng lâng!",
    },
    9: {
      speaker: "Hello Kitty",
      text: "Cuốn sổ lưu niệm của Nấm trang trí trái tim và ngôi sao khéo tay quá!",
    },
  },
  "nam-o-zootopia": {
    1: {
      speaker: "Bé Nấm",
      text: "Chào chị cảnh sát Judy và anh cáo Nick! Em sẵn sàng nhận nhiệm vụ ạ!",
    },
    2: {
      speaker: "Cảnh Sát Judy",
      text: "Tài xế nhí Nấm lái xe tuần tra vững vàng và ngầu quá đi!",
    },
    3: {
      speaker: "Thám Tử Cáo Nick",
      text: "Ồ, mắt thám tử nhí Nấm tinh thật đấy! Mau đuổi theo lấy lại bánh thôi!",
    },
    4: {
      speaker: "Chú Gấu Trúc",
      text: "Ối! Tại bánh Donut thơm quá nên tớ lỡ ôm chạy, cho tớ xin lỗi nhé!",
    },
    5: {
      speaker: "Bé Nấm",
      text: "Cảm ơn bác chủ tiệm ạ! Làm cảnh sát tốt bụng giúp mọi người vui quá!",
    },
    6: {
      speaker: "Cảnh Sát Judy",
      text: "Tặng Nấm huy hiệu Cảnh Sát Danh Dự của thành phố Zootopia nhé!",
    },
  },
  "nam-lam-viec-nha": {
    1: {
      speaker: "Hello Kitty",
      text: "Chúng mình chia nhau mỗi người một việc để nhà sạch bong nhé!",
    },
    2: {
      speaker: "Bé Nấm",
      text: "Tớ xếp đĩa đã tráng sạch lên kệ thật gọn gàng cho mẹ đây!",
    },
    3: {
      speaker: "Cinnamoroll",
      text: "Có tớ cầm xẻng hót rác đây, không còn một hạt bụi nào luôn!",
    },
    4: {
      speaker: "Bé Nấm",
      text: "Quần áo gấp phẳng phiu cất vào tủ nhìn ngăn nắp thích mắt quá!",
    },
    5: {
      speaker: "Hello Kitty",
      text: "Chơi xong biết tự thu dọn đồ chơi mới là em bé ngoan Nấm nhỉ!",
    },
    6: {
      speaker: "Pompompurin",
      text: "Nhờ Nấm tưới nước mát mà chiếc lá nào cũng xanh tươi mơn mởn!",
    },
    7: {
      speaker: "Bé Nấm",
      text: "Nhà cửa sạch tinh tươm rồi, lát nữa mẹ về chắc chắn sẽ bất ngờ lắm!",
    },
    8: {
      speaker: "Bé Nấm",
      text: "Con yêu mẹ nhiều lắm ạ! Giúp mẹ làm việc nhà vui ơi là vui!",
    },
    9: {
      speaker: "My Melody & Kitty",
      text: "Cụng ly trà sữa trân châu chúc mừng đội dọn nhà chăm chỉ nào!",
    },
  },
};

export function getPageDialogues(
  bookId: string,
  page: StoryPage,
): StoryDialogueLine[] {
  if (page.dialogues && page.dialogues.length > 0) {
    return page.dialogues;
  }
  const extra = EXTRA_SECOND_DIALOGUES[bookId]?.[page.pageNumber];
  if (extra) {
    return [{ speaker: page.speaker, text: page.dialogue }, extra];
  }
  return [{ speaker: page.speaker, text: page.dialogue }];
}

