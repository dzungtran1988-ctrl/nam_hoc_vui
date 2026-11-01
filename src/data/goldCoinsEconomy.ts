export const GOLD_COINS_STORAGE_KEY = "nam-hoc-vui.gold-coins.v1";
export const CLAW_PLUSHIE_INVENTORY_KEY = "nam-hoc-vui.claw-plushie-inventory.v1";

export const STARTER_GOLD_COINS = 20;
export const EARN_COINS_PER_LESSON = 5;
export const EARN_COINS_DAILY_CHEST = 10;

export const COST_STICKER_REDEEM = 10;
export const COST_CLAW_TURN = 10;
export const COST_CINEMA_TICKET = 10;

export type SanrioPlushieSeries = "classic" | "cosplay" | "hoodie";

export type SanrioClawPlushieItem = {
  id: string;
  series: SanrioPlushieSeries;
  seriesLabel: string;
  index: number;
  label: string;
  character: string;
  imageSrc: string;
  accentColor: string;
  rarity: "common" | "rare" | "super-rare";
};

const SERIES_META: Array<{
  series: SanrioPlushieSeries;
  seriesLabel: string;
}> = [
  { series: "classic", seriesLabel: "🧸 Thú Bông" },
  { series: "cosplay", seriesLabel: "🎀 Thú Bông" },
  { series: "hoodie", seriesLabel: "🧥 Thú Bông" },
];

export const SANRIO_CLAW_PLUSHIES: SanrioClawPlushieItem[] = SERIES_META.flatMap((sMeta) =>
  Array.from({ length: 24 }, (_, idx) => {
    const num = idx + 1;
    const padded = String(num).padStart(2, "0");
    return {
      id: `claw-${sMeta.series}-${padded}`,
      series: sMeta.series,
      seriesLabel: sMeta.seriesLabel,
      index: num,
      label: "Thú Bông",
      character: "",
      imageSrc: `/assets/claw-plushies/${sMeta.series}-${padded}.webp`,
      accentColor: "#ff6b9d",
      rarity: "rare" as const,
    };
  }),
);

export function getSanrioPlushieById(id: string): SanrioClawPlushieItem | undefined {
  return SANRIO_CLAW_PLUSHIES.find((item) => item.id === id);
}

export function loadGoldCoins(): number {
  if (typeof window === "undefined") return STARTER_GOLD_COINS;
  try {
    const raw = window.localStorage.getItem(GOLD_COINS_STORAGE_KEY);
    if (raw === null) {
      window.localStorage.setItem(GOLD_COINS_STORAGE_KEY, String(STARTER_GOLD_COINS));
      return STARTER_GOLD_COINS;
    }
    const parsed = Number(raw);
    if (!Number.isFinite(parsed) || parsed < 0) return STARTER_GOLD_COINS;
    return Math.floor(parsed);
  } catch {
    return STARTER_GOLD_COINS;
  }
}

export function saveGoldCoins(coins: number): number {
  const safe = Math.max(0, Math.floor(Number.isFinite(coins) ? coins : 0));
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(GOLD_COINS_STORAGE_KEY, String(safe));
    } catch {
      // ignore storage errors
    }
  }
  return safe;
}

export function addGoldCoins(amount: number): number {
  const current = loadGoldCoins();
  return saveGoldCoins(current + Math.max(0, Math.floor(amount)));
}

export function spendGoldCoins(cost: number): { ok: boolean; balance: number } {
  const current = loadGoldCoins();
  const safeCost = Math.max(0, Math.floor(cost));
  if (current < safeCost) {
    return { ok: false, balance: current };
  }
  const next = saveGoldCoins(current - safeCost);
  return { ok: true, balance: next };
}

export type ClawPlushieInventory = Record<string, number>;

export function loadClawPlushieInventory(): ClawPlushieInventory {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(CLAW_PLUSHIE_INVENTORY_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    if (!parsed || typeof parsed !== "object") return {};
    const clean: ClawPlushieInventory = {};
    for (const [key, val] of Object.entries(parsed)) {
      const count = Number(val);
      if (Number.isFinite(count) && count > 0) {
        clean[key] = Math.floor(count);
      }
    }
    return clean;
  } catch {
    return {};
  }
}

export function saveClawPlushieInventory(inv: ClawPlushieInventory): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CLAW_PLUSHIE_INVENTORY_KEY, JSON.stringify(inv));
  } catch {
    // ignore
  }
}

export function awardClawPlushie(plushieId: string): {
  inventory: ClawPlushieInventory;
  newCount: number;
  isFirstTime: boolean;
} {
  const current = loadClawPlushieInventory();
  const prevCount = current[plushieId] ?? 0;
  const nextCount = prevCount + 1;
  const updated: ClawPlushieInventory = {
    ...current,
    [plushieId]: nextCount,
  };
  saveClawPlushieInventory(updated);
  return {
    inventory: updated,
    newCount: nextCount,
    isFirstTime: prevCount === 0,
  };
}

export function getUnlockedClawPlushieIds(inv?: ClawPlushieInventory): string[] {
  const source = inv ?? loadClawPlushieInventory();
  return Object.keys(source).filter((id) => (source[id] ?? 0) > 0);
}

export function getTotalPlushiesCaught(inv?: ClawPlushieInventory): number {
  const source = inv ?? loadClawPlushieInventory();
  return Object.values(source).reduce((sum, count) => sum + (count > 0 ? count : 0), 0);
}
