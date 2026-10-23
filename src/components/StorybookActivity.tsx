import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Film,
  Gamepad2,
  HelpCircle,
  Maximize2,
  Minimize2,
  Play,
  Sparkles,
  Star,
  Volume2,
} from "lucide-react";
import {
  STORY_BOOKS,
  getPageDialogues,
  type StoryBookItem,
} from "../data/storyBooks";
import { useSpeech } from "../hooks/useSpeech";
import type { ActivityProps } from "../types";
import { PochaccoActivity } from "./PochaccoActivity";

interface EntertainmentVideoItem {
  id: string;
  filename: string;
  title: string;
  sourceDir: "video-nam" | "root";
  sizeMB: number;
  duration?: string;
  thumbUrl?: string;
}

export { STORY_BOOKS };

export function StorybookActivity({
  soundEnabled,
  onComplete,
  onReaction,
  onLessonIndexChange,
}: ActivityProps) {
  // 3 Khu chính của Khu Giải Trí (Ô số 6):
  // - "hub": Màn hình Sảnh 3 Ngôi Nhà (1. Lều Đọc Truyện | 2. Rạp Chiếu Phim | 3. Khu Vui Chơi)
  // - "stories": Lều Đọc Truyện
  // - "cinema": Rạp Chiếu Phim Khám Phá
  // - "games": Khu Vui Chơi Công Viên (Lật Bài Trí Nhớ...)
  const [hubZone, setHubZone] = useState<
    "hub" | "stories" | "cinema" | "games"
  >("hub");
  const [enteringHouse, setEnteringHouse] = useState<
    "stories" | "cinema" | "games" | null
  >(null);

  // Mở đầu Lều Đọc Truyện bằng Frame Chọn Truyện cùng Little Twin Stars (Kiki & Lala)
  const [selectedBook, setSelectedBook] = useState<StoryBookItem | null>(null);
  const [pageIdx, setPageIdx] = useState(0);
  const [flipping, setFlipping] = useState<"next" | "prev" | null>(null);
  const [activeBubbleIdx, setActiveBubbleIdx] = useState<number | null>(null);
  const [twinStarGreeting, setTwinStarGreeting] = useState<string | null>(null);
  // Khi trang truyện có video ngắn: phát video tắt tiếng trước, phát xong tự động chuyển về ảnh gốc
  const [videoFinished, setVideoFinished] = useState(false);
  const [videoReplayKey, setVideoReplayKey] = useState(0);

  // State cho Rạp Chiếu Phim Khám Phá
  const [cinemaVideos, setCinemaVideos] = useState<EntertainmentVideoItem[]>(
    [],
  );
  const [activeCinemaVideoId, setActiveCinemaVideoId] = useState<string | null>(
    null,
  );
  const [isCinemaFullscreen, setIsCinemaFullscreen] = useState(false);

  useEffect(() => {
    if (!isCinemaFullscreen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsCinemaFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isCinemaFullscreen]);

  // Trạng thái Đố Vui 2-3 Câu Hỏi Sau Mỗi Câu Chuyện
  const [inQuizMode, setInQuizMode] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isOptionCorrect, setIsOptionCorrect] = useState<boolean | null>(null);
  const [quizAttempts, setQuizAttempts] = useState(0);
  const [answeredList, setAnsweredList] = useState<string[]>([]);

  const shelfScrollRef = useRef<HTMLDivElement | null>(null);
  const speech = useSpeech(soundEnabled);

  useEffect(() => {
    fetch("/api/local-videos")
      .then((r) => r.json())
      .then((data: { videos?: EntertainmentVideoItem[] }) => {
        const list = data.videos || [];
        setCinemaVideos(list);
        if (list.length > 0) {
          setActiveCinemaVideoId((prev) => prev || list[0].id);
        }
      })
      .catch(() => {});
  }, []);

  // Mỗi khi đổi trang hoặc đổi bộ truyện, reset trạng thái phát clip động
  useEffect(() => {
    setVideoFinished(false);
    setActiveBubbleIdx(null);
  }, [selectedBook?.id, pageIdx]);

  const scrollShelf = (dir: -1 | 1) => {
    if (!shelfScrollRef.current) return;
    shelfScrollRef.current.scrollBy({ left: dir * 280, behavior: "smooth" });
  };

  const greetLittleTwinStars = () => {
    const msg =
      "Chào Nấm! Hai thiên thần sao Little Twin Stars Kiki và Lala chúc Nấm nghe kể chuyện và trả lời câu đố thật vui nhé!";
    setTwinStarGreeting(msg);
    speech.speak(msg, "vi-VN");
    window.setTimeout(() => setTwinStarGreeting(null), 4000);
  };

  const activeCinemaVideo =
    cinemaVideos.find((v) => v.id === activeCinemaVideoId) ||
    cinemaVideos[0] ||
    null;

  // =========================================================================
  // 0. SẢNH KHU GIẢI TRÍ 3 NGÔI NHÀ (LỀU ĐỌC TRUYỆN | RẠP CHIẾU PHIM | KHU VUI CHƠI)
  // =========================================================================
  if (hubZone === "hub") {
    return (
      <div
        className="story-fullscreen-frame hub-3d-panorama-stage ent-hub-stage"
        style={{ backgroundImage: `url("/assets/canva/ent-hub-bg.png")` }}
      >
        <div className="hub-3d-houses-layer">
          {/* NGÔI NHÀ 1 (TRÁI): LỀU ĐỌC TRUYỆN */}
          <button
            type="button"
            className={`hub-3d-house-btn house-left ${
              enteringHouse === "stories" ? "is-entering" : ""
            }`}
            onClick={() => {
              if (enteringHouse) return;
              setEnteringHouse("stories");
              if (soundEnabled) {
                speech.speak(
                  "Chào mừng Nấm vào Lều Đọc Truyện! Con chọn câu chuyện mình thích nhé!",
                  "vi-VN",
                );
              }
              window.setTimeout(() => {
                setEnteringHouse(null);
                setSelectedBook(null);
                setHubZone("stories");
              }, 380);
            }}
            aria-label="Lều Đọc Truyện"
          >
            <img
              src="/assets/canva/ent-house-story.png"
              alt="Lều Đọc Truyện"
              className="hub-3d-house-img"
              draggable={false}
            />
          </button>

          {/* NGÔI NHÀ 2 (GIỮA): RẠP CHIẾU PHIM */}
          <button
            type="button"
            className={`hub-3d-house-btn house-center ${
              enteringHouse === "cinema" ? "is-entering" : ""
            }`}
            onClick={() => {
              if (enteringHouse) return;
              setEnteringHouse("cinema");
              if (soundEnabled) {
                speech.speak(
                  "Chào mừng Nấm vào Rạp Chiếu Phim Khám Phá! Mình cùng xem phim phiêu lưu của Nấm nhé!",
                  "vi-VN",
                );
              }
              window.setTimeout(() => {
                setEnteringHouse(null);
                setHubZone("cinema");
              }, 380);
            }}
            aria-label="Rạp Chiếu Phim"
          >
            <img
              src="/assets/canva/ent-house-cinema.png"
              alt="Rạp Chiếu Phim"
              className="hub-3d-house-img"
              draggable={false}
            />
          </button>

          {/* NGÔI NHÀ 3 (PHẢI): KHU VUI CHƠI */}
          <button
            type="button"
            className={`hub-3d-house-btn house-right ${
              enteringHouse === "games" ? "is-entering" : ""
            }`}
            onClick={() => {
              if (enteringHouse) return;
              setEnteringHouse("games");
              if (soundEnabled) {
                speech.speak(
                  "Chào mừng Nấm đến Khu Công Viên Vui Chơi! Mình cùng chơi Lật Bài Tìm Cặp Đôi nhé!",
                  "vi-VN",
                );
              }
              window.setTimeout(() => {
                setEnteringHouse(null);
                setHubZone("games");
              }, 380);
            }}
            aria-label="Khu Vui Chơi"
          >
            <img
              src="/assets/canva/ent-house-park.png"
              alt="Khu Vui Chơi"
              className="hub-3d-house-img"
              draggable={false}
            />
          </button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // KHU 2: RẠP CHIẾU PHIM KHÁM PHÁ CỦA NẤM
  // =========================================================================
  if (hubZone === "cinema") {
    return (
      <div
        className="story-fullscreen-frame select-frame-bg cinema-zone-screen"
        style={{ backgroundImage: `url("/assets/story-frame-read-2.png")` }}
      >
        <div
          className={`story-board-inner-window cinema-zone-window ${
            isCinemaFullscreen ? "is-cinema-fullscreen" : ""
          }`}
        >
          <div className="entertainment-zone-topbar">
            <button
              type="button"
              className="chunky-btn chunky-pink btn-sm"
              onClick={() => {
                speech.stop();
                setIsCinemaFullscreen(false);
                setHubZone("hub");
              }}
            >
              <ArrowLeft size={15} /> 3 Khu Giải Trí
            </button>
            <strong className="zone-topbar-title">
              🎬 {activeCinemaVideo?.title || `Rạp Chiếu Phim (${cinemaVideos.length} tập)`}
            </strong>
            <div className="cinema-topbar-actions">
              <button
                type="button"
                className="chunky-btn chunky-blue btn-sm"
                onClick={() => setIsCinemaFullscreen((prev) => !prev)}
                title={
                  isCinemaFullscreen
                    ? "Thu nhỏ màn hình phim"
                    : "Phóng to toàn màn hình phim"
                }
              >
                {isCinemaFullscreen ? (
                  <>
                    <Minimize2 size={14} /> Thu Nhỏ
                  </>
                ) : (
                  <>
                    <Maximize2 size={14} /> Phóng To
                  </>
                )}
              </button>
              <button
                type="button"
                className="chunky-btn chunky-gold btn-sm"
                onClick={() => {
                  setIsCinemaFullscreen(false);
                  onComplete({
                    attempts: 1,
                    answers: [activeCinemaVideo?.title || "Xem phim khám phá"],
                    activityId: activeCinemaVideo?.id || "cinema-watch",
                    skillIds: ["story-comprehension"],
                    independentResult: "passed",
                    completionSource: "system-checked",
                  });
                }}
              >
                <Sparkles size={14} /> Nhận Sao! ⭐
              </button>
            </div>
          </div>

          <div className="cinema-theater-layout">
            <div className="cinema-main-screen-box">
              {activeCinemaVideo ? (
                <>
                  <video
                    key={activeCinemaVideo.id}
                    className="cinema-video-element"
                    controls
                    autoPlay
                    playsInline
                    src={`/api/local-video-stream?id=${encodeURIComponent(
                      activeCinemaVideo.id,
                    )}`}
                  />
                  <button
                    type="button"
                    className="cinema-floating-zoom-btn"
                    onClick={() => setIsCinemaFullscreen((prev) => !prev)}
                    title={
                      isCinemaFullscreen
                        ? "Thu nhỏ màn hình"
                        : "Phóng to toàn màn hình"
                    }
                  >
                    {isCinemaFullscreen ? (
                      <>
                        <Minimize2 size={15} /> Thu nhỏ
                      </>
                    ) : (
                      <>
                        <Maximize2 size={15} /> Toàn màn hình
                      </>
                    )}
                  </button>
                </>
              ) : (
                <div className="cinema-empty-notice">
                  <Film size={32} />
                  <span>Đang tải danh sách phim của Nấm...</span>
                </div>
              )}
            </div>

            {!isCinemaFullscreen && (
              <div className="cinema-playlist-sidebar">
                <span className="playlist-sidebar-header">
                  🍿 Chọn Tập Phim ({cinemaVideos.length} tập):
                </span>
                <div className="cinema-playlist-scroll">
                  {cinemaVideos.map((vid, idx) => (
                    <button
                      key={vid.id}
                      type="button"
                      className={`cinema-episode-btn ${
                        activeCinemaVideo?.id === vid.id ? "active" : ""
                      }`}
                      onClick={() => setActiveCinemaVideoId(vid.id)}
                    >
                      <div className="cinema-ep-thumb-wrap">
                        {vid.thumbUrl ? (
                          <img
                            src={vid.thumbUrl}
                            alt={vid.title}
                            className="cinema-ep-thumb-img"
                            loading="lazy"
                          />
                        ) : (
                          <span className="cinema-ep-thumb-fallback">🎬</span>
                        )}
                        <span className="ep-num-badge">Tập {idx + 1}</span>
                      </div>
                      <div className="cinema-ep-info">
                        <strong className="ep-title-text">{vid.title}</strong>
                        {vid.duration && (
                          <span className="ep-duration-sub">
                            ⏱ {vid.duration}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // KHU 3: KHU CÔNG VIÊN VUI CHƠI (CHƠI GAME LẬT BÀI & MINI-GAMES)
  // =========================================================================
  if (hubZone === "games") {
    return (
      <div
        className="story-fullscreen-frame select-frame-bg park-games-zone-screen"
        style={{ backgroundImage: `url("/assets/story-frame-read-1.png")` }}
      >
        <div className="story-board-inner-window park-games-zone-window">
          <PochaccoActivity
            soundEnabled={soundEnabled}
            onComplete={onComplete}
            onReaction={onReaction}
            onLessonIndexChange={onLessonIndexChange}
            initialViewMode="memory"
            onBackToHub={() => setHubZone("hub")}
          />
        </div>
      </div>
    );
  }

  // =========================================================================
  // KHU 1: LỀU ĐỌC TRUYỆN — FRAME CHỌN CHUYỆN
  // =========================================================================
  if (!selectedBook) {
    return (
      <div
        className="story-fullscreen-frame select-frame-bg"
        style={{ backgroundImage: `url("/assets/story-frame-read-1.png")` }}
      >
        {/* Hotspot chạm vào Little Twin Stars (Kiki & Lala) ở góc trái của Frame */}
        <button
          type="button"
          className="twinstar-hotspot-left"
          onClick={greetLittleTwinStars}
          title="Chạm vào Little Twin Stars (Kiki & Lala)!"
        />

        {twinStarGreeting && (
          <div className="twinstar-floating-bubble">🌟 {twinStarGreeting}</div>
        )}

        {/* Lòng bảng sáng ở chính giữa Frame: Hiển thị Slide Ngang Tủ Truyện */}
        <div className="story-board-inner-window select-board-window">
          <div className="entertainment-zone-topbar story-shelf-topbar">
            <button
              type="button"
              className="chunky-btn chunky-pink btn-sm"
              onClick={() => {
                speech.stop();
                setHubZone("hub");
              }}
            >
              <ArrowLeft size={15} /> 3 Khu Giải Trí
            </button>
            <strong className="zone-topbar-title">
              ⛺ Lều Đọc Truyện ({STORY_BOOKS.length} bộ truyện)
            </strong>
            <span />
          </div>

          <div className="wb-horizontal-carousel-wrap story-select-carousel">
            <button
              type="button"
              className="wb-carousel-arrow"
              onClick={() => scrollShelf(-1)}
              title="Trượt sang trái"
            >
              <ChevronLeft size={20} />
            </button>

            <div
              className="wb-horizontal-strip story-cards-strip"
              ref={shelfScrollRef}
            >
              {STORY_BOOKS.map((book) => (
                <button
                  key={book.id}
                  type="button"
                  className="storybook-cover-card framed-story-card"
                  onClick={() => {
                    setSelectedBook(book);
                    setPageIdx(0);
                    setInQuizMode(false);
                    setQuizIdx(0);
                    setSelectedOption(null);
                    setIsOptionCorrect(null);
                    setQuizAttempts(0);
                    setAnsweredList([]);
                    setVideoFinished(false);
                    if (soundEnabled) {
                      speech.speak(book.pages[0].lines.join(" "), "vi-VN");
                    }
                  }}
                >
                  <div className="storybook-cover-img-wrap">
                    <img src={book.cover} alt={book.title} />
                    <span className="storybook-cover-badge">
                      {book.pages.length} trang
                    </span>
                  </div>
                  <div className="storybook-cover-body">
                    <strong>{book.title}</strong>
                  </div>
                </button>
              ))}
            </div>

            <button
              type="button"
              className="wb-carousel-arrow"
              onClick={() => scrollShelf(1)}
              title="Trượt sang phải"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. FRAME ĐỌC CHUYỆN & ĐỐ VUI SAU TRUYỆN
  // =========================================================================
  const pages = selectedBook.pages;
  const questions = (selectedBook.questions || []).slice(0, 2);
  const current = pages[pageIdx] || pages[0];
  const currentQuestion = questions[quizIdx] || questions[0];
  const pageDialogues = getPageDialogues(selectedBook.id, current);
  const hasVideo = Boolean(current.video);
  const showVideoNow = hasVideo && !videoFinished;

  // Cố định 1 Frame duy nhất cho mỗi bộ truyện:
  const BOOK_FRAME_MAP: Record<string, string> = {
    "nam-frozen-elsa": "/assets/story-frame-read-2.png",
    "nam-doraemon-may": "/assets/story-frame-read-2.png",
    "nam-moana-bien": "/assets/story-frame-read-1.png",
    "nam-hawaii-stitch": "/assets/story-frame-read-2.png",
    "nam-va-minion": "/assets/story-frame-read-1.png",
    "nam-di-concert": "/assets/story-frame-read-1.png",
    "nam-o-zootopia": "/assets/story-frame-read-2.png",
    "nam-lam-viec-nha": "/assets/story-frame-read-1.png",
    "nam-di-hoc": "/assets/scene-classroom-3.png",
  };
  const readingFrameBg =
    BOOK_FRAME_MAP[selectedBook.id] || "/assets/story-frame-read-1.png";

  const readCurrentPage = () => {
    speech.speak(current.lines.join(" "), "vi-VN");
  };

  const readCurrentQuestion = () => {
    if (!currentQuestion) return;
    speech.speak(currentQuestion.question, "vi-VN");
  };

  const speakSingleDialogue = (text: string, idx: number) => {
    setActiveBubbleIdx(idx);
    speech.speak(text, "vi-VN");
    window.setTimeout(() => setActiveBubbleIdx(null), 3600);
  };

  const speakAllDialogues = () => {
    setActiveBubbleIdx(0);
    const combined = pageDialogues.map((d) => d.text).join(" ");
    speech.speak(combined, "vi-VN");
    window.setTimeout(() => setActiveBubbleIdx(null), 4200);
  };

  const replaySceneClip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVideoFinished(false);
    setVideoReplayKey((k) => k + 1);
  };

  const startStoryQuiz = () => {
    speech.stop();
    setInQuizMode(true);
    setQuizIdx(0);
    setSelectedOption(null);
    setIsOptionCorrect(null);
    if (soundEnabled && questions[0]) {
      speech.speak(
        `Nấm vừa đọc xong truyện ${selectedBook.title}! Bây giờ mình cùng trả lời ${questions.length} câu đố vui nhé! Câu hỏi số 1: ${questions[0].question}`,
        "vi-VN",
      );
    }
  };

  const handleSelectQuizOption = (opt: string) => {
    if (!currentQuestion || isOptionCorrect === true) return;
    setSelectedOption(opt);
    setQuizAttempts((c) => c + 1);

    if (opt === currentQuestion.answer) {
      setIsOptionCorrect(true);
      setAnsweredList((prev) => [
        ...prev,
        `${currentQuestion.question} -> ${opt}`,
      ]);
      const praise =
        quizIdx + 1 < questions.length
          ? `Đúng rồi! "${opt}" chính xác luôn! Nấm nhớ chuyện siêu quá!`
          : `Hoan hô! Nấm đã trả lời đúng cả ${questions.length} câu hỏi của truyện "${selectedBook.title}"!`;
      onReaction?.("happy", `🌟 ${praise}`);
      speech.speak(praise, "vi-VN");
    } else {
      setIsOptionCorrect(false);
      onReaction?.("sad", `💡 ${currentQuestion.hint}`);
      speech.speak(
        `Chưa đúng rồi, Nấm nghe gợi ý nhé: ${currentQuestion.hint}`,
        "vi-VN",
      );
    }
  };

  const goNextQuestionOrFinish = () => {
    speech.stop();
    if (quizIdx + 1 < questions.length) {
      const nextQIdx = quizIdx + 1;
      setQuizIdx(nextQIdx);
      setSelectedOption(null);
      setIsOptionCorrect(null);
      if (soundEnabled && questions[nextQIdx]) {
        speech.speak(
          `Câu hỏi số ${nextQIdx + 1}: ${questions[nextQIdx].question}`,
          "vi-VN",
        );
      }
    } else {
      onComplete({
        attempts: Math.max(1, quizAttempts),
        answers:
          answeredList.length > 0
            ? answeredList
            : [`Đọc hết truyện & trả lời câu hỏi: ${selectedBook.title}`],
      });
    }
  };

  const goPage = (dir: "next" | "prev") => {
    speech.stop();
    setFlipping(dir);
    window.setTimeout(() => {
      if (dir === "next" && pageIdx < pages.length - 1) {
        const nextIdx = pageIdx + 1;
        setPageIdx(nextIdx);
        setVideoFinished(false);
        if (soundEnabled) {
          speech.speak(pages[nextIdx].lines.join(" "), "vi-VN");
        }
      } else if (dir === "prev" && pageIdx > 0) {
        const prevIdx = pageIdx - 1;
        setPageIdx(prevIdx);
        setVideoFinished(false);
      }
      setFlipping(null);
    }, 220);
  };

  const refPage =
    currentQuestion && pages[currentQuestion.pageRef - 1]
      ? pages[currentQuestion.pageRef - 1]
      : pages[0];

  return (
    <div
      className="story-fullscreen-frame read-frame-bg"
      style={{ backgroundImage: `url("${readingFrameBg}")` }}
    >
      {/* Hotspot chạm vào Little Twin Stars & Các bạn ở 2 bên viền Frame */}
      <button
        type="button"
        className="twinstar-hotspot-left"
        onClick={greetLittleTwinStars}
        title="Chạm vào Little Twin Stars!"
      />
      <button
        type="button"
        className="twinstar-hotspot-right"
        onClick={greetLittleTwinStars}
        title="Chạm vào Little Twin Stars!"
      />

      {twinStarGreeting && (
        <div className="twinstar-floating-bubble">🌟 {twinStarGreeting}</div>
      )}

      {/* Lòng bảng trắng của Frame Đọc Chuyện:
          Chỉ hiển thị Thanh công cụ nhỏ + Khung 2/3 Ảnh lớn & 1/3 Cột đối thoại (nhiều đoạn thoại) */}
      <div className="story-board-inner-window read-board-window">
        {!inQuizMode ? (
          <div
            className={`bedtime-storybook-stage ${
              flipping ? `flip-${flipping}` : ""
            }`}
          >
            {/* Thanh điều khiển nhỏ gọn trên đỉnh lòng bảng */}
            <div className="bedtime-story-toolbar">
              <div className="bedtime-toolbar-left">
                <button
                  type="button"
                  className="chunky-btn chunky-pink btn-sm"
                  onClick={() => {
                    speech.stop();
                    setSelectedBook(null);
                  }}
                >
                  <ArrowLeft size={14} /> Chọn truyện khác
                </button>
                <div className="bedtime-page-pill">
                  <BookOpen size={14} />
                  <span>
                    {selectedBook.title} · Trang {pageIdx + 1}/{pages.length}
                  </span>
                </div>
              </div>

              <div className="bedtime-toolbar-right">
                {questions.length > 0 && (
                  <button
                    type="button"
                    className="chunky-btn chunky-gold btn-sm"
                    onClick={startStoryQuiz}
                    title="Chuyển sang trả lời câu hỏi đố vui của truyện này"
                  >
                    <HelpCircle size={14} /> Đố vui ({questions.length} câu)
                  </button>
                )}
                <button
                  type="button"
                  className="chunky-btn chunky-blue btn-sm"
                  onClick={readCurrentPage}
                >
                  <Volume2 size={14} /> Nghe kể
                </button>
              </div>
            </div>

            {/* Ô nền bảng: 2/3 diện tích là Ảnh/Video minh họa lớn + 1/3 diện tích là Cột Đối Thoại (1 hoặc nhiều đoạn) */}
            <div className="bedtime-middle-showcase">
              <div
                className="bedtime-picture-card"
                onClick={speakAllDialogues}
                style={{ position: "relative" }}
                title="Chạm vào tranh để nghe các nhân vật đối thoại!"
              >
                {showVideoNow ? (
                  <>
                    <video
                      key={`${selectedBook.id}-${pageIdx}-${videoReplayKey}`}
                      src={current.video}
                      poster={current.image}
                      className="bedtime-contained-illust"
                      muted
                      autoPlay
                      playsInline
                      onEnded={() => setVideoFinished(true)}
                      onError={() => setVideoFinished(true)}
                    />
                    <span className="story-video-status-pill playing">
                      🎬 Đang phát cảnh động...
                    </span>
                  </>
                ) : (
                  <>
                    <img
                      src={current.image}
                      alt={current.title}
                      className="bedtime-contained-illust"
                    />
                    {hasVideo && (
                      <button
                        type="button"
                        className="story-video-status-pill replay-btn"
                        onClick={replaySceneClip}
                        title="Phát lại đoạn clip chuyển động của trang này"
                      >
                        <Play size={12} fill="currentColor" /> Xem lại cảnh động
                      </button>
                    )}
                  </>
                )}
              </div>

              {/* Cột 1/3 bên phải: Danh sách các đoạn đối thoại của nhân vật trong trang */}
              <div className="bedtime-dialogue-column">
                {pageDialogues.map((dlg, dIdx) => (
                  <button
                    key={`${pageIdx}-dlg-${dIdx}`}
                    type="button"
                    className={`bedtime-side-dialogue dialogue-turn-${
                      dIdx % 2
                    } ${activeBubbleIdx === dIdx ? "active" : ""}`}
                    onClick={() => speakSingleDialogue(dlg.text, dIdx)}
                  >
                    <span className="dialogue-speaker-badge">
                      {dIdx % 2 === 0 ? "💬" : "✨"} {dlg.speaker} nói:
                    </span>
                    <p className="dialogue-quote-text">"{dlg.text}"</p>
                  </button>
                ))}
                <button
                  type="button"
                  className="dialogue-listen-all-pill"
                  onClick={speakAllDialogues}
                >
                  🔊 Chạm vào thẻ hoặc tranh để nghe đối thoại
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* =================================================================
             MÀN HÌNH ĐỐ VUI 2-3 CÂU HỎI SAU KHI ĐỌC TRUYỆN
             ================================================================= */
          <div className="bedtime-storybook-stage story-quiz-stage">
            <div className="bedtime-story-toolbar">
              <div className="bedtime-toolbar-left">
                <button
                  type="button"
                  className="chunky-btn chunky-pink btn-sm"
                  onClick={() => {
                    speech.stop();
                    setInQuizMode(false);
                  }}
                >
                  <ArrowLeft size={14} /> Xem lại truyện
                </button>
                <div className="bedtime-page-pill story-quiz-progress-pill">
                  <Sparkles size={14} />
                  <span>
                    Đố Vui: {selectedBook.title} · Câu {quizIdx + 1}/
                    {questions.length}
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="chunky-btn chunky-blue btn-sm"
                onClick={readCurrentQuestion}
              >
                <Volume2 size={14} /> Nghe câu hỏi
              </button>
            </div>

            {currentQuestion && (
              <div className="story-quiz-body">
                {/* Bên trái: Tranh gợi ý từ trang truyện tương ứng */}
                <div className="story-quiz-illust-card">
                  <img
                    src={refPage.image}
                    alt={refPage.title}
                    className="story-quiz-illust-img"
                  />
                  <div className="story-quiz-illust-footer">
                    <span className="story-quiz-page-tag">
                      📖 Hình gợi ý: Trang {currentQuestion.pageRef}
                    </span>
                    <button
                      type="button"
                      className="story-quiz-peek-btn"
                      onClick={() => {
                        speech.stop();
                        setPageIdx(
                          Math.max(0, currentQuestion.pageRef - 1),
                        );
                        setInQuizMode(false);
                      }}
                    >
                      🔍 Mở Trang {currentQuestion.pageRef}
                    </button>
                  </div>
                </div>

                {/* Bên phải: Câu hỏi + 3 đáp án lựa chọn + Gợi ý / Nút tiếp tục */}
                <div className="story-quiz-question-card">
                  <div
                    className="story-quiz-prompt-box"
                    onClick={readCurrentQuestion}
                    title="Chạm để nghe đọc lại câu hỏi"
                  >
                    <span className="story-quiz-q-badge">
                      ❓ Câu hỏi {quizIdx + 1}/{questions.length}
                    </span>
                    <h3 className="story-quiz-q-title">
                      {currentQuestion.question}
                    </h3>
                  </div>

                  <div className="story-quiz-options-list">
                    {currentQuestion.options.map((opt, idx) => {
                      const isChosen = selectedOption === opt;
                      let stateClass = "";
                      if (isChosen && isOptionCorrect === true) {
                        stateClass = "correct";
                      } else if (isChosen && isOptionCorrect === false) {
                        stateClass = "wrong";
                      } else if (
                        isOptionCorrect === true &&
                        opt === currentQuestion.answer
                      ) {
                        stateClass = "correct";
                      }

                      const letters = ["A", "B", "C"];
                      return (
                        <button
                          key={opt}
                          type="button"
                          className={`story-quiz-option-btn ${stateClass}`}
                          onClick={() => handleSelectQuizOption(opt)}
                        >
                          <span className="story-quiz-opt-letter">
                            {letters[idx] || idx + 1}
                          </span>
                          <span className="story-quiz-opt-text">{opt}</span>
                          {stateClass === "correct" && (
                            <CheckCircle2
                              size={20}
                              className="story-quiz-opt-check"
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Thanh phản hồi & Nút chuyển câu tiếp theo / Nhận 3 sao */}
                  <div className="story-quiz-footer-bar">
                    {isOptionCorrect === false && (
                      <div className="story-quiz-feedback-pill hint-pill">
                        💡 {currentQuestion.hint}
                      </div>
                    )}

                    {isOptionCorrect === true && (
                      <div className="story-quiz-success-row">
                        <span className="story-quiz-feedback-pill ok-pill">
                          🎉 Chính xác! Nấm giỏi quá!
                        </span>
                        <button
                          type="button"
                          className="chunky-btn chunky-gold btn-sm story-quiz-next-btn"
                          onClick={goNextQuestionOrFinish}
                        >
                          {quizIdx + 1 < questions.length ? (
                            <>
                              Câu tiếp theo <ChevronRight size={16} />
                            </>
                          ) : (
                            <>
                              <Star size={16} fill="currentColor" /> Nhận 3 Sao!
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    {isOptionCorrect === null && (
                      <div className="story-quiz-feedback-pill idle-pill">
                        👆 Nấm chạm vào đáp án đúng ở trên nhé!
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Ô chữ câu chuyện dịch xuống hàng cuối cùng (thay thế thanh chọn môn học):
          Nút Trang trước + Lời dẫn câu chuyện + Nút Trang tiếp / Đố vui */}
      {!inQuizMode && (
        <div className="bedtime-caption-board bedtime-bottom-dock">
          <button
            type="button"
            className="chunky-btn chunky-orange bedtime-nav-btn"
            disabled={pageIdx === 0}
            onClick={() => goPage("prev")}
          >
            <ChevronLeft size={18} /> Trang trước
          </button>

          <div
            className="bedtime-caption-text"
            onClick={readCurrentPage}
            title="Chạm để nghe giọng kể đoạn này"
          >
            <p>{current.lines.join(" ")}</p>
          </div>

          {pageIdx < pages.length - 1 ? (
            <button
              type="button"
              className="chunky-btn chunky-green bedtime-nav-btn"
              onClick={() => goPage("next")}
            >
              Trang tiếp <ChevronRight size={18} />
            </button>
          ) : (
            <button
              type="button"
              className="chunky-btn chunky-gold bedtime-nav-btn"
              onClick={startStoryQuiz}
            >
              <Sparkles size={17} /> Đố vui ({questions.length} câu)!
            </button>
          )}
        </div>
      )}
    </div>
  );
}
