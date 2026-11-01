import { SHARED_ASSET_CATALOG, type SharedAssetMetadata } from "./sharedAssetCatalog";

export interface IslandRaceQuestion {
  id: string;
  text: string;
  imageUrl?: string;
  type: "single" | "multiple" | "boolean" | "image";
  options: string[];
  correctAnswers: number[];
  explanation?: string;
  difficulty: "easy" | "medium" | "hard";
  timeLimit?: number;
  enabled: boolean;
}

export interface IslandRaceQuestionBank {
  id: string;
  name: string;
  subject: string;
  topic: string;
  description?: string;
  updatedAt: string;
  questions: IslandRaceQuestion[];
}

export const NAM_ISLAND_CURRICULUM_STORAGE_KEY =
  "nam_hoc_vui_island_curriculum_banks_v1";

function pickDistinctItems(
  pool: SharedAssetMetadata[],
  excludeId: string,
  count: number,
  seedOffset: number,
): SharedAssetMetadata[] {
  const filtered = pool.filter((item) => item.id !== excludeId);
  const result: SharedAssetMetadata[] = [];
  for (let i = 0; i < count && filtered.length > 0; i++) {
    const idx = (seedOffset * 7 + i * 13) % filtered.length;
    const candidate = filtered[idx];
    if (!result.some((r) => r.id === candidate.id)) {
      result.push(candidate);
    } else {
      const fallback = filtered.find((f) => !result.some((r) => r.id === f.id));
      if (fallback) result.push(fallback);
    }
  }
  return result;
}

/**
 * 1. Bộ câu hỏi MÔN TOÁN (Tự sinh từ kho 131 vật phẩm 3D + Tách gộp, Cộng trừ, So sánh trong Nấm Học Vui)
 */
function buildMathQuestions(): IslandRaceQuestion[] {
  const catalog = SHARED_ASSET_CATALOG;
  const mathItems = catalog.slice(0, 16);
  const questions: IslandRaceQuestion[] = [];

  const numberPairs: [number, number][] = [
    [3, 2],
    [4, 3],
    [5, 2],
    [6, 3],
    [4, 4],
    [5, 4],
    [2, 3],
    [7, 2],
  ];

  numberPairs.forEach(([a, b], idx) => {
    const item = mathItems[idx % mathItems.length];
    const sum = a + b;
    const wrong1 = Math.max(1, sum - 1);
    const wrong2 = sum + 1;
    const wrong3 = sum + 2;
    const label = item.readingWordVi.toLowerCase();
    const options = [
      `${wrong1} ${label}`,
      `${sum} ${label}`,
      `${wrong2} ${label}`,
      `${wrong3} ${label}`,
    ];

    questions.push({
      id: `nam-math-add-${idx + 1}`,
      text: `[Toán Học] Bé Nấm có ${a} ${label} (${item.name}), mẹ tặng thêm ${b} ${label} nữa. Hỏi Bé Nấm có tất cả bao nhiêu ${label}?`,
      imageUrl: item.imageUrl,
      type: "single",
      options,
      correctAnswers: [1],
      explanation: `Gộp ${a} và ${b} ta có phép cộng: ${a} + ${b} = ${sum} (${item.name})!`,
      difficulty: "easy",
      timeLimit: 20,
      enabled: true,
    });
  });

  const subPairs: [number, number][] = [
    [6, 2],
    [8, 3],
    [7, 4],
    [9, 3],
    [10, 4],
    [5, 2],
  ];

  subPairs.forEach(([total, take], idx) => {
    const item = catalog[(idx + 25) % catalog.length];
    const remain = total - take;
    const label = item.readingWordVi.toLowerCase();
    const options = [
      `${remain} ${label}`,
      `${remain + 1} ${label}`,
      `${Math.max(1, remain - 1)} ${label}`,
      `${remain + 2} ${label}`,
    ];

    questions.push({
      id: `nam-math-sub-${idx + 1}`,
      text: `[Toán Học] Trên bàn có ${total} ${label} (${item.name}), Nấm chia cho bạn Cinnamoroll ${take} ${label}. Hỏi còn lại mấy ${label}?`,
      imageUrl: item.imageUrl,
      type: "single",
      options,
      correctAnswers: [0],
      explanation: `Bớt đi ${take} ta có phép trừ: ${total} - ${take} = ${remain} (${item.name})!`,
      difficulty: "easy",
      timeLimit: 20,
      enabled: true,
    });
  });

  // Câu hỏi Tách - Gộp & Đúng/Sai từ kho Đồ chơi 3D mới
  const toys = catalog.filter((i) => i.themeGroup === "toys");
  const toy1 = toys[0] || catalog[0];
  const toy2 = toys[3] || catalog[1];

  questions.push(
    {
      id: "nam-math-split-1",
      text: `[Toán Tách Gộp] Bé Nấm có 7 món đồ chơi (${toy1.name}), Nấm xếp vào giỏ trái 3 món. Hỏi giỏ phải có mấy món để gộp lại đủ 7?`,
      imageUrl: toy1.imageUrl,
      type: "single",
      options: ["3 món", "4 món", "5 món", "2 món"],
      correctAnswers: [1],
      explanation: "7 tách thành 3 và 4 (vì 3 + 4 = 7)!",
      difficulty: "easy",
      timeLimit: 20,
      enabled: true,
    },
    {
      id: "nam-math-bool-1",
      text: `[Toán Học] Đúng hay Sai: Số 8 lớn hơn số 5 và nhỏ hơn số 10?`,
      imageUrl: toy2.imageUrl,
      type: "boolean",
      options: ["Đúng", "Sai"],
      correctAnswers: [0],
      explanation: "Chính xác! Trên tia số: 5 < 8 < 10.",
      difficulty: "easy",
      timeLimit: 15,
      enabled: true,
    },
    {
      id: "nam-math-multi-1",
      text: `[Toán Tư Duy] Chọn TẤT CẢ các phép tính có kết quả bằng 6:`,
      imageUrl: "/assets/props/coin-gold.webp",
      type: "multiple",
      options: ["4 + 2", "3 + 3", "8 - 2", "5 + 2"],
      correctAnswers: [0, 1, 2],
      explanation: "4 + 2 = 6, 3 + 3 = 6 và 8 - 2 = 6!",
      difficulty: "medium",
      timeLimit: 25,
      enabled: true,
    },
  );

  return questions;
}

/**
 * 2. Bộ câu hỏi MÔN TIẾNG ANH (Tự sinh trực tiếp từ Metadata 22 trường của 131 vật phẩm 3D)
 */
function buildEnglishQuestions(): IslandRaceQuestion[] {
  const catalog = SHARED_ASSET_CATALOG;
  const selected = [
    ...catalog.filter((i) => i.themeGroup === "toys").slice(0, 6),
    ...catalog.filter((i) => i.themeGroup === "sweets").slice(0, 4),
    ...catalog.filter((i) => i.themeGroup === "fruits").slice(0, 4),
    ...catalog.filter((i) => i.themeGroup === "vehicles").slice(0, 3),
  ];

  const questions: IslandRaceQuestion[] = [];

  selected.forEach((item, idx) => {
    const distractors = pickDistinctItems(catalog, item.id, 3, idx + 3);
    const rawOptions = [
      `${item.englishWord} (${item.pronunciationIpa})`,
      ...distractors.map((d) => `${d.englishWord} (${d.pronunciationIpa})`),
    ];
    const correctIndex = idx % 4;
    const options = [...rawOptions];
    const temp = options[0];
    options[0] = options[correctIndex];
    options[correctIndex] = temp;

    questions.push({
      id: `nam-eng-vocab-${idx + 1}`,
      text: `[Tiếng Anh] Nhìn hình "${item.name}" bên dưới, từ tiếng Anh đúng của vật này là gì?`,
      imageUrl: item.imageUrl,
      type: "image",
      options,
      correctAnswers: [correctIndex],
      explanation: `"${item.name}" trong tiếng Anh đọc là "${item.englishWord}" ${item.pronunciationIpa} (${item.englishName})!`,
      difficulty: "easy",
      timeLimit: 20,
      enabled: true,
    });
  });

  // Câu hỏi màu sắc & ngữ cảnh tiếng Anh từ metadata
  const colorItems = catalog.filter((i) => i.themeGroup === "toys").slice(6, 10);
  colorItems.forEach((item, idx) => {
    questions.push({
      id: `nam-eng-color-${idx + 1}`,
      text: `[Tiếng Anh] Món đồ "${item.name}" (${item.englishName}) có màu chủ đạo là "${item.colorLabelVi}". Đố Nấm từ "${item.englishWord}" nghĩa là gì?`,
      imageUrl: item.imageUrl,
      type: "single",
      options: [
        item.name,
        catalog[(idx + 15) % catalog.length].name,
        catalog[(idx + 30) % catalog.length].name,
        catalog[(idx + 45) % catalog.length].name,
      ],
      correctAnswers: [0],
      explanation: `${item.englishWord} ${item.pronunciationIpa} có nghĩa là "${item.name}"!`,
      difficulty: "easy",
      timeLimit: 20,
      enabled: true,
    });
  });

  return questions;
}

/**
 * 3. Bộ câu hỏi MÔN TẬP ĐỌC TIẾNG VIỆT (Tự sinh từ readingWordVi & syllablesVi trong kho học liệu)
 */
function buildReadingQuestions(): IslandRaceQuestion[] {
  const catalog = SHARED_ASSET_CATALOG;
  const readingPool = [
    ...catalog.filter((i) => i.themeGroup === "toys").slice(0, 8),
    ...catalog.filter((i) => i.themeGroup === "school").slice(0, 4),
    ...catalog.filter((i) => i.themeGroup === "home").slice(0, 4),
  ];

  const questions: IslandRaceQuestion[] = [];

  readingPool.forEach((item, idx) => {
    const [syl1, syl2] = item.syllablesVi;
    const distractors = pickDistinctItems(catalog, item.id, 3, idx + 11);

    if (idx % 2 === 0 && syl1 && syl2) {
      // Dạng 1: Điền tiếng còn thiếu trong từ ghép 2 âm tiết
      const options = [
        syl2,
        distractors[0]?.syllablesVi[1] || "mây",
        distractors[1]?.syllablesVi[0] || "hoa",
        distractors[2]?.syllablesVi[1] || "sao",
      ];
      questions.push({
        id: `nam-read-fill-${idx + 1}`,
        text: `[Tập Đọc] Quan sát hình "${item.name}", con hãy chọn tiếng thích hợp điền vào chỗ trống: "${syl1} ..."?`,
        imageUrl: item.imageUrl,
        type: "image",
        options,
        correctAnswers: [0],
        explanation: `Ghép hai tiếng "${syl1}" + "${syl2}" ta đọc là "${item.readingWordVi}"!`,
        difficulty: "easy",
        timeLimit: 20,
        enabled: true,
      });
    } else {
      // Dạng 2: Nhận diện từ ghép đúng với hình ảnh 3D
      const options = [
        item.readingWordVi,
        distractors[0]?.readingWordVi || "cầu vồng",
        distractors[1]?.readingWordVi || "bông hoa",
        distractors[2]?.readingWordVi || "ngôi sao",
      ];
      questions.push({
        id: `nam-read-word-${idx + 1}`,
        text: `[Tập Đọc] Nhìn bức tranh 3D bên dưới, từ nào đọc đúng tên của hình này?`,
        imageUrl: item.imageUrl,
        type: "image",
        options,
        correctAnswers: [0],
        explanation: `Đánh vần: ${item.syllablesVi.join(" - ")} -> đọc trơn là "${item.readingWordVi}" (${item.activityLabelVi})!`,
        difficulty: "easy",
        timeLimit: 20,
        enabled: true,
      });
    }
  });

  return questions;
}

/**
 * 4. Bộ câu hỏi MÔN KỸ NĂNG SỐNG (Lễ phép, Tự lập, Vệ sinh, An toàn & Cảm xúc của Bé Nấm)
 */
function buildLifeSkillsQuestions(): IslandRaceQuestion[] {
  const catalog = SHARED_ASSET_CATALOG;
  const lifeItems = catalog.filter((i) => i.themeGroup === "lifeskills");
  const toys = catalog.filter((i) => i.themeGroup === "toys");
  const fruits = catalog.filter((i) => i.themeGroup === "fruits");
  const vehicles = catalog.filter((i) => i.themeGroup === "vehicles");

  return [
    {
      id: "nam-ls-1",
      text: "[Kỹ Năng Sống] Khi được ông bà hoặc bố mẹ tặng quà, Bé Nấm nên nói và làm gì?",
      imageUrl: toys[14]?.imageUrl || "/assets/items/toys/toy_15.webp",
      type: "single",
      options: [
        "Giật lấy quà chạy đi ngay",
        "Đưa hai tay nhận quà và nói: Con xin ạ, con cảm ơn ông bà/bố mẹ!",
        "Không nói gì cả",
        "Ném quà xuống đất",
      ],
      correctAnswers: [1],
      explanation: "Nhận quà bằng hai tay và nói lời cảm ơn là em bé lễ phép, ngoan ngoãn!",
      difficulty: "easy",
      timeLimit: 20,
      enabled: true,
    },
    {
      id: "nam-ls-2",
      text: "[Kỹ Năng Sống] Trước khi ăn cơm và sau khi đi vệ sinh, Bé Nấm cần làm việc gì để bảo vệ sức khỏe?",
      imageUrl: lifeItems[0]?.imageUrl || "/assets/items/toys/toy_13.webp",
      type: "single",
      options: [
        "Rửa tay sạch bằng xà phòng và nước sạch",
        "Chùi tay vào quần áo",
        "Không cần rửa tay",
        "Đi ngủ luôn",
      ],
      correctAnswers: [0],
      explanation: "Rửa tay bằng xà phòng giúp tiêu diệt vi khuẩn để bụng Nấm luôn khỏe mạnh!",
      difficulty: "easy",
      timeLimit: 20,
      enabled: true,
    },
    {
      id: "nam-ls-3",
      text: "[Kỹ Năng Sống] Sau khi chơi xong đồ chơi (gấu bông, tàu hỏa, khối gỗ...), Bé Nấm nên làm gì?",
      imageUrl: toys[7]?.imageUrl || "/assets/items/toys/toy_08.webp",
      type: "single",
      options: [
        "Để bừa bãi trên sàn nhà",
        "Tự giác thu dọn đồ chơi gọn gàng vào hộp/kệ",
        "Bắt em nhỏ dọn hộ",
        "Đá đồ chơi vào gầm giường",
      ],
      correctAnswers: [1],
      explanation: "Cất đồ chơi gọn gàng lên kệ giúp phòng ốc sạch đẹp và không ai bị vấp ngã!",
      difficulty: "easy",
      timeLimit: 20,
      enabled: true,
    },
    {
      id: "nam-ls-4",
      text: "[An Toàn Cho Bé] Nếu có người lạ cho kẹo và rủ Bé Nấm đi theo khi không có bố mẹ ở đó, con phải làm gì?",
      imageUrl: toys[0]?.imageUrl || "/assets/items/toys/toy_01.webp",
      type: "single",
      options: [
        "Đi theo người lạ để lấy kẹo",
        "Từ chối dứt khoát: 'Không ạ!' và chạy ngay về phía bố mẹ, cô giáo hoặc chú bảo vệ",
        "Lên xe người lạ",
        "Đi một mình ra đường lớn",
      ],
      correctAnswers: [1],
      explanation: "Tuyệt đối không nhận quà hay đi theo người lạ khi chưa được bố mẹ đồng ý!",
      difficulty: "easy",
      timeLimit: 20,
      enabled: true,
    },
    {
      id: "nam-ls-5",
      text: "[Kỹ Năng Sống] Buổi tối trước khi đi ngủ và buổi sáng sau khi thức dậy, Bé Nấm cần làm gì cho hàm răng trắng xinh?",
      imageUrl: lifeItems[1]?.imageUrl || "/assets/items/toys/toy_14.webp",
      type: "single",
      options: [
        "Ăn thật nhiều kẹo ngọt rồi ngủ luôn",
        "Đánh răng sạch sẽ đúng cách và súc miệng",
        "Chỉ uống nước ngọt",
        "Không cần đánh răng",
      ],
      correctAnswers: [1],
      explanation: "Đánh răng sáng và tối giúp răng chắc khỏe, thơm tho, không bị sâu răng!",
      difficulty: "easy",
      timeLimit: 20,
      enabled: true,
    },
    {
      id: "nam-ls-6",
      text: "[An Toàn Giao Thông] Khi ngồi trên xe máy cùng bố mẹ, Bé Nấm cần trang bị gì trên đầu để đảm bảo an toàn?",
      imageUrl: vehicles[0]?.imageUrl || "/assets/items/toys/toy_06.webp",
      type: "single",
      options: [
        "Đội mũ bảo hiểm vừa vặn và cài quai chắc chắn",
        "Không cần đội mũ",
        "Đứng nhún nhảy trên yên xe",
        "Che ô khi đang đi xe máy",
      ],
      correctAnswers: [0],
      explanation: "Đội mũ bảo hiểm cài quai đúng quy cách giúp bảo vệ an toàn cho bé trên mọi chuyến đi!",
      difficulty: "easy",
      timeLimit: 20,
      enabled: true,
    },
    {
      id: "nam-ls-7",
      text: "[An Toàn Ở Nhà] Đúng hay Sai: Trẻ em KHÔNG ĐƯỢC tự ý chạm tay ướt vào ổ cắm điện hoặc nghịch phích điện?",
      imageUrl: lifeItems[2]?.imageUrl || "/assets/items/toys/toy_07.webp",
      type: "boolean",
      options: ["Đúng", "Sai"],
      correctAnswers: [0],
      explanation: "Chính xác! Ổ điện rất nguy hiểm, con tuyệt đối không tự cắm điện hay thò tay vào ổ điện nhé.",
      difficulty: "easy",
      timeLimit: 15,
      enabled: true,
    },
    {
      id: "nam-ls-8",
      text: "[Kỹ Năng Sống] Khi đi học về hoặc khi gặp người lớn tuổi, Bé Nấm làm thế nào mới là bé ngoan?",
      imageUrl: toys[1]?.imageUrl || "/assets/items/toys/toy_02.webp",
      type: "single",
      options: [
        "Khoanh tay mỉm cười chào lễ phép: 'Con chào ông bà, bố mẹ ạ!'",
        "Chạy vụt vào phòng không nói gì",
        "Quay mặt đi chỗ khác",
        "Hét toáng lên",
      ],
      correctAnswers: [0],
      explanation: "Lời chào cao hơn mâm cỗ! Khoanh tay chào hỏi lễ phép khiến ông bà bố mẹ rất vui lòng.",
      difficulty: "easy",
      timeLimit: 20,
      enabled: true,
    },
    {
      id: "nam-ls-9",
      text: "[Kỹ Năng Vào Bếp] Khi phụ mẹ nhặt rau và rửa hoa quả, những việc nào vừa sức và an toàn cho Bé Nấm? (Chọn nhiều đáp án)",
      imageUrl: fruits[0]?.imageUrl || "/assets/items/toys/toy_04.webp",
      type: "multiple",
      options: [
        "Rửa dâu tây và hoa quả trong chậu nước sạch",
        "Nhặt lá rau giúp mẹ",
        "Tự bật bếp lửa lớn và cầm dao sắc nhọn",
        "Xếp thìa đũa gọn gàng lên bàn ăn",
      ],
      correctAnswers: [0, 1, 3],
      explanation: "Con có thể rửa quả, nhặt rau, xếp bát đũa giúp mẹ, nhưng không tự dùng dao sắc hay bật lửa nhé!",
      difficulty: "medium",
      timeLimit: 25,
      enabled: true,
    },
    {
      id: "nam-ls-10",
      text: "[Kỹ Năng Chia Sẻ] Khi chơi đồ chơi cùng bạn bè hoặc anh chị em, Bé Nấm nên ứng xử thế nào?",
      imageUrl: toys[5]?.imageUrl || "/assets/items/toys/toy_06.webp",
      type: "single",
      options: [
        "Cùng chia sẻ đồ chơi, nhường nhịn và thay phiên nhau chơi vui vẻ",
        "Giành hết đồ chơi về mình",
        "Đẩy bạn ra xa",
        "Giấu hết đồ chơi đi",
      ],
      correctAnswers: [0],
      explanation: "Biết chia sẻ và chơi đoàn kết giúp Nấm có thêm thật nhiều niềm vui và những người bạn tốt!",
      difficulty: "easy",
      timeLimit: 20,
      enabled: true,
    },
  ];
}

export function generateNamHocVuiIslandBanks(): IslandRaceQuestionBank[] {
  const now = new Date().toISOString();
  const mathQuestions = buildMathQuestions();
  const englishQuestions = buildEnglishQuestions();
  const readingQuestions = buildReadingQuestions();
  const lifeSkillsQuestions = buildLifeSkillsQuestions();

  // Trộn xen kẽ 4 môn cho bộ Tổng Hợp Mặc Định của Nấm Học Vui
  const mixedQuestions: IslandRaceQuestion[] = [];
  const maxLen = Math.max(
    mathQuestions.length,
    englishQuestions.length,
    readingQuestions.length,
    lifeSkillsQuestions.length,
  );

  for (let i = 0; i < maxLen; i++) {
    if (mathQuestions[i]) mixedQuestions.push(mathQuestions[i]);
    if (englishQuestions[i]) mixedQuestions.push(englishQuestions[i]);
    if (readingQuestions[i]) mixedQuestions.push(readingQuestions[i]);
    if (lifeSkillsQuestions[i]) mixedQuestions.push(lifeSkillsQuestions[i]);
  }

  return [
    {
      id: "nam-all-subjects",
      name: "🌟 Tổng Hợp 4 Môn: Toán • Tiếng Anh • Tập Đọc • Kỹ Năng Sống",
      subject: "Tổng hợp 4 môn",
      topic: "Kho học liệu Nấm Học Vui (131 vật phẩm 3D)",
      description:
        "Tự động lấy và trộn đều câu hỏi từ cả 4 môn học trong Nấm Học Vui: Toán học, Tiếng Anh 3D, Tập đọc Tiếng Việt và Kỹ năng sống.",
      updatedAt: now,
      questions: mixedQuestions,
    },
    {
      id: "nam-math",
      name: "🔢 Môn Toán: Đếm 3D, Tách Gộp & Cộng Trừ",
      subject: "Toán học",
      topic: "Cộng trừ, Tách gộp & Đếm vật phẩm 3D",
      description:
        "Câu hỏi Toán học tự động lấy từ kho 131 vật phẩm 3D và bài học Toán của Bé Nấm.",
      updatedAt: now,
      questions: mathQuestions,
    },
    {
      id: "nam-english",
      name: "🇬🇧 Môn Tiếng Anh: Từ Vựng 3D, Màu Sắc & Phát Âm",
      subject: "Tiếng Anh",
      topic: "Từ vựng 3D, Phiên âm & Màu sắc",
      description:
        "Câu hỏi Tiếng Anh tự động trích xuất từ siêu dữ liệu 131 vật phẩm 3D (kèm bộ 16 Đồ chơi Kawaii 3D mới).",
      updatedAt: now,
      questions: englishQuestions,
    },
    {
      id: "nam-reading",
      name: "📖 Môn Tập Đọc: Ghép Vần & Từ Ghép 2 Âm Tiết",
      subject: "Tập đọc Tiếng Việt",
      topic: "Đánh vần, Điền tiếng & Đọc trơn",
      description:
        "Câu hỏi Tập đọc tự động lấy từ từ vựng 2 âm tiết (readingWordVi & syllablesVi) trong Nấm Học Vui.",
      updatedAt: now,
      questions: readingQuestions,
    },
    {
      id: "nam-lifeskills",
      name: "🌱 Môn Kỹ Năng Sống: Lễ Phép, Tự Lập & An Toàn",
      subject: "Kỹ năng sống",
      topic: "Lễ phép, Vệ sinh, An toàn & Chia sẻ",
      description:
        "Câu hỏi tình huống thực tế từ chương trình Kỹ năng sống của Bé Nấm.",
      updatedAt: now,
      questions: lifeSkillsQuestions,
    },
  ];
}
