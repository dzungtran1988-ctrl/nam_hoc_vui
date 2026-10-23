import React, { useEffect, useRef, useState } from "react";

export type KittyPoseFrame =
  | "idle"
  | "blink-half"
  | "blink"
  | "talk-half"
  | "talk"
  | "talk-blink"
  | "wave"
  | "wave-smile"
  | "cheer";

const KITTY_FRAMES: { id: KittyPoseFrame; src: string }[] = [
  { id: "idle", src: "/assets/kitty25d/kitty-idle.png" },
  { id: "blink-half", src: "/assets/kitty25d/kitty-blink-half.png" },
  { id: "blink", src: "/assets/kitty25d/kitty-blink.png" },
  { id: "talk-half", src: "/assets/kitty25d/kitty-talk-half.png" },
  { id: "talk", src: "/assets/kitty25d/kitty-talk.png" },
  { id: "talk-blink", src: "/assets/kitty25d/kitty-talk-blink.png" },
  { id: "wave", src: "/assets/kitty25d/kitty-wave.png" },
  { id: "wave-smile", src: "/assets/kitty25d/kitty-wave-smile.png" },
  { id: "cheer", src: "/assets/kitty25d/kitty-cheer.png" },
];

export type KittyActionMode = "auto" | "wave" | "cheer" | "wink" | "talk";

interface Kitty25DTeacherProps {
  reactionType: "idle" | "happy" | "sad" | "singing";
  reactionMessage?: string;
  onTapKitty: (
    e: React.MouseEvent<HTMLElement>,
    forcedAction?: KittyActionMode,
  ) => void;
}

export const Kitty25DTeacher: React.FC<Kitty25DTeacherProps> = ({
  reactionType,
  reactionMessage,
  onTapKitty,
}) => {
  const [frame, setFrame] = useState<KittyPoseFrame>("wave");
  const [isSpeakingGlobal, setIsSpeakingGlobal] = useState(false);
  const [actionMode, setActionMode] = useState<KittyActionMode>("wave");
  const [motionClass, setMotionClass] = useState<string>("kitty-motion-wave");

  const isBlinkingRef = useRef(false);
  const actionTimerRef = useRef<number | null>(null);

  // 1. Lắng nghe sự kiện giọng đọc toàn cục từ useSpeech để tự động nhép miệng (Lip-sync)
  useEffect(() => {
    const handleSpeechState = (e: Event) => {
      const custom = e as CustomEvent<{ speaking: boolean; text?: string }>;
      setIsSpeakingGlobal(Boolean(custom.detail?.speaking));
    };
    window.addEventListener("nam:speech-state", handleSpeechState);
    return () =>
      window.removeEventListener("nam:speech-state", handleSpeechState);
  }, []);

  // 2. Khi mới vào lớp Học Đọc: Cô Kitty vẫy tay chào 2.2 giây rồi về tư thế đứng chuẩn
  useEffect(() => {
    const t = window.setTimeout(() => {
      setActionMode("auto");
      setMotionClass("");
    }, 2200);
    return () => window.clearTimeout(t);
  }, []);

  // 3. Phản ứng khi bé làm bài đúng / được khen (reactionType thay đổi)
  useEffect(() => {
    if (reactionType === "happy") {
      setActionMode("cheer");
      setMotionClass("kitty-motion-cheer-hop");
      if (actionTimerRef.current) window.clearTimeout(actionTimerRef.current);
      actionTimerRef.current = window.setTimeout(() => {
        setActionMode("auto");
        setMotionClass("");
      }, 2400);
    } else if (reactionType === "sad") {
      setActionMode("wave");
      setMotionClass("kitty-motion-wave");
      if (actionTimerRef.current) window.clearTimeout(actionTimerRef.current);
      actionTimerRef.current = window.setTimeout(() => {
        setActionMode("auto");
        setMotionClass("");
      }, 2200);
    }
  }, [reactionType]);

  // 4. Chu kỳ tự động chớp mắt tự nhiên (3.0 - 4.5s chớp 1 lần, thỉnh thoảng chớp kép)
  useEffect(() => {
    let timeoutId: number;
    let step1: number;
    let step2: number;
    let step3: number;
    let step4: number;

    const scheduleBlink = () => {
      const delay = 2800 + Math.random() * 1800;
      timeoutId = window.setTimeout(() => {
        isBlinkingRef.current = true;
        // Bắt đầu khép mi
        setFrame((prev) =>
          prev === "talk" || prev === "talk-half" ? "talk-blink" : "blink-half",
        );

        step1 = window.setTimeout(() => {
          setFrame((prev) => (prev === "talk-blink" ? "talk-blink" : "blink"));
        }, 45);

        step2 = window.setTimeout(() => {
          setFrame((prev) =>
            prev === "talk-blink" ? "talk-half" : "blink-half",
          );
        }, 160);

        step3 = window.setTimeout(() => {
          isBlinkingRef.current = false;
          setFrame("idle");

          // 25% cơ hội chớp mắt kép đáng yêu
          if (Math.random() < 0.25) {
            step4 = window.setTimeout(() => {
              isBlinkingRef.current = true;
              setFrame("blink");
              window.setTimeout(() => {
                isBlinkingRef.current = false;
                setFrame("idle");
              }, 120);
            }, 140);
          }
          scheduleBlink();
        }, 210);
      }, delay);
    };

    scheduleBlink();
    return () => {
      window.clearTimeout(timeoutId);
      window.clearTimeout(step1);
      window.clearTimeout(step2);
      window.clearTimeout(step3);
      window.clearTimeout(step4);
    };
  }, []);

  // 5. Vòng lặp Lip-sync & cử chỉ khi đang nói hoặc khi đang ở chế độ Wave / Cheer / Wink
  useEffect(() => {
    // Nếu đang thực hiện hành động Hoan hô (Cheer)
    if (actionMode === "cheer") {
      if (!isSpeakingGlobal) {
        setFrame("cheer");
        return;
      }
      // Vừa hoan hô vừa mấp máy miệng nói
      const cheerFrames: KittyPoseFrame[] = [
        "cheer",
        "wave-smile",
        "cheer",
        "cheer",
      ];
      let idx = 0;
      const iv = window.setInterval(() => {
        idx = (idx + 1) % cheerFrames.length;
        setFrame(cheerFrames[idx]);
      }, 130);
      return () => window.clearInterval(iv);
    }

    // Nếu đang ở chế độ Vẫy tay (Wave)
    if (actionMode === "wave") {
      const waveFrames: KittyPoseFrame[] = isSpeakingGlobal
        ? ["wave", "wave-smile", "wave", "talk-half", "wave"]
        : ["wave-smile", "wave", "wave-smile"];
      let idx = 0;
      setFrame(waveFrames[0]);
      const iv = window.setInterval(() => {
        idx = (idx + 1) % waveFrames.length;
        setFrame(waveFrames[idx]);
      }, 160);
      return () => window.clearInterval(iv);
    }

    // Nếu đang ở chế độ Nháy mắt cười (Wink / Smile)
    if (actionMode === "wink") {
      const winkFrames: KittyPoseFrame[] = [
        "blink-half",
        "blink",
        "wave-smile",
        "blink",
        "idle",
      ];
      let idx = 0;
      setFrame(winkFrames[0]);
      const iv = window.setInterval(() => {
        idx = (idx + 1) % winkFrames.length;
        setFrame(winkFrames[idx]);
      }, 180);
      return () => window.clearInterval(iv);
    }

    // Nếu giọng đọc đang phát (isSpeakingGlobal === true hoặc actionMode === "talk"):
    // Tự động nhép miệng Lip-sync theo nhịp âm tiết tiếng Việt!
    if (isSpeakingGlobal || actionMode === "talk") {
      const syllableCycle: KittyPoseFrame[] = [
        "talk-half",
        "talk",
        "talk-half",
        "idle",
        "talk",
        "talk-half",
        "wave",
        "wave-smile",
        "talk",
        "talk-half",
      ];
      let sIdx = 0;
      setFrame("talk");
      setMotionClass("kitty-motion-speaking");

      const iv = window.setInterval(() => {
        if (isBlinkingRef.current) {
          setFrame("talk-blink");
          return;
        }
        sIdx = (sIdx + 1) % syllableCycle.length;
        setFrame(syllableCycle[sIdx]);
      }, 125);

      return () => {
        window.clearInterval(iv);
        setMotionClass("");
        setFrame("idle");
      };
    }

    // Trạng thái đứng im chuẩn (chỉ chớp mắt tự nhiên, không trôi/lắc gây chóng mặt)
    setFrame("idle");
  }, [actionMode, isSpeakingGlobal]);

  const triggerManualAction = (
    e: React.MouseEvent<HTMLElement>,
    mode: KittyActionMode,
  ) => {
    e.stopPropagation();
    if (actionTimerRef.current) window.clearTimeout(actionTimerRef.current);

    setActionMode(mode);
    if (mode === "wave") {
      setMotionClass("kitty-motion-wave");
    } else if (mode === "cheer") {
      setMotionClass("kitty-motion-cheer-hop");
    } else if (mode === "wink") {
      setMotionClass("kitty-motion-nod");
    } else {
      setMotionClass("kitty-motion-speaking");
    }

    onTapKitty(e, mode);

    actionTimerRef.current = window.setTimeout(() => {
      setActionMode("auto");
      setMotionClass("");
    }, 2600);
  };

  return (
    <div
      className="kitty-25d-stage-anchor"
      onClick={(e) => {
        const modes: KittyActionMode[] = ["wave", "cheer", "wink", "talk"];
        const pick = modes[Math.floor(Math.random() * modes.length)];
        triggerManualAction(e, pick);
      }}
      title="Chạm vào Cô giáo Hello Kitty 2.5D!"
    >
      {/* Bong bóng lời thoại của Cô giáo Kitty */}
      {reactionMessage && (
        <div
          className={`character-speech-bubble kitty-25d-bubble ${reactionType}`}
        >
          {reactionMessage}
        </div>
      )}

      {/* Bóng đổ mềm dưới sàn gỗ giúp nhân vật đứng vững trên mặt đất */}
      <div className="kitty-25d-floor-shadow" />

      {/* Khung nhân vật 2.5D gồm 9 trạng thái khớp 100% tọa độ */}
      <div className={`kitty-25d-puppet ${motionClass}`}>
        {KITTY_FRAMES.map((item) => (
          <img
            key={item.id}
            src={item.src}
            alt="Cô giáo Hello Kitty 2.5D"
            className={`kitty-25d-layer ${frame === item.id ? "active" : ""}`}
            draggable={false}
          />
        ))}
      </div>

      {/* Thanh nút điều khiển nhanh cử động 2.5D của Kitty */}
      <div
        className="kitty-25d-action-bar"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={`kitty-action-chip ${actionMode === "wave" ? "active" : ""}`}
          onClick={(e) => triggerManualAction(e, "wave")}
          title="Kitty vẫy tay chào"
        >
          👋 Vẫy tay
        </button>
        <button
          type="button"
          className={`kitty-action-chip ${actionMode === "wink" ? "active" : ""}`}
          onClick={(e) => triggerManualAction(e, "wink")}
          title="Kitty chớp mắt cười"
        >
          😊 Nháy mắt
        </button>
        <button
          type="button"
          className={`kitty-action-chip ${actionMode === "cheer" ? "active" : ""}`}
          onClick={(e) => triggerManualAction(e, "cheer")}
          title="Kitty giơ 2 tay hoan hô"
        >
          🎉 Hoan hô
        </button>
      </div>
    </div>
  );
};
