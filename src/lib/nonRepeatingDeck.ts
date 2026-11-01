const DECK_HISTORY_STORAGE_KEY = "nam-hoc-vui:deck-history:v2";

type DeckHistoryMap = Record<string, string[]>;

let memoryFallbackStore: DeckHistoryMap = {};

function loadDeckHistoryMap(): DeckHistoryMap {
  if (typeof window === "undefined" || !window.localStorage) {
    return memoryFallbackStore;
  }
  try {
    const raw = window.localStorage.getItem(DECK_HISTORY_STORAGE_KEY);
    if (!raw) return memoryFallbackStore;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      memoryFallbackStore = parsed as DeckHistoryMap;
      return memoryFallbackStore;
    }
    return memoryFallbackStore;
  } catch {
    return memoryFallbackStore;
  }
}

function saveDeckHistoryMap(map: DeckHistoryMap): void {
  memoryFallbackStore = map;
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    window.localStorage.setItem(DECK_HISTORY_STORAGE_KEY, JSON.stringify(map));
  } catch {
    // Bỏ qua nếu bộ nhớ trình duyệt đầy
  }
}

/**
 * Xáo trộn mảng ngẫu nhiên theo thuật toán Fisher-Yates
 */
export function shuffleArrayRandom<T>(items: readonly T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Lấy danh sách các ID đã xuất hiện gần đây của một khay bài (deckKey)
 */
export function getSeenIds(deckKey: string): string[] {
  const store = loadDeckHistoryMap();
  return store[deckKey] || [];
}

/**
 * Lưu thêm các ID vừa học vào lịch sử của deckKey
 */
export function recordSeenIds(
  deckKey: string,
  newIds: readonly string[],
  maxHistory = 120,
): void {
  if (newIds.length === 0) return;
  const store = loadDeckHistoryMap();
  const prev = store[deckKey] || [];
  const merged = [...newIds, ...prev.filter((id) => !newIds.includes(id))].slice(
    0,
    maxHistory,
  );
  store[deckKey] = merged;
  saveDeckHistoryMap(store);
}

/**
 * Rút `count` phần tử không trùng lặp từ `pool` theo cơ chế "Túi Rút Bài Không Hoàn Lại" (Shuffle-Bag)
 * lưu trữ bền vững trong localStorage:
 * - Ưu tiên tuyệt đối các phần tử chưa xuất hiện trong các lượt học trước.
 * - Khi bé đã học cạn toàn bộ kho (`fresh.length < count`), tự động mở vòng mới từ các bài cũ nhất
 *   nhưng đảm bảo không trùng với các bài vừa mới xuất hiện ở lượt liền kề.
 */
export function drawNonRepeatingItems<T>(
  deckKey: string,
  pool: readonly T[],
  count: number,
  getId: (item: T) => string,
  extraExcludeIds: readonly string[] = [],
): T[] {
  if (pool.length === 0 || count <= 0) return [];

  const store = loadDeckHistoryMap();
  const seenIds = store[deckKey] || [];
  const extraExcludeSet = new Set(extraExcludeIds);
  const seenSet = new Set([...seenIds, ...extraExcludeIds]);

  // 1. Nhóm bài hoàn toàn mới (chưa từng nằm trong seenIds)
  const freshPool = shuffleArrayRandom(
    pool.filter((item) => !seenSet.has(getId(item))),
  );

  const chosen: T[] = [];
  const chosenIds = new Set<string>();

  for (const item of freshPool) {
    if (chosen.length >= count) break;
    const id = getId(item);
    if (!chosenIds.has(id)) {
      chosenIds.add(id);
      chosen.push(item);
    }
  }

  // 2. Nếu kho mới không đủ `count` (bé đã học hết vòng), nạp lại từ các bài học lâu nhất trước
  if (chosen.length < count) {
    // Các bài vừa học ở lượt sát nhất (giữ lại ở cuối để tránh lặp ngay lập tức)
    const veryRecentCount = Math.min(
      Math.max(count, 4),
      Math.max(1, pool.length - count),
    );
    const veryRecentSet = new Set([
      ...seenIds.slice(0, veryRecentCount),
      ...extraExcludeSet,
    ]);

    const olderSeenPool = shuffleArrayRandom(
      pool.filter((item) => {
        const id = getId(item);
        return !chosenIds.has(id) && !veryRecentSet.has(id);
      }),
    );

    const lastResortPool = shuffleArrayRandom(
      pool.filter((item) => !chosenIds.has(getId(item))),
    );

    for (const item of [...olderSeenPool, ...lastResortPool]) {
      if (chosen.length >= count) break;
      const id = getId(item);
      if (!chosenIds.has(id)) {
        chosenIds.add(id);
        chosen.push(item);
      }
    }

    // Reset lại lịch sử túi bài mới, chỉ giữ những bài vừa được rút trong lượt này
    store[deckKey] = Array.from(chosenIds);
    saveDeckHistoryMap(store);
    return chosen;
  }

  // Cập nhật lịch sử bình thường: giới hạn độ dài lịch sử tối đa bằng kích thước pool
  const maxKeep = Math.max(count, pool.length - 1);
  const pickedIds = Array.from(chosenIds);
  store[deckKey] = [
    ...pickedIds,
    ...seenIds.filter((id) => !chosenIds.has(id)),
  ].slice(0, maxKeep);
  saveDeckHistoryMap(store);

  return chosen;
}

/**
 * Rút 1 phần tử mới không trùng lặp (dùng khi mở ngẫu nhiên 1 bài thơ / 1 bộ thẻ / 1 bảng tính)
 */
export function drawSingleNonRepeatingItem<T>(
  deckKey: string,
  pool: readonly T[],
  getId: (item: T) => string,
  currentId?: string,
): T {
  const drawn = drawNonRepeatingItems(
    deckKey,
    pool,
    1,
    getId,
    currentId ? [currentId] : [],
  );
  return drawn[0] || pool[0];
}
