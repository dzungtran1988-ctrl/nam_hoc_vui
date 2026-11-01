import { SHARED_ASSET_CATALOG } from "./sharedAssetCatalog";
import type { StoryPage } from "./storyBooks";

export interface HiddenItemTarget {
  id: string;
  name: string;
  imageUrl: string;
  icon: string;
  /** Tọa độ ngang (%) trên khung tranh (14..84) */
  x: number;
  /** Tọa độ dọc (%) trên khung tranh (18..78) */
  y: number;
  /** Góc xoay ngẫu nhiên nhẹ (-18..18 độ) để hòa vào bối cảnh */
  rotation: number;
}

export interface HiddenItemRoundConfig {
  roundIndex: number;
  pageNumber: number;
  pageTitle: string;
  pageImage: string;
  items: HiddenItemTarget[];
}

function shuffleArray<T>(list: readonly T[]): T[] {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

/**
 * Sinh tọa độ 3 điểm ẩn trên tranh sao cho không bị sát mép và không đè lên nhau
 */
function pickThreeNonOverlappingPositions(): Array<{
  x: number;
  y: number;
  rotation: number;
}> {
  const chosen: Array<{ x: number; y: number; rotation: number }> = [];
  const minDistance = 24; // cách nhau tối thiểu 24% chiều rộng/cao

  for (let i = 0; i < 3; i++) {
    let best = {
      x: 20 + i * 28,
      y: 30 + ((i * 23) % 40),
      rotation: Math.round((Math.random() - 0.5) * 28),
    };

    for (let attempt = 0; attempt < 30; attempt++) {
      const candidateX = Math.round(14 + Math.random() * 70); // 14% -> 84%
      const candidateY = Math.round(18 + Math.random() * 60); // 18% -> 78%
      const tooClose = chosen.some((pt) => {
        const dx = pt.x - candidateX;
        const dy = pt.y - candidateY;
        return Math.hypot(dx, dy) < minDistance;
      });
      if (!tooClose) {
        best = {
          x: candidateX,
          y: candidateY,
          rotation: Math.round((Math.random() - 0.5) * 30),
        };
        break;
      }
    }
    chosen.push(best);
  }

  return chosen;
}

/**
 * Tạo ngẫu nhiên 3 vòng chơi (3 tranh trong truyện × 3 đồ vật ẩn từ kho 99 items)
 * Mỗi lần vào chơi sẽ hoàn toàn mới, chống học vẹt 100%.
 */
export function generateStoryHiddenRounds(
  pages: StoryPage[],
): HiddenItemRoundConfig[] {
  const validPages = pages.filter((p) => Boolean(p.image));
  const poolPages = validPages.length >= 3 ? validPages : pages;

  // Chọn 3 trang trải đều đầu - giữa - cuối truyện (hoặc ngẫu nhiên trong 3 khúc)
  let selectedPages: StoryPage[] = [];
  if (poolPages.length <= 3) {
    selectedPages = [...poolPages];
  } else {
    const shuffledPages = shuffleArray(poolPages);
    selectedPages = shuffledPages
      .slice(0, 3)
      .sort((a, b) => a.pageNumber - b.pageNumber);
  }

  // Lấy 9 đồ vật khác nhau hoàn toàn từ kho 99 đồ vật 3D sẵn có
  const itemPool = shuffleArray(SHARED_ASSET_CATALOG).slice(0, 9);

  return selectedPages.map((page, rIdx) => {
    const coords = pickThreeNonOverlappingPositions();
    const roundItems = itemPool
      .slice(rIdx * 3, rIdx * 3 + 3)
      .map((asset, i) => ({
        id: `${asset.id}-r${rIdx}-${i}`,
        name: asset.readingWordVi || asset.name,
        imageUrl: asset.imageUrl,
        icon: asset.icon,
        x: coords[i].x,
        y: coords[i].y,
        rotation: coords[i].rotation,
      }));

    return {
      roundIndex: rIdx,
      pageNumber: page.pageNumber,
      pageTitle: page.title,
      pageImage: page.image,
      items: roundItems,
    };
  });
}
