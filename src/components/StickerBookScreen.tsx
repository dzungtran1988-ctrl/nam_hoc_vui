import React, { useEffect, useRef, useState } from "react";
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  FlipHorizontal,
  Gift,
  Home,
  Lock,
  RotateCw,
  Sparkles,
  Trash2,
  Trophy,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import {
  ALL_SUBJECT_IDS,
  NAM_MASTER_CUP_IMAGE,
  NAM_SPECIAL_STICKERS,
  SUBJECT_CUPS,
  getCharacterStickerEarnedCount,
  getNamRankInfo,
  getPlacedStickerCountMap,
  getSubjectSetStickerEarnedCount,
  getSubjectStickerSet,
  getTotalUnlockedInBook,
  getUnlockedNamSpecialCount,
  loadBookPages,
  loadNamSpecialInventory,
  saveBookPages,
  type BookPagesStore,
  type DrawerTabId,
  type NamStickerTier,
  type PlacedSticker,
  type StickerCollectionStore,
} from "../data/rewardStickers";
import {
  KAWAII_PASTRY_CATALOG,
  type KawaiiPastryAsset,
} from "../data/mathLessons";
import {
  getUnlockedQuestItemTypesCount,
  loadQuestItemInventory,
  type QuestItemInventory,
} from "../data/dailyQuests";
import type { SubjectId } from "../types";
import {
  playCameraShutterSound,
  playStickerPeelStickSound,
} from "../lib/sound";
import { getElementLocalRatio } from "../lib/touchCoords";

export type { DrawerTabId, PlacedSticker };

export interface StickerBookPageConfig {
  id: string;
  title: string;
  shortLabel: string;
  icon: string;
  bgImage: string;
  themeColor: string;
  category: "character" | "quest-item";
  defaultTab?: DrawerTabId;
  emptyHint?: string;
}

export const STICKER_BOOK_PAGES: StickerBookPageConfig[] = [
  {
    id: "nam-stage",
    title: "Sân Khấu Pop Kỳ Ảo Ánh Sao — Ca Sĩ Nấm & Các Bạn",
    shortLabel: "🎤 Sân Khấu",
    icon: "🎤",
    bgImage: "/assets/stickerbook/bg-nam-stage.png?v=starstage",
    themeColor: "#FF477E",
    category: "character",
    defaultTab: "nam-special",
    emptyHint:
      "🎤 Ca Sĩ Nấm biểu diễn giữa Sân Khấu Ánh Sao! Chạm vào Sticker Nấm & các bạn Sanrio ở khay dưới để dán lên sân khấu nhé!",
  },
  {
    id: "supermarket",
    title: "Kệ Siêu Thị & Tiệm Bánh Ngọt Pastel 3D (Kho Đồ Vật Nhiệm Vụ)",
    shortLabel: "🛒 Siêu Thị",
    icon: "🛒",
    bgImage: "/assets/stickerbook/bg-supermarket.jpg?v=front3d",
    themeColor: "#EC4899",
    category: "quest-item",
    defaultTab: "quest-sweets",
    emptyHint:
      "🛒 Chạm vào Bánh ngọt, Kem, Trà sữa ở khay dưới để bày lên 3 tầng Kệ Siêu Thị Đất Nặn 3D nhé!",
  },
  {
    id: "fruits",
    title: "Thùng Hoa Quả Nông Trại Nấm (Kho Đồ Vật Nhiệm Vụ)",
    shortLabel: "🍎 Hoa Quả",
    icon: "🍎",
    bgImage: "/assets/stickerbook/bg-fruit-crates.jpg?v=clay3d",
    themeColor: "#F97316",
    category: "quest-item",
    defaultTab: "quest-fruits",
    emptyHint:
      "🍎 Chạm vào Trái cây tươi ngon ở khay dưới để xếp đầy vào 4 Giỏ & Thùng Gỗ 3D nhé!",
  },
  {
    id: "parking",
    title: "Bãi Đỗ Xe & Bến Tàu Thành Phố (Kho Đồ Vật Nhiệm Vụ)",
    shortLabel: "🚗 Bãi Xe",
    icon: "🚗",
    bgImage: "/assets/stickerbook/bg-parking-lot.jpg?v=clay3d",
    themeColor: "#0284C7",
    category: "quest-item",
    defaultTab: "quest-vehicles",
    emptyHint:
      "🚗 Chạm vào Ô tô, Xe buýt, Tàu thủy, Máy bay ở khay dưới để đỗ vào Bãi Xe & Bến Tàu 3D nhé!",
  },
  {
    id: "park",
    title: "Công Viên Giải Trí Cầu Vồng (Kho Nhân Vật Bài Học)",
    shortLabel: "🎡 Công Viên",
    icon: "🎡",
    bgImage: "/assets/stickerbook/bg-park.jpg",
    themeColor: "#FF6B81",
    category: "character",
    defaultTab: "unlocked",
  },
  {
    id: "party",
    title: "Bữa Tiệc Sinh Nhật Của Nấm (Kho Nhân Vật Bài Học)",
    shortLabel: "🎂 Sinh Nhật",
    icon: "🎂",
    bgImage: "/assets/stickerbook/bg-party.jpg",
    themeColor: "#A855F7",
    category: "character",
    defaultTab: "unlocked",
  },
  {
    id: "beach",
    title: "Bãi Biển Mùa Hè Rực Rỡ (Kho Nhân Vật Bài Học)",
    shortLabel: "🏖️ Bãi Biển",
    icon: "🏖️",
    bgImage: "/assets/stickerbook/bg-beach.jpg",
    themeColor: "#0EA5E9",
    category: "character",
    defaultTab: "unlocked",
  },
  {
    id: "forest",
    title: "Khu Rừng Nấm Cổ Tích (Kho Nhân Vật Bài Học)",
    shortLabel: "🍄 Rừng Nấm",
    icon: "🍄",
    bgImage: "/assets/stickerbook/bg-forest.jpg",
    themeColor: "#10B981",
    category: "character",
    defaultTab: "unlocked",
  },
];

interface TrayStickerEntry {
  id: string;
  name: string;
  image: string;
  unlocked: boolean;
  totalEarned: number;
  placedCount: number;
  availableCount: number;
  sourceType: "character" | "quest-item" | "nam-special";
  subjectId?: SubjectId;
  categoryLabel?: string;
  namTier?: NamStickerTier;
  momRewardVoucher?: string;
}

interface StickerBookScreenProps {
  stickerStore: StickerCollectionStore;
  questItemInventory?: QuestItemInventory;
  initialSubjectFilter?: DrawerTabId;
  initialPageId?: string;
  onGoHome: () => void;
  onGoTrophyRoom: () => void;
  onOpenDailyQuests?: () => void;
  onStartSubjectLesson: (subject: SubjectId) => void;
  onBurstAt: (x: number, y: number, theme?: "pink" | "gold" | "rainbow") => void;
  onSpeak: (text: string) => void;
}

export const StickerBookScreen: React.FC<StickerBookScreenProps> = ({
  stickerStore,
  questItemInventory,
  initialSubjectFilter = "unlocked",
  initialPageId,
  onGoHome,
  onGoTrophyRoom,
  onOpenDailyQuests,
  onStartSubjectLesson,
  onBurstAt,
  onSpeak,
}) => {
  const resolvedInitialPage =
    initialPageId ||
    (initialSubjectFilter === "nam-special"
      ? "nam-stage"
      : initialSubjectFilter.startsWith("quest-")
        ? "supermarket"
        : "nam-stage");

  const [activePageId, setActivePageId] = useState<string>(resolvedInitialPage);
  const [pagesStore, setPagesStore] = useState<BookPagesStore>(() =>
    loadBookPages(),
  );
  const [selectedUid, setSelectedUid] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<DrawerTabId>(initialSubjectFilter);
  const [photoMode, setPhotoMode] = useState(false);
  const [cameraFlash, setCameraFlash] = useState(false);

  const itemInv = React.useMemo(
    () => questItemInventory || loadQuestItemInventory(),
    [questItemInventory],
  );
  const namSpecialInv = React.useMemo(
    () => loadNamSpecialInventory(),
    [stickerStore],
  );

  const canvasRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef<{
    uid: string;
    pointerId: number;
    offsetX: number;
    offsetY: number;
  } | null>(null);

  const currentPageCfg =
    STICKER_BOOK_PAGES.find((p) => p.id === activePageId) ||
    STICKER_BOOK_PAGES[0];
  const currentStickers = pagesStore[activePageId] || [];
  const selectedSticker =
    currentStickers.find((s) => s.uid === selectedUid) || null;

  const totalUnlockedChars = getTotalUnlockedInBook(stickerStore);
  const totalUnlockedQuestTypes = getUnlockedQuestItemTypesCount(itemInv);
  const totalUnlockedNamSpecial = getUnlockedNamSpecialCount(namSpecialInv);
  const rankInfo = getNamRankInfo(stickerStore);

  // Đếm tổng số lượng từng sticker đã dán trên toàn bộ các trang vở
  const placedCountsMap = React.useMemo(
    () => getPlacedStickerCountMap(pagesStore),
    [pagesStore],
  );

  useEffect(() => {
    saveBookPages(pagesStore);
  }, [pagesStore]);

  const handleSelectPage = (pageCfg: StickerBookPageConfig) => {
    setActivePageId(pageCfg.id);
    setSelectedUid(null);
    if (pageCfg.defaultTab) {
      setActiveTab(pageCfg.defaultTab);
    }
  };

  // Danh sách sticker hiển thị trong khay dưới đáy (kèm số lượng x1, x2... trừ đi số đã dán)
  const trayItems = React.useMemo((): TrayStickerEntry[] => {
    const list: TrayStickerEntry[] = [];

    const makeEntry = (params: {
      id: string;
      name: string;
      image: string;
      totalEarned: number;
      sourceType: "character" | "quest-item" | "nam-special";
      subjectId?: SubjectId;
      categoryLabel?: string;
      namTier?: NamStickerTier;
      momRewardVoucher?: string;
    }): TrayStickerEntry => {
      const placedCount = placedCountsMap[params.id] || 0;
      const availableCount = Math.max(0, params.totalEarned - placedCount);
      return {
        ...params,
        unlocked: params.totalEarned > 0,
        placedCount,
        availableCount,
      };
    };

    // NHÁNH 1: CÁC TAB ĐỒ VẬT NHIỆM VỤ NGÀY (115 món Kawaii)
    if (activeTab.startsWith("quest-")) {
      let catalogSlice: KawaiiPastryAsset[] = KAWAII_PASTRY_CATALOG;
      if (activeTab === "quest-sweets") {
        catalogSlice = KAWAII_PASTRY_CATALOG.filter(
          (i) => i.themeGroup === "sweets",
        );
      } else if (activeTab === "quest-fruits") {
        catalogSlice = KAWAII_PASTRY_CATALOG.filter(
          (i) => i.themeGroup === "fruits",
        );
      } else if (activeTab === "quest-vehicles") {
        catalogSlice = KAWAII_PASTRY_CATALOG.filter(
          (i) => i.themeGroup === "vehicles",
        );
      } else if (activeTab === "quest-school-home") {
        catalogSlice = KAWAII_PASTRY_CATALOG.filter(
          (i) => i.themeGroup === "school" || i.themeGroup === "home",
        );
      } else if (activeTab === "quest-lifeskills") {
        catalogSlice = KAWAII_PASTRY_CATALOG.filter(
          (i) => i.themeGroup === "lifeskills",
        );
      } else if (activeTab === "quest-unlocked") {
        catalogSlice = KAWAII_PASTRY_CATALOG.filter(
          (i) => (itemInv[i.id] || 0) > 0,
        );
      }

      for (const asset of catalogSlice) {
        const earned = itemInv[asset.id] || 0;
        list.push(
          makeEntry({
            id: asset.id,
            name: asset.name,
            image: asset.imageUrl,
            totalEarned: earned,
            sourceType: "quest-item",
            categoryLabel: asset.categoryLabel,
          }),
        );
      }

      // Sắp xếp: còn lượt dán (availableCount > 0) lên đầu -> đã mở nhưng dán hết -> chưa mở
      list.sort((a, b) => {
        if (a.availableCount > 0 && b.availableCount === 0) return -1;
        if (a.availableCount === 0 && b.availableCount > 0) return 1;
        if (a.unlocked && !b.unlocked) return -1;
        if (!a.unlocked && b.unlocked) return 1;
        return 0;
      });

      return list;
    }

    // NHÁNH 1B: TAB BỘ STICKER BÉ NẤM ĐẶC BIỆT (Ca sĩ Nấm + Nấm Học Giỏi + Nấm Ăn Ngon Kèm Quà Mẹ Mua)
    if (activeTab === "nam-special") {
      for (const stk of NAM_SPECIAL_STICKERS) {
        const earned = namSpecialInv[stk.id] || 0;
        list.push(
          makeEntry({
            id: stk.id,
            name: stk.name,
            image: stk.image,
            totalEarned: earned,
            sourceType: "nam-special",
            categoryLabel: stk.badgeLabel,
            namTier: stk.tier,
            momRewardVoucher: stk.momRewardVoucher,
          }),
        );
      }
      list.sort((a, b) => {
        if (a.availableCount > 0 && b.availableCount === 0) return -1;
        if (a.availableCount === 0 && b.availableCount > 0) return 1;
        if (a.unlocked && !b.unlocked) return -1;
        if (!a.unlocked && b.unlocked) return 1;
        return 0;
      });
      return list;
    }

    // NHÁNH 2: CÁC TAB STICKER NHÂN VẬT SANRIO (BÀI HỌC 7 MÔN)
    if (activeTab === "unlocked") {
      for (const stk of NAM_SPECIAL_STICKERS) {
        const earned = namSpecialInv[stk.id] || 0;
        if (earned > 0) {
          list.push(
            makeEntry({
              id: stk.id,
              name: stk.name,
              image: stk.image,
              totalEarned: earned,
              sourceType: "nam-special",
              categoryLabel: stk.badgeLabel,
              namTier: stk.tier,
              momRewardVoucher: stk.momRewardVoucher,
            }),
          );
        }
      }
      list.push(
        makeEntry({
          id: "master-nam-cup",
          name: "Cúp Vàng Bé Nấm",
          image: NAM_MASTER_CUP_IMAGE,
          totalEarned: 1,
          sourceType: "character",
          subjectId: "reading",
        }),
      );
    }

    const subjectsToScan: SubjectId[] =
      activeTab === "unlocked" ? ALL_SUBJECT_IDS : [activeTab as SubjectId];

    for (const sid of subjectsToScan) {
      const cup = SUBJECT_CUPS[sid];
      const board = stickerStore[sid];
      const cycles = board?.completedCycles || 0;
      if (cycles > 0) {
        list.push(
          makeEntry({
            id: `cup-${sid}`,
            name: cup.cupTitle,
            image: cup.cupImage,
            totalEarned: cycles,
            sourceType: "character",
            subjectId: sid,
          }),
        );
      }
      for (const stk of cup.stickers) {
        const earned = getCharacterStickerEarnedCount(
          stickerStore,
          sid,
          stk.index,
        );
        if (activeTab === "unlocked") {
          if (earned > 0) {
            list.push(
              makeEntry({
                id: stk.id,
                name: stk.name,
                image: stk.image,
                totalEarned: earned,
                sourceType: "character",
                subjectId: sid,
              }),
            );
          }
        } else {
          list.push(
            makeEntry({
              id: stk.id,
              name: stk.name,
              image: stk.image,
              totalEarned: earned,
              sourceType: "character",
              subjectId: sid,
            }),
          );
        }
      }
      if (sid === "lifeskills") {
        for (const setNum of [2, 3, 4] as const) {
          for (const stkN of getSubjectStickerSet("lifeskills", setNum)) {
            const earnedN = getSubjectSetStickerEarnedCount(
              stickerStore,
              "lifeskills",
              setNum,
              stkN.index,
            );
            if (activeTab === "unlocked") {
              if (earnedN > 0) {
                list.push(
                  makeEntry({
                    id: stkN.id,
                    name: stkN.name,
                    image: stkN.image,
                    totalEarned: earnedN,
                    sourceType: "character",
                    subjectId: sid,
                  }),
                );
              }
            } else {
              list.push(
                makeEntry({
                  id: stkN.id,
                  name: stkN.name,
                  image: stkN.image,
                  totalEarned: earnedN,
                  sourceType: "character",
                  subjectId: sid,
                }),
              );
            }
          }
        }
      }
    }

    // Nếu bé mới chơi chưa mở được sticker nhân vật nào ở tab "Đã mở", tặng sẵn 2 sticker mẫu (x1 mỗi loại)
    if (activeTab === "unlocked" && list.length <= 2) {
      list.push(
        makeEntry({
          id: "reading-1",
          name: "Kitty Cúp Vàng",
          image: "/assets/rewards/sticker-reading-1.png",
          totalEarned: 1,
          sourceType: "character",
          subjectId: "reading",
        }),
        makeEntry({
          id: "math-1",
          name: "My Melody Cúp Vàng",
          image: "/assets/rewards/sticker-math-1.png",
          totalEarned: 1,
          sourceType: "character",
          subjectId: "math",
        }),
      );
    }

    return list;
  }, [activeTab, stickerStore, itemInv, namSpecialInv, placedCountsMap]);

  // Dán 1 sticker mới lên trang vở hiện tại (kiểm tra số lượng khả dụng > 0)
  const handleAddStickerToPage = (
    item: TrayStickerEntry,
    e: React.MouseEvent<HTMLElement>,
  ) => {
    if (!item.unlocked) {
      if (item.sourceType === "nam-special") {
        if (item.namTier === "food") {
          onSpeak(
            `Sticker hiếm ${item.name} đang khóa! Đây là phần thưởng Độ Khó Cao: Nấm hãy thắp sáng đủ 6 nhãn môn học và mở từ Cúp Vàng thứ 2 trở lên (tối thiểu 12 bài học) để mở khóa Sticker Nấm Ăn kèm Phiếu Mẹ Mua Đồ Ăn Thật nhé!`,
          );
        } else {
          onSpeak(
            `Sticker ${item.name} đang khóa! Nấm hãy thắp sáng đủ 6 nhãn của 1 môn học và bấm Mở Cúp Vàng để nhận nhé!`,
          );
        }
        onGoTrophyRoom();
      } else if (item.sourceType === "quest-item") {
        onSpeak(
          `Đồ vật ${item.name} đang khóa. Nấm hoàn thành 3 Nhiệm Vụ Ngày và mở Rương Kho Báu để nhận nhé!`,
        );
        if (onOpenDailyQuests) onOpenDailyQuests();
      } else {
        onSpeak(
          `Sticker ${item.name} đang khóa. Nấm vào học môn này để mở khóa nhé!`,
        );
        if (item.subjectId) onStartSubjectLesson(item.subjectId);
      }
      return;
    }

    if (item.availableCount <= 0) {
      if (item.sourceType === "nam-special") {
        onSpeak(
          `Nấm đã dán hết ${item.totalEarned} hình ${item.name} lên vở rồi! Nấm mở thêm Cúp Vàng 6 nhãn môn học để nhận thêm, hoặc bóc hình trên vở ra dán lại nhé!`,
        );
      } else if (item.sourceType === "quest-item") {
        onSpeak(
          `Nấm đã dán hết ${item.totalEarned} hình ${item.name} lên vở rồi! Nấm làm 3 Nhiệm Vụ Ngày mở Rương Kho Báu để có thêm, hoặc bóc hình trên vở ra dán lại nhé!`,
        );
      } else {
        onSpeak(
          `Nấm đã dán hết ${item.totalEarned} hình ${item.name} rồi! Nấm học thêm bài mới để nhận thêm sticker, hoặc bóc hình trên vở ra nhé!`,
        );
      }
      return;
    }

    playStickerPeelStickSound();
    if (item.sourceType === "nam-special" && item.momRewardVoucher) {
      onSpeak(`${item.name}! ${item.momRewardVoucher}`);
    }

    // Đặt ở vị trí thoáng tự nhiên ở giữa sân khấu (38%..72% chiều dọc)
    const count = currentStickers.length;
    const spreadX = 22 + ((count * 17) % 58);
    const spreadY = 44 + ((count * 13) % 30);

    const newItem: PlacedSticker = {
      uid: `stk-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      stickerId: item.id,
      name: item.name,
      image: item.image,
      x: spreadX,
      y: spreadY,
      scale: item.sourceType === "quest-item" ? 0.92 : 1.0,
      rotation: 0,
      flipX: false,
    };

    setPagesStore((prev) => ({
      ...prev,
      [activePageId]: [...(prev[activePageId] || []), newItem],
    }));
    setSelectedUid(newItem.uid);

    // Hiệu ứng bắn hạt lấp lánh ngay tại vị trí vừa dán trên trang vở
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const px = rect.left + (rect.width * spreadX) / 100;
      const py = rect.top + (rect.height * spreadY) / 100;
      onBurstAt(px, py, "pink");
    } else {
      onBurstAt(e.clientX, e.clientY, "pink");
    }
  };

  // Kéo di chuyển sticker trên trang vở
  const handleStickerPointerDown = (
    e: React.PointerEvent<HTMLDivElement>,
    item: PlacedSticker,
  ) => {
    if (photoMode) return;
    e.stopPropagation();
    setSelectedUid(item.uid);

    // Đưa sticker đang chọn lên lớp trên cùng
    setPagesStore((prev) => {
      const arr = prev[activePageId] || [];
      const others = arr.filter((s) => s.uid !== item.uid);
      return {
        ...prev,
        [activePageId]: [...others, item],
      };
    });

    if (!canvasRef.current) return;
    const { ratioX, ratioY } = getElementLocalRatio(
      e.clientX,
      e.clientY,
      canvasRef.current,
    );

    dragStateRef.current = {
      uid: item.uid,
      pointerId: e.pointerId,
      offsetX: ratioX * 100 - item.x,
      offsetY: ratioY * 100 - item.y,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleStickerPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragStateRef.current;
    if (!drag || drag.pointerId !== e.pointerId || !canvasRef.current) return;

    const { ratioX, ratioY } = getElementLocalRatio(
      e.clientX,
      e.clientY,
      canvasRef.current,
    );
    const rawX = ratioX * 100 - drag.offsetX;
    const rawY = ratioY * 100 - drag.offsetY;

    const clampedX = Math.max(6, Math.min(94, rawX));
    const clampedY = Math.max(12, Math.min(88, rawY));

    setPagesStore((prev) => ({
      ...prev,
      [activePageId]: (prev[activePageId] || []).map((s) =>
        s.uid === drag.uid ? { ...s, x: clampedX, y: clampedY } : s,
      ),
    }));
  };

  const handleStickerPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (
      dragStateRef.current &&
      dragStateRef.current.pointerId === e.pointerId
    ) {
      playStickerPeelStickSound();
      dragStateRef.current = null;
    }
  };

  const updateSelectedSticker = (
    updater: (s: PlacedSticker) => PlacedSticker,
  ) => {
    if (!selectedUid) return;
    setPagesStore((prev) => ({
      ...prev,
      [activePageId]: (prev[activePageId] || []).map((s) =>
        s.uid === selectedUid ? updater(s) : s,
      ),
    }));
  };

  const handleRemoveSelected = () => {
    if (!selectedUid) return;
    playStickerPeelStickSound();
    setPagesStore((prev) => ({
      ...prev,
      [activePageId]: (prev[activePageId] || []).filter(
        (s) => s.uid !== selectedUid,
      ),
    }));
    setSelectedUid(null);
  };

  const handleClearCurrentPage = () => {
    if (currentStickers.length === 0) return;
    playStickerPeelStickSound();
    setPagesStore((prev) => ({
      ...prev,
      [activePageId]: [],
    }));
    setSelectedUid(null);
  };

  const handleTakePhotoShowcase = () => {
    playCameraShutterSound();
    setSelectedUid(null);
    setCameraFlash(true);
    setPhotoMode(true);
    window.setTimeout(() => setCameraFlash(false), 450);
    onBurstAt(window.innerWidth * 0.5, window.innerHeight * 0.45, "rainbow");
    onSpeak(
      "Tách! Bức tranh Sticker của bé Nấm đẹp xuất sắc luôn! Nấm khoe bố mẹ ngay nhé!",
    );
  };

  const pageIdx = STICKER_BOOK_PAGES.findIndex((p) => p.id === activePageId);
  const goPrevPage = () => {
    const nextIdx =
      (pageIdx - 1 + STICKER_BOOK_PAGES.length) % STICKER_BOOK_PAGES.length;
    handleSelectPage(STICKER_BOOK_PAGES[nextIdx]);
  };
  const goNextPage = () => {
    const nextIdx = (pageIdx + 1) % STICKER_BOOK_PAGES.length;
    handleSelectPage(STICKER_BOOK_PAGES[nextIdx]);
  };

  return (
    <div className="scene-screen sticker-book-screen">
      {/* Hiệu ứng chớp đèn máy ảnh khi chụp */}
      {cameraFlash && <div className="sticker-camera-flash-overlay" />}

      {/* Thanh HUD trên cùng */}
      <header className="garland-hud sticker-book-hud">
        <div className="hud-left-group">
          <button
            type="button"
            className="hud-pill hud-pink"
            onClick={onGoHome}
          >
            <Home size={17} /> Sảnh Chính
          </button>
          <button
            type="button"
            className="hud-pill hud-gold"
            onClick={onGoTrophyRoom}
          >
            <Trophy size={16} /> Phòng Cúp
          </button>
          {onOpenDailyQuests && (
            <button
              type="button"
              className="hud-pill hud-green"
              onClick={onOpenDailyQuests}
              title="Làm 3 Nhiệm Vụ Ngày mở Rương lấy Đồ Vật dán Kệ Siêu Thị, Thùng Quả, Bãi Xe"
            >
              <Gift size={16} /> Rương Đồ
            </button>
          )}
        </div>

        {/* Chọn đủ 8 trang Quyển Vở Sticker (Hiển thị đầy đủ cả 8 khu, không bị khuất) */}
        <div className="sticker-book-page-tabs">
          <button
            type="button"
            className="book-page-nav-arrow"
            onClick={goPrevPage}
            title="Trang trước"
          >
            <ChevronLeft size={16} />
          </button>
          {STICKER_BOOK_PAGES.map((pg) => (
            <button
              key={pg.id}
              type="button"
              className={`book-page-tab-pill ${
                activePageId === pg.id ? "active" : ""
              } ${pg.category === "quest-item" ? "quest-playmat-pill" : ""}`}
              onClick={() => handleSelectPage(pg)}
            >
              {pg.shortLabel}
              {(pagesStore[pg.id]?.length || 0) > 0 && (
                <span className="page-sticker-count-dot">
                  {pagesStore[pg.id].length}
                </span>
              )}
            </button>
          ))}
          <button
            type="button"
            className="book-page-nav-arrow"
            onClick={goNextPage}
            title="Trang tiếp"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Nút Chụp Ảnh Khoe Bố Mẹ */}
        <div className="hud-right-group">
          {photoMode ? (
            <button
              type="button"
              className="hud-pill hud-green"
              onClick={() => setPhotoMode(false)}
            >
              <Sparkles size={16} /> Tiếp Tục Dán
            </button>
          ) : (
            <button
              type="button"
              className="hud-pill hud-purple"
              onClick={handleTakePhotoShowcase}
            >
              <Camera size={16} /> 📸 Chụp Khoe
            </button>
          )}
        </div>
      </header>

      {/* KHUNG TRANG VỞ STICKER LÒ XO 16:9 */}
      <div
        className={`sticker-notebook-workspace ${
          photoMode ? "photo-showcase-mode" : ""
        }`}
      >
        <div
          ref={canvasRef}
          className="sticker-page-canvas"
          style={{ backgroundImage: `url("${currentPageCfg.bgImage}")` }}
          onClick={() => setSelectedUid(null)}
        >
          {/* Gáy lò xo trang trí bên trái trang vở */}
          <div className="notebook-spiral-rings" aria-hidden="true">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="spiral-ring-item" />
            ))}
          </div>

          {/* Nhãn tên trang vở + Huy hiệu tiến độ sưu tầm */}
          <div className="sticker-page-corner-badge">
            <span>{currentPageCfg.title}</span>
            <span
              className="nam-rank-pill"
              style={{
                borderColor: rankInfo.color,
                color: rankInfo.color,
                padding: "1px 8px",
                fontSize: "11px",
              }}
            >
              {rankInfo.icon} NV:{totalUnlockedChars}/42 · Đồ:{totalUnlockedQuestTypes}/{KAWAII_PASTRY_CATALOG.length}
            </span>
            {photoMode && (
              <strong className="photo-author-stamp">
                👑 Tác Phẩm Của Bé Nấm ({rankInfo.title})
              </strong>
            )}
          </div>

          {/* Gợi ý khi trang vở chưa dán hình nào */}
          {currentStickers.length === 0 && !photoMode && (
            <div className="sticker-empty-page-hint">
              <span>
                {currentPageCfg.emptyHint ||
                  "👇 Chạm vào Sticker còn lượt (x1, x2...) ở khay bên dưới để bóc & dán lên trang vở nhé!"}
              </span>
            </div>
          )}

          {/* Các Sticker đã dán trên trang vở */}
          {currentStickers.map((stk) => {
            const isSelected = stk.uid === selectedUid && !photoMode;
            return (
              <div
                key={stk.uid}
                className={`placed-sticker-node ${
                  isSelected ? "selected" : ""
                }`}
                style={{
                  left: `${stk.x}%`,
                  top: `${stk.y}%`,
                  transform: `translate(-50%, -50%) scale(${
                    stk.flipX ? -stk.scale : stk.scale
                  }, ${stk.scale}) rotate(${stk.rotation}deg)`,
                }}
                onPointerDown={(e) => handleStickerPointerDown(e, stk)}
                onPointerMove={handleStickerPointerMove}
                onPointerUp={handleStickerPointerUp}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!photoMode) setSelectedUid(stk.uid);
                }}
              >
                <img src={stk.image} alt={stk.name} draggable={false} />
              </div>
            );
          })}

          {/* Thanh công cụ chỉnh sửa nhanh Sticker đang chọn */}
          {selectedSticker && !photoMode && (
            <div
              className="sticker-edit-floating-bar"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="edit-bar-sticker-title">
                ✨ {selectedSticker.name}
              </span>
              <button
                type="button"
                className="stk-tool-btn"
                onClick={() =>
                  updateSelectedSticker((s) => ({
                    ...s,
                    scale: Math.min(1.85, Number((s.scale + 0.15).toFixed(2))),
                  }))
                }
                title="Phóng to"
              >
                <ZoomIn size={15} /> To lên
              </button>
              <button
                type="button"
                className="stk-tool-btn"
                onClick={() =>
                  updateSelectedSticker((s) => ({
                    ...s,
                    scale: Math.max(0.45, Number((s.scale - 0.15).toFixed(2))),
                  }))
                }
                title="Thu nhỏ"
              >
                <ZoomOut size={15} /> Nhỏ lại
              </button>
              <button
                type="button"
                className="stk-tool-btn"
                onClick={() =>
                  updateSelectedSticker((s) => ({
                    ...s,
                    flipX: !s.flipX,
                  }))
                }
                title="Lật trái/phải"
              >
                <FlipHorizontal size={15} /> Lật
              </button>
              <button
                type="button"
                className="stk-tool-btn"
                onClick={() =>
                  updateSelectedSticker((s) => ({
                    ...s,
                    rotation: (s.rotation + 15) % 360,
                  }))
                }
                title="Xoay nghiêng"
              >
                <RotateCw size={15} /> Xoay
              </button>
              <button
                type="button"
                className="stk-tool-btn stk-tool-danger"
                onClick={handleRemoveSelected}
                title="Bóc Sticker này ra (hoàn lại +1 lượt dán vào khay)"
              >
                <Trash2 size={15} /> Bóc ra (+1)
              </button>
            </div>
          )}

          {/* Nút dọn trang để dán lại từ đầu (hoàn lại toàn bộ số lượng sticker về khay) */}
          {currentStickers.length > 0 && !photoMode && (
            <button
              type="button"
              className="clear-page-corner-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleClearCurrentPage();
              }}
              title="Bóc hết sticker trang này cất lại vào khay"
            >
              <Trash2 size={14} /> Bóc cất vào khay ({currentStickers.length})
            </button>
          )}
        </div>

        {/* KHAY BÓC DÁN STICKER DƯỚI ĐÁY VỞ (Ẩn khi ở chế độ Chụp Ảnh Khoe Bố Mẹ) */}
        {!photoMode && (
          <div className="sticker-book-bottom-drawer">
            {/* Hàng tab lọc: Bộ Sticker Bé Nấm + Kho Đồ Vật Nhiệm Vụ Ngày + Kho Nhân Vật Bài Học */}
            <div className="drawer-filter-tabs">
              <button
                type="button"
                className={`drawer-tab-btn ${
                  activeTab === "nam-special" ? "active" : ""
                }`}
                style={{
                  background:
                    activeTab === "nam-special"
                      ? "linear-gradient(135deg, #FF477E 0%, #F59E0B 100%)"
                      : "#FFF1F2",
                  color: activeTab === "nam-special" ? "#FFFFFF" : "#BE123C",
                  borderColor: "#FB7185",
                  fontWeight: 900,
                }}
                onClick={() => setActiveTab("nam-special")}
              >
                👦 Sticker Nấm ({totalUnlockedNamSpecial}/{NAM_SPECIAL_STICKERS.length})
              </button>

              <span className="drawer-tab-divider" aria-hidden="true">
                |
              </span>

              <button
                type="button"
                className={`drawer-tab-btn quest-tab ${
                  activeTab === "quest-unlocked" ? "active" : ""
                }`}
                onClick={() => setActiveTab("quest-unlocked")}
              >
                🎁 Đồ Đã Mở ({totalUnlockedQuestTypes})
              </button>
              <button
                type="button"
                className={`drawer-tab-btn quest-tab ${
                  activeTab === "quest-sweets" ? "active" : ""
                }`}
                onClick={() => setActiveTab("quest-sweets")}
              >
                🍰 Bánh & Kem
              </button>
              <button
                type="button"
                className={`drawer-tab-btn quest-tab ${
                  activeTab === "quest-fruits" ? "active" : ""
                }`}
                onClick={() => setActiveTab("quest-fruits")}
              >
                🍎 Hoa Quả
              </button>
              <button
                type="button"
                className={`drawer-tab-btn quest-tab ${
                  activeTab === "quest-vehicles" ? "active" : ""
                }`}
                onClick={() => setActiveTab("quest-vehicles")}
              >
                🚗 Xe Cộ
              </button>
              <button
                type="button"
                className={`drawer-tab-btn quest-tab ${
                  activeTab === "quest-school-home" ? "active" : ""
                }`}
                onClick={() => setActiveTab("quest-school-home")}
              >
                🎒 Học Tập
              </button>
              <button
                type="button"
                className={`drawer-tab-btn quest-tab ${
                  activeTab === "quest-lifeskills" ? "active" : ""
                }`}
                onClick={() => setActiveTab("quest-lifeskills")}
              >
                🍳 Bếp & Món Ăn
              </button>

              <span className="drawer-tab-divider" aria-hidden="true">
                |
              </span>

              <button
                type="button"
                className={`drawer-tab-btn ${
                  activeTab === "unlocked" ? "active" : ""
                }`}
                onClick={() => setActiveTab("unlocked")}
              >
                🌟 Nhân Vật ({totalUnlockedChars})
              </button>
              {ALL_SUBJECT_IDS.map((sid) => {
                const cup = SUBJECT_CUPS[sid];
                return (
                  <button
                    key={sid}
                    type="button"
                    className={`drawer-tab-btn ${
                      activeTab === sid ? "active" : ""
                    }`}
                    onClick={() => setActiveTab(sid)}
                  >
                    {cup.characterName}
                  </button>
                );
              })}
            </div>

            {/* Cuộn ngang danh sách Sticker để bấm dán (hiển thị số lượng x1, x2... hoặc Đã dán hết) */}
            <div className="drawer-stickers-strip">
              {trayItems.map((item) => {
                const isDepleted = item.unlocked && item.availableCount <= 0;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`drawer-sticker-card ${
                      !item.unlocked
                        ? "locked"
                        : isDepleted
                          ? "depleted"
                          : "unlocked"
                    }`}
                    onClick={(e) => handleAddStickerToPage(item, e)}
                    title={
                      !item.unlocked
                        ? item.sourceType === "nam-special"
                          ? item.namTier === "food"
                            ? `🔒 Phần thưởng Độ Khó Cao: Thắp sáng 6 nhãn môn học & mở từ Cúp Vàng thứ 2 trở lên (>=12 bài học) để mở khóa ${item.name} kèm Phiếu Mẹ Mua Đồ Ăn Thật!`
                            : `🔒 Thắp sáng đủ 6 nhãn môn học và bấm Mở Cúp Vàng để nhận ${item.name}!`
                          : item.sourceType === "quest-item"
                            ? `Chưa mở — Làm 3 Nhiệm Vụ Ngày mở Rương Kho Báu để nhận ${item.name}!`
                            : `Chưa mở khóa — Bấm để vào học môn của ${
                                item.subjectId
                                  ? SUBJECT_CUPS[item.subjectId].characterName
                                  : "cô giáo"
                              } nhé!`
                        : isDepleted
                          ? `Đã dán hết (${item.placedCount}/${item.totalEarned})! Học thêm hoặc mở Cúp Vàng để có thêm nhé!`
                          : item.momRewardVoucher
                            ? `Còn ${item.availableCount} lượt dán — ${item.momRewardVoucher}`
                            : `Còn ${item.availableCount} lượt dán — Chạm để dán ${item.name} lên trang vở!`
                    }
                  >
                    <div className="drawer-sticker-thumb">
                      <img
                        src={item.image}
                        alt={item.name}
                        draggable={false}
                        loading="lazy"
                      />
                      {item.unlocked ? (
                        <span
                          className={`drawer-qty-badge ${
                            isDepleted ? "qty-zero" : "qty-positive"
                          }`}
                        >
                          {isDepleted
                            ? "Hết (0)"
                            : item.momRewardVoucher
                              ? `🎟️ x${item.availableCount}`
                              : `x${item.availableCount}`}
                        </span>
                      ) : (
                        <span className="drawer-lock-badge">
                          <Lock size={12} />{" "}
                          {item.sourceType === "nam-special"
                            ? item.namTier === "food"
                              ? "Khó: 2+ Cúp"
                              : "Mở Cúp 6/6"
                            : item.sourceType === "quest-item"
                              ? "3 NV Ngày"
                              : "Học mở"}
                        </span>
                      )}
                    </div>
                    <span className="drawer-sticker-label">{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
