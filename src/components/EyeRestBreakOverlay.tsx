import { useEffect, useState } from "react";
import { Clock, Lock, Moon, RefreshCw, ShieldCheck, Sparkles, Volume2 } from "lucide-react";
import {
  EYE_REST_BREAK_START_LINE,
  generateParentMathChallenge,
  type ParentMathChallenge,
} from "../hooks/useEyeRestTimer";

interface EyeRestBreakOverlayProps {
  remainingBreakSeconds: number;
  breakDurationMinutes: number;
  onSpeak: (text: string) => void;
  onUnlockReset: () => void;
  onSnooze: (extraMinutes: number) => void;
}

const EYE_CARE_ACTIVITIES = [
  {
    id: "drink",
    badge: "💧 Bước 1",
    title: "Uống Ngụm Nước Mát",
    desc: "Nấm ra uống một ngụm nước lọc hoặc sữa tươi nhé!",
    speech: "Nấm ơi, con ra uống một ngụm nước mát hoặc sữa tươi cho khỏe người nhé!",
    image: "/assets/nam-stickers/nam-eat-milk.webp",
  },
  {
    id: "look-far",
    badge: "🌿 Bước 2",
    title: "Ngắm Cây Xanh Xa Xa",
    desc: "Nhìn ra cửa sổ ngắm cây lá xanh hoặc chớp mắt nhẹ 10 cái.",
    speech: "Mình cùng nhìn ra cửa sổ ngắm cây xanh ở xa để đôi mắt xinh được nghỉ ngơi nha!",
    image: "/assets/nam-stickers/nam-study-water.webp",
  },
  {
    id: "stretch",
    badge: "🙆‍♀️ Bước 3",
    title: "Vươn Vai Nhảy Chân Sáo",
    desc: "Đứng dậy vươn hai tay cao lên trời và lắc lư cái hông!",
    speech: "Một, hai, ba! Nấm đứng dậy vươn vai thật cao cho cơ thể dẻo dai nào!",
    image: "/assets/rewards/sticker-minigame-4.webp",
  },
];

function formatCountdown(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export function EyeRestBreakOverlay({
  remainingBreakSeconds,
  breakDurationMinutes,
  onSpeak,
  onUnlockReset,
  onSnooze,
}: EyeRestBreakOverlayProps) {
  const [gateOpen, setGateOpen] = useState(false);
  const [gateUnlocked, setGateUnlocked] = useState(false);
  const [challenge, setChallenge] = useState<ParentMathChallenge>(() =>
    generateParentMathChallenge(),
  );
  const [answerInput, setAnswerInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const totalSec = Math.max(60, breakDurationMinutes * 60);
  const progressPct = Math.min(
    100,
    Math.max(0, ((totalSec - remainingBreakSeconds) / totalSec) * 100),
  );

  // Tự động đọc lời nhắn khi màn hình Giờ Ra Chơi vừa bật lên
  useEffect(() => {
    const timer = window.setTimeout(() => {
      onSpeak(EYE_REST_BREAK_START_LINE);
    }, 250);
    return () => window.clearTimeout(timer);
    // Chỉ chạy 1 lần khi mount overlay
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleOpenParentGate() {
    setChallenge(generateParentMathChallenge());
    setAnswerInput("");
    setErrorMsg("");
    setGateUnlocked(false);
    setGateOpen(true);
  }

  function handleVerifyGate(e: React.FormEvent) {
    e.preventDefault();
    const num = Number.parseInt(answerInput.trim(), 10);
    if (!Number.isNaN(num) && num === challenge.expectedAnswer) {
      setGateUnlocked(true);
      setErrorMsg("");
    } else {
      setErrorMsg("Ba mẹ thử tính lại phép tính này nhé!");
      setChallenge(generateParentMathChallenge());
      setAnswerInput("");
    }
  }

  return (
    <div
      className="eye-rest-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="eye-rest-heading"
    >
      <div className="eye-rest-stars-bg" aria-hidden="true" />

      <div className="eye-rest-card">
        {/* Hàng trên: Huy hiệu Giờ Ra Chơi + Nút nghe lại lời nhắc */}
        <div className="eye-rest-top-bar">
          <span className="eye-rest-pill">
            <Moon size={16} /> GIỜ RA CHƠI NGHỈ MẮT · {breakDurationMinutes} PHÚT
          </span>
          <button
            type="button"
            className="eye-rest-speak-btn"
            onClick={() => onSpeak(EYE_REST_BREAK_START_LINE)}
          >
            <Volume2 size={18} /> Nghe lời nhắn
          </button>
        </div>

        {/* Khu vực Nhân vật + Câu nói chính + Đồng hồ đếm ngược */}
        <div className="eye-rest-hero-row">
          <div className="eye-rest-mascot-duo">
            <img
              src="/assets/nam-stickers/nam-hug-cinna.webp"
              alt="Bé Nấm và Cinnamoroll nghỉ giải lao"
              className="eye-rest-main-img"
            />
            <img
              src="/assets/rewards/sticker-music-1.webp"
              alt="Cinnamoroll ôm vầng trăng"
              className="eye-rest-moon-img"
            />
          </div>

          <div className="eye-rest-hero-text">
            <h1 id="eye-rest-heading">
              “Nấm ơi đến giờ ra chơi rồi, Nấm nghỉ giải lao rồi quay lại sau nhé!”
            </h1>
            <p className="eye-rest-subtitle">
              Đôi mắt xinh của Nấm đã chăm chỉ học suốt 30 phút rồi. Mình rời màn hình
              nghỉ ngơi một lát để mắt luôn sáng khỏe nha!
            </p>

            <div className="eye-rest-timer-box" aria-live="polite">
              <div className="eye-rest-timer-digits">
                <Clock size={26} />
                <span>{formatCountdown(remainingBreakSeconds)}</span>
              </div>
              <div className="eye-rest-progress-track">
                <div
                  className="eye-rest-progress-fill"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <span className="eye-rest-timer-caption">
                Khi đồng hồ về 00:00, chuông nhỏ sẽ reo gọi Nấm quay lại học tiếp!
              </span>
            </div>
          </div>
        </div>

        {/* 3 Thẻ gợi ý hoạt động rời màn hình */}
        <div className="eye-rest-activities-grid">
          {EYE_CARE_ACTIVITIES.map((act) => (
            <button
              key={act.id}
              type="button"
              className="eye-rest-activity-card"
              onClick={() => onSpeak(act.speech)}
            >
              <img src={act.image} alt={act.title} className="eye-rest-act-thumb" />
              <div className="eye-rest-act-body">
                <span className="eye-rest-act-badge">{act.badge}</span>
                <strong>{act.title}</strong>
                <p>{act.desc}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Khu vực Khóa Mẹ ở chân thẻ */}
        <div className="eye-rest-footer">
          {!gateOpen ? (
            <button
              type="button"
              className="eye-rest-parent-trigger"
              onClick={handleOpenParentGate}
            >
              <Lock size={15} /> Mở khóa bằng Khóa Mẹ
            </button>
          ) : !gateUnlocked ? (
            <form className="eye-rest-parent-gate" onSubmit={handleVerifyGate}>
              <div className="eye-rest-gate-header">
                <ShieldCheck size={18} />
                <span>Khóa Mẹ: Ba mẹ tính giúp phép tính ngẫu nhiên</span>
                <button
                  type="button"
                  className="eye-rest-gate-refresh"
                  onClick={() => {
                    setChallenge(generateParentMathChallenge());
                    setAnswerInput("");
                    setErrorMsg("");
                  }}
                  title="Đổi phép tính khác"
                >
                  <RefreshCw size={14} />
                </button>
              </div>

              <div className="eye-rest-gate-controls">
                <label htmlFor="eye-rest-gate-input" className="eye-rest-math-label">
                  {challenge.questionText}
                </label>
                <input
                  id="eye-rest-gate-input"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  value={answerInput}
                  onChange={(e) => setAnswerInput(e.target.value)}
                  placeholder="Kết quả"
                  className="eye-rest-math-input"
                  autoFocus
                />
                <button type="submit" className="eye-rest-gate-submit">
                  Xác nhận
                </button>
                <button
                  type="button"
                  className="eye-rest-gate-cancel"
                  onClick={() => setGateOpen(false)}
                >
                  Đóng
                </button>
              </div>
              {errorMsg && <p className="eye-rest-gate-error">{errorMsg}</p>}
            </form>
          ) : (
            <div className="eye-rest-parent-actions">
              <span className="eye-rest-unlocked-label">
                <Sparkles size={16} /> Đã mở Khóa Mẹ! Mẹ muốn chọn chế độ nào?
              </span>
              <div className="eye-rest-unlocked-btns">
                <button
                  type="button"
                  className="eye-rest-action-btn snooze"
                  onClick={() => onSnooze(10)}
                >
                  ⏳ Cho chơi thêm 10 phút
                </button>
                <button
                  type="button"
                  className="eye-rest-action-btn reset"
                  onClick={onUnlockReset}
                >
                  🔓 Mở khóa học tiếp luôn (30&apos; mới)
                </button>
                <button
                  type="button"
                  className="eye-rest-gate-cancel"
                  onClick={() => {
                    setGateOpen(false);
                    setGateUnlocked(false);
                  }}
                >
                  Giữ nguyên giờ nghỉ
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
