import { useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import {
  NAM_ISLAND_CURRICULUM_STORAGE_KEY,
  generateNamHocVuiIslandBanks,
} from "../data/islandRaceCurriculumBanks";

export interface CinnamorollIslandRaceEmbedProps {
  onBack: () => void;
  onEarnReward?: (coinsEarned: number, championName: string) => void;
}

export function CinnamorollIslandRaceEmbed({
  onBack,
  onEarnReward,
}: CinnamorollIslandRaceEmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const curriculumBanks = useMemo(() => {
    const banks = generateNamHocVuiIslandBanks();
    try {
      localStorage.setItem(
        NAM_ISLAND_CURRICULUM_STORAGE_KEY,
        JSON.stringify(banks),
      );
    } catch (e) {
      console.warn("Không thể lưu kho câu hỏi Nấm Học Vui vào localStorage:", e);
    }
    return banks;
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const data = event.data;
      if (!data || typeof data !== "object") return;

      if (data.type === "NAM_ISLAND_RACE_EXIT") {
        onBack();
      } else if (data.type === "NAM_ISLAND_RACE_REWARD") {
        const coins = Number(data.coinsEarned) || 10;
        const champ = String(data.championName || "Bé Nấm");
        onEarnReward?.(coins, champ);
      } else if (data.type === "NAM_ISLAND_RACE_REQUEST_BANKS") {
        iframeRef.current?.contentWindow?.postMessage(
          {
            type: "NAM_ISLAND_RACE_SYNC_BANKS",
            banks: curriculumBanks,
          },
          "*",
        );
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onBack, onEarnReward, curriculumBanks]);

  const handleIframeLoad = () => {
    iframeRef.current?.contentWindow?.postMessage(
      {
        type: "NAM_ISLAND_RACE_SYNC_BANKS",
        banks: curriculumBanks,
      },
      "*",
    );
  };

  const fullscreenOverlay = (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 99999,
        background: "#9DD6F5",
        overflow: "hidden",
      }}
    >
      <iframe
        ref={iframeRef}
        src="/island-race/index.html?mode=nam-hoc-vui"
        onLoad={handleIframeLoad}
        title="Cinnamoroll Island Race – Cuộc đua khám phá đảo kỳ diệu"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          display: "block",
        }}
        allow="autoplay; fullscreen"
      />
    </div>
  );

  if (typeof document !== "undefined") {
    return createPortal(fullscreenOverlay, document.body);
  }

  return fullscreenOverlay;
}
