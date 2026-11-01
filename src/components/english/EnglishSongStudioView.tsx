import { useRef, useState } from "react";
import { ArrowLeft, Star } from "lucide-react";
import {
  getEnglishSongLessonForClip,
  type EnglishSongQuizOption,
  type EnglishSongVocabCard,
} from "../../data/englishSongLessons";
import {
  playAttentionChime,
  playCardPlaceSound,
  playRewardTone,
} from "../../lib/sound";
import type { LessonResult } from "../../types";
import type { LocalEnglishClip } from "./EnglishItemVisual";

export interface EnglishSongStudioViewProps {
  soundEnabled: boolean;
  englishClips: LocalEnglishClip[];
  englishFolderPath: string;
  loadingClips: boolean;
  onRefreshClips: () => Promise<void>;
  onUpdateClipsAfterDownload: (clips: LocalEnglishClip[]) => void;
  onBackToMenu: () => void;
  onComplete: (result: LessonResult) => void;
  onReaction?: (
    type: "happy" | "sad" | "singing" | "idle",
    message?: string,
  ) => void;
  speak: (text: string, lang?: string) => void;
  stopSpeech: () => void;
}

export function EnglishSongStudioView({
  soundEnabled,
  englishClips,
  englishFolderPath,
  loadingClips,
  onRefreshClips,
  onUpdateClipsAfterDownload,
  onBackToMenu,
  onComplete,
  onReaction,
  speak,
  stopSpeech,
}: EnglishSongStudioViewProps) {
  const [activeClipIdx, setActiveClipIdx] = useState(0);
  const [showDownloader, setShowDownloader] = useState(false);
  const [downloadUrlInput, setDownloadUrlInput] = useState("");
  const [downloadTitleInput, setDownloadTitleInput] = useState("");
  const [downloadingClip, setDownloadingClip] = useState(false);
  const [downloadMessage, setDownloadMessage] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState<1 | 0.75>(1);
  const [songStudioTab, setSongStudioTab] = useState<"vocab" | "quiz">("vocab");
  const [learnedVocabIds, setLearnedVocabIds] = useState<
    Record<string, boolean>
  >({});
  const [songQuizIdx, setSongQuizIdx] = useState(0);
  const [selectedSongQuizOptionId, setSelectedSongQuizOptionId] = useState<
    string | null
  >(null);
  const [songQuizIsCorrect, setSongQuizIsCorrect] = useState<boolean | null>(
    null,
  );
  const [completedSongClipIds, setCompletedSongClipIds] = useState<
    Record<string, boolean>
  >({});

  const activeClip = englishClips[activeClipIdx] || englishClips[0] || null;
  const activeSongLesson = activeClip
    ? getEnglishSongLessonForClip(
        activeClip.filename,
        activeClip.title,
        activeClipIdx,
      )
    : null;

  const activeSubtitleCue =
    activeSongLesson?.subtitles.find(
      (cue) =>
        videoCurrentTime >= cue.startSec && videoCurrentTime <= cue.endSec,
    ) ||
    activeSongLesson?.subtitles[0] ||
    null;

  const activeSongQuizRound =
    activeSongLesson?.quizRounds[
      songQuizIdx % Math.max(1, activeSongLesson.quizRounds.length)
    ] || null;

  const handleDownloadFromUrl = async () => {
    const trimmedUrl = downloadUrlInput.trim();
    if (!trimmedUrl || downloadingClip) return;
    setDownloadingClip(true);
    setDownloadMessage("⏳ Đang tải clip HD về thư mục Nhạc tiếng anh...");
    try {
      const res = await fetch("/api/download-english-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: trimmedUrl,
          customTitle: downloadTitleInput.trim(),
        }),
      });
      const data = await res.json();
      if (res.ok && data.ok && Array.isArray(data.clips)) {
        onUpdateClipsAfterDownload(data.clips);
        setActiveClipIdx(Math.max(0, data.clips.length - 1));
        setDownloadUrlInput("");
        setDownloadTitleInput("");
        setDownloadMessage("✅ Đã tải xong clip vào App!");
        if (soundEnabled) playRewardTone();
      } else {
        setDownloadMessage(`⚠️ ${data.error || "Không tải được link này"}`);
      }
    } catch (err) {
      setDownloadMessage(`⚠️ Lỗi kết nối: ${String(err)}`);
    } finally {
      setDownloadingClip(false);
    }
  };

  const handleSelectSongClip = (idx: number) => {
    if (soundEnabled) playCardPlaceSound();
    stopSpeech();
    setActiveClipIdx(idx);
    setVideoCurrentTime(0);
    setSongStudioTab("vocab");
    setSongQuizIdx(0);
    setSelectedSongQuizOptionId(null);
    setSongQuizIsCorrect(null);
  };

  const handleTogglePlaybackRate = () => {
    const nextRate: 1 | 0.75 = playbackRate === 1 ? 0.75 : 1;
    setPlaybackRate(nextRate);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextRate;
    }
    onReaction?.(
      "happy",
      nextRate === 0.75
        ? "🐢 Đã bật chế độ phát chậm 0.75x để Nấm nghe rõ từng từ tiếng Anh!"
        : "⚡ Đã quay về tốc độ phát chuẩn 1.0x!",
    );
  };

  const handleReplayCurrentCue = () => {
    if (!activeSubtitleCue) return;
    if (videoRef.current) {
      videoRef.current.currentTime = activeSubtitleCue.startSec;
      videoRef.current.play().catch(() => {});
    }
    speak(activeSubtitleCue.en, "en-US");
  };

  const handleTapSongVocabCard = (card: EnglishSongVocabCard) => {
    if (soundEnabled) playCardPlaceSound();
    setLearnedVocabIds((prev) => ({ ...prev, [card.id]: true }));
    if (videoRef.current) {
      videoRef.current.currentTime = card.startSec;
    }
    speak(card.english, "en-US");
    onReaction?.(
      "happy",
      `🔊 "${card.english}" (${card.phonetic}) nghĩa là: ${card.vietnamese}!`,
    );
  };

  const handlePickSongQuizOption = (option: EnglishSongQuizOption) => {
    if (!activeSongQuizRound || songQuizIsCorrect === true) return;
    setSelectedSongQuizOptionId(option.id);
    if (option.id === activeSongQuizRound.correctOptionId) {
      setSongQuizIsCorrect(true);
      if (soundEnabled) playRewardTone();
      speak(`Awesome! ${option.english}!`, "en-US");
      onReaction?.(
        "happy",
        `🌟 Chính xác! "${option.english}" (${option.vietnamese})! Nấm nhớ nội dung clip siêu đỉnh!`,
      );
    } else {
      setSongQuizIsCorrect(false);
      if (soundEnabled) playAttentionChime();
      speak(option.english, "en-US");
      onReaction?.("sad", `💡 ${activeSongQuizRound.hintVi}`);
    }
  };

  const handleNextSongQuizOrFinish = () => {
    if (!activeSongLesson || !activeClip) return;
    stopSpeech();
    if (songQuizIdx + 1 < activeSongLesson.quizRounds.length) {
      setSongQuizIdx((i) => i + 1);
      setSelectedSongQuizOptionId(null);
      setSongQuizIsCorrect(null);
      const nextQ = activeSongLesson.quizRounds[songQuizIdx + 1];
      if (soundEnabled && nextQ) {
        speak(nextQ.questionEn, "en-US");
      }
    } else {
      setCompletedSongClipIds((prev) => ({ ...prev, [activeClip.id]: true }));
      if (soundEnabled) playRewardTone();
      onComplete({
        attempts: 1,
        answers: [
          `Hoàn thành bài hát/truyện Tiếng Anh: ${activeSongLesson.displayTitle}`,
        ],
      });
    }
  };

  return (
    <div className="kuromi-shop-stage">
      <div className="kuromi-shop-topbar">
        <div className="kuromi-topbar-left">
          <button
            type="button"
            className="chunky-btn chunky-pink btn-sm"
            onClick={onBackToMenu}
          >
            <ArrowLeft size={14} /> Chọn bài
          </button>
          <span className="kuromi-game-badge">
            🎵 Học Qua Bài Hát ({englishClips.length} clip)
          </span>
        </div>

        <div className="kuromi-topbar-right">
          <button
            type="button"
            className="chunky-btn chunky-blue btn-sm"
            onClick={() => {
              setShowDownloader((v) => !v);
              setDownloadMessage(null);
            }}
          >
            📥 {showDownloader ? "Đóng khung tải" : "Dán link FB/YouTube"}
          </button>
          <button
            type="button"
            className="chunky-btn chunky-green btn-sm"
            onClick={() =>
              onComplete({
                attempts: 1,
                answers: [
                  activeClip
                    ? `Hát Tiếng Anh: ${activeClip.title}`
                    : "Hoàn thành Học Qua Bài Hát Tiếng Anh",
                ],
              })
            }
          >
            <Star size={14} fill="currentColor" /> Nhận Sao!
          </button>
        </div>
      </div>

      {showDownloader && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 8,
            padding: "8px 12px",
            borderRadius: 14,
            background: "#f3e8ff",
            border: "2px solid #c084fc",
          }}
        >
          <input
            type="url"
            value={downloadUrlInput}
            onChange={(e) => setDownloadUrlInput(e.target.value)}
            placeholder="Dán link Facebook Reel, YouTube hoặc TikTok vào đây..."
            style={{
              flex: "2 1 220px",
              padding: "6px 10px",
              borderRadius: 10,
              border: "1.5px solid #a855f7",
              fontSize: "0.85rem",
              fontWeight: 600,
            }}
          />
          <input
            type="text"
            value={downloadTitleInput}
            onChange={(e) => setDownloadTitleInput(e.target.value)}
            placeholder="Đặt tên bài (tùy chọn, VD: Bài hát Monsters)"
            style={{
              flex: "1 1 160px",
              padding: "6px 10px",
              borderRadius: 10,
              border: "1.5px solid #d8b4fe",
              fontSize: "0.85rem",
            }}
          />
          <button
            type="button"
            className="chunky-btn chunky-gold btn-sm"
            onClick={() => void handleDownloadFromUrl()}
            disabled={downloadingClip || !downloadUrlInput.trim()}
          >
            {downloadingClip ? "⏳ Đang tải..." : "⬇️ Tải vào App"}
          </button>
          <button
            type="button"
            className="chunky-btn chunky-blue btn-sm"
            onClick={() => void onRefreshClips()}
            disabled={loadingClips}
          >
            🔄 Quét thư mục
          </button>
          {downloadMessage && (
            <span
              style={{
                width: "100%",
                fontSize: "0.82rem",
                fontWeight: 700,
                color: "#5b21b6",
              }}
            >
              {downloadMessage}
            </span>
          )}
        </div>
      )}

      {englishClips.length === 0 ? (
        <div
          className="kuromi-order-banner"
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            gap: "10px",
            padding: "20px",
          }}
        >
          <img
            src="/assets/char-kuromi.webp"
            alt="Kuromi"
            style={{ width: 72, height: 72, objectFit: "contain" }}
          />
          <strong style={{ fontSize: "1.1rem", color: "#5b21b6" }}>
            🎵 Thư mục Nhạc Tiếng Anh của Nấm đã sẵn sàng!
          </strong>
          <p
            style={{
              margin: 0,
              fontSize: "0.92rem",
              color: "#475569",
              maxWidth: 580,
            }}
          >
            Ba mẹ bấm <strong>📥 Dán link FB/YouTube</strong> ở góc trên để tải
            tự động, hoặc chép file (<code>.mp4</code>, <code>.mp3</code>) vào
            thư mục:
          </p>
          <code
            style={{
              background: "#f3e8ff",
              color: "#6b21a8",
              padding: "6px 14px",
              borderRadius: 12,
              fontWeight: 800,
              fontSize: "0.95rem",
            }}
          >
            {englishFolderPath}
          </code>
        </div>
      ) : (
        <div
          className="english-song-studio-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "0.86fr 1.52fr 0.94fr",
            gap: "10px",
            flex: 1,
            minHeight: 0,
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              background: "linear-gradient(180deg, #1e1b4b 0%, #311042 100%)",
              borderRadius: 16,
              padding: "8px",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              minHeight: 0,
              border: "2px solid #c084fc",
              boxShadow: "0 6px 16px rgba(91, 33, 182, 0.18)",
            }}
          >
            <div
              style={{
                flex: 1,
                minHeight: 0,
                borderRadius: 12,
                overflow: "hidden",
                background: "#0f0720",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {activeClip?.mediaType === "audio" ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                    padding: 16,
                    color: "#fff",
                    textAlign: "center",
                  }}
                >
                  <img
                    src="/assets/char-kuromi.webp"
                    alt="Kuromi"
                    style={{ width: 72, height: 72, objectFit: "contain" }}
                  />
                  <strong>
                    {activeSongLesson?.displayTitle || activeClip.title}
                  </strong>
                  <audio
                    key={activeClip.streamUrl}
                    src={activeClip.streamUrl}
                    controls
                    autoPlay
                    onTimeUpdate={(e) =>
                      setVideoCurrentTime(e.currentTarget.currentTime)
                    }
                    style={{ width: "100%" }}
                  />
                </div>
              ) : (
                <video
                  ref={videoRef}
                  key={activeClip?.streamUrl}
                  src={activeClip?.streamUrl}
                  controls
                  autoPlay
                  playsInline
                  onLoadedMetadata={(e) => {
                    e.currentTarget.playbackRate = playbackRate;
                  }}
                  onTimeUpdate={(e) =>
                    setVideoCurrentTime(e.currentTarget.currentTime)
                  }
                  onEnded={() => {
                    onReaction?.(
                      "happy",
                      "🎉 Nấm xem xong clip rồi! Bấm sang tab '🎮 Thử Thách' ở cột giữa để trả lời câu hỏi cùng Kuromi nhé!",
                    );
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              )}
            </div>

            {activeSubtitleCue && (
              <button
                type="button"
                onClick={handleReplayCurrentCue}
                title="Chạm để nghe lại câu tiếng Anh này"
                style={{
                  background:
                    "linear-gradient(135deg, #fef08a 0%, #fde047 100%)",
                  border: "2px solid #eab308",
                  borderRadius: 12,
                  padding: "6px 10px",
                  textAlign: "center",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  boxShadow: "0 3px 0 #ca8a04",
                }}
              >
                <strong
                  lang="en"
                  style={{
                    fontSize: "0.9rem",
                    color: "#1e1b4b",
                    lineHeight: 1.2,
                  }}
                >
                  🎤 "{activeSubtitleCue.en}"
                </strong>
                <span
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    color: "#713f12",
                    lineHeight: 1.2,
                  }}
                >
                  {activeSubtitleCue.vi}
                </span>
              </button>
            )}

            <div
              style={{
                display: "flex",
                gap: 6,
                justifyContent: "space-between",
              }}
            >
              <button
                type="button"
                onClick={handleTogglePlaybackRate}
                style={{
                  flex: 1,
                  padding: "5px 8px",
                  borderRadius: 10,
                  border:
                    playbackRate === 0.75
                      ? "2px solid #fbbf24"
                      : "1.5px solid #a855f7",
                  background: playbackRate === 0.75 ? "#fef3c7" : "#3b0764",
                  color: playbackRate === 0.75 ? "#92400e" : "#f3e8ff",
                  fontWeight: 800,
                  fontSize: "0.76rem",
                  cursor: "pointer",
                }}
              >
                {playbackRate === 0.75
                  ? "🐢 Đang chậm 0.75x"
                  : "🐢 Nghe chậm 0.75x"}
              </button>
              <button
                type="button"
                onClick={handleReplayCurrentCue}
                style={{
                  flex: 1,
                  padding: "5px 8px",
                  borderRadius: 10,
                  border: "1.5px solid #a855f7",
                  background: "#4c1d95",
                  color: "#ffffff",
                  fontWeight: 800,
                  fontSize: "0.76rem",
                  cursor: "pointer",
                }}
              >
                🔁 Lặp câu đang hát
              </button>
            </div>
          </div>

          <div
            style={{
              background: "#ffffff",
              borderRadius: 16,
              border: "2.5px solid #d8b4fe",
              padding: "10px 12px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              minHeight: 0,
              boxShadow: "0 6px 16px rgba(147, 51, 234, 0.08)",
            }}
          >
            {activeSongLesson && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 8,
                  paddingBottom: 6,
                  borderBottom: "2px dashed #f3e8ff",
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <span style={{ fontSize: "1.2rem" }}>
                      {activeSongLesson.icon}
                    </span>
                    <strong
                      style={{
                        fontSize: "0.98rem",
                        color: "#4c1d95",
                        lineHeight: 1.15,
                      }}
                    >
                      {activeSongLesson.displayTitle}
                    </strong>
                  </div>
                  <span
                    style={{
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      color: "#7e22ce",
                    }}
                  >
                    {activeSongLesson.vietnameseTitle} ·{" "}
                    {activeSongLesson.topicTag}
                  </span>
                </div>

                <div style={{ display: "flex", gap: 6 }}>
                  <button
                    type="button"
                    onClick={() => {
                      if (soundEnabled) playCardPlaceSound();
                      setSongStudioTab("vocab");
                    }}
                    style={{
                      padding: "6px 11px",
                      borderRadius: 12,
                      border:
                        songStudioTab === "vocab"
                          ? "2px solid #9333ea"
                          : "2px solid #e9d5ff",
                      background:
                        songStudioTab === "vocab"
                          ? "linear-gradient(135deg, #9333ea 0%, #7e22ce 100%)"
                          : "#faf5ff",
                      color: songStudioTab === "vocab" ? "#ffffff" : "#6b21a8",
                      fontWeight: 800,
                      fontSize: "0.8rem",
                      cursor: "pointer",
                    }}
                  >
                    🃏 Từ Vựng ({activeSongLesson.vocabCards.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (soundEnabled) playCardPlaceSound();
                      setSongStudioTab("quiz");
                      setSelectedSongQuizOptionId(null);
                      setSongQuizIsCorrect(null);
                      const firstQ =
                        activeSongLesson.quizRounds[songQuizIdx] ||
                        activeSongLesson.quizRounds[0];
                      if (soundEnabled && firstQ) {
                        speak(firstQ.questionEn, "en-US");
                      }
                    }}
                    style={{
                      padding: "6px 11px",
                      borderRadius: 12,
                      border:
                        songStudioTab === "quiz"
                          ? "2px solid #ea580c"
                          : "2px solid #fed7aa",
                      background:
                        songStudioTab === "quiz"
                          ? "linear-gradient(135deg, #f97316 0%, #ea580c 100%)"
                          : "#fff7ed",
                      color: songStudioTab === "quiz" ? "#ffffff" : "#c2410c",
                      fontWeight: 800,
                      fontSize: "0.8rem",
                      cursor: "pointer",
                    }}
                  >
                    🎮 Thử Thách ({activeSongLesson.quizRounds.length})
                  </button>
                </div>
              </div>
            )}

            {activeSongLesson && songStudioTab === "vocab" && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  flex: 1,
                  minHeight: 0,
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      activeSongLesson.vocabCards.length <= 4
                        ? "repeat(2, 1fr)"
                        : "repeat(3, 1fr)",
                    gap: 8,
                    flex: 1,
                    minHeight: 0,
                    overflowY: "auto",
                    padding: "2px",
                  }}
                >
                  {activeSongLesson.vocabCards.map((card) => {
                    const isCueActive =
                      videoCurrentTime >= card.startSec &&
                      videoCurrentTime <= card.endSec;
                    const isLearned = !!learnedVocabIds[card.id];
                    return (
                      <button
                        key={card.id}
                        type="button"
                        onClick={() => handleTapSongVocabCard(card)}
                        style={{
                          position: "relative",
                          borderRadius: 14,
                          padding: "8px 6px",
                          border: isCueActive
                            ? "3px solid #eab308"
                            : isLearned
                              ? "2px solid #22c55e"
                              : "2px solid #e9d5ff",
                          background: isCueActive
                            ? "linear-gradient(180deg, #fef9c3 0%, #fef08a 100%)"
                            : isLearned
                              ? "#f0fdf4"
                              : "#faf5ff",
                          boxShadow: isCueActive
                            ? "0 0 0 3px rgba(234, 179, 8, 0.28), 0 6px 12px rgba(202, 138, 4, 0.2)"
                            : "0 3px 0 rgba(147, 51, 234, 0.12)",
                          transform: isCueActive
                            ? "translateY(-2px) scale(1.02)"
                            : "none",
                          transition: "all 0.2s ease",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 4,
                          cursor: "pointer",
                          textAlign: "center",
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            top: 5,
                            right: 6,
                            fontSize: "0.66rem",
                            fontWeight: 800,
                            padding: "1px 6px",
                            borderRadius: 999,
                            background: isCueActive
                              ? "#ca8a04"
                              : isLearned
                                ? "#16a34a"
                                : "#e9d5ff",
                            color:
                              isCueActive || isLearned
                                ? "#ffffff"
                                : "#6b21a8",
                          }}
                        >
                          {isCueActive
                            ? "🎤 Đang hát"
                            : isLearned
                              ? "✓ Đã nghe"
                              : `0:${String(Math.floor(card.startSec)).padStart(2, "0")}`}
                        </span>

                        <div
                          style={{
                            width: 52,
                            height: 52,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: 8,
                          }}
                        >
                          <img
                            src={card.imageUrl}
                            alt={card.english}
                            style={{
                              maxWidth: "100%",
                              maxHeight: "100%",
                              objectFit: "contain",
                              filter:
                                "drop-shadow(0 3px 5px rgba(0,0,0,0.12))",
                            }}
                          />
                        </div>

                        <strong
                          lang="en"
                          style={{
                            fontSize: "0.88rem",
                            color: "#3b0764",
                            lineHeight: 1.15,
                          }}
                        >
                          {card.emoji} {card.english}
                        </strong>
                        <span
                          style={{
                            fontSize: "0.74rem",
                            fontWeight: 700,
                            color: "#6b21a8",
                            lineHeight: 1.15,
                          }}
                        >
                          {card.vietnamese}
                        </span>
                        <small
                          style={{
                            fontSize: "0.68rem",
                            color: "#7e22ce",
                            opacity: 0.85,
                          }}
                        >
                          🔊 {card.phonetic}
                        </small>
                      </button>
                    );
                  })}
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 8,
                    padding: "6px 10px",
                    borderRadius: 12,
                    background: "#f3e8ff",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.76rem",
                      fontWeight: 700,
                      color: "#5b21b6",
                    }}
                  >
                    💡 Chạm thẻ để nghe phát âm & tua video tới đúng câu!
                  </span>
                  <button
                    type="button"
                    className="chunky-btn chunky-gold btn-sm"
                    onClick={() => {
                      if (soundEnabled) playCardPlaceSound();
                      setSongStudioTab("quiz");
                      setSongQuizIdx(0);
                      setSelectedSongQuizOptionId(null);
                      setSongQuizIsCorrect(null);
                      const firstQ = activeSongLesson.quizRounds[0];
                      if (soundEnabled && firstQ) {
                        speak(firstQ.questionEn, "en-US");
                      }
                    }}
                  >
                    🎮 Thử Thách Bài Này →
                  </button>
                </div>
              </div>
            )}

            {activeSongLesson &&
              songStudioTab === "quiz" &&
              activeSongQuizRound && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    flex: 1,
                    minHeight: 0,
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    onClick={() =>
                      speak(activeSongQuizRound.questionEn, "en-US")
                    }
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 12px",
                      borderRadius: 14,
                      background:
                        "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)",
                      border: "2px solid #c084fc",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src="/assets/char-kuromi.webp"
                      alt="Kuromi"
                      style={{
                        width: 50,
                        height: 50,
                        objectFit: "contain",
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          marginBottom: 2,
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.72rem",
                            fontWeight: 800,
                            padding: "2px 8px",
                            borderRadius: 999,
                            background: "#9333ea",
                            color: "#fff",
                          }}
                        >
                          Câu {songQuizIdx + 1}/
                          {activeSongLesson.quizRounds.length}
                        </span>
                        <strong
                          lang="en"
                          style={{
                            fontSize: "0.92rem",
                            color: "#4c1d95",
                          }}
                        >
                          🔊 "{activeSongQuizRound.questionEn}"
                        </strong>
                      </div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "0.82rem",
                          fontWeight: 700,
                          color: "#334155",
                        }}
                      >
                        {activeSongQuizRound.questionVi}
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: 10,
                      flex: 1,
                      minHeight: 0,
                      alignItems: "stretch",
                    }}
                  >
                    {activeSongQuizRound.options.map((opt) => {
                      const isPicked = selectedSongQuizOptionId === opt.id;
                      const isRight =
                        isPicked &&
                        opt.id === activeSongQuizRound.correctOptionId;
                      const isWrong =
                        isPicked &&
                        opt.id !== activeSongQuizRound.correctOptionId;

                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handlePickSongQuizOption(opt)}
                          style={{
                            borderRadius: 16,
                            padding: "10px 8px",
                            border: isRight
                              ? "3px solid #16a34a"
                              : isWrong
                                ? "3px solid #ef4444"
                                : "2.5px solid #e9d5ff",
                            background: isRight
                              ? "#dcfce7"
                              : isWrong
                                ? "#fee2e2"
                                : "#ffffff",
                            boxShadow: "0 4px 0 rgba(147, 51, 234, 0.14)",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 6,
                            cursor: "pointer",
                            textAlign: "center",
                          }}
                        >
                          <div
                            style={{
                              width: 68,
                              height: 68,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              src={opt.imageUrl}
                              alt={opt.english}
                              style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                objectFit: "contain",
                                filter:
                                  "drop-shadow(0 4px 6px rgba(0,0,0,0.14))",
                              }}
                            />
                          </div>
                          <strong
                            lang="en"
                            style={{
                              fontSize: "0.92rem",
                              color: "#3b0764",
                            }}
                          >
                            {opt.emoji} {opt.english}
                          </strong>
                          <span
                            style={{
                              fontSize: "0.78rem",
                              fontWeight: 700,
                              color: "#64748b",
                            }}
                          >
                            {opt.vietnamese}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 8,
                      padding: "8px 12px",
                      borderRadius: 12,
                      background:
                        songQuizIsCorrect === true
                          ? "#dcfce7"
                          : songQuizIsCorrect === false
                            ? "#fef3c7"
                            : "#f8fafc",
                      border:
                        songQuizIsCorrect === true
                          ? "2px solid #22c55e"
                          : "1.5px solid #e2e8f0",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 800,
                        color:
                          songQuizIsCorrect === true
                            ? "#166534"
                            : songQuizIsCorrect === false
                              ? "#92400e"
                              : "#64748b",
                      }}
                    >
                      {songQuizIsCorrect === true
                        ? "🎉 Chính xác! Nấm giỏi quá!"
                        : songQuizIsCorrect === false
                          ? `💡 ${activeSongQuizRound.hintVi}`
                          : "👆 Nấm chạm vào thẻ hình đúng để trả lời Kuromi nhé!"}
                    </span>

                    {songQuizIsCorrect === true && (
                      <button
                        type="button"
                        className="chunky-btn chunky-green btn-sm"
                        onClick={handleNextSongQuizOrFinish}
                      >
                        {songQuizIdx + 1 < activeSongLesson.quizRounds.length
                          ? "Câu tiếp theo →"
                          : "🏆 Hoàn thành & Nhận Sao!"}
                      </button>
                    )}
                  </div>
                </div>
              )}
          </div>

          <div
            style={{
              background: "#faf5ff",
              borderRadius: 16,
              border: "2px solid #e9d5ff",
              padding: "8px",
              display: "flex",
              flexDirection: "column",
              gap: 6,
              minHeight: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "2px 6px 4px",
                borderBottom: "1.5px solid #e9d5ff",
              }}
            >
              <strong style={{ fontSize: "0.82rem", color: "#5b21b6" }}>
                📚 Danh Sách Bài Học ({englishClips.length})
              </strong>
              <span
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "#7e22ce",
                }}
              >
                Nhạc & Truyện
              </span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                overflowY: "auto",
                paddingRight: 2,
                flex: 1,
                minHeight: 0,
              }}
            >
              {englishClips.map((clip, idx) => {
                const lesson = getEnglishSongLessonForClip(
                  clip.filename,
                  clip.title,
                  idx,
                );
                const isSelected = idx === activeClipIdx;
                const isDone = !!completedSongClipIds[clip.id];

                return (
                  <button
                    key={clip.id}
                    type="button"
                    className={`wb-lesson-row ${isSelected ? "active" : ""}`}
                    style={{
                      padding: "7px 10px",
                      border: isSelected
                        ? "2.5px solid #9333ea"
                        : isDone
                          ? "2px solid #86efac"
                          : "1.5px solid #e9d5ff",
                      background: isSelected
                        ? "linear-gradient(135deg, #f3e8ff 0%, #fae8ff 100%)"
                        : isDone
                          ? "#f0fdf4"
                          : "#ffffff",
                      borderRadius: 12,
                      textAlign: "left",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      boxShadow: isSelected
                        ? "0 3px 8px rgba(147, 51, 234, 0.16)"
                        : "none",
                    }}
                    onClick={() => handleSelectSongClip(idx)}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 4,
                      }}
                    >
                      <strong
                        style={{
                          fontSize: "0.82rem",
                          color: "#3b0764",
                          lineHeight: 1.2,
                        }}
                      >
                        {lesson.icon} {lesson.orderLabel} ·{" "}
                        {lesson.displayTitle}
                      </strong>
                      {isDone && (
                        <span
                          style={{
                            fontSize: "0.68rem",
                            fontWeight: 800,
                            color: "#15803d",
                            background: "#dcfce7",
                            padding: "1px 6px",
                            borderRadius: 999,
                            flexShrink: 0,
                          }}
                        >
                          ✓ Đã học
                        </span>
                      )}
                    </div>

                    <span
                      style={{
                        fontSize: "0.73rem",
                        fontWeight: 600,
                        color: "#475569",
                        lineHeight: 1.15,
                      }}
                    >
                      {lesson.vietnameseTitle}
                    </span>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        marginTop: 2,
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.68rem",
                          fontWeight: 800,
                          padding: "1px 7px",
                          borderRadius: 999,
                          background:
                            lesson.clipType === "story" ? "#ffedd5" : "#f3e8ff",
                          color:
                            lesson.clipType === "story" ? "#c2410c" : "#6b21a8",
                        }}
                      >
                        {lesson.categoryBadge}
                      </span>
                      <span
                        style={{
                          fontSize: "0.68rem",
                          fontWeight: 700,
                          color: "#7e22ce",
                        }}
                      >
                        · {lesson.vocabCards.length} từ
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
